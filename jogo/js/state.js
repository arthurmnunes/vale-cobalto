/* Vale Cobalto - estado e salvamento */
window.VC = window.VC || {};

(function () {
  const KEY = 'valecobalto-save-v1';

  VC.newState = function () {
    return {
      v: 1,
      player: '', cat: '', rival: '',
      coins: 0,
      inv: [],
      flags: {},
      notebook: [],
      decor: [],
      stars: {},
      quest: 'q_prefeita',
      maxCh: 1,
      map: 'praca',
      pos: null,
      sound: true
    };
  };

  VC.state = VC.newState();

  VC.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(VC.state)); } catch (e) { /* armazenamento indisponível */ }
  };

  VC.load = function () {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1 && s.player) { VC.state = Object.assign(VC.newState(), s); return true; }
    } catch (e) { /* ignora */ }
    return false;
  };

  VC.hasSave = function () {
    try { const s = JSON.parse(localStorage.getItem(KEY)); return !!(s && s.player); } catch (e) { return false; }
  };

  VC.clearSave = function () {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignora */ }
    VC.state = VC.newState();
  };

  VC.hasItem = (id) => VC.state.inv.includes(id);

  VC.addItem = function (id, silent) {
    if (!VC.hasItem(id)) VC.state.inv.push(id);
    if (!silent && VC.ITEMS[id]) VC.ui.toast('Recebido: ' + VC.ITEMS[id].name, VC.art.icon(VC.ITEMS[id].icon));
    VC.ui.refreshHud();
    VC.save();
  };

  VC.removeItem = function (id) {
    VC.state.inv = VC.state.inv.filter((i) => i !== id);
    VC.save();
  };

  VC.addCoins = function (n) {
    VC.state.coins += n;
    VC.ui.refreshHud();
    VC.save();
  };

  VC.learn = function (ids) {
    [].concat(ids).forEach((id) => {
      if (!VC.state.notebook.includes(id)) {
        VC.state.notebook.push(id);
        VC.ui.toast('Novo no Caderno: ' + VC.NOTEBOOK[id].title);
      }
    });
    VC.ui.refreshHud();
    VC.save();
  };

  VC.flag = function (k, v) {
    if (v === undefined) return !!VC.state.flags[k];
    VC.state.flags[k] = v;
    VC.save();
    return v;
  };

  VC.setQuest = function (id) {
    VC.state.quest = id;
    const ch = (VC.QUESTS[id] && VC.QUESTS[id].ch) || 1;
    if (ch > (VC.state.maxCh || 1)) VC.state.maxCh = ch;
    VC.ui.refreshHud();
    VC.save();
    if (VC.world && VC.world.updateMarker) VC.world.updateMarker();
  };

  // Monta o estado do início do capítulo n, como se os anteriores tivessem acabado de ser concluídos.
  // Mantém nomes, moedas, som, capítulo máximo, decoração comprada e estrelas dos capítulos anteriores.
  VC.chapterStartState = function (n) {
    const old = VC.state;
    const s = VC.newState();
    ['player', 'cat', 'rival', 'coins', 'sound'].forEach((k) => { s[k] = old[k]; });
    s.maxCh = Math.max(old.maxCh || 1, n);
    s.flags.controlsHint = true;
    for (let c = 1; c < n; c++) {
      const g = VC.CHAPTER_DATA[c].grants;
      g.inv.forEach((i) => { if (!s.inv.includes(i)) s.inv.push(i); });
      g.flags.forEach((f) => { s.flags[f] = true; });
      g.notebook.forEach((id) => { if (!s.notebook.includes(id)) s.notebook.push(id); });
      g.stars.forEach((k) => { s.stars[k] = old.stars[k] || 0; });
    }
    if (n > 1) { s.cat = s.cat || 'Mol'; s.rival = s.rival || 'Dante'; }
    // decoração comprada é mantida (compras não se perdem ao trocar de capítulo)
    s.decor = (old.decor || []).slice();
    const st = VC.CHAPTER_DATA[n].start;
    s.quest = st.quest;
    s.map = 'praca';
    s.pos = st.spawn;
    return s;
  };

  // Substitui {player}, {cat}, {rival} nas falas
  VC.fmt = function (text) {
    return String(text)
      .replace(/\{player\}/g, VC.state.player || 'você')
      .replace(/\{cat\}/g, VC.state.cat || 'o gato')
      .replace(/\{rival\}/g, VC.state.rival || '???');
  };
})();
