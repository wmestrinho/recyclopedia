<script lang="ts">
  // Recyclopedia Lens — the camera on the search bar (Lens master plan, Card B.3).
  // Tier 2 (barcode) is live. Tier 3 (photo, Card C.2) is built and gated on
  // VISION_LIVE — while it is false the Snap button stays disabled.
  //
  // Privacy: frames never leave the phone. Barcode decoding runs on-device
  // (native BarcodeDetector where available, else the ZXing WASM ponyfill,
  // self-hosted at /vendor/). Only the GTIN is sent to /api/barcode. A photo
  // leaves the phone only when Snap is tapped: one downsized JPEG (the canvas
  // re-encode strips EXIF) to /api/vision, which never stores it.
  import { onMount } from 'svelte';
  import { ITEMS, type Item } from '../data/items';
  import { materialById } from '../data/materials';
  import { itemFromMaterial, resolveCandidate } from '../data/recognition';
  import { VISION_LIVE } from '../data/flags';
  import ItemCard from './ItemCard.svelte';

  interface Props {
    onclose: () => void;
    onresult: (query: string) => void;
  }
  let { onclose, onresult }: Props = $props();

  type LensState = 'idle' | 'scanning' | 'lookingUp' | 'confirm' | 'answer' | 'notsure' | 'error'
    | 'identifying' | 'vconfirm' | 'pick' | 'vanswer';
  interface Component {
    material_id: string | null;
    material_name: string | null;
    shape: string | null;
    item_slug: string | null;
  }
  interface BarcodeResult {
    found: boolean;
    gtin: string;
    product?: { name?: string; brand?: string };
    components: Component[];
    source: string;
    source_url?: string;
    contribute_url?: string;
  }

  interface VisionResult {
    candidates: { slug: string; confidence: number }[];
    assert: boolean;
    material_guess: string;
    hazard_flag: boolean;
    safe_path?: string;
  }
  interface VisionChoice { slug: string; confidence: number; name: string; item: Item; general: boolean }

  let state = $state<LensState>('idle');
  let vision = $state<VisionResult | null>(null);
  let chosen = $state<VisionChoice | null>(null);
  let snapInput: HTMLInputElement | undefined = $state();
  let errorMsg = $state('');
  let usingFile = $state(false);
  let gtin = $state('');
  let result = $state<BarcodeResult | null>(null);

  let video: HTMLVideoElement | undefined = $state();
  let closeButton: HTMLButtonElement | undefined = $state();
  let stream: MediaStream | null = null;
  let detector: { detect(source: unknown): Promise<{ rawValue: string; format: string }[]> } | null = null;
  let raf = 0;
  let lastTick = 0;
  let lastCode = '';
  let stableHits = 0;
  let stopped = false;

  const FORMATS = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'qr_code'];
  const GTIN_RE = /^\d{8}$|^\d{12,14}$/;
  const ITEM_BY_SLUG = new Map(ITEMS.map((i) => [i.slug, i]));

  const productName = $derived(result?.product?.name?.trim() || '');
  // OFF `brands` is a free-text list ("COCA-COLA SERVICES SA/NV, Coca-Cola"): keep
  // the shortest entry and drop it when the product name already says it.
  const brand = $derived.by(() => {
    const parts = (result?.product?.brand || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return '';
    const shortest = parts.reduce((a, b) => (b.length < a.length ? b : a));
    return productName.toLowerCase().includes(shortest.toLowerCase()) ? '' : shortest;
  });
  const productLine = $derived([brand, productName].filter(Boolean).join(' · '));

  /** Cards to show in the Answer state: exact item when we have one, else the material's honest default. */
  const cards = $derived.by((): { key: string; item: Item; label: string }[] => {
    if (!result) return [];
    const out: { key: string; item: Item; label: string }[] = [];
    const seen = new Set<string>();
    for (const c of result.components) {
      const key = `${c.item_slug ?? ''}|${c.material_id ?? ''}`;
      if (seen.has(key)) continue;
      const item = c.item_slug ? ITEM_BY_SLUG.get(c.item_slug) : undefined;
      const material = c.material_id ? materialById(c.material_id) : undefined;
      if (item) out.push({ key, item, label: c.material_name ?? item.name });
      else if (material) out.push({ key, item: itemFromMaterial(material), label: material.name });
      seen.add(key);
    }
    return out;
  });

  /** Vision candidates → things we can answer. Category guesses take the material's general path. */
  const choices = $derived.by((): VisionChoice[] => {
    const out: VisionChoice[] = [];
    for (const c of vision?.candidates ?? []) {
      const hit = resolveCandidate(c.slug);
      if (!hit) continue;
      if (hit.kind === 'item') out.push({ ...c, name: hit.item.name, item: hit.item, general: false });
      else out.push({ ...c, name: `Category: ${hit.category}`, item: itemFromMaterial(hit.material, `${hit.category} (general path)`), general: true });
    }
    return out;
  });
  // The model sometimes answers material_guess with a slug; only plain words go to the search box.
  const guessQuery = $derived.by(() => {
    const g = (vision?.material_guess ?? '').trim();
    return /[:()]/.test(g) ? '' : g;
  });

  async function getDetector() {
    if (detector) return detector;
    const Native = (globalThis as unknown as { BarcodeDetector?: { getSupportedFormats(): Promise<string[]>; new (o: { formats: string[] }): typeof detector } }).BarcodeDetector;
    try {
      if (Native) {
        const supported = await Native.getSupportedFormats();
        if (supported.includes('ean_13')) {
          detector = new Native({ formats: FORMATS.filter((f) => supported.includes(f)) });
          return detector;
        }
      }
    } catch { /* fall through to the ponyfill */ }
    const mod = await import('barcode-detector/ponyfill');
    mod.prepareZXingModule({
      overrides: {
        locateFile: (path: string, prefix: string) => (path.endsWith('.wasm') ? '/vendor/zxing_reader.wasm' : prefix + path),
      },
    });
    detector = new mod.BarcodeDetector({ formats: FORMATS as never });
    return detector;
  }

  // The camera can take seconds to answer (permission prompt). Only an idle
  // Lens moves to scanning — a late answer must never replace a later screen.
  function beginScanning() {
    if (state === 'idle') state = 'scanning';
  }

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      usingFile = true;
      beginScanning();
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (stopped) { stopTracks(); return; }
      beginScanning();
      await tickReady();
      if (video) {
        video.srcObject = stream;
        await video.play().catch(() => undefined);
      }
      await getDetector();
      lastCode = ''; stableHits = 0;
      raf = requestAnimationFrame(loop);
    } catch {
      usingFile = true;
      beginScanning();
    }
  }

  function tickReady() {
    return new Promise<void>((r) => requestAnimationFrame(() => r()));
  }

  function stopTracks() {
    cancelAnimationFrame(raf);
    stream?.getTracks().forEach((t) => t.stop());
    stream = null;
  }

  async function loop(ts: number) {
    if (stopped || state !== 'scanning') return;
    if (ts - lastTick >= 200 && video && video.readyState >= 2 && detector) {
      lastTick = ts;
      try {
        const codes = await detector.detect(video);
        const hit = codes.find((c) => GTIN_RE.test(c.rawValue));
        if (hit) {
          if (hit.rawValue === lastCode) stableHits += 1; else { lastCode = hit.rawValue; stableHits = 1; }
          if (stableHits >= 2) { await onCode(hit.rawValue); return; }
        }
      } catch { /* a bad frame is not an error */ }
    }
    raf = requestAnimationFrame(loop);
  }

  async function onFile(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    state = 'lookingUp';
    try {
      const d = await getDetector();
      const bitmap = await createImageBitmap(file);
      const codes = await d.detect(bitmap);
      bitmap.close?.();
      const hit = codes.find((c) => GTIN_RE.test(c.rawValue));
      if (hit) await onCode(hit.rawValue);
      else { errorMsg = 'No barcode found in that photo. Fill the frame with the barcode and try again.'; state = 'error'; }
    } catch {
      errorMsg = 'Could not read that photo.'; state = 'error';
    } finally {
      input.value = '';
    }
  }

  // One-time "Add to Home Screen" hint after the first successful scan (Card D.1).
  // 'prompt' = the browser handed us an install prompt; 'ios' = Safari, manual steps.
  const A2HS_KEY = 'rcy:a2hs-hinted';
  let installHint = $state<'none' | 'prompt' | 'ios'>('none');

  function offerInstallOnce() {
    try {
      if (localStorage.getItem(A2HS_KEY)) return;
      const standalone = matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
      if (standalone) return;
      const ua = navigator.userAgent;
      const iosSafari = /iP(hone|ad|od)/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
      if ((window as any).__rcyInstallPrompt) installHint = 'prompt';
      else if (iosSafari) installHint = 'ios';
      else return;
      localStorage.setItem(A2HS_KEY, '1');
    } catch { /* storage blocked — skip the hint, never the answer */ }
  }

  async function install() {
    const prompt = (window as any).__rcyInstallPrompt;
    installHint = 'none';
    if (!prompt) return;
    try { await prompt.prompt(); } catch { /* dismissed */ }
    (window as any).__rcyInstallPrompt = null;
  }

  function confirmAnswer() {
    state = 'answer';
    offerInstallOnce();
  }

  const SNAP_EDGE = 768;

  function toJpeg(source: CanvasImageSource, w: number, h: number): Promise<Blob | null> {
    const scale = Math.min(1, SNAP_EDGE / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    canvas.getContext('2d')?.drawImage(source, 0, 0, canvas.width, canvas.height);
    return new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.8));
  }

  async function identify(blob: Blob | null) {
    if (!blob) { errorMsg = 'Could not capture that photo.'; state = 'error'; return; }
    try {
      const res = await fetch('/api/vision', { method: 'POST', headers: { 'Content-Type': 'image/jpeg', Accept: 'application/json' }, body: blob });
      if (res.status === 429) { errorMsg = 'That was a lot of photos — give it a minute, or search by name.'; state = 'error'; return; }
      if (!res.ok) throw new Error(String(res.status));
      vision = (await res.json()) as VisionResult;
      if (!choices.length) state = 'notsure';
      else if (vision.assert) { chosen = choices[0]; state = 'vconfirm'; }
      else state = 'pick';
    } catch {
      errorMsg = 'Photo identification is not available right now. Try the barcode, or search by name.';
      state = 'error';
    }
  }

  async function snap() {
    if (!VISION_LIVE || state !== 'scanning') return;
    if (usingFile || !video || video.readyState < 2) { snapInput?.click(); return; }
    cancelAnimationFrame(raf);
    video.pause();
    state = 'identifying';
    await identify(await toJpeg(video, video.videoWidth, video.videoHeight));
  }

  async function onSnapFile(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || state !== 'scanning') { input.value = ''; return; }
    state = 'identifying';
    try {
      const bitmap = await createImageBitmap(file);
      const blob = await toJpeg(bitmap, bitmap.width, bitmap.height);
      bitmap.close?.();
      await identify(blob);
    } catch {
      errorMsg = 'Could not read that photo.'; state = 'error';
    } finally {
      input.value = '';
    }
  }

  function pick(choice: VisionChoice) {
    chosen = choice;
    state = 'vanswer';
    offerInstallOnce();
  }

  async function onCode(code: string) {
    cancelAnimationFrame(raf);
    try { navigator.vibrate?.(40); } catch { /* optional */ }
    video?.pause();
    gtin = code;
    state = 'lookingUp';
    try {
      const res = await fetch(`/api/barcode?gtin=${encodeURIComponent(code)}`, { headers: { Accept: 'application/json' } });
      if (!res.ok && res.status !== 404) throw new Error(String(res.status));
      result = (await res.json()) as BarcodeResult;
      // Confirm only when at least one component resolves to something we can
      // honestly answer (an item or a material); OFF records can carry a shape
      // with no material, and we never invent one.
      state = result.found && cards.length ? 'confirm' : 'notsure';
    } catch {
      errorMsg = 'Could not look that barcode up right now.';
      state = 'error';
    }
  }

  function scanAgain() {
    result = null; gtin = ''; errorMsg = ''; vision = null; chosen = null;
    lastCode = ''; stableHits = 0;
    if (usingFile || !stream) { if (!usingFile) { state = 'idle'; startCamera(); } else state = 'scanning'; return; }
    state = 'scanning';
    video?.play().catch(() => undefined);
    raf = requestAnimationFrame(loop);
  }

  function close() {
    stopped = true;
    stopTracks();
    onclose();
  }

  function searchByName() {
    stopped = true;
    stopTracks();
    onresult(vision ? guessQuery : productName);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
  }

  // main.site-shell is its own stacking context (z-index: 1), so a fixed overlay
  // inside it can never rise above the sticky header. Mount the dialog on <body>.
  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return { destroy() { node.remove(); } };
  }

  onMount(() => {
    closeButton?.focus();
    startCamera();
    return () => { stopped = true; stopTracks(); };
  });
