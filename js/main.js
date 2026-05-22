/* =============================================
   DUCTGAMES — Main JavaScript
   ============================================= */

'use strict';

// ─── GAMES DATA ────────────────────────────────
const GAMES = [
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    category: 'Puzzle',
    emoji: '✕',
    bg: 'linear-gradient(135deg, #6C3CE1, #22D1C8)',
    bgAccent: '#6C3CE1',
    description: 'Classic 3×3 strategy game. Play against the computer!',
    tags: ['puzzle', 'strategy', 'classic'],
    url: 'games/tictactoe/index.html',
    hot: true,
    free: true,
  },
  {
    id: 'snake',
    title: 'Snake',
    category: 'Arcade',
    emoji: '🐍',
    bg: 'linear-gradient(135deg, #22C55E, #065F46)',
    bgAccent: '#22C55E',
    description: 'Eat, grow, and avoid hitting the walls!',
    tags: ['arcade', 'retro', 'casual'],
    url: 'games/snake/index.html',
    hot: true,
    free: true,
  },
  {
    id: 'memory',
    title: 'Memory Match',
    category: 'Puzzle',
    emoji: '🃏',
    bg: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    bgAccent: '#8B5CF6',
    description: 'Test your memory with card matching pairs.',
    tags: ['puzzle', 'memory', 'cards'],
    url: 'games/memory/index.html',
    free: true,
  },
  {
    id: '2048',
    title: '2048',
    category: 'Puzzle',
    emoji: '🔢',
    bg: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    bgAccent: '#F59E0B',
    description: 'Slide tiles and combine numbers to reach 2048!',
    tags: ['puzzle', 'numbers', 'casual'],
    url: 'games/2048/index.html',
    free: true,
  },
  {
    id: 'coming_breakout',
    title: 'Brick Breaker',
    category: 'Arcade',
    emoji: '🧱',
    bg: 'linear-gradient(135deg, #F472B6, #EF4444)',
    bgAccent: '#F472B6',
    description: 'Break all the bricks with your paddle!',
    tags: ['arcade', 'action', 'retro'],
    url: '#coming-soon',
    free: true,
    comingSoon: true,
  },
  {
    id: 'coming_sudoku',
    title: 'Sudoku',
    category: 'Puzzle',
    emoji: '🔣',
    bg: 'linear-gradient(135deg, #0EA5E9, #6C3CE1)',
    bgAccent: '#0EA5E9',
    description: 'Fill the grid with numbers 1–9, no repeats.',
    tags: ['puzzle', 'numbers', 'logic'],
    url: '#coming-soon',
    free: true,
    comingSoon: true,
  },
  {
    id: 'coming_flappy',
    title: 'Flappy Bird',
    category: 'Arcade',
    emoji: '🐦',
    bg: 'linear-gradient(135deg, #84CC16, #0EA5E9)',
    bgAccent: '#84CC16',
    description: 'Tap to fly through the pipes!',
    tags: ['arcade', 'casual', 'endless'],
    url: '#coming-soon',
    free: true,
    comingSoon: true,
  },
  {
    id: 'coming_chess',
    title: 'Chess',
    category: 'Strategy',
    emoji: '♟️',
    bg: 'linear-gradient(135deg, #1F2937, #6B7280)',
    bgAccent: '#6B7280',
    description: 'The royal game — play against AI!',
    tags: ['strategy', 'board', 'classic'],
    url: '#coming-soon',
    free: true,
    comingSoon: true,
  },
];

// ─── DOM READY ─────────────────────────────────
window._ALL_GAMES = GAMES;

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSearch();
  initCookieBanner();
  initCategoryFilter();
  initMobileMenu();
  renderGamesGrid();
  initCatFromURL();
});

// ─── DARK / LIGHT MODE TOGGLE ──────────────────
function initThemeToggle() {
  // Apply saved theme immediately (before render)
  const saved = localStorage.getItem('dg_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dg_theme', next);
    // Update mobile menu bg if open
    const nav = document.getElementById('main-nav');
    if (nav && nav.style.display === 'flex') {
      nav.style.background = next === 'dark' ? '#1A1535' : '#ffffff';
    }
  });
}

