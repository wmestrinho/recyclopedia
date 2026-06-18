(function () {
  'use strict';

  // Dataset now lives in js/recyclopedia-data.js so content can migrate without
  // dragging the render logic with it.
  // Each item keeps its flat fields (name/cat/status/prep/where/note) for
  // search + the legacy badge, and adds:
  //   gratitude_note — object-directed note shown on the card (AP voice)
  //   dispositions[] — ranked Gratitude Hierarchy rungs; one is_recommended "best"
  // See DATA_SCHEMA.md. Categories are the complete 11-stream taxonomy (no "Other").
  var ITEMS = window.RECYCLOPEDIA_ITEMS || [];

  var STATUS_CONFIG = {
    curbside: { label: '✓ Curbside',             cls: 'status-badge--curbside' },
    'drop-off': { label: '↗ Drop-off Only',       cls: 'status-badge--drop-off' },
    hazardous: { label: '⚠ Hazardous Waste',      cls: 'status-badge--hazardous' },
    no:        { label: '✕ Not Recyclable',        cls: 'status-badge--no' },
    compost:   { label: '⬡ Compost',              cls: 'status-badge--compost' },
    partial:   { label: '◑ Check Local',          cls: 'status-badge--partial' }
  };

  // Gratitude Hierarchy — canonical order + display badges (see ENVIRONMENTAL_RESPECT_POLICY.md)
  var RUNG_ORDER = { reuse: 1, repair: 2, repurpose: 3, donate: 4, recycle: 5, compost: 6, dispose: 7 };
  var RUNG_BADGE = {
    reuse: '↻ Reuse', repair: '✎ Repair', repurpose: '✦ Repurpose', donate: '♡ Donate',
    recycle: '♺ Recycle', compost: '⬡ Compost', dispose: '⊘ Dispose'
  };

  var CATEGORIES = ['All', 'Metal', 'Plastic', 'Paper', 'Glass', 'Electronics', 'Batteries', 'Hazardous', 'Textiles', 'Organics', 'Rubber', 'Bulky Goods'];

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function byRung(a, b) {
    return (RUNG_ORDER[a.rung] || 99) - (RUNG_ORDER[b.rung] || 99);
  }

  // Highest available rung wins: curator's is_recommended ("best") if set, else lowest rank.
  function bestDisposition(dispositions) {
    if (!dispositions || !dispositions.length) return null;
    var recommended = dispositions.filter(function (d) { return d.best; })[0];
    return recommended || dispositions.slice().sort(byRung)[0];
  }

  function rungText(d) {
    return (RUNG_BADGE[d.rung] || d.rung) + ' ' + d.label + (d.local ? ' (check local)' : '');
  }

  function makeCard(item) {
    var st = STATUS_CONFIG[item.status] || STATUS_CONFIG.no;
    var dispositions = (item.dispositions || []).slice().sort(byRung);
    var best = bestDisposition(item.dispositions);
    var others = dispositions.filter(function (d) { return d !== best; });

    var parts = [
      '<article class="recycle-card">',
        '<div>',
          '<p class="recycle-card__cat">' + escHtml(item.cat) + '</p>',
          '<h3 class="recycle-card__name">' + escHtml(item.name) + '</h3>',
        '</div>',
        '<span class="status-badge ' + st.cls + '">' + st.label + '</span>'
    ];

    if (item.gratitude_note) {
      parts.push('<p class="recycle-card__gratitude">' + escHtml(item.gratitude_note) + '</p>');
    }

    if (best) {
      parts.push(
        '<p class="recycle-card__best">' +
          '<span class="recycle-card__best-label">Best path</span> ' +
          '<span class="recycle-card__best-val">' + escHtml(rungText(best)) + '</span>' +
        '</p>'
      );
    }

    parts.push(
      '<div class="recycle-card__detail">',
        '<div class="recycle-card__row"><span class="recycle-card__row-label">Prep</span><span class="recycle-card__row-val">' + escHtml(item.prep) + '</span></div>',
        '<div class="recycle-card__row"><span class="recycle-card__row-label">Where</span><span class="recycle-card__row-val">' + escHtml(item.where) + '</span></div>',
      '</div>'
    );

    if (others.length) {
      parts.push('<details class="recycle-card__paths"><summary>Other respectful paths</summary>');
      others.forEach(function (d) {
        parts.push('<p class="recycle-card__rung">' + escHtml(rungText(d)) + '</p>');
      });
      parts.push('</details>');
    }

    parts.push('<p class="recycle-card__note">' + escHtml(item.note) + '</p>');
    parts.push('</article>');
    return parts.join('');
  }

  function renderItems(items, container) {
    if (!items.length) {
      container.innerHTML = '<div class="empty-state"><p>No items found. Try a different search term or category.</p></div>';
      return;
    }
    container.innerHTML = items.map(makeCard).join('');
  }

  function initRecyclopedia() {
    var searchEl = document.getElementById('recycle-search');
    var resultsEl = document.getElementById('recyclopedia-results');
    var pillsEl = document.getElementById('recycle-pills');
    if (!searchEl || !resultsEl || !pillsEl) return;

    var activeFilter = 'All';

    // Build filter pills
    pillsEl.innerHTML = CATEGORIES.map(function (cat) {
      return '<button class="pill' + (cat === 'All' ? ' is-active' : '') + '" data-filter="' + escHtml(cat) + '">' + escHtml(cat) + '</button>';
    }).join('');

    function getFiltered() {
      var q = searchEl.value.trim().toLowerCase();
      return ITEMS.filter(function (item) {
        var matchesCat = activeFilter === 'All' || item.cat === activeFilter;
        var matchesQ = !q || item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q) || item.prep.toLowerCase().includes(q) || item.where.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      });
    }

    function update() {
      renderItems(getFiltered(), resultsEl);
    }

    pillsEl.addEventListener('click', function (e) {
      var pill = e.target.closest('.pill');
      if (!pill) return;
      activeFilter = pill.dataset.filter;
      pillsEl.querySelectorAll('.pill').forEach(function (p) {
        p.classList.toggle('is-active', p.dataset.filter === activeFilter);
      });
      update();
    });

    searchEl.addEventListener('input', update);

    // Initial render
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecyclopedia);
  } else {
    initRecyclopedia();
  }
})();

