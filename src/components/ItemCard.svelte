<script lang="ts">
  // The one answer card — rendered by Lookup (search) and by Lens (barcode /
  // vision). Extracted from Lookup.svelte (Card B.1); markup and classes are
  // unchanged so the homepage renders identically.
  import { RUNG_BADGE, RUNG_ORDER, type Disposition, type Item, type Status } from '../data/items';
  import { SOURCES } from '../data/sources';

  interface Props {
    item: Item;
    origin?: 'search' | 'barcode' | 'vision';
    productName?: string;   // what the API called it (barcode) — shown above the item name
    sourceLabel?: string;   // provenance chip for the identification (e.g. 'Open Food Facts')
    sourceUrl?: string;
  }
  let { item, origin = 'search', productName, sourceLabel, sourceUrl }: Props = $props();

  // Disposition.source id -> citation (Atlas provenance). Only dispositions
  // whose backing page was verified cite a source — no source, no chip.
  const SOURCE_BY_ID = new Map(SOURCES.map((s) => [s.id, s]));

  function citation(disposition: Disposition) {
    return disposition.source ? SOURCE_BY_ID.get(disposition.source) : undefined;
  }

  const STATUS_CONFIG: Record<Status, { label: string; cls: string }> = {
    curbside: { label: '✓ Curbside', cls: 'status-badge--curbside' },
    'drop-off': { label: '↗ Drop-off Only', cls: 'status-badge--drop-off' },
    hazardous: { label: '⚠ Hazardous Waste', cls: 'status-badge--hazardous' },
    no: { label: '✕ Not Recyclable', cls: 'status-badge--no' },
    compost: { label: '⬡ Compost', cls: 'status-badge--compost' },
    partial: { label: '◑ Check Local', cls: 'status-badge--partial' },
  };

  function byRank(a: Disposition, b: Disposition) {
    return (a.rank ?? RUNG_ORDER[a.rung] ?? 99) - (b.rank ?? RUNG_ORDER[b.rung] ?? 99);
  }

  function bestDisposition(dispositions: Disposition[]) {
    return dispositions.find((d) => d.is_recommended) ?? [...dispositions].sort(byRank)[0];
  }

  function rungText(disposition: Disposition) {
    return `${RUNG_BADGE[disposition.rung] ?? disposition.rung} ${disposition.label}${disposition.local_variance ? ' (check local)' : ''}`;
  }

  const status = $derived(STATUS_CONFIG[item.status]);
  const best = $derived(bestDisposition(item.dispositions));
  const others = $derived([...item.dispositions].sort(byRank).filter((disposition) => disposition !== best));
</script>

<article class="recycle-card" data-origin={origin === 'search' ? undefined : origin}>
  <div>
    <p class="recycle-card__cat">{item.cat}</p>
    {#if productName && productName.toLowerCase() !== item.name.toLowerCase()}
      <p class="recycle-card__product">{productName}</p>
    {/if}
    <h3 class="recycle-card__name">{item.name}</h3>
  </div>
  <span class={`status-badge ${status.cls}`}>{status.label}</span>

  {#if origin === 'vision'}
    <p class="recycle-card__origin">Identified by AI — please confirm</p>
  {:else if origin === 'barcode' && sourceLabel}
    <p class="recycle-card__origin">
      Packaging identified via
      {#if sourceUrl}
        <a class="recycle-card__src" href={sourceUrl} target="_blank" rel="noopener noreferrer">src: {sourceLabel} ↗</a>
      {:else}
        {sourceLabel}
      {/if}
    </p>
  {/if}

  {#if item.gratitude_note}
    <p class="recycle-card__gratitude">{item.gratitude_note}</p>
  {/if}

  {#if best}
    {@const bestSource = citation(best)}
    <p class="recycle-card__best">
      <span class="recycle-card__best-label">Best path</span>
      <span class="recycle-card__best-val">
        {rungText(best)}
        {#if bestSource}
          <a class="recycle-card__src" href={bestSource.url} target="_blank" rel="noopener noreferrer" title={bestSource.name}>
            src: {bestSource.short_label ?? bestSource.name} ↗
          </a>
        {/if}
      </span>
    </p>
  {/if}

  <div class="recycle-card__detail">
    <div class="recycle-card__row">
      <span class="recycle-card__row-label">Prep</span>
      <span class="recycle-card__row-val">{item.prep}</span>
    </div>
    <div class="recycle-card__row">
      <span class="recycle-card__row-label">Where</span>
      <span class="recycle-card__row-val">{item.where}</span>
    </div>
  </div>

  {#if others.length}
    <details class="recycle-card__paths">
      <summary>Other respectful paths</summary>
      {#each others as disposition}
        {@const rungSource = citation(disposition)}
        <p class="recycle-card__rung">
          {rungText(disposition)}
          {#if rungSource}
            <a class="recycle-card__src" href={rungSource.url} target="_blank" rel="noopener noreferrer" title={rungSource.name}>
              src: {rungSource.short_label ?? rungSource.name} ↗
            </a>
          {/if}
        </p>
      {/each}
    </details>
  {/if}

  <p class="recycle-card__note">{item.note}</p>
</article>
