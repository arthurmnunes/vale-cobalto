/* Vale Cobalto - arte em pixel gerada por código (sem imagens externas) */
window.VC = window.VC || {};

(function () {
  const art = {};
  VC.art = art;

  // Gerador pseudoaleatório determinístico (a arte sai sempre igual)
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function canvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return [c, ctx];
  }

  function R(ctx, color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w || 1, h || 1);
  }

  // Desenha um template de texto (cada caractere = 1 pixel)
  function drawTemplate(ctx, rows, pal, ox, oy, flip) {
    rows.forEach((row, y) => {
      const r = row.padEnd(16, '.');
      for (let x = 0; x < r.length; x++) {
        const ch = r[x];
        if (ch === '.' || ch === ' ') continue;
        const col = pal[ch];
        if (!col) continue;
        const px = flip ? (r.length - 1 - x) : x;
        R(ctx, col, ox + px, oy + y);
      }
    });
  }

  /* ---------------- Personagens ---------------- */
  const BODY = {
    down: [
      '................',
      '.....kkkkkk.....',
      '....khhhhhhk....',
      '...khhhhhhhhk...',
      '...khsssssshk...',
      '...kssessessk...',
      '...kssssssssk...',
      '....kssmmssk....',
      '...kcccaaccck...',
      '..kcccccccccck..',
      '..ksccccccccsk..',
      '...kcccccccck...',
      '....kppppppk....',
      '....kppkkppk....',
      '....kffk.kffk...',
      '................'
    ],
    up: [
      '................',
      '.....kkkkkk.....',
      '....khhhhhhk....',
      '...khhhhhhhhk...',
      '...khhhhhhhhk...',
      '...khhhhhhhhk...',
      '...khhhhhhhhk...',
      '....khhhhhhk....',
      '...kcccccccck...',
      '..kcccccccccck..',
      '..ksccccccccsk..',
      '...kcccccccck...',
      '....kppppppk....',
      '....kppkkppk....',
      '....kffk.kffk...',
      '................'
    ],
    side: [
      '................',
      '.....kkkkkk.....',
      '....khhhhhhk....',
      '...khhhhhhhhk...',
      '...khhhhsssk....',
      '...khhhssesk....',
      '...khhsssssk....',
      '....khssssk.....',
      '....kcccaak.....',
      '....kcccccck....',
      '....kccccsk.....',
      '....kcccccck....',
      '....kpppppk.....',
      '....kppkppk.....',
      '....kffkffk.....',
      '................'
    ]
  };

  // Pernas alternadas para o segundo quadro da caminhada
  const LEGS_B = {
    down: ['....kppppppk....', '....kpk..kppk...', '....kfk...kffk..'],
    up: ['....kppppppk....', '...kppk..kpk....', '..kffk...kfk....'],
    side: ['....kpppppk.....', '...kppk.kpk.....', '...kffk.kffk....']
  };

  art.PALETTES = {
    player: { h: '#3b2a20', c: '#3a6fb0', a: '#f2b84b', p: '#2c3e63', f: '#4a3426' },
    player_epi: { h: '#3b2a20', c: '#eef2f5', a: '#4fb3a0', p: '#2c3e63', f: '#4a3426', e: '#2c6e9e' },
    prefeita: { s: '#c68a5a', h: '#2a1a12', c: '#7b4fa0', a: '#f2b84b', p: '#5a3a7a', f: '#2a1a12' },
    bento: { s: '#e0ac7a', h: '#a7a7a7', c: '#8a5a32', a: '#e7d7b7', p: '#3b3b3b', f: '#2b2b2b' },
    lia: { s: '#8d5a3b', h: '#1d1d1d', c: '#4fb3a0', a: '#ffffff', p: '#2f4f6f', f: '#1d1d1d' },
    rival: { s: '#f3d0a8', h: '#e4dccb', c: '#22252f', a: '#d9534f', p: '#22252f', f: '#0e0f14' }
  };

  const BASE_PAL = { k: '#1b1f2e', s: '#f1c27d', e: '#1b1f2e', m: '#c0705a' };

  // Folha com 6 quadros: d0 d1 u0 u1 s0 s1
  art.characterSheet = function (key) {
    const pal = Object.assign({}, BASE_PAL, art.PALETTES[key]);
    const [c, ctx] = canvas(96, 16);
    const order = ['down', 'up', 'side'];
    order.forEach((dir, i) => {
      drawTemplate(ctx, BODY[dir], pal, i * 32, 0);
      const legs = BODY[dir].slice(0, 12).concat(LEGS_B[dir], ['................']);
      drawTemplate(ctx, legs, pal, i * 32 + 16, 0);
    });
    return c;
  };

  const CAT = [
    '................',
    '................',
    '................',
    '................',
    '................',
    '...k...k........',
    '..kgk.kgk.......',
    '..kgggggk.......',
    '..kgegegk.......',
    '..kggnggk...kk..',
    '...kgggk...kgk..',
    '..kgggggk..kgk..',
    '.kgggggggkkgk...',
    '.kgwgggwgggk....',
    '.kkkkkkkkkk.....',
    '................'
  ];
  const CAT_BLINK = CAT.slice();
  CAT_BLINK[8] = '..kgkgkgk.......';

  art.catSheet = function () {
    const pal = { k: '#262230', g: '#8e8e9a', e: '#f2b84b', n: '#e88a9a', w: '#ffffff' };
    const [c, ctx] = canvas(32, 16);
    drawTemplate(ctx, CAT, pal, 0, 0);
    drawTemplate(ctx, CAT_BLINK, pal, 16, 0);
    return c;
  };

  // Retrato (rosto ampliado) para a caixa de diálogo
  art.portrait = function (sheet, sx) {
    const [c, ctx] = canvas(16, 12);
    ctx.drawImage(sheet, sx || 0, 0, 16, 12, 0, 0, 16, 12);
    return c.toDataURL();
  };

  /* ---------------- Tiles 16x16 ---------------- */
  art.T = {
    GRASS: 0, GRASS2: 1, PATH: 2, WATER: 3, TREE: 4, ROOF_COBALT: 5, ROOF_RED: 6, ROOF_GREEN: 7,
    WALL: 8, BRICK: 9, DOOR: 10, FLOWERS: 11, FENCE: 12, LAB_FLOOR: 13, LAB_TOP: 14, LAB_WALL: 15,
    MAT: 16, WINDOW: 17, DOOR_CLOSED: 18, WINDOW_BRICK: 19, RUG: 20
  };
  art.SOLID = [3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 17, 18, 19];
  const TILE_COUNT = 21;

  function grass(ctx, ox, r, tufts) {
    R(ctx, '#5c9e4a', ox, 0, 16, 16);
    for (let i = 0; i < 22; i++) R(ctx, '#4f8c3f', ox + Math.floor(r() * 16), Math.floor(r() * 16));
    for (let i = 0; i < 7; i++) R(ctx, '#74b55c', ox + Math.floor(r() * 16), Math.floor(r() * 16));
    if (tufts) {
      [[3, 5], [10, 11], [12, 3]].forEach(([x, y]) => {
        R(ctx, '#3f7a33', ox + x, y + 1); R(ctx, '#3f7a33', ox + x + 2, y + 1); R(ctx, '#3f7a33', ox + x + 1, y);
      });
    }
  }

  function shingles(ctx, ox, base, dark, light) {
    R(ctx, base, ox, 0, 16, 16);
    for (let y = 0; y < 16; y += 4) {
      R(ctx, dark, ox, y + 3, 16, 1);
      const off = (y / 4) % 2 ? 4 : 0;
      for (let x = off; x < 16; x += 8) R(ctx, dark, ox + x, y, 1, 3);
      R(ctx, light, ox, y, 16, 1);
    }
  }

  art.tiles = function () {
    const [c, ctx] = canvas(16 * TILE_COUNT, 16);
    const r = rng(42);
    const T = art.T;
    const at = (i) => i * 16;

    grass(ctx, at(T.GRASS), r, false);
    grass(ctx, at(T.GRASS2), r, true);

    // Caminho de pedras
    let ox = at(T.PATH);
    R(ctx, '#cbb892', ox, 0, 16, 16);
    for (let i = 0; i < 18; i++) R(ctx, '#b29e78', ox + Math.floor(r() * 16), Math.floor(r() * 16), 2, 1);
    for (let i = 0; i < 8; i++) R(ctx, '#ddcdaa', ox + Math.floor(r() * 16), Math.floor(r() * 16));

    // Água do rio (turva, poluída)
    ox = at(T.WATER);
    R(ctx, '#4d6650', ox, 0, 16, 16);
    for (let y = 2; y < 16; y += 5) { R(ctx, '#62806a', ox + (y % 3) * 3, y, 6, 1); R(ctx, '#62806a', ox + 9, y + 2, 5, 1); }
    R(ctx, '#c9c7ad', ox + 4, 6); R(ctx, '#c9c7ad', ox + 5, 6); R(ctx, '#c9c7ad', ox + 12, 12);

    // Árvore (copa arredondada)
    ox = at(T.TREE);
    grass(ctx, ox, r, false);
    R(ctx, '#5a3d22', ox + 7, 11, 2, 4);
    R(ctx, '#1f4a2a', ox + 2, 2, 12, 10); R(ctx, '#1f4a2a', ox + 1, 4, 14, 6); R(ctx, '#1f4a2a', ox + 4, 1, 8, 12);
    R(ctx, '#2f6b3a', ox + 3, 3, 10, 8); R(ctx, '#2f6b3a', ox + 2, 5, 12, 4); R(ctx, '#2f6b3a', ox + 5, 2, 6, 10);
    R(ctx, '#3f8a4a', ox + 5, 3, 3, 2); R(ctx, '#3f8a4a', ox + 4, 5, 2, 2); R(ctx, '#57a35e', ox + 6, 3, 1, 1);

    shingles(ctx, at(T.ROOF_COBALT), '#2a4c8f', '#1c3466', '#3b64b0');
    shingles(ctx, at(T.ROOF_RED), '#a8433a', '#7a2c26', '#c25a4e');
    shingles(ctx, at(T.ROOF_GREEN), '#3f7a52', '#2b5a3a', '#55966a');

    // Parede de reboco
    ox = at(T.WALL);
    R(ctx, '#e6dfcf', ox, 0, 16, 16); R(ctx, '#cfc6b2', ox, 13, 16, 3); R(ctx, '#d8d0bd', ox, 0, 16, 1);
    for (let i = 0; i < 6; i++) R(ctx, '#d6cdb9', ox + Math.floor(r() * 16), Math.floor(r() * 12));

    // Tijolos
    ox = at(T.BRICK);
    R(ctx, '#b0634a', ox, 0, 16, 16);
    for (let y = 0; y < 16; y += 4) {
      R(ctx, '#8a4a37', ox, y + 3, 16, 1);
      const off = (y / 4) % 2 ? 4 : 0;
      for (let x = off; x < 16; x += 8) R(ctx, '#8a4a37', ox + x, y, 1, 3);
    }

    // Porta aberta (madeira)
    function door(o) {
      R(ctx, '#e6dfcf', o, 0, 16, 16);
      R(ctx, '#3d2716', o + 2, 1, 12, 15); R(ctx, '#7a4f2c', o + 3, 2, 10, 14);
      R(ctx, '#8f6036', o + 4, 3, 3, 12); R(ctx, '#8f6036', o + 9, 3, 3, 12);
      R(ctx, '#f2b84b', o + 11, 9, 1, 2);
    }
    door(at(T.DOOR));
    door(at(T.DOOR_CLOSED));
    R(ctx, '#5a3a1f', at(T.DOOR_CLOSED) + 3, 8, 10, 1);

    // Flores
    ox = at(T.FLOWERS);
    grass(ctx, ox, r, false);
    [[3, 3, '#f2b84b'], [10, 4, '#e0675a'], [6, 10, '#ffffff'], [12, 12, '#f2b84b'], [2, 12, '#e0675a']].forEach(([x, y, col]) => {
      R(ctx, col, ox + x, y, 2, 2); R(ctx, '#3f7a33', ox + x, y + 2, 1, 2);
    });

    // Cerca
    ox = at(T.FENCE);
    grass(ctx, ox, r, false);
    R(ctx, '#7a5634', ox, 6, 16, 2); R(ctx, '#7a5634', ox, 11, 16, 2);
    R(ctx, '#5a3d22', ox + 2, 3, 3, 12); R(ctx, '#5a3d22', ox + 11, 3, 3, 12);

    // Piso do laboratório (lajotas)
    ox = at(T.LAB_FLOOR);
    R(ctx, '#cfd8d6', ox, 0, 16, 16);
    R(ctx, '#b4c1bf', ox, 7, 16, 1); R(ctx, '#b4c1bf', ox, 15, 16, 1);
    R(ctx, '#b4c1bf', ox + 7, 0, 1, 16); R(ctx, '#b4c1bf', ox + 15, 0, 1, 16);
    R(ctx, '#dde5e3', ox + 1, 1, 3, 1); R(ctx, '#dde5e3', ox + 9, 9, 3, 1);

    // Topo das paredes internas
    ox = at(T.LAB_TOP);
    R(ctx, '#1d2a45', ox, 0, 16, 16); R(ctx, '#26365a', ox, 0, 16, 2);

    // Face da parede interna
    ox = at(T.LAB_WALL);
    R(ctx, '#3c5a86', ox, 0, 16, 16); R(ctx, '#45679a', ox, 0, 16, 2);
    R(ctx, '#2f4870', ox, 9, 16, 1); R(ctx, '#2a3f60', ox, 13, 16, 3);
    for (let x = 0; x < 16; x += 4) R(ctx, '#3a5680', ox + x, 10, 1, 3);

    // Capacho / saída
    ox = at(T.MAT);
    R(ctx, '#1d2a45', ox, 0, 16, 16); R(ctx, '#6b4a2a', ox, 0, 16, 10);
    R(ctx, '#7f5a34', ox + 1, 1, 14, 8);
    for (let x = 2; x < 15; x += 3) R(ctx, '#6b4a2a', ox + x, 2, 1, 6);

    // Janela em reboco
    ox = at(T.WINDOW);
    R(ctx, '#e6dfcf', ox, 0, 16, 16); R(ctx, '#cfc6b2', ox, 13, 16, 3);
    R(ctx, '#5a4632', ox + 3, 2, 10, 9); R(ctx, '#9cc7d9', ox + 4, 3, 8, 7);
    R(ctx, '#5a4632', ox + 7, 3, 2, 7); R(ctx, '#c8e3ec', ox + 4, 3, 2, 2);

    // Janela em tijolo
    ox = at(T.WINDOW_BRICK);
    ctx.drawImage(c, at(T.BRICK), 0, 16, 16, ox, 0, 16, 16);
    R(ctx, '#e6dfcf', ox + 2, 2, 12, 10); R(ctx, '#9cc7d9', ox + 3, 3, 10, 8);
    R(ctx, '#e6dfcf', ox + 7, 3, 2, 8); R(ctx, '#c8e3ec', ox + 3, 3, 2, 2);

    // Tapete
    ox = at(T.RUG);
    ctx.drawImage(c, at(T.LAB_FLOOR), 0, 16, 16, ox, 0, 16, 16);
    R(ctx, '#2a4c8f', ox, 2, 16, 12); R(ctx, '#4fb3a0', ox, 4, 16, 1); R(ctx, '#4fb3a0', ox, 11, 16, 1);

    return c;
  };

  // Copia cada tile com 1 px de borda repetida (evita frestas entre tiles com zoom)
  art.extrude = function (src, size) {
    const n = Math.round(src.width / size);
    const s2 = size + 2;
    const [c, ctx] = canvas(n * s2, s2);
    for (let i = 0; i < n; i++) {
      const sx = i * size, dx = i * s2 + 1;
      ctx.drawImage(src, sx, 0, size, size, dx, 1, size, size);
      ctx.drawImage(src, sx, 0, size, 1, dx, 0, size, 1);
      ctx.drawImage(src, sx, size - 1, size, 1, dx, size + 1, size, 1);
      ctx.drawImage(c, dx, 0, 1, s2, dx - 1, 0, 1, s2);
      ctx.drawImage(c, dx + size - 1, 0, 1, s2, dx + size, 0, 1, s2);
    }
    return c;
  };

  /* ---------------- Objetos ---------------- */
  function flask(ctx, x, y, col) {
    R(ctx, '#dbe8ee', x + 1, y, 2, 2);
    R(ctx, '#dbe8ee', x, y + 2, 4, 3);
    R(ctx, col, x, y + 3, 4, 2);
  }

  const O = {};

  O.armario = () => {
    const [c, ctx] = canvas(16, 24);
    R(ctx, '#1b1f2e', 1, 0, 14, 24); R(ctx, '#8fa3a8', 2, 1, 12, 22);
    R(ctx, '#7a8e93', 7, 1, 1, 22); R(ctx, '#2e7d4f', 3, 4, 3, 3); R(ctx, '#ffffff', 4, 4, 1, 3); R(ctx, '#ffffff', 3, 5, 3, 1);
    R(ctx, '#f2b84b', 5, 12, 1, 2); R(ctx, '#f2b84b', 9, 12, 1, 2);
    return c;
  };

  function benchBase(ctx) {
    R(ctx, '#1b1f2e', 0, 5, 32, 11); R(ctx, '#e8edef', 1, 5, 30, 3); R(ctx, '#6b7f8a', 1, 8, 30, 7);
    R(ctx, '#55687a', 15, 8, 1, 7); R(ctx, '#c9d3d8', 6, 11, 4, 1); R(ctx, '#c9d3d8', 22, 11, 4, 1);
  }
  O.bancada = () => {
    const [c, ctx] = canvas(32, 16);
    benchBase(ctx);
    flask(ctx, 4, 0, '#4fb3a0'); flask(ctx, 10, 1, '#f2b84b');
    return c;
  };
  O.bancada_bunsen = () => {
    const [c, ctx] = canvas(32, 16);
    benchBase(ctx);
    R(ctx, '#1b1f2e', 4, 0, 4, 6); R(ctx, '#8fa3a8', 5, 1, 2, 5); R(ctx, '#2fd3b0', 5, 0, 2, 1); R(ctx, '#1b1f2e', 3, 5, 6, 1);
    R(ctx, '#1b1f2e', 17, 1, 12, 5); R(ctx, '#d6dde0', 18, 2, 10, 3); R(ctx, '#7bc67e', 19, 3, 4, 1); R(ctx, '#aab4b8', 20, 0, 6, 1);
    return c;
  };
  O.bancada_balanca = () => {
    const [c, ctx] = canvas(32, 16);
    benchBase(ctx);
    flask(ctx, 4, 0, '#4fb3a0');
    R(ctx, '#1b1f2e', 17, 1, 12, 5); R(ctx, '#d6dde0', 18, 2, 10, 3); R(ctx, '#7bc67e', 19, 3, 4, 1); R(ctx, '#aab4b8', 20, 0, 6, 1);
    return c;
  };

  function shelf(ctx, organized) {
    R(ctx, '#3d2716', 0, 0, 32, 24); R(ctx, '#7a4f2c', 1, 1, 30, 22);
    [7, 15, 22].forEach((y) => R(ctx, '#3d2716', 1, y, 30, 1));
    const cols = ['#4fb3a0', '#f2b84b', '#e0675a', '#9b7bd0', '#7bc67e', '#6fa8dc'];
    const r = rng(organized ? 7 : 99);
    [1, 9, 16].forEach((row, ri) => {
      for (let i = 0; i < 6; i++) {
        const x = 3 + i * 5 + (organized ? 0 : Math.floor(r() * 2));
        const tilt = organized ? 0 : Math.floor(r() * 2);
        const col = organized ? cols[ri * 2 + (i < 3 ? 0 : 1)] : (r() < 0.4 ? '#8a8f86' : cols[Math.floor(r() * 6)]);
        if (!organized && r() < 0.25) { R(ctx, '#dbe8ee', x, row + 4, 4, 2); R(ctx, col, x + 1, row + 5, 2, 1); continue; }
        R(ctx, '#dbe8ee', x + 1, row + tilt, 2, 2); R(ctx, '#dbe8ee', x, row + 2 + tilt, 4, 4 - tilt); R(ctx, col, x, row + 4, 4, 2);
        if (organized) R(ctx, '#ffffff', x + 1, row + 3, 2, 1);
      }
    });
    if (!organized) { R(ctx, '#b9b2a2', 2, 21, 6, 1); R(ctx, '#b9b2a2', 20, 13, 7, 1); }
  }
  O.estante = () => { const [c, ctx] = canvas(32, 24); shelf(ctx, false); return c; };
  O.estante_ok = () => { const [c, ctx] = canvas(32, 24); shelf(ctx, true); return c; };

  // Mural da tabela periódica: 0 apagado, 1 metade (átomo), 2 restaurado
  function mural(stage) {
    const [c, ctx] = canvas(64, 16);
    R(ctx, '#1b1f2e', 0, 1, 64, 13); R(ctx, stage === 2 ? '#f0ead8' : '#cfc8b4', 1, 2, 62, 11);
    const r = rng(5);
    const famColor = (x) => (x === 0 ? '#e0675a' : x === 1 ? '#f2b84b' : x === 13 ? '#4fb3a0' : x === 14 ? '#9b7bd0' : '#6fa8dc');
    for (let y = 0; y < 3; y++) for (let x = 0; x < 15; x++) {
      if (y === 0 && x > 0 && x < 14) continue;
      const faded = r() < 0.7;
      let col = faded ? '#bdb6a2' : '#6fa8dc';
      if (stage === 2) col = famColor(x);
      R(ctx, col, 3 + x * 4, 3 + y * 3, 3, 2);
    }
    if (stage >= 1) {
      // átomo desenhado no centro do mural
      R(ctx, '#2a4c8f', 26, 3, 12, 1); R(ctx, '#2a4c8f', 26, 7, 12, 1); R(ctx, '#2a4c8f', 25, 4, 1, 3); R(ctx, '#2a4c8f', 38, 4, 1, 3);
      R(ctx, '#e0675a', 31, 4, 2, 2); R(ctx, '#f2b84b', 27, 3); R(ctx, '#f2b84b', 37, 7); R(ctx, '#f2b84b', 34, 3);
    }
    return c;
  }
  O.mural = () => mural(0);
  O.mural_meio = () => mural(1);
  O.mural_ok = () => mural(2);

  O.lavaolhos = () => {
    const [c, ctx] = canvas(16, 24);
    R(ctx, '#2e7d4f', 6, 2, 4, 12); R(ctx, '#ffffff', 7, 4, 2, 6); R(ctx, '#ffffff', 6, 6, 4, 2);
    R(ctx, '#1b1f2e', 2, 15, 12, 7); R(ctx, '#c9d3d8', 3, 16, 10, 2); R(ctx, '#8fa3a8', 3, 18, 10, 3);
    R(ctx, '#4fb3a0', 5, 16, 2, 1); R(ctx, '#4fb3a0', 9, 16, 2, 1);
    return c;
  };

  O.mesa = (withLetter) => {
    const [c, ctx] = canvas(32, 16);
    R(ctx, '#3d2716', 1, 3, 30, 9); R(ctx, '#8f6036', 2, 4, 28, 6); R(ctx, '#a8723f', 2, 4, 28, 1);
    R(ctx, '#3d2716', 3, 12, 2, 4); R(ctx, '#3d2716', 27, 12, 2, 4);
    R(ctx, '#f0ead8', 20, 5, 5, 3); R(ctx, '#7a2c26', 6, 4, 3, 3); R(ctx, '#ffffff', 7, 4, 1, 1);
    if (withLetter) { R(ctx, '#ffffff', 12, 5, 6, 4); R(ctx, '#e0675a', 14, 6, 2, 2); }
    return c;
  };

  function fonte(oil) {
    const [c, ctx] = canvas(32, 32);
    R(ctx, '#1b1f2e', 2, 12, 28, 18); R(ctx, '#9aa3a8', 3, 13, 26, 16); R(ctx, '#7f888d', 3, 26, 26, 3);
    R(ctx, '#56705a', 5, 15, 22, 9); R(ctx, '#6b866d', 7, 17, 6, 1); R(ctx, '#6b866d', 16, 20, 7, 1);
    R(ctx, '#1b1f2e', 13, 2, 6, 15); R(ctx, '#aab3b8', 14, 3, 4, 13); R(ctx, '#c9cfd2', 14, 3, 1, 13);
    R(ctx, '#7b9a80', 12, 1, 8, 2);
    if (oil) {
      R(ctx, '#2b2a24', 5, 15, 22, 9);
      R(ctx, '#9b7bd0', 7, 17, 5, 1); R(ctx, '#4fb3a0', 12, 17, 4, 1); R(ctx, '#f2b84b', 16, 17, 3, 1);
      R(ctx, '#e0675a', 9, 21, 4, 1); R(ctx, '#6fa8dc', 13, 21, 5, 1); R(ctx, '#9b7bd0', 19, 20, 4, 1);
      R(ctx, '#2b2a24', 3, 26, 5, 3); R(ctx, '#2b2a24', 24, 27, 4, 2);
    }
    return c;
  }
  O.fonte = () => fonte(false);
  O.fonte_oleo = () => fonte(true);

  O.sintese = () => {
    const [c, ctx] = canvas(32, 16);
    R(ctx, '#1b1f2e', 0, 5, 32, 11); R(ctx, '#3d2716', 1, 5, 30, 3); R(ctx, '#6b4a2a', 1, 8, 30, 7);
    R(ctx, '#55687a', 15, 8, 1, 7);
    // modelo de molécula (água) e frascos
    R(ctx, '#e0675a', 5, 1, 4, 4); R(ctx, '#f4f7f8', 2, 3, 3, 3); R(ctx, '#f4f7f8', 9, 3, 3, 3); R(ctx, '#1b1f2e', 4, 3, 1, 1); R(ctx, '#1b1f2e', 9, 3, 1, 1);
    flask(ctx, 17, 0, '#9b7bd0'); flask(ctx, 23, 1, '#4fb3a0');
    return c;
  };

  O.tubos = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#1b1f2e', 1, 9, 14, 6); R(ctx, '#8f6036', 2, 10, 12, 4);
    [['#e0675a', 3], ['#f2b84b', 6], ['#4fb3a0', 9], ['#9b7bd0', 12]].forEach(([col, x]) => {
      R(ctx, '#dbe8ee', x, 2, 2, 9); R(ctx, col, x, 6, 2, 4);
    });
    return c;
  };

  O.quadro = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#3d2716', 3, 9, 2, 7); R(ctx, '#3d2716', 11, 9, 2, 7);
    R(ctx, '#3d2716', 1, 1, 14, 10); R(ctx, '#a8723f', 2, 2, 12, 8);
    R(ctx, '#f0ead8', 3, 3, 4, 3); R(ctx, '#f0ead8', 8, 4, 4, 4); R(ctx, '#f2b84b', 4, 7, 3, 2); R(ctx, '#e0675a', 5, 3, 1, 1);
    return c;
  };

  O.placa = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#3d2716', 7, 9, 2, 7); R(ctx, '#3d2716', 1, 3, 14, 7); R(ctx, '#2a4c8f', 2, 4, 12, 5);
    R(ctx, '#f2b84b', 4, 6, 8, 1);
    return c;
  };

  O.barraca = () => {
    const [c, ctx] = canvas(32, 24);
    for (let x = 0; x < 32; x += 4) R(ctx, (x / 4) % 2 ? '#e8edef' : '#3f7a52', x, 0, 4, 6);
    R(ctx, '#3d2716', 1, 6, 2, 10); R(ctx, '#3d2716', 29, 6, 2, 10);
    R(ctx, '#1b1f2e', 0, 14, 32, 10); R(ctx, '#8f6036', 1, 15, 30, 8); R(ctx, '#a8723f', 1, 15, 30, 1);
    flask(ctx, 5, 9, '#4fb3a0'); flask(ctx, 23, 9, '#f2b84b'); R(ctx, '#3f8a4a', 13, 10, 5, 4); R(ctx, '#5a3d22', 14, 12, 3, 3);
    return c;
  };

  O.planta = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#2f6b3a', 3, 2, 3, 6); R(ctx, '#3f8a4a', 6, 0, 4, 8); R(ctx, '#2f6b3a', 10, 2, 3, 6); R(ctx, '#57a35e', 7, 1, 1, 4);
    R(ctx, '#1b1f2e', 4, 8, 8, 8); R(ctx, '#b0634a', 5, 9, 6, 6); R(ctx, '#c97a5e', 5, 9, 6, 1);
    return c;
  };

  O.lousa = () => {
    const [c, ctx] = canvas(32, 16);
    R(ctx, '#1b1f2e', 1, 1, 30, 12); R(ctx, '#f4f7f8', 2, 2, 28, 10);
    R(ctx, '#2a4c8f', 4, 4, 9, 1); R(ctx, '#2a4c8f', 4, 6, 6, 1); R(ctx, '#e0675a', 16, 4, 2, 2); R(ctx, '#2a4c8f', 19, 5, 8, 1);
    R(ctx, '#8fa3a8', 3, 13, 26, 1);
    return c;
  };

  O.poltrona = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#1b1f2e', 1, 2, 14, 13); R(ctx, '#7a2c26', 2, 3, 12, 6); R(ctx, '#a8433a', 2, 9, 12, 4);
    R(ctx, '#7a2c26', 1, 8, 3, 6); R(ctx, '#7a2c26', 12, 8, 3, 6); R(ctx, '#3d2716', 3, 14, 2, 2); R(ctx, '#3d2716', 11, 14, 2, 2);
    return c;
  };

  O.modelo = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#3d2716', 7, 11, 2, 3); R(ctx, '#1b1f2e', 4, 14, 8, 2); R(ctx, '#6b4a2a', 5, 14, 6, 1);
    R(ctx, '#8fb3f0', 2, 5, 12, 1); R(ctx, '#8fb3f0', 2, 9, 12, 1); R(ctx, '#8fb3f0', 1, 6, 1, 3); R(ctx, '#8fb3f0', 14, 6, 1, 3);
    R(ctx, '#8fb3f0', 6, 1, 4, 1); R(ctx, '#8fb3f0', 6, 13, 4, 0); R(ctx, '#8fb3f0', 5, 2, 1, 8); R(ctx, '#8fb3f0', 10, 2, 1, 8);
    R(ctx, '#e0675a', 7, 6, 2, 2); R(ctx, '#f2b84b', 2, 5, 1, 1); R(ctx, '#f2b84b', 10, 3, 1, 1); R(ctx, '#f2b84b', 13, 9, 1, 1);
    return c;
  };

  O.spark = () => {
    const [c, ctx] = canvas(3, 3);
    R(ctx, '#ffffff', 1, 0, 1, 3); R(ctx, '#ffffff', 0, 1, 3, 1);
    return c;
  };

  O.licenca = () => {
    const [c, ctx] = canvas(16, 16);
    R(ctx, '#3d2716', 2, 2, 12, 11); R(ctx, '#f2b84b', 3, 3, 10, 9); R(ctx, '#f0ead8', 4, 4, 8, 7);
    R(ctx, '#2a4c8f', 5, 5, 6, 1); R(ctx, '#2a4c8f', 5, 7, 4, 1); R(ctx, '#e0675a', 9, 8, 2, 2);
    return c;
  };

  O.marker = () => {
    const [c, ctx] = canvas(8, 12);
    R(ctx, '#1b1f2e', 2, 0, 4, 12); R(ctx, '#f2b84b', 3, 1, 2, 6); R(ctx, '#f2b84b', 3, 9, 2, 2);
    R(ctx, '#1b1f2e', 2, 7, 4, 2);
    return c;
  };

  O.bubble = () => {
    const [c, ctx] = canvas(10, 9);
    R(ctx, '#1b1f2e', 0, 0, 10, 7); R(ctx, '#ffffff', 1, 1, 8, 5); R(ctx, '#1b1f2e', 4, 7, 2, 2);
    R(ctx, '#1b1f2e', 2, 3, 1, 1); R(ctx, '#1b1f2e', 4, 3, 1, 1); R(ctx, '#1b1f2e', 7, 3, 1, 1);
    return c;
  };

  O.sombra = () => {
    const [c, ctx] = canvas(12, 4);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(2, 0, 8, 4); ctx.fillRect(0, 1, 12, 2);
    return c;
  };

  art.objects = function () {
    const out = {};
    Object.keys(O).forEach((k) => { if (k !== 'mesa') out[k] = O[k](); });
    out.mesa = O.mesa(true);
    out.mesa_vazia = O.mesa(false);
    return out;
  };

  /* ---------------- Ícones do inventário ---------------- */
  const ICONS = {
    chave: ['................', '................', '....kkk.........', '...kaaak........', '..kaa.aak.......', '..ka...ak.......', '..kaa.aakkkkkkk.', '...kaaakaaaaaaak', '....kkk.kkkakak.', '.........k.k.k..'],
    carta: ['................', '................', '.kkkkkkkkkkkkkk.', '.kwwwwwwwwwwwwk.', '.kkwwwwwwwwwwkk.', '.kwkwwwwwwwwkwk.', '.kwwkwwrrwwkwwk.', '.kwwwkwrrwkwwwk.', '.kwwwwkkkkwwwwk.', '.kwwwwwwwwwwwwk.', '.kkkkkkkkkkkkkk.'],
    epi: ['................', '................', '................', '..kkkkkkkkkkkk..', '.kbbbbbkkbbbbbk.', '.kbllbbkkbllbbk.', '.kbbbbbkkbbbbbk.', '..kkkkk..kkkkk..', '................', '...kwwwwwwwwk...', '..kwwwgwwgwwwk..', '..kwwwwwwwwwwk..'],
    balanca: ['................', '................', '...kkkkkkkkkk...', '...kssssssssk...', '...kkkkkkkkkk...', '.......kk.......', '..kkkkkkkkkkkk..', '..kssssssssssk..', '..ksggsssssssk..', '..kssssssssssk..', '..kkkkkkkkkkkk..'],
    relatorio: ['................', '...kkkkkkkkk....', '...kwwwwwwwkk...', '...kwbbbbwwwk...', '...kwwwwwwwwk...', '...kwbbbbbbwk...', '...kwwwwwwwwk...', '...kwbbbbbwwk...', '...kwwwwwwwwk...', '...kwbbbwwwwk...', '...kkkkkkkkkk...'],
    laudo: ['................', '...kkkkkkkkk....', '...kwwwwwwwkk...', '...kwbbbbwwwk...', '...kwwwwwwwwk...', '...kwbbbbbbwk...', '...kwwwwwwwwk...', '...kwbbwwwggk...', '...kwwwwwgggk...', '...kwbbbwwggk...', '...kkkkkkkkkk...'],
    licenca: ['................', '..kkkkkkkkkkkk..', '..kaaaaaaaaaak..', '..kawwwwwwwwak..', '..kawbbbbbbwak..', '..kawwwwwwwwak..', '..kawbbbwrrwak..', '..kawwwwwrrwak..', '..kaaaaaaaaaak..', '..kkkkkkkkkkkk..'],
    bunsen: ['................', '.......aa.......', '......agga......', '......agga......', '.......kk.......', '.......ks.......', '.......ks.......', '.......ks.......', '......kssk......', '....kkkkkkkk....', '....ksssssssk...', '....kkkkkkkk....'],
    receita: ['................', '...kkkkkkkkk....', '...kwwwwwwwkk...', '...kwbbbbwwwk...', '...kwwwwwwwwk...', '...kwrwbbbbwk...', '...kwwwwwwwwk...', '...kwgwbbbbwk...', '...kwwwwwwwwk...', '...kwawbbbwwk...', '...kkkkkkkkkk...'],
    amostras: ['................', '................', '..kk..kk..kk....', '..kk..kk..kk....', '.kwwkkwwkkwwk...', '.kwwkkwwkkwwk...', '.kaakkgwkkrrk...', '.kaakkggkkrrk...', '.kaakkggkkrrk...', '..kk..kk..kk....'],
    detergente: ['................', '......kk........', '.....kggk.......', '.....kggk.......', '....kggggk......', '...kggwggk......', '...kgwwggk......', '...kgggggk......', '...kggbggk......', '...kgbbbgk......', '...kgggggk......', '....kkkkk.......'],
    moeda: ['................', '................', '.....kkkkkk.....', '....kaaaaaak....', '...kaallaaaak...', '...kaalaakaak...', '...kaaaakaaak...', '...kaaakaaaak...', '...kaaaaaaaak...', '....kaaaaaak....', '.....kkkkkk.....']
  };
  const ICON_PAL = { k: '#1b1f2e', a: '#f2b84b', w: '#f4f7f8', r: '#e0675a', b: '#2a4c8f', l: '#c8e3ec', g: '#4fb3a0', s: '#c9d3d8' };

  art.icon = function (key) {
    const rows = ICONS[key] || ICONS.carta;
    const [c, ctx] = canvas(16, 16);
    const off = Math.floor((16 - rows.length) / 2);
    drawTemplate(ctx, rows, ICON_PAL, 0, off);
    return c.toDataURL();
  };

  // Ícone de objeto de decoração reaproveitando o desenho do objeto
  art.objectIcon = function (key) {
    const c = O[key] ? O[key]() : null;
    return c ? c.toDataURL() : art.icon('carta');
  };
})();
