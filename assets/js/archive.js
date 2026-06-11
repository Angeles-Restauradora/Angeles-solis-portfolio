/**
 * archive.js — Filter logic for complete-archive.html
 *
 * Filter buttons set aria-pressed="true" and show/hide project cards
 * via data-category attribute matching.
 */
(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card[data-category]');
  const countEl    = document.getElementById('archive-count');

  if (!filterBtns.length || !cards.length) return;

  function updateCount(visible) {
    if (countEl) {
      countEl.textContent = visible + ' project' + (visible !== 1 ? 's' : '');
    }
  }

  function applyFilter(category) {
    let visibleCount = 0;

    cards.forEach(function (card) {
      const cats = card.dataset.category.split(',').map(s => s.trim());
      const show = category === 'all' || cats.includes(category);
      if (show) {
        card.removeAttribute('data-hidden');
        visibleCount++;
      } else {
        card.setAttribute('data-hidden', '');
      }
    });

    updateCount(visibleCount);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Toggle the pressed state */
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');

      const category = btn.dataset.filter || 'all';
      applyFilter(category);
    });
  });

  /* Initialise with all visible */
  updateCount(cards.length);

  /* Keyboard: Enter/Space already handled by browser for button elements */

})();
