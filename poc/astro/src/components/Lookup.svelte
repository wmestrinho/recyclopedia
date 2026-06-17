<script lang="ts">
  // Interactive "island" — the Lookup, mirroring the live site's behavior on the
  // ranked-disposition data. Svelte 5 runes.
  import {
    ITEMS, CATEGORIES, RUNG_ORDER, RUNG_BADGE,
    type Disposition,
  } from '../data/items';

  let query = $state('');
  let activeCat = $state<string>('All');

  const byRung = (a: Disposition, b: Disposition) =>
    (RUNG_ORDER[a.rung] ?? 99) - (RUNG_ORDER[b.rung] ?? 99);

  function best(ds: Disposition[]): Disposition {
    return ds.find((d) => d.best) ?? [...ds].sort(byRung)[0];
  }
  function rungText(d: Disposition): string {
    return `${RUNG_BADGE[d.rung]} ${d.label}${d.local ? ' (check local)' : ''}`;
  }

  const filtered = $derived(
    ITEMS.filter((it) => {
      const q = query.trim().toLowerCase();
      const matchesCat = activeCat === 'All' || it.cat === activeCat;
      const matchesQ =
        !q ||
        it.name.toLowerCase().includes(q) ||
        it.cat.toLowerCase().includes(q) ||
        it.prep.toLowerCase().includes(q) ||
        it.where.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    }),
  );
</script>

<div class="lookup">
  <input
    class="lookup__search"
    type="search"
    placeholder="Search an item — “smartphone”, “tires”, “jar”…"
    bind:value={query}
    aria-label="Search the Recyclopedia"
  />

  <div class="lookup__pills">
    {#each CATEGORIES as cat}
      <button
        class="pill"
        class:is-active={activeCat === cat}
        onclick={() => (activeCat = cat)}
      >{cat}</button>
    {/each}
  </div>

  {#if filtered.length === 0}
    <p class="lookup__empty">No items found. Try a different search term or category.</p>
  {:else}
    <div class="lookup__grid">
      {#each filtered as item (item.name)}
        {@const top = best(item.dispositions)}
        {@const others = [...item.dispositions].sort(byRung).filter((d) => d !== top)}
        <article class="card">
          <p class="card__cat">{item.cat}</p>
          <h3 class="card__name">{item.name}</h3>
          <p class="card__gratitude">{item.gratitude_note}</p>
          <p class="card__best">
            <span class="card__best-label">Best path</span>
            <span class="card__best-val">{rungText(top)}</span>
          </p>
          <div class="card__rows">
            <div class="card__row"><span class="card__k">Prep</span><span>{item.prep}</span></div>
            <div class="card__row"><span class="card__k">Where</span><span>{item.where}</span></div>
          </div>
          {#if others.length}
            <details class="card__paths">
              <summary>Other respectful paths</summary>
              {#each others as d}
                <p class="card__rung">{rungText(d)}</p>
              {/each}
            </details>
          {/if}
          <p class="card__note">{item.note}</p>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style>
  .lookup__search {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font: inherit;
    margin-bottom: 0.9rem;
  }
  .lookup__pills { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.2rem; }
  .pill {
    padding: 0.35rem 0.8rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--muted);
    font: inherit;
    font-size: 0.74rem;
    cursor: pointer;
  }
  .pill.is-active { background: var(--accent); border-color: var(--accent); color: #fff; }
  .lookup__empty { color: var(--muted); text-align: center; padding: 2rem; }
  .lookup__grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.1rem;
    display: grid;
    gap: 0.6rem;
  }
  .card__cat { margin: 0; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .card__name { margin: 0; font-size: 1rem; }
  .card__gratitude {
    margin: 0; padding: 0.6rem 0.7rem;
    background: var(--accent-bg); border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius) var(--radius) 0;
    font-size: 0.8rem; line-height: 1.5; color: var(--accent-deep);
  }
  .card__best { margin: 0; font-size: 0.82rem; }
  .card__best-label {
    font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-right: 0.35rem;
  }
  .card__best-val { color: var(--accent-mid); }
  .card__rows { display: grid; gap: 0.35rem; }
  .card__row { display: grid; grid-template-columns: 48px 1fr; gap: 0.5rem; font-size: 0.78rem; }
  .card__k { color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; font-size: 0.6rem; padding-top: 0.15rem; }
  .card__paths { border-top: 1px solid var(--border); padding-top: 0.5rem; }
  .card__paths > summary {
    cursor: pointer; list-style: none;
    font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-mid);
  }
  .card__paths > summary::-webkit-details-marker { display: none; }
  .card__rung { margin: 0.3rem 0 0; font-size: 0.76rem; }
  .card__note { margin: 0; font-size: 0.75rem; color: var(--muted); border-top: 1px solid var(--border); padding-top: 0.55rem; line-height: 1.5; }
</style>
