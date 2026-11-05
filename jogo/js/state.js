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
    VC.ui.refreshHud();
    VC.save();
    if (VC.world && VC.world.updateMarker) VC.world.updateMarker();
  };

  // Substitui {player}, {cat}, {rival} nas falas
  VC.fmt = function (text) {
    return String(text)
      .replace(/\{player\}/g, VC.state.player || 'você')
      .replace(/\{cat\}/g, VC.state.cat || 'o gato')
      .replace(/\{rival\}/g, VC.state.rival || '???');
  };
})();
