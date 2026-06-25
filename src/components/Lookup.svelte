<script lang="ts">
  import {
    CATEGORIES,
    ITEMS,
    RUNG_BADGE,
    RUNG_ORDER,
    type Disposition,
    type Status,
  } from '../data/items';

  let query = $state('');
  let activeFilter = $state('All');

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
</div>

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
      {@const status = STATUS_CONFIG[item.status]}
      {@const best = bestDisposition(item.dispositions)}
      {@const others = [...item.dispositions].sort(byRank).filter((disposition) => disposition !== best)}

      <article class="recycle-card">
        <div>
          <p class="recycle-card__cat">{item.cat}</p>
          <h3 class="recycle-card__name">{item.name}</h3>
        </div>
        <span class={`status-badge ${status.cls}`}>{status.label}</span>

        {#if item.gratitude_note}
          <p class="recycle-card__gratitude">{item.gratitude_note}</p>
        {/if}

        {#if best}
          <p class="recycle-card__best">
            <span class="recycle-card__best-label">Best path</span>
            <span class="recycle-card__best-val">{rungText(best)}</span>
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
              <p class="recycle-card__rung">{rungText(disposition)}</p>
            {/each}
          </details>
        {/if}

        <p class="recycle-card__note">{item.note}</p>
      </article>
    {/each}
  {/if}
</div>
