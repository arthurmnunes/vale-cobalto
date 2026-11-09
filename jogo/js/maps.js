/* Vale Cobalto - mapas montados por código */
window.VC = window.VC || {};

(function () {
  const T = VC.art.T;

  function grid(w, h, fill) {
    const g = [];
    for (let y = 0; y < h; y++) g.push(new Array(w).fill(fill));
    return g;
  }
  function rect(g, x, y, w, h, t) {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j] && g[j][i] !== undefined) g[j][i] = t;
  }

  /* ---------------- Praça ---------------- */
  function buildPraca() {
    const W = 30, H = 20;
    const g = grid(W, H, T.GRASS);
    // variação da grama
    let s = 11;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { s = (s * 37 + 17) % 101; if (s < 14) g[y][x] = T.GRASS2; }
    // bordas de árvores
    rect(g, 0, 0, W, 1, T.TREE); rect(g, 0, 0, 1, H, T.TREE); rect(g, W - 1, 0, 1, H, T.TREE); rect(g, 0, H - 1, W, 1, T.TREE);
    rect(g, 11, 1, 2, 2, T.TREE); rect(g, 16, 1, 2, 1, T.TREE); rect(g, 28, 5, 1, 4, T.TREE); rect(g, 1, 6, 1, 3, T.TREE);

    // Laboratório Aurora (telhado azul-cobalto)
    rect(g, 2, 1, 8, 2, T.ROOF_COBALT); rect(g, 2, 3, 8, 2, T.WALL);
    g[3][3] = T.WINDOW; g[3][8] = T.WINDOW; g[4][3] = T.WINDOW; g[4][8] = T.WINDOW;
    g[4][5] = T.DOOR; g[4][6] = T.WALL;

    // Prefeitura (telhado vermelho, tijolos)
    rect(g, 19, 1, 9, 2, T.ROOF_RED); rect(g, 19, 3, 9, 2, T.BRICK);
    [20, 22, 24, 26].forEach((x) => { g[3][x] = T.WINDOW_BRICK; });
    g[4][23] = T.DOOR_CLOSED;

    // Loja do Seu Bento (telhado verde)
    rect(g, 2, 11, 6, 2, T.ROOF_GREEN); rect(g, 2, 13, 6, 2, T.WALL);
    g[13][3] = T.WINDOW; g[13][6] = T.WINDOW; g[14][4] = T.DOOR_CLOSED;

    // Caminhos
    rect(g, 5, 5, 1, 5, T.PATH);
    rect(g, 23, 5, 1, 5, T.PATH);
    rect(g, 3, 9, 24, 1, T.PATH);
    rect(g, 12, 7, 6, 6, T.PATH);
    rect(g, 8, 10, 1, 5, T.PATH); rect(g, 4, 15, 10, 1, T.PATH); rect(g, 13, 12, 1, 4, T.PATH);
    rect(g, 18, 12, 1, 4, T.PATH); rect(g, 18, 15, 6, 1, T.PATH);

    // Rio poluído
    rect(g, 1, 17, 28, 2, T.WATER);
    rect(g, 24, 16, 4, 1, T.WATER);

    // Flores e cerca
    [[7, 6], [8, 6], [2, 7], [20, 6], [21, 6], [26, 6], [10, 12], [20, 11], [25, 12], [15, 14]].forEach(([x, y]) => { g[y][x] = T.FLOWERS; });
    rect(g, 8, 16, 5, 1, T.FENCE); rect(g, 19, 16, 4, 1, T.FENCE);

    return g;
  }

  /* ---------------- Laboratório ---------------- */
  function buildLab() {
    const W = 16, H = 12;
    const g = grid(W, H, T.LAB_FLOOR);
    rect(g, 0, 0, W, 1, T.LAB_TOP);
    rect(g, 0, 1, W, 1, T.LAB_WALL);
    rect(g, 0, 0, 1, H, T.LAB_TOP); rect(g, W - 1, 0, 1, H, T.LAB_TOP);
    rect(g, 0, H - 1, W, 1, T.LAB_TOP);
    g[H - 1][7] = T.MAT; g[H - 1][8] = T.MAT;
    rect(g, 6, 8, 4, 2, T.RUG);
    return g;
  }

  // Objetos: x,y = canto do tile da base; w = largura em tiles; tex pode ser função do estado
  VC.MAPS = {
    praca: {
      grid: buildPraca(),
      bg: '#1f4a2a',
      objects: [
        { id: 'fonte', tex: () => (VC.flag('oleo') && !VC.flag('fonteLimpa') ? 'fonte_oleo' : VC.flag('rioLimpo') ? 'fonte_limpa' : 'fonte'), x: 14, y: 10, w: 2, solidH: 18 },
        { id: 'quadro', tex: 'quadro', x: 11, y: 8, w: 1, solidH: 8 },
        { id: 'placa_lab', tex: 'placa', x: 7, y: 5, w: 1, solidH: 6 },
        { id: 'barraca', tex: 'barraca', x: 9, y: 13, w: 2, solidH: 10, talk: 'bento' },
        { id: 'horta', tex: () => (VC.flag('hortaOk') ? 'horta_ok' : 'horta'), x: 21, y: 13, w: 3, solidH: 18 },
        { id: 'coleta', tex: 'coleta', x: 15, y: 16, w: 1, solidH: 6, cond: () => VC.flag('cap5') }
      ],
      npcs: [
        { id: 'prefeita', sprite: 'prefeita', pos: () => (['q_prefeita'].includes(VC.state.quest) ? [6, 7] : [23, 6]), face: 'down' },
        { id: 'bento', sprite: 'bento', pos: () => [9.5, 12], face: 'down', solid: false },
        { id: 'lia', sprite: 'lia', pos: () => [17, 11], face: 'left' },
        { id: 'rival', sprite: 'rival', pos: () => [13, 8], face: 'down', cond: () => VC.state.quest === 'q6_congresso' || VC.flag('cap6') },
        { id: 'itala', sprite: 'itala', pos: () => [7, 7], face: 'down', cond: () => VC.flag('cap6') }
      ],
      doors: [
        { id: 'lab', tx: 5, ty: 4, to: 'lab', spawn: [7.5, 10], face: 'up', needs: 'chave', locked: 'A porta está trancada. A Prefeita Célia está com a chave.' }
      ],
      tileTalk: [
        { tx: 23, ty: 4, text: 'A prefeitura está fechada para o almoço. A Prefeita Célia está aqui fora.' },
        { tx: 4, ty: 14, text: 'A loja está fechada. O Seu Bento atende na barraca ao lado.' }
      ],
      waterText: 'O rio de Vale Cobalto: água escura, espuma e cheiro forte. Um dia a Fórmula Aurora vai limpar isto.',
      cleanWaterText: 'O rio de Vale Cobalto, limpo e azul. Dá até para ver os peixes voltando.'
    },
    lab: {
      grid: buildLab(),
      bg: '#0f1626',
      objects: [
        { id: 'armario', tex: 'armario', x: 1, y: 2, w: 1, solidH: 10 },
        { id: 'bancada', tex: () => (VC.hasItem('bunsen') ? 'bancada_bunsen' : VC.hasItem('balanca') ? 'bancada_balanca' : 'bancada'), x: 3, y: 2, w: 2, solidH: 12 },
        { id: 'mural', tex: () => (VC.flag('muralOk') ? 'mural_ok' : VC.flag('muralMeio') ? 'mural_meio' : 'mural'), x: 6, y: 1, w: 4, solid: false, depth: 1 },
        { id: 'estante', tex: () => (VC.flag('estanteOk') ? 'estante_ok' : 'estante'), x: 11, y: 2, w: 2, solidH: 12 },
        { id: 'lavaolhos', tex: 'lavaolhos', x: 14, y: 2, w: 1, solidH: 10 },
        { id: 'mesa', tex: () => (VC.hasItem('carta') ? 'mesa_vazia' : 'mesa'), x: 7, y: 5, w: 2, solidH: 10 },
        { id: 'lousa', tex: 'lousa', x: 3, y: 1, w: 2, solid: false, depth: 1, cond: () => VC.state.decor.includes('lousa') },
        { id: 'licenca', tex: 'licenca', x: 13, y: 1, w: 1, solid: false, depth: 1, cond: () => VC.hasItem('licenca') },
        { id: 'planta', tex: 'planta', x: 1, y: 9, w: 1, solidH: 6, cond: () => VC.state.decor.includes('planta') },
        { id: 'poltrona', tex: 'poltrona', x: 13, y: 8, w: 1, solidH: 8, cond: () => VC.state.decor.includes('poltrona') },
        { id: 'modelo', tex: 'modelo', x: 12, y: 5, w: 1, solidH: 6, cond: () => VC.state.decor.includes('modelo') },
        { id: 'sintese', tex: 'sintese', x: 2, y: 6, w: 2, solidH: 12, cond: () => VC.flag('sinteseOk') },
        { id: 'tubos', tex: 'tubos', x: 5, y: 2, w: 1, solidH: 6, cond: () => VC.state.decor.includes('tubos') },
        { id: 'capela', tex: 'capela', x: 13, y: 5, w: 2, solidH: 12, cond: () => VC.flag('capelaOk') },
        { id: 'extintor', tex: 'extintor', x: 14, y: 10, w: 1, solidH: 6, cond: () => VC.state.decor.includes('extintor') },
        { id: 'caminha', tex: 'caminha', x: 10, y: 7, w: 1, solid: false, depth: 100, cond: () => VC.state.decor.includes('caminha') },
        { id: 'microscopio', tex: 'microscopio', x: 5, y: 5, w: 1, solidH: 6, cond: () => VC.state.decor.includes('microscopio') },
        { id: 'espectroscopio', tex: 'espectroscopio', x: 10, y: 4, w: 1, solidH: 6, cond: () => VC.state.decor.includes('espectroscopio') },
        { id: 'vidraria', tex: 'vidraria', x: 1, y: 6, w: 1, solidH: 6, cond: () => VC.state.decor.includes('vidraria') },
        { id: 'aquario', tex: 'aquario', x: 1, y: 4, w: 1, solidH: 6, cond: () => VC.state.decor.includes('aquario') },
        { id: 'moldura', tex: 'moldura', x: 9, y: 3, w: 1, solidH: 6, cond: () => VC.state.decor.includes('moldura') },
        { id: 'destilador', tex: 'destilador', x: 11, y: 9, w: 2, solidH: 12, cond: () => VC.flag('destiladorOk') },
        { id: 'analitica', tex: 'analitica', x: 3, y: 9, w: 1, solidH: 8, cond: () => VC.flag('analiticaOk') },
        { id: 'poster_mol', tex: 'poster_mol', x: 5, y: 1, w: 1, solid: false, depth: 1, cond: () => VC.state.decor.includes('poster_mol') },
        { id: 'cartaz_ph', tex: 'cartaz_ph', x: 10, y: 1, w: 1, solid: false, depth: 1, cond: () => VC.state.decor.includes('cartaz_ph') }
      ],
      npcs: [
        { id: 'cat', sprite: 'cat', pos: () => [10, 7], face: 'down', cond: () => VC.hasItem('carta'), solid: false }
      ],
      doors: [
        { id: 'saida', tx: 7, ty: 11, to: 'praca', spawn: [5, 6], face: 'down' },
        { id: 'saida2', tx: 8, ty: 11, to: 'praca', spawn: [5, 6], face: 'down' }
      ],
      tileTalk: []
    }
  };
})();
