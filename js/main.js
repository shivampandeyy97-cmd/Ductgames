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
  const saved = localStorage.getItem('dg_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dg_theme', next);
    const nav = document.getElementById('main-nav');
    if (nav && nav.classList.contains('mobile-open')) {
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

  // Attach events to each card
  grid.querySelectorAll('.game-card').forEach(card => {
    const gameId = card.dataset.id;
    const game = GAMES.find(g => g.id === gameId);

    // Click handler
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      if (url === '#coming-soon') showToast('🚀 Coming soon! Stay tuned.');
      else window.location.href = url;
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });

    // Hover: start canvas game preview
    if (game && !game.comingSoon) {
      const canvas = card.querySelector('.preview-canvas');
      if (canvas) {
        let previewAnim = null;

        card.addEventListener('mouseenter', () => {
          canvas.style.opacity = '1';
          previewAnim = startGamePreview(canvas, game.id);
        });

        card.addEventListener('mouseleave', () => {
          canvas.style.opacity = '0';
          if (previewAnim) { previewAnim.stop(); previewAnim = null; }
        });
      }
    }
  });
}

// ─── POKI-STYLE GAME CARD WITH CANVAS PREVIEW ──
function createGameCard(game) {
  const comingSoonBadge = game.comingSoon
    ? `<span class="game-card-coming-badge">Coming Soon</span>` : '';

  // Canvas preview only for real games
  const canvasPreview = !game.comingSoon
    ? `<canvas class="preview-canvas" width="320" height="200" aria-hidden="true"></canvas>` : '';

  return `<div class="game-card fade-in" data-url="${game.url}" data-id="${game.id}" role="button" tabindex="0" aria-label="Play ${game.title}">
    <div class="game-card-thumb-wrap">
      <div class="game-card-thumb-placeholder" style="background:${game.bg}">
        <span class="card-emoji">${game.emoji}</span>
      </div>
      ${canvasPreview}
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

// ═══════════════════════════════════════════════
// CANVAS GAMEPLAY PREVIEWS (Poki/CrazyGames style)
// Each game gets a looping animated mini-preview
// ═══════════════════════════════════════════════
function startGamePreview(canvas, gameId) {
  const ctx = canvas.getContext('2d');
  let running = true;
  let frame = 0;
  let animId;

  const W = canvas.width;
  const H = canvas.height;

  // Per-game state
  const state = buildPreviewState(gameId, W, H);

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    state.draw(ctx, frame, W, H);
    state.update(frame);
    frame++;
    animId = requestAnimationFrame(loop);
  }

  loop();

  return {
    stop() {
      running = false;
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, W, H);
    }
  };
}

function buildPreviewState(gameId, W, H) {
  switch (gameId) {
    case 'snake':    return snakePreview(W, H);
    case 'tictactoe': return tttPreview(W, H);
    case 'memory':   return memoryPreview(W, H);
    case '2048':     return preview2048(W, H);
    default:         return defaultPreview(W, H);
  }
}

// ─── SNAKE PREVIEW ─────────────────────────────
function snakePreview(W, H) {
  const CELL = 16;
  const COLS = Math.floor(W / CELL);
  const ROWS = Math.floor(H / CELL);

  // Auto-piloted snake path
  let snake = [];
  let food = { x: 12, y: 5 };
  let dir = 0; // 0=R,1=D,2=L,3=U
  let score = 0;
  let tick = 0;

  // Init snake in center
  for (let i = 5; i >= 0; i--) snake.push({ x: 4 + i, y: Math.floor(ROWS/2) });

  function smartMove() {
    const head = snake[0];
    const DIRS = [{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}];

    // Simple pathfinding: try to move toward food
    const dx = food.x - head.x;
    const dy = food.y - head.y;

    // Priority directions toward food
    let preferred = [];
    if (dx > 0) preferred.push(0);
    if (dx < 0) preferred.push(2);
    if (dy > 0) preferred.push(1);
    if (dy < 0) preferred.push(3);

    // Try preferred, then any safe direction
    const tryDirs = [...preferred, 0, 1, 2, 3];
    for (const d of tryDirs) {
      const opp = (d + 2) % 4;
      if (opp === dir && snake.length > 1) continue;
      const nx = head.x + DIRS[d].x;
      const ny = head.y + DIRS[d].y;
      if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
      if (snake.slice(0, -1).some(s => s.x === nx && s.y === ny)) continue;
      dir = d;
      return { x: nx, y: ny };
    }
    return { x: head.x + DIRS[dir].x, y: head.y + DIRS[dir].y };
  }

  function respawnFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  return {
    draw(ctx, frame) {
      // Dark bg
      ctx.fillStyle = '#0F0A1E';
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = 'rgba(108,60,225,0.08)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,H); ctx.stroke(); }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(W,y*CELL); ctx.stroke(); }

      // Food glow
      const fx = food.x * CELL + CELL/2, fy = food.y * CELL + CELL/2;
      const pulse = 0.6 + Math.sin(frame * 0.15) * 0.4;
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 12 * pulse;
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(fx, fy, CELL/2 - 2, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Snake
      snake.forEach((seg, i) => {
        const alpha = 1 - (i / snake.length) * 0.55;
        const x = seg.x * CELL, y = seg.y * CELL;
        ctx.fillStyle = i === 0 ? '#22C55E' : `rgba(22,163,74,${alpha})`;
        if (i === 0) { ctx.shadowColor = '#22C55E'; ctx.shadowBlur = 8; }
        ctx.beginPath();
        ctx.roundRect(x+1, y+1, CELL-2, CELL-2, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Score
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`Score: ${score}`, 8, 16);
    },
    update(frame) {
      if (frame % 5 !== 0) return; // Move every 5 frames (~8fps feel)
      tick++;
      const next = smartMove();

      // Wall wrap
      next.x = (next.x + COLS) % COLS;
      next.y = (next.y + ROWS) % ROWS;

      snake.unshift(next);

      if (next.x === food.x && next.y === food.y) {
        score += 10;
        respawnFood();
        if (snake.length > 18) snake.splice(14); // cap for aesthetics
      } else {
        snake.pop();
      }

      // Reset after long session
      if (tick > 200) {
        snake = [];
        for (let i = 5; i >= 0; i--) snake.push({ x: 4 + i, y: Math.floor(ROWS/2) });
        score = 0; tick = 0; dir = 0;
        respawnFood();
      }
    }
  };
}

// ─── TIC TAC TOE PREVIEW ───────────────────────
function tttPreview(W, H) {
  const MOVES = [
    { x:1,y:1,p:'X' }, { x:0,y:0,p:'O' }, { x:2,y:0,p:'X' },
    { x:0,y:2,p:'O' }, { x:1,y:0,p:'X' }, { x:1,y:2,p:'O' },
    { x:0,y:1,p:'X' },
  ];
  const CELL = Math.min(W, H) / 3.4;
  const OX = (W - CELL * 3) / 2;
  const OY = (H - CELL * 3) / 2;
  let moveIdx = 0;
  let board = Array(3).fill(null).map(() => Array(3).fill(null));
  let lastMoveFrame = -60;
  let phase = 'playing'; // playing | win | clear
  let clearFrame = -1;
  const WINNING = [[0,0,2,0],[0,1,2,1],[0,2,2,2],[0,0,0,2],[1,0,1,2],[2,0,2,2],[0,0,2,2],[2,0,0,2]];
  let winLine = null;

  return {
    draw(ctx, frame) {
      // Gradient bg
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#1A0845');
      grad.addColorStop(1, '#0C1A40');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = 'rgba(139,92,246,0.5)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(OX + i * CELL, OY + 4);
        ctx.lineTo(OX + i * CELL, OY + CELL * 3 - 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(OX + 4, OY + i * CELL);
        ctx.lineTo(OX + CELL * 3 - 4, OY + i * CELL);
        ctx.stroke();
      }

      // Draw placed pieces
      board.forEach((row, r) => row.forEach((cell, c) => {
        if (!cell) return;
        const cx = OX + c * CELL + CELL / 2;
        const cy = OY + r * CELL + CELL / 2;
        const sz = CELL * 0.32;
        if (cell === 'X') {
          ctx.strokeStyle = '#8B5CF6';
          ctx.shadowColor = '#8B5CF6';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 3.5;
          ctx.beginPath(); ctx.moveTo(cx-sz,cy-sz); ctx.lineTo(cx+sz,cy+sz); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx+sz,cy-sz); ctx.lineTo(cx-sz,cy+sz); ctx.stroke();
        } else {
          ctx.strokeStyle = '#22D1C8';
          ctx.shadowColor = '#22D1C8';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 3.5;
          ctx.beginPath(); ctx.arc(cx, cy, sz, 0, Math.PI*2); ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }));

      // Win line
      if (winLine) {
        const [r1,c1,r2,c2] = winLine;
        const x1 = OX + c1*CELL + CELL/2, y1 = OY + r1*CELL + CELL/2;
        const x2 = OX + c2*CELL + CELL/2, y2 = OY + r2*CELL + CELL/2;
        const prog = Math.min(1, (frame - clearFrame + 30) / 20);
        ctx.strokeStyle = '#F59E0B';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + (x2-x1)*prog, y1 + (y2-y1)*prog);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Status text
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      if (phase === 'win') ctx.fillText('🏆 Player Wins!', W/2, H - 12);
      else ctx.fillText('Tic Tac Toe', W/2, H - 12);
      ctx.textAlign = 'left';
    },
    update(frame) {
      if (phase === 'playing' && frame - lastMoveFrame > 35 && moveIdx < MOVES.length) {
        const m = MOVES[moveIdx];
        board[m.y][m.x] = m.p;
        moveIdx++;
        lastMoveFrame = frame;
        // Check win
        for (const [r1,c1,r2,c2] of WINNING) {
          const cells = board[r1][c1] && board[Math.floor((r1+r2)/2)]?.[Math.floor((c1+c2)/2)] && board[r2][c2];
          if (cells && board[r1][c1] === board[r2][c2] && board[r1][c1] === (Math.floor((r1+r2)/2) === r1 && Math.floor((c1+c2)/2) === c1 ? board[r1][c1] : board[r1][c1])) {
            // simplified check
          }
        }
        if (moveIdx === MOVES.length) { phase = 'win'; winLine = WINNING[4]; clearFrame = frame; }
      } else if (phase === 'win' && frame - clearFrame > 80) {
        // reset
        board = Array(3).fill(null).map(() => Array(3).fill(null));
        moveIdx = 0; winLine = null; phase = 'playing'; lastMoveFrame = frame;
      }
    }
  };
}

// ─── MEMORY MATCH PREVIEW ──────────────────────
function memoryPreview(W, H) {
  const EMOJIS = ['🌟','🎮','🔥','💎','🎯','🚀','🌈','🎪'];
  const COLS = 4, ROWS = 2;
  const PAD = 10;
  const CW = (W - PAD * (COLS+1)) / COLS;
  const CH = (H - PAD * (ROWS+1)) / ROWS;

  let cards = [];
  for (let i = 0; i < ROWS * COLS; i++) {
    const emoji = EMOJIS[i % EMOJIS.length];
    cards.push({ emoji, flipped: false, matched: false, flip: 0 });
  }
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  let flipQueue = [];
  let nextFlipFrame = 30;

  // Generate a sequence of flip pairs
  function buildFlipSequence() {
    const pairs = [];
    for (let i = 0; i < cards.length; i += 2) {
      pairs.push([i, i+1]);
    }
    // Shuffle pairs
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    pairs.forEach((p, idx) => {
      flipQueue.push({ at: 30 + idx * 50, idxA: p[0], idxB: p[1], match: true });
    });
  }
  buildFlipSequence();

  return {
    draw(ctx, frame) {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#2D0B5E');
      grad.addColorStop(1, '#0B1A4A');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      cards.forEach((card, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = PAD + col * (CW + PAD);
        const y = PAD + row * (CH + PAD);

        // Flip animation
        const scaleX = Math.cos(card.flip * Math.PI);
        const absScale = Math.abs(scaleX);

        ctx.save();
        ctx.translate(x + CW/2, y + CH/2);
        ctx.scale(absScale < 0.01 ? 0.01 : absScale, 1);

        if (card.flip < 0.5) {
          // Back face
          const bg = card.matched ? '#22C55E' : '#4C1D95';
          ctx.fillStyle = bg;
          ctx.shadowColor = card.matched ? '#22C55E' : '#6C3CE1';
          ctx.shadowBlur = card.matched ? 10 : 6;
          ctx.beginPath();
          ctx.roundRect(-CW/2, -CH/2, CW, CH, 8);
          ctx.fill();
          ctx.shadowBlur = 0;
          // Pattern on back
          if (!card.matched) {
            ctx.strokeStyle = 'rgba(139,92,246,0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(-CW/2+4, -CH/2+4, CW-8, CH-8, 5);
            ctx.stroke();
          }
        } else {
          // Front face
          ctx.fillStyle = '#1E1060';
          ctx.shadowColor = '#8B5CF6';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.roundRect(-CW/2, -CH/2, CW, CH, 8);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.font = `${Math.min(CW, CH) * 0.45}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(card.emoji, 0, 0);
        }

        ctx.restore();
      });

      // Title
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('Memory Match', W/2, H - 6);
      ctx.textAlign = 'left';
    },
    update(frame) {
      // Animate flips
      cards.forEach(c => {
        if (c.flipped || c.matched) {
          c.flip = Math.min(1, c.flip + 0.06);
        } else {
          c.flip = Math.max(0, c.flip - 0.06);
        }
      });

      if (flipQueue.length > 0 && frame >= flipQueue[0].at) {
        const action = flipQueue.shift();
        if (action.idxA < cards.length && action.idxB < cards.length) {
          cards[action.idxA].flipped = true;
          cards[action.idxB].flipped = true;
          setTimeout(() => {
            if (action.match) {
              cards[action.idxA].matched = true;
              cards[action.idxB].matched = true;
              cards[action.idxA].flipped = false;
              cards[action.idxB].flipped = false;
            }
          }, 600);
        }
      }

      // Reset when all matched
      if (cards.every(c => c.matched) && frame > 50) {
        setTimeout(() => {
          cards.forEach(c => { c.matched = false; c.flipped = false; c.flip = 0; });
          flipQueue = [];
          buildFlipSequence();
        }, 800);
      }
    }
  };
}

