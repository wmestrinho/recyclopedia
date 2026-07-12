<script lang="ts">
  import {
    AUTHORITY_LABELS,
    CATEGORY_LABELS,
    ORGANIZATIONS,
    REGION_LABELS,
    type DirectoryCategory,
    type Organization,
    type Region,
  } from '../data/organizations';

  let query = $state('');
  let activeCategory = $state<'All' | DirectoryCategory>('All');
  let activeRegion = $state<'All' | Region>('All');
  let activeTag = $state('');
  let verifiedOnly = $state(false);

  const categories = ['All', ...Object.keys(CATEGORY_LABELS)] as ('All' | DirectoryCategory)[];
  const regions = ['All', ...Object.keys(REGION_LABELS)] as ('All' | Region)[];

  const tagCounts = new Map<string, number>();
  for (const org of ORGANIZATIONS) {
    for (const tag of org.focus_tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  const tags = [...tagCounts.entries()]
    .filter(([, count]) => count >= 3)
    .map(([tag]) => tag)
    .sort();

  const VERIFICATION_CONFIG: Record<
    Organization['verification_status'],
    { label: string; cls: string; order: number }
  > = {
    'verified-official': { label: '✓ Verified official', cls: 'dir-badge--verified', order: 0 },
    'needs-review': { label: '⚠ Needs review', cls: 'dir-badge--review', order: 1 },
    'community-submitted': { label: '◌ Community submitted', cls: 'dir-badge--community', order: 2 },
    archived: { label: '▤ Archived', cls: 'dir-badge--archived', order: 3 },
  };

  function hostname(url: string) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  const filtered = $derived(
    ORGANIZATIONS.filter((org) => {
      const q = query.trim().toLowerCase();
      return (
        (activeCategory === 'All' || org.category === activeCategory) &&
        (activeRegion === 'All' || org.region === activeRegion) &&
        (!activeTag || org.focus_tags.includes(activeTag)) &&
        (!verifiedOnly || org.verification_status === 'verified-official') &&
        (!q ||
          org.name.toLowerCase().includes(q) ||
          org.geography.toLowerCase().includes(q) ||
          org.focus_tags.some((tag) => tag.includes(q)) ||
          (org.notes?.toLowerCase().includes(q) ?? false))
      );
    }).sort(
      (a, b) =>
        VERIFICATION_CONFIG[a.verification_status].order -
        VERIFICATION_CONFIG[b.verification_status].order,
    ),
  );
</script>

<div class="dir-controls">
  <div class="search-wrap">
    <span class="search-icon" aria-hidden="true">🔍</span>
    <input
      class="search-input"
      type="search"
      id="directory-search"
      placeholder="Search — Basel, e-waste, Brazil, repair, Eco-Schools..."
      aria-label="Search the source directory"
      autocomplete="off"
      bind:value={query}
    />
  </div>

  <div class="pill-group" role="group" aria-label="Filter by category">
    {#each categories as category}
      <button
        class="pill"
        class:is-active={activeCategory === category}
        type="button"
        onclick={() => (activeCategory = category)}
      >
        {category === 'All' ? 'All' : CATEGORY_LABELS[category]}
      </button>
    {/each}
  </div>

  <div class="dir-row">
    <label class="dir-select">
      <span>Region</span>
      <select bind:value={activeRegion} aria-label="Filter by region">
        {#each regions as region}
          <option value={region}>{region === 'All' ? 'All regions' : REGION_LABELS[region]}</option>
        {/each}
      </select>
    </label>

    <label class="dir-toggle">
      <input type="checkbox" bind:checked={verifiedOnly} />
      <span>Verified official only</span>
    </label>

    <p class="dir-count" aria-live="polite">
      {filtered.length} of {ORGANIZATIONS.length} sources
    </p>
  </div>

  <div class="dir-tags" role="group" aria-label="Filter by focus tag">
    <button class="dir-tag" class:is-active={activeTag === ''} type="button" onclick={() => (activeTag = '')}>
      all tags
    </button>
    {#each tags as tag}
      <button
        class="dir-tag"
        class:is-active={activeTag === tag}
        type="button"
        onclick={() => (activeTag = activeTag === tag ? '' : tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
</div>

<div class="dir-grid" aria-live="polite" aria-label="Directory results">
  {#if filtered.length === 0}
    <div class="dir-empty"><p>No sources found. Try a different search term or clear a filter.</p></div>
  {:else}
    {#each filtered as org (org.id)}
      {@const verification = VERIFICATION_CONFIG[org.verification_status]}
      <article class="dir-card" class:dir-card--review={org.verification_status !== 'verified-official'}>
        <div class="dir-card__head">
          <p class="dir-card__cat">{CATEGORY_LABELS[org.category]}</p>
          <span class={`dir-badge ${verification.cls}`}>{verification.label}</span>
        </div>
        <h3 class="dir-card__name">{org.name}</h3>
        <p class="dir-card__meta">
          <span>{org.geography}</span>
          <span aria-hidden="true">·</span>
          <span>{AUTHORITY_LABELS[org.authority_level]}</span>
          {#if org.data_available}
            <span aria-hidden="true">·</span>
            <span class="dir-card__data">⌗ Data available</span>
          {/if}
        </p>
        {#if org.notes}
          <p class="dir-card__note">{org.notes}</p>
        {/if}
        <div class="dir-card__tags">
          {#each org.focus_tags as tag}
            <button class="dir-tag dir-tag--sm" type="button" onclick={() => (activeTag = tag)}>
              {tag}
            </button>
          {/each}
        </div>
        <a class="dir-card__link" href={org.url} target="_blank" rel="noopener noreferrer">
          {hostname(org.url)} ↗
        </a>
      </article>
    {/each}
  {/if}
</div>

<style>
  .dir-controls {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .dir-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 1.5rem;
  }
  .dir-select {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--muted, #77705f);
  }
  .dir-select select {
    font: inherit;
    color: var(--text, #26241e);
    background: var(--surface, #fcfaf4);
    border: 1px solid var(--border, #d8d0bc);
    border-radius: var(--radius, 10px);
    padding: 0.4rem 0.6rem;
  }
  .dir-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.9rem;
    color: var(--muted, #77705f);
    cursor: pointer;
  }
  .dir-toggle input {
    accent-color: var(--accent, #6b9a3a);
  }
  .dir-count {
    margin: 0 0 0 auto;
    font-size: 0.85rem;
    color: var(--muted, #77705f);
  }
  .dir-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .dir-tag {
    font: inherit;
    font-size: 0.78rem;
    color: var(--muted, #77705f);
    background: var(--surface-alt, #f4efe4);
    border: 1px solid var(--line, #e4ddcc);
    border-radius: 999px;
    padding: 0.2rem 0.65rem;
    cursor: pointer;
  }
  .dir-tag:hover {
    border-color: var(--accent, #6b9a3a);
    color: var(--text, #26241e);
  }
  .dir-tag.is-active {
    background: var(--accent, #6b9a3a);
    border-color: var(--accent, #6b9a3a);
    color: #fff;
  }
  .dir-tag--sm {
    font-size: 0.72rem;
    padding: 0.12rem 0.5rem;
  }

  .dir-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 1rem;
  }
  .dir-empty {
    grid-column: 1 / -1;
    text-align: center;
    color: var(--muted, #77705f);
    padding: 3rem 1rem;
  }
  .dir-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--surface, #fcfaf4);
    border: 1px solid var(--border, #d8d0bc);
    border-radius: var(--radius-lg, 16px);
    padding: 1.1rem 1.2rem;
  }
  .dir-card--review {
    border-style: dashed;
  }
  .dir-card__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }
  .dir-card__cat {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted, #77705f);
  }
  .dir-badge {
    flex-shrink: 0;
    font-size: 0.72rem;
    border-radius: 999px;
    padding: 0.15rem 0.55rem;
    white-space: nowrap;
  }
  .dir-badge--verified {
    color: var(--status-yes, #2e5e1e);
    background: var(--status-yes-bg, #e4eed6);
  }
  .dir-badge--review {
    color: var(--status-partial, #8a5a17);
    background: var(--status-partial-bg, #f6ead0);
  }
  .dir-badge--community {
    color: var(--muted, #77705f);
    background: var(--surface-alt, #f4efe4);
  }
  .dir-badge--archived {
    color: var(--muted, #77705f);
    background: var(--surface-soft, #e7e0cf);
    text-decoration: line-through;
  }
  .dir-card__name {
    margin: 0;
    font-family: var(--font-display, 'Newsreader', serif);
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.25;
  }
  .dir-card__meta {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted, #77705f);
  }
  .dir-card__data {
    color: var(--accent-deep, #4c7325);
    font-weight: 600;
  }
  .dir-card__note {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.45;
  }
  .dir-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .dir-card__link {
    margin-top: auto;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-deep, #4c7325);
    text-decoration: none;
    word-break: break-all;
  }
  .dir-card__link:hover {
    text-decoration: underline;
  }
</style>
