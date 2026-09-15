<script lang="ts">
  import { onMount } from 'svelte';
  import { CATEGORIES, ITEMS } from '../data/items';
  import ItemCard from './ItemCard.svelte';

  let query = $state('');
  let activeFilter = $state('All');

  // ── Lens (camera on the search bar) ─────────────────────────────────────
  // The overlay is a separate island loaded on demand so the homepage bundle
  // never carries the barcode WASM. Hidden only where no capture path exists.
  let canScan = $state(true);
  let Lens = $state<typeof import('./Lens.svelte').default | null>(null);
  let lensOpen = $state(false);
  let lensLoading = $state(false);
  let cameraButton: HTMLButtonElement | undefined = $state();

  onMount(() => {
    const hasMedia = !!navigator.mediaDevices?.getUserMedia;
    const hasCapture = 'capture' in document.createElement('input');
    canScan = hasMedia || hasCapture;
  });

  async function openLens() {
    if (lensLoading) return;
    lensLoading = true;
    try {
      if (!Lens) Lens = (await import('./Lens.svelte')).default;
      lensOpen = true;
    } finally {
      lensLoading = false;
    }
  }

  function closeLens() {
    lensOpen = false;
    cameraButton?.focus();
  }

  function searchInstead(text: string) {
    closeLens();
    activeFilter = 'All';
    query = text;
    document.getElementById('recycle-search')?.focus();
  }

  const filteredItems = $derived(
    ITEMS.filter((item) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesCategory = activeFilter === 'All' || item.cat === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.cat.toLowerCase().includes(normalizedQuery) ||
        item.prep.toLowerCase().includes(normalizedQuery) ||
        item.where.toLowerCase().includes(normalizedQuery) ||
        (item.aliases?.some((a) => a.toLowerCase().includes(normalizedQuery)) ?? false);

      return matchesCategory && matchesQuery;
    }),
  );
</script>

<div class="search-wrap">
  <span class="search-icon" aria-hidden="true">🔍</span>
  <input
    class="search-input"
    type="search"
    id="recycle-search"
    placeholder="Search — pizza box, battery, old phone, motor oil..."
    aria-label="Search recyclable items"
    autocomplete="off"
    bind:value={query}
  />
  {#if canScan}
    <button
      class="search-wrap__camera"
      type="button"
      aria-label="Scan a barcode or photo"
      title="Scan a barcode or photo"
      aria-busy={lensLoading}
      bind:this={cameraButton}
      onclick={openLens}
    >📷</button>
  {/if}
</div>

{#if lensOpen && Lens}
  <Lens onclose={closeLens} onresult={searchInstead} />
{/if}

<div class="pill-group" id="recycle-pills" role="group" aria-label="Filter by category">
  {#each CATEGORIES as category}
    <button
      class="pill"
      class:is-active={activeFilter === category}
      data-filter={category}
      type="button"
      onclick={() => (activeFilter = category)}
    >
      {category}
    </button>
  {/each}
</div>

<div id="recyclopedia-results" class="recycle-grid" aria-live="polite" aria-label="Search results">
  {#if filteredItems.length === 0}
    <div class="empty-state"><p>No items found. Try a different search term or category.</p></div>
  {:else}
    {#each filteredItems as item (item.name)}
      <ItemCard {item} />
    {/each}
  {/if}
</div>