// ─── RENDER GAMES GRID ─────────────────────────
function renderGamesGrid(filter = 'all', query = '') {
  const grid = document.getElementById('games-grid');
  if (!grid) return;

  let games = [...GAMES];

  if (filter && filter !== 'all') {
    games = games.filter(g => g.category.toLowerCase() === filter.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    games = games.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.tags.some(t => t.includes(q))
    );
  }

  if (games.length === 0) {
    grid.innerHTML = `<div class="no-results" style="grid-column:1/-1">
      <div class="icon">🎮</div>
      <h3>No games found</h3>
      <p>Try a different search or browse all categories.</p>
    </div>`;
    return;
  }

  grid.innerHTML = games.map(g => createGameCard(g)).join('');

  // Attach click events
  grid.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      if (url === '#coming-soon') {
        showToast('🚀 Coming soon! Stay tuned.');
      } else {
        window.location.href = url;
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// ─── POKI-STYLE GAME CARD ──────────────────────
function createGameCard(game) {
  const comingSoonBadge = game.comingSoon
    ? `<span class="game-card-coming-badge">Coming Soon</span>`
    : '';

  return `<div class="game-card fade-in" data-url="${game.url}" data-id="${game.id}" role="button" tabindex="0" aria-label="Play ${game.title}">
    <div class="game-card-thumb-wrap">
      <div class="game-card-thumb-placeholder" style="background:${game.bg}">
        <span>${game.emoji}</span>
      </div>
      <div class="game-card-play-overlay">
        <div class="game-card-play-btn" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
      ${comingSoonBadge}
    </div>
    <div class="game-card-body">
      <div class="game-card-title">${game.title}</div>
      <div class="game-card-cat">${game.category}</div>
      <div class="game-card-meta">
        ${game.free ? '<span class="game-badge free">Free</span>' : ''}
        ${game.hot ? '<span class="game-badge hot">🔥 Hot</span>' : ''}
      </div>
    </div>
  </div>`;
}

// ─── INIT CATEGORY FROM URL ────────────────────
function initCatFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const tab = document.querySelector(`.cat-tab[data-filter="${cat}"]`);
    if (tab) {
      document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderGamesGrid(cat);
    }
  }
}

// ─── SEARCH ────────────────────────────────────
function initSearch() {
  const headerInput = document.getElementById('header-search-input');
  if (headerInput) {
    headerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = headerInput.value.trim();
        if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  const heroForm = document.getElementById('hero-search-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('hero-search-input');
      const q = input?.value.trim();
      if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    });
  }

  if (document.getElementById('search-results-grid')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const searchInput = document.getElementById('search-page-input');
    if (searchInput) searchInput.value = q;
    const banner = document.getElementById('search-query-banner');
    if (banner && q) banner.innerHTML = `Showing results for <strong>"${escapeHtml(q)}"</strong>`;
    runSearchPageResults(q);
  }
}

function runSearchPageResults(q) {
  const grid = document.getElementById('search-results-grid');
  if (!grid) return;
  let games = q
    ? GAMES.filter(g =>
        g.title.toLowerCase().includes(q.toLowerCase()) ||
        g.category.toLowerCase().includes(q.toLowerCase()) ||
        g.tags.some(t => t.includes(q.toLowerCase()))
      )
    : GAMES;

  if (games.length === 0) {
    grid.innerHTML = `<div class="no-results" style="grid-column:1/-1">
      <div class="icon">🔍</div>
      <h3>No results for "${escapeHtml(q)}"</h3>
      <p>Try searching for Puzzle, Arcade, Snake, Chess, or Tic Tac Toe.</p>
    </div>`;
    return;
  }

  grid.innerHTML = games.map(g => createGameCard(g)).join('');
  grid.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      if (url === '#coming-soon') showToast('🚀 Coming soon! Stay tuned.');
      else window.location.href = url;
    });
  });
}

// ─── CATEGORY FILTER ───────────────────────────
function initCategoryFilter() {
  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderGamesGrid(tab.dataset.filter);
    });
  });
}

// ─── COOKIE BANNER ─────────────────────────────
function initCookieBanner() {
  if (localStorage.getItem('dg_cookie_consent') === 'true') return;
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'flex';
  const btn = document.getElementById('cookie-accept-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.setItem('dg_cookie_consent', 'true');
      banner.style.animation = 'none';
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.3s';
      setTimeout(() => banner.remove(), 350);
    });
  }
}

// ─── MOBILE MENU ───────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.contains('mobile-open');
    if (open) {
      nav.classList.remove('mobile-open');
      nav.style.display = '';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      nav.classList.add('mobile-open');
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.left = '0';
      nav.style.right = '0';
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      nav.style.background = isDark ? '#1A1535' : '#ffffff';
      nav.style.padding = '12px 24px';
      nav.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      nav.style.zIndex = '99';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('mobile-open');
      nav.style.display = '';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── TOAST ─────────────────────────────────────
function showToast(msg) {
  const existing = document.querySelector('.dg-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'dg-toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
    background:#1A1040; color:#fff; padding:12px 24px; border-radius:50px;
    font-size:0.9rem; font-weight:600; z-index:2000;
    box-shadow:0 4px 16px rgba(0,0,0,0.2);
    animation:slideUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; }, 2200);
  setTimeout(() => toast.remove(), 2600);
}

// ─── UTILS ─────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