// ─── 2048 PREVIEW ──────────────────────────────
function preview2048(W, H) {
  const COLORS_2048 = {
    0: '#1a1040', 2: '#3B3072', 4: '#4C2E8A', 8: '#5B3A9E',
    16: '#6C3CE1', 32: '#7C50E8', 64: '#8B5CF6', 128: '#22D1C8',
    256: '#1BBDB5', 512: '#F59E0B', 1024: '#EF4444', 2048: '#F472B6',
  };

  // Nice-looking demo board that shows progression
  const BOARDS = [
    [[0,0,0,2],[0,0,2,4],[0,2,4,8],[2,4,8,16]],
    [[0,0,2,4],[0,2,4,8],[2,4,8,16],[4,8,16,32]],
    [[0,2,4,8],[2,4,8,16],[4,8,16,32],[8,16,32,64]],
    [[2,4,8,16],[4,8,16,32],[8,16,32,64],[16,32,64,128]],
    [[4,8,16,32],[8,16,32,64],[16,32,64,128],[32,64,128,256]],
    [[8,16,32,64],[16,32,64,128],[32,64,128,256],[64,128,256,512]],
  ];

  let boardIdx = 0;
  let board = BOARDS[0].map(r => [...r]);
  let transitioning = false;
  let transitionFrame = 0;

  const PAD = 8;
  const CELL = (Math.min(W, H) - PAD * 5) / 4;
  const OX = (W - (CELL * 4 + PAD * 3)) / 2;
  const OY = (H - (CELL * 4 + PAD * 3)) / 2;

  function drawBoard(ctx, b, alpha) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = b[r][c];
        const x = OX + c * (CELL + PAD);
        const y = OY + r * (CELL + PAD);
        const color = COLORS_2048[val] || '#F472B6';

        ctx.globalAlpha = alpha;
        ctx.fillStyle = val === 0 ? 'rgba(255,255,255,0.04)' : color;
        ctx.shadowColor = val > 0 ? color : 'transparent';
        ctx.shadowBlur = val > 64 ? 14 : val > 4 ? 8 : 0;
        ctx.beginPath();
        ctx.roundRect(x, y, CELL, CELL, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (val > 0) {
          ctx.fillStyle = val <= 4 ? 'rgba(255,255,255,0.7)' : '#fff';
          ctx.font = `bold ${CELL * (val >= 1024 ? 0.28 : val >= 128 ? 0.34 : 0.4)}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(val, x + CELL/2, y + CELL/2);
        }
      }
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  return {
    draw(ctx, frame) {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#1A1040');
      grad.addColorStop(1, '#0D0B20');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (transitioning) {
        const t = transitionFrame / 20;
        drawBoard(ctx, BOARDS[boardIdx === 0 ? BOARDS.length-1 : boardIdx-1], 1-t);
        drawBoard(ctx, board, t);
      } else {
        drawBoard(ctx, board, 1);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('2048', W/2, H - 6);
      ctx.textAlign = 'left';
    },
    update(frame) {
      if (frame % 60 === 0) {
        boardIdx = (boardIdx + 1) % BOARDS.length;
        board = BOARDS[boardIdx].map(r => [...r]);
        transitioning = true;
        transitionFrame = 0;
      }
      if (transitioning) {
        transitionFrame++;
        if (transitionFrame >= 20) transitioning = false;
      }
    }
  };
}

// ─── DEFAULT PREVIEW ───────────────────────────
function defaultPreview(W, H) {
  return {
    draw(ctx, frame) {
      ctx.fillStyle = '#1A1040';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎮 Preview', W/2, H/2);
    },
    update() {}
  };
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

// ─── INIT CATEGORY FROM URL ────────────────────
function initCatFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const tab = document.querySelector(`.cat-tab[data-filter="${cat}"]`);
    if (tab) {
      document.querySelectorAll('.cat-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderGamesGrid(cat);
    }
  }
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

// ═══════════════════════════════════════════════
// FEATURED HERO CARD CANVAS PREVIEWS (auto-start)
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initFeaturedPreviews();
});

function initFeaturedPreviews() {
  // TTT featured canvas
  const tttCanvas = document.getElementById('fhc-canvas-ttt');
  if (tttCanvas) {
    const state = tttPreview(tttCanvas.width, tttCanvas.height);
    let frame = 0;
    function loop() {
      const ctx = tttCanvas.getContext('2d');
      ctx.clearRect(0, 0, tttCanvas.width, tttCanvas.height);
      state.draw(ctx, frame, tttCanvas.width, tttCanvas.height);
      state.update(frame);
      frame++;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // Snake featured canvas
  const snakeCanvas = document.getElementById('fhc-canvas-snake');
  if (snakeCanvas) {
    const state = snakePreview(snakeCanvas.width, snakeCanvas.height);
    let frame = 0;
    function loop() {
      const ctx = snakeCanvas.getContext('2d');
      ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
      state.draw(ctx, frame, snakeCanvas.width, snakeCanvas.height);
      state.update(frame);
      frame++;
      requestAnimationFrame(loop);
    }
    loop();
  }
}