</script>

<svelte:window onkeydown={onKey} />

{#snippet installAside()}
  {#if installHint !== 'none'}
    <aside class="lens__install" aria-label="Install Recyclopedia">
      {#if installHint === 'prompt'}
        <p>Keep the scanner one tap away — add Recyclopedia to your home screen.</p>
        <div class="lens__install-actions">
          <button class="button button--ghost" type="button" onclick={install}>Add to Home Screen</button>
          <button class="button button--link" type="button" onclick={() => (installHint = 'none')}>Not now</button>
        </div>
      {:else}
        <p>Keep the scanner one tap away: tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</p>
        <div class="lens__install-actions">
          <button class="button button--link" type="button" onclick={() => (installHint = 'none')}>Got it</button>
        </div>
      {/if}
    </aside>
  {/if}
{/snippet}

<div class="lens" role="dialog" use:portal aria-modal="true" aria-labelledby="lens-title">
  <div class="lens__bar">
    <p class="lens__title" id="lens-title">📷 Scan it</p>
    <button class="lens__close" type="button" aria-label="Close the scanner" bind:this={closeButton} onclick={close}>✕</button>
  </div>

  <div class="lens__body">
    {#if state === 'idle' || state === 'scanning' || state === 'lookingUp' || state === 'identifying' || state === 'error'}
      <div class="lens__view" class:is-paused={state !== 'scanning'}>
        {#if !usingFile}
          <!-- svelte-ignore a11y_media_has_caption -->
          <video class="lens__video" bind:this={video} playsinline muted autoplay></video>
          <div class="lens__reticle" aria-hidden="true"></div>
        {:else}
          <label class="lens__file">
            <span>Take a photo of the barcode</span>
            <input type="file" accept="image/*" capture="environment" onchange={onFile} />
          </label>
        {/if}
        {#if state === 'idle'}
          <p class="lens__hint">Starting the camera…</p>
        {:else if state === 'lookingUp'}
          <p class="lens__hint" aria-live="polite">Looking up {gtin}…</p>
        {:else if state === 'identifying'}
          <p class="lens__hint" aria-live="polite">Taking a careful look…</p>
        {/if}
      </div>
      <p class="lens__privacy">Frames stay on your phone; only the barcode number is looked up. A photo is only sent when you tap Snap.</p>
      {#if state === 'error'}
        <p class="lens__error" role="alert">{errorMsg}</p>
      {/if}
      <div class="lens__actions">
        <button class="button button--ghost" type="button" onclick={scanAgain} disabled={state === 'lookingUp' || state === 'identifying'}>↺ Scan again</button>
        {#if VISION_LIVE}
          <button class="button button--solid" type="button" onclick={snap} disabled={state !== 'scanning'}>◎ Snap a photo</button>
          <input class="lens__snap-input" type="file" accept="image/*" capture="environment" bind:this={snapInput} onchange={onSnapFile} tabindex="-1" aria-hidden="true" />
        {:else}
          <button class="button button--solid" type="button" disabled title="Photo identification arrives in the next release">◎ Snap (coming next)</button>
        {/if}
      </div>
      <p class="lens__how">Point at an EAN or UPC barcode{VISION_LIVE ? ' — or fill the frame with one object and tap Snap' : ''}. <a href="/privacy#camera">How this works ↗</a></p>

    {:else if state === 'confirm' && result}
      <section class="lens__card">
        <p class="recycle-card__cat">Barcode · {result.gtin} · likely match</p>
        <h3 class="lens__name">{productLine || 'Product found'}</h3>
        <ul class="lens__components">
          {#each result.components as c}
            <li>{c.material_name ?? 'Unknown material'}{c.shape ? ` · ${c.shape.replace('en:', '').replace(/-/g, ' ')}` : ''}</li>
          {/each}
        </ul>
        <p class="lens__src">
          <a class="recycle-card__src" href={result.source_url} target="_blank" rel="noopener noreferrer">src: Open Food Facts ↗</a>
        </p>
        <p class="lens__ask">Does this look right?</p>
        <div class="lens__actions">
          <button class="button button--ghost" type="button" onclick={() => (state = 'notsure')}>Not quite</button>
          <button class="button button--solid" type="button" onclick={confirmAnswer}>Yes, that's it</button>
        </div>
        <button class="button button--link" type="button" onclick={scanAgain}>↺ Scan again</button>
      </section>

    {:else if state === 'answer' && result}
      <section class="lens__answer">
        <p class="lens__confirmed">✓ {productLine || result.gtin}{cards.length > 1 ? ` · ${cards.length} parts` : ''}</p>
        {#each cards as card (card.key)}
          {#if cards.length > 1}
            <p class="lens__component-label">{card.label}</p>
          {/if}
          <ItemCard item={card.item} origin="barcode" productName={productName} sourceLabel="Open Food Facts" sourceUrl={result.source_url} />
        {/each}
        {@render installAside()}
        <div class="lens__actions">
          <button class="button button--ghost" type="button" onclick={scanAgain}>↺ Scan another</button>
          <button class="button button--solid" type="button" onclick={close}>Done</button>
        </div>
      </section>

    {:else if (state === 'vconfirm' || state === 'pick' || state === 'vanswer') && vision}
      {#if vision.hazard_flag}
        <p class="lens__hazard" role="alert"><strong>⚠ Treat this as hazardous.</strong> Keep it out of the bin and the trash. Take it to a household hazardous waste site or a take-back point — whatever else this screen says.</p>
      {/if}

      {#if state === 'vconfirm' && chosen}
        <section class="lens__card">
          <p class="recycle-card__cat">Photo · identified by AI · likely match</p>
          <h3 class="lens__name">{chosen.name}</h3>
          <div class="lens__conf" role="meter" aria-label="Confidence" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(chosen.confidence * 100)}>
            <span class="lens__conf-bar" style={`width: ${Math.round(chosen.confidence * 100)}%`}></span>
          </div>
          <p class="lens__conf-label">{Math.round(chosen.confidence * 100)}% sure{chosen.general ? ' of the category, not the exact item' : ''}</p>
          <p class="lens__ask">Does this look right?</p>
          <div class="lens__actions">
            <button class="button button--ghost" type="button" onclick={() => (state = 'pick')}>Not quite</button>
            <button class="button button--solid" type="button" onclick={() => chosen && pick(chosen)}>Yes, that's it</button>
          </div>
          <button class="button button--link" type="button" onclick={scanAgain}>↺ Snap again</button>
        </section>

      {:else if state === 'pick'}
        <section class="lens__card">
          <p class="recycle-card__cat">Photo · identified by AI · not sure enough to say</p>
          <h3 class="lens__name">Is it one of these?</h3>
          <div class="lens__actions lens__actions--stack">
            {#each choices as choice (choice.slug)}
              <button class="button button--ghost lens__choice" type="button" onclick={() => pick(choice)}>{choice.name}</button>
            {/each}
            <button class="button button--link" type="button" onclick={() => (state = 'notsure')}>None of these</button>
          </div>
          <button class="button button--link" type="button" onclick={scanAgain}>↺ Snap again</button>
        </section>

      {:else if state === 'vanswer' && chosen}
        <section class="lens__answer">
          <p class="lens__confirmed">✓ {chosen.name}</p>
          {#if chosen.general}
            <p class="lens__general">This is the general path for the category — check your local rules for the exact item.</p>
          {/if}
          <ItemCard item={chosen.item} origin="vision" />
          {@render installAside()}
          <div class="lens__actions">
            <button class="button button--ghost" type="button" onclick={scanAgain}>↺ Snap again</button>
            <button class="button button--solid" type="button" onclick={close}>Done</button>
          </div>
        </section>
      {/if}

    {:else if state === 'notsure'}
      <section class="lens__card lens__card--unsure">
        <p class="lens__unsure-icon" aria-hidden="true">🤔</p>
        <p class="lens__unsure-msg">We're not sure about this one.</p>
        <p class="lens__unsure-sub">We'd rather say so than guess you into a landfill. Let's find it together.</p>
        <div class="lens__actions lens__actions--stack">
          <button class="button button--solid" type="button" onclick={searchByName}>🔍 Search by name{vision ? (guessQuery ? `: ${guessQuery}` : '') : (productName ? `: ${productName}` : '')}</button>
          <button class="button button--ghost" type="button" onclick={scanAgain}>↺ Try again</button>
        </div>
        {#if result?.contribute_url}
          <p class="lens__how">Not in the database yet? <a href={result.contribute_url} target="_blank" rel="noopener noreferrer">Help Open Food Facts add this product ↗</a></p>
        {/if}
      </section>
    {/if}
  </div>
</div>
