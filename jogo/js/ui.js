/* Vale Cobalto - interface em DOM sobre o canvas do jogo */
window.VC = window.VC || {};

(function () {
  const ui = {};
  VC.ui = ui;
  VC.input = { vec: { x: 0, y: 0 } };

  const $ = (id) => document.getElementById(id);
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ---------- Texto com subscrito: H_2O -> H<sub>2</sub>O ---------- */
  function segments(text) {
    const out = [];
    const re = /_(\d+)/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      for (const ch of text.slice(last, m.index)) out.push({ t: ch });
      out.push({ sub: m[1] });
      last = re.lastIndex;
    }
    for (const ch of text.slice(last)) out.push({ t: ch });
    return out;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function segHtml(segs, n) {
    let h = '';
    for (let i = 0; i < Math.min(n, segs.length); i++) h += segs[i].sub ? '<sub>' + esc(segs[i].sub) + '</sub>' : esc(segs[i].t);
    return h;
  }
  ui.rich = function (node, text) {
    const s = segments(VC.fmt(text));
    node.innerHTML = segHtml(s, s.length);
    return node;
  };
  function richEl(tag, cls, text) { return ui.rich(el(tag, cls), text); }

  /* ---------- Sons simples (Web Audio, sem arquivos) ---------- */
  let actx = null;
  ui.sfx = function (kind) {
    if (!VC.state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const notes = {
        blip: [[660, 0.03]], ok: [[523, 0.08], [784, 0.12]], err: [[220, 0.12], [180, 0.14]],
        coin: [[988, 0.06], [1319, 0.1]], door: [[330, 0.06], [262, 0.08]], open: [[440, 0.05], [554, 0.06]],
        win: [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.2]]
      }[kind] || [[440, 0.05]];
      let t = actx.currentTime;
      notes.forEach(([f, d]) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = kind === 'err' ? 'sawtooth' : 'square';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.045, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g).connect(actx.destination);
        o.start(t); o.stop(t + d + 0.02);
        t += d;
      });
    } catch (e) { /* sem áudio */ }
  };

  /* ---------- Controle de "ocupado" (pausa o personagem) ---------- */
  let locks = 0;
  ui.lock = () => { locks++; };
  ui.unlock = () => { locks = Math.max(0, locks - 1); };
  ui.isBusy = () => locks > 0 || $('layer').children.length > 0 || !$('title').hidden;
  ui.current = null; // diálogo ativo que avança com E/Espaço/A

  ui.advance = function () {
    if (ui.current && ui.current.advance) { ui.current.advance(); return true; }
    return false;
  };

  /* ---------- HUD ---------- */
  ui.refreshHud = function () {
    const q = VC.QUESTS[VC.state.quest];
    $('objectiveText').textContent = q ? q.text : '';
    $('coinCount').textContent = VC.state.coins;
  };

  ui.showHud = function (on) {
    $('hud').hidden = !on;
    $('touch').hidden = !(on && ui.isTouch);
  };

  /* ---------- Avisos rápidos ---------- */
  ui.toast = function (text, icon) {
    const t = el('div', 'toast');
    if (icon) { const i = el('img', 'pixel'); i.src = icon; i.alt = ''; t.appendChild(i); }
    t.appendChild(richEl('span', '', text));
    $('toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3100);
  };

  /* ---------- Diálogo ---------- */
  ui.say = function (who, text) {
    return new Promise((resolve) => {
      const sp = VC.SPEAKERS[who] || { name: who };
      const name = typeof sp.name === 'function' ? sp.name() : sp.name;
      const box = el('div', 'panel dialog');
      box.setAttribute('role', 'dialog');
      if (sp.sprite && VC.portraits[sp.sprite]) {
        const p = el('img', 'portrait pixel'); p.src = VC.portraits[sp.sprite]; p.alt = '';
        box.appendChild(p);
      }
      const body = el('div', 'dialog-body');
      if (name) body.appendChild(el('div', 'nametag', name));
      const txt = el('p', 'dialog-text');
      txt.setAttribute('aria-live', 'polite');
      body.appendChild(txt);
      box.appendChild(body);
      const next = el('div', 'next', '▼');
      next.hidden = true;
      box.appendChild(next);
      $('layer').appendChild(box);

      const segs = segments(VC.fmt(text));
      let n = 0, done = false;
      const timer = setInterval(() => {
        n++;
        txt.innerHTML = segHtml(segs, n);
        if (n % 3 === 0) ui.sfx('blip');
        if (n >= segs.length) finish();
      }, 22);
      function finish() { clearInterval(timer); txt.innerHTML = segHtml(segs, segs.length); done = true; next.hidden = false; }
      const ctl = {
        advance() {
          if (!done) { finish(); return; }
          clearInterval(timer);
          box.remove();
          ui.current = null;
          resolve();
        }
      };
      box.addEventListener('click', () => ctl.advance());
      ui.current = ctl;
    });
  };

  // Sequência de falas: [['prefeita', 'texto'], ...]
  ui.talk = async function (lines) {
    for (const [who, text] of lines) await ui.say(who, text);
  };

  /* ---------- Escolha ---------- */
  ui.choose = function (who, text, options) {
    return new Promise((resolve) => {
      const sp = VC.SPEAKERS[who] || { name: '' };
      const name = typeof sp.name === 'function' ? sp.name() : sp.name;
      const box = el('div', 'panel dialog');
      if (sp.sprite && VC.portraits[sp.sprite]) {
        const p = el('img', 'portrait pixel'); p.src = VC.portraits[sp.sprite]; p.alt = '';
        box.appendChild(p);
      }
      const body = el('div', 'dialog-body');
      if (name) body.appendChild(el('div', 'nametag', name));
      body.appendChild(richEl('p', 'dialog-text', text));
      const list = el('div', 'choices');
      options.forEach((o, i) => {
        const b = richEl('button', 'btn choice', o);
        b.addEventListener('click', () => { ui.sfx('blip'); box.remove(); resolve(i); });
        list.appendChild(b);
      });
      body.appendChild(list);
      box.appendChild(body);
      $('layer').appendChild(box);
      list.firstChild.focus();
    });
  };

  /* ---------- Janela genérica ---------- */
  ui.modal = function (opts) {
    const wrap = el('div', 'overlay');
    const box = el('div', 'panel modal' + (opts.wide ? ' wide' : ''));
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    const head = el('div', 'modal-head');
    head.appendChild(el('h2', '', opts.title));
    let closeFn = null;
    if (opts.closable !== false) {
      const x = el('button', 'btn ghost close', 'Fechar');
      x.addEventListener('click', () => api.close());
      head.appendChild(x);
    }
    box.appendChild(head);
    const content = el('div', 'modal-content');
    box.appendChild(content);
    wrap.appendChild(box);
    $('layer').appendChild(wrap);
    const api = {
      el: box, content,
      close() {
        if (!wrap.isConnected) return;
        wrap.remove();
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        if (api.onClose) api.onClose();
      }
    };
    if (opts.closable !== false) {
      wrap.addEventListener('click', (e) => { if (e.target === wrap) api.close(); });
      api.escClose = true;
    }
    ui.topModal = api;
    setTimeout(() => { const f = box.querySelector('button:not(.close), input'); if (f) f.focus(); }, 30);
    return api;
  };

  /* ---------- Pedir um nome ---------- */
  ui.prompt = function (title, label, fallback) {
    return new Promise((resolve) => {
      const m = ui.modal({ title, closable: false });
      const lab = el('label', 'field-label', label);
      const inp = el('input', 'field');
      inp.type = 'text'; inp.maxLength = 14; inp.placeholder = fallback; inp.autocomplete = 'off';
      inp.setAttribute('enterkeyhint', 'done');
      lab.appendChild(inp);
      m.content.appendChild(lab);
      const ok = el('button', 'btn primary', 'Confirmar');
      m.content.appendChild(ok);
      const send = () => {
        const v = inp.value.replace(/[<>{}]/g, '').trim().slice(0, 14) || fallback;
        m.close();
        ui.sfx('ok');
        resolve(v);
      };
      ok.addEventListener('click', send);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } e.stopPropagation(); });
      setTimeout(() => inp.focus(), 60);
    });
  };

  /* ---------- Tela de história ---------- */
  ui.story = function (paragraphs, opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const wrap = el('div', 'overlay story');
      const box = el('div', 'story-box');
      if (opts.title) box.appendChild(el('h2', 'story-title', opts.title));
      const p = el('p', 'story-text');
      box.appendChild(p);
      const hint = el('div', 'story-hint', ui.isTouch ? 'Toque para continuar' : 'Clique ou aperte E para continuar');
      box.appendChild(hint);
      const skip = el('button', 'btn ghost skip', 'Pular');
      wrap.appendChild(box);
      if (opts.skippable !== false) wrap.appendChild(skip);
      $('layer').appendChild(wrap);
      let i = -1, timer = null, done = true, segs = [], n = 0;
      function show() {
        i++;
        if (i >= paragraphs.length) { end(); return; }
        segs = segments(VC.fmt(paragraphs[i])); n = 0; done = false;
        clearInterval(timer);
        timer = setInterval(() => {
          n++; p.innerHTML = segHtml(segs, n);
          if (n >= segs.length) { clearInterval(timer); done = true; }
        }, 26);
      }
      function end() { clearInterval(timer); wrap.remove(); ui.current = null; resolve(); }
      const ctl = { advance() { if (!done) { clearInterval(timer); p.innerHTML = segHtml(segs, segs.length); done = true; } else show(); } };
      wrap.addEventListener('click', (e) => { if (e.target !== skip) ctl.advance(); });
      skip.addEventListener('click', end);
      ui.current = ctl;
      show();
    });
  };

  /* ---------- Mochila ---------- */
  ui.inventory = function () {
    if (ui.isBusy()) return;
    ui.sfx('open');
    const m = ui.modal({ title: 'Mochila', wide: true });
    const grid = el('div', 'inv-grid');
    const detail = el('div', 'inv-detail');
    const slots = 12;
    const items = VC.state.inv.filter((id) => VC.ITEMS[id]);
    function select(id, btn) {
      grid.querySelectorAll('.slot').forEach((s) => s.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      detail.innerHTML = '';
      detail.appendChild(el('h3', '', VC.ITEMS[id].name));
      detail.appendChild(richEl('p', '', VC.ITEMS[id].desc));
    }
    for (let i = 0; i < slots; i++) {
      const id = items[i];
      const s = el('button', 'slot');
      if (id) {
        const img = el('img', 'pixel'); img.src = VC.art.icon(VC.ITEMS[id].icon); img.alt = VC.ITEMS[id].name;
        s.appendChild(img);
        s.setAttribute('aria-label', VC.ITEMS[id].name);
        s.addEventListener('click', () => select(id, s));
      } else {
        s.disabled = true; s.setAttribute('aria-label', 'Espaço vazio');
      }
      grid.appendChild(s);
    }
    if (items.length) {
      setTimeout(() => select(items[0], grid.firstChild), 0);
    } else {
      detail.appendChild(el('p', 'muted', 'A mochila está vazia. Converse com as pessoas e complete missões para receber itens.'));
    }
    const row = el('div', 'inv-row');
    row.appendChild(grid); row.appendChild(detail);
    m.content.appendChild(row);
  };

  /* ---------- Caderno do Laboratório ---------- */
  ui.notebook = function () {
    if (ui.isBusy()) return;
    ui.sfx('open');
    const m = ui.modal({ title: 'Caderno do Laboratório', wide: true });
    const ids = VC.state.notebook;
    if (!ids.length) {
      m.content.appendChild(el('p', 'muted', 'Ainda vazio. Cada desafio concluído registra aqui os conceitos que você aprendeu.'));
      return;
    }
    const list = el('div', 'notes');
    ids.forEach((id) => {
      const n = VC.NOTEBOOK[id];
      if (!n) return;
      const item = el('article', 'note');
      item.appendChild(richEl('h3', '', n.title));
      item.appendChild(richEl('p', '', n.text));
      list.appendChild(item);
    });
    m.content.appendChild(list);
    m.content.appendChild(el('p', 'muted small', ids.length + ' de ' + Object.keys(VC.NOTEBOOK).length + ' conceitos do Capítulo 1 registrados.'));
  };

  /* ---------- Menu ---------- */
  ui.menu = function () {
    if (ui.isBusy()) return;
    ui.sfx('open');
    const m = ui.modal({ title: 'Menu' });
    const list = el('div', 'menu-list');
    const add = (label, fn, cls) => { const b = el('button', 'btn ' + (cls || ''), label); b.addEventListener('click', fn); list.appendChild(b); return b; };
    add('Voltar ao jogo', () => m.close(), 'primary');
    const snd = add('Som: ' + (VC.state.sound ? 'ligado' : 'desligado'), () => {
      VC.state.sound = !VC.state.sound; VC.save();
      snd.textContent = 'Som: ' + (VC.state.sound ? 'ligado' : 'desligado');
    });
    if (document.fullscreenEnabled) add('Tela cheia', () => { ui.toggleFullscreen(); m.close(); });
    add('Como jogar', () => { m.close(); ui.help(); });
    add('Recomeçar do zero', async () => {
      m.close();
      const c = await ui.choose('narrador', 'Apagar o progresso salvo e começar um novo jogo?', ['Não, continuar jogando', 'Sim, apagar e recomeçar']);
      if (c === 1) { VC.clearSave(); location.reload(); }
    }, 'danger');
    m.content.appendChild(list);
    m.content.appendChild(el('p', 'muted small', 'O jogo salva sozinho a cada missão. Versão ' + (VC.VERSION || 'local') + '.'));
  };

  ui.help = function () {
    const m = ui.modal({ title: 'Como jogar' });
    const rows = ui.isTouch
      ? [['Joystick', 'Mover'], ['Botão A', 'Conversar, examinar e avançar textos'], ['Mochila', 'Ver itens'], ['Caderno', 'Rever conceitos aprendidos']]
      : [['WASD ou setas', 'Mover'], ['E ou Espaço', 'Conversar, examinar e avançar textos'], ['I', 'Mochila'], ['C', 'Caderno do Laboratório'], ['Esc', 'Menu']];
    const t = el('table', 'keys');
    rows.forEach(([k, v]) => { const tr = el('tr'); tr.appendChild(el('th', '', k)); tr.appendChild(el('td', '', v)); t.appendChild(tr); });
    m.content.appendChild(t);
    m.content.appendChild(el('p', 'muted small', 'Siga o objetivo no canto da tela e procure o sinal de exclamação amarelo.'));
  };

  ui.toggleFullscreen = function () {
    try {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
    } catch (e) { /* sem suporte */ }
  };

  /* ---------- Loja ---------- */
  ui.shop = function () {
    return new Promise((resolve) => {
      ui.sfx('open');
      const m = ui.modal({ title: 'Barraca do Seu Bento', wide: true });
      m.onClose = resolve;
      const wallet = el('p', 'wallet');
      const list = el('div', 'shop');
      function render() {
        wallet.textContent = 'Suas moedas: ' + VC.state.coins;
        list.innerHTML = '';
        VC.SHOP.forEach((it) => {
          const row = el('div', 'shop-item');
          const img = el('img', 'pixel'); img.alt = ''; img.src = VC.art.objectIcon(it.id === 'bunsen' || it.id === 'tubos' ? 'bancada' : it.id);
          row.appendChild(img);
          const info = el('div', 'shop-info');
          info.appendChild(el('h3', '', it.name));
          info.appendChild(el('p', '', it.lockedText || it.desc));
          row.appendChild(info);
          const owned = VC.state.decor.includes(it.id);
          const b = el('button', 'btn small', owned ? 'Comprado' : it.lockedText ? 'Bloqueado' : it.price + ' moedas');
          b.disabled = owned || !!it.lockedText;
          if (!b.disabled && VC.state.coins < it.price) b.classList.add('poor');
          b.addEventListener('click', () => {
            if (VC.state.coins < it.price) { ui.sfx('err'); ui.toast('Faltam ' + (it.price - VC.state.coins) + ' moedas.'); return; }
            VC.state.coins -= it.price;
            VC.state.decor.push(it.id);
            VC.save(); ui.refreshHud(); ui.sfx('coin');
            ui.toast(it.name + ' vai para o laboratório.');
            render();
          });
          row.appendChild(b);
          list.appendChild(row);
        });
      }
      render();
      m.content.appendChild(wallet);
      m.content.appendChild(list);
    });
  };

  /* ---------- Quadro de pedidos (roteiro) ---------- */
  ui.roadmap = function () {
    return new Promise((resolve) => {
      const m = ui.modal({ title: 'Quadro de pedidos da cidade', wide: true });
      m.onClose = resolve;
      const done1 = VC.flag('cap1');
      const list = el('ol', 'roadmap');
      VC.CHAPTERS.forEach((c) => {
        const li = el('li', 'chapter');
        const status = c.n === 1 ? (done1 ? 'Concluído' : 'Em andamento') : (c.n === 2 && done1 ? 'Em breve' : 'Bloqueado');
        li.classList.add(status === 'Concluído' ? 'is-done' : status === 'Em andamento' ? 'is-now' : 'is-locked');
        li.appendChild(el('h3', '', 'Capítulo ' + c.n + ': ' + c.title));
        li.appendChild(el('p', '', c.topic));
        li.appendChild(el('p', 'small', 'Recompensa: ' + c.reward));
        li.appendChild(el('span', 'badge', status));
        list.appendChild(li);
      });
      m.content.appendChild(list);
      m.content.appendChild(el('p', 'muted small', 'Objetivo final: concluir a Fórmula Aurora e apresentá-la no Congresso Internacional de Química.'));
    });
  };

  /* ---------- Desafios ---------- */
  function starsFor(errors) { return errors <= 1 ? 3 : errors <= 3 ? 2 : 1; }

  function feedback(box, ok, title, why, onNext, nextLabel) {
    box.innerHTML = '';
    box.className = 'feedback ' + (ok ? 'ok' : 'err');
    box.appendChild(el('strong', '', title));
    if (why) box.appendChild(richEl('p', '', why));
    const b = el('button', 'btn primary', nextLabel || 'Continuar');
    b.addEventListener('click', onNext);
    box.appendChild(b);
    box.hidden = false;
    setTimeout(() => b.focus(), 20);
  }

  function sortGame(cfg, m) {
    return new Promise((resolve) => {
      const queue = cfg.items.slice().sort(() => Math.random() - 0.5);
      let errors = 0, correct = 0;
      const total = cfg.items.length;
      m.content.appendChild(richEl('p', 'prompt', cfg.prompt));
      const prog = el('div', 'progress'); const bar = el('div', 'bar'); prog.appendChild(bar);
      m.content.appendChild(prog);
      const card = el('div', 'card');
      m.content.appendChild(card);
      const bins = el('div', 'bins');
      m.content.appendChild(bins);
      const fb = el('div', 'feedback'); fb.hidden = true;
      m.content.appendChild(fb);
      let current = null;
      const buttons = cfg.bins.map((label, i) => {
        const b = el('button', 'btn bin', label);
        b.addEventListener('click', () => answer(i));
        bins.appendChild(b);
        return b;
      });
      function setBins(on) { buttons.forEach((b) => { b.disabled = !on; }); }
      function next() {
        fb.hidden = true;
        bar.style.width = (correct / total * 100) + '%';
        if (!queue.length) { resolve({ errors }); return; }
        current = queue.shift();
        ui.rich(card, current.label);
        card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
        setBins(true);
        buttons[0].focus();
      }
      function answer(i) {
        setBins(false);
        if (i === current.bin) {
          correct++; ui.sfx('ok');
          bar.style.width = (correct / total * 100) + '%';
          feedback(fb, true, 'Certo: ' + cfg.bins[i] + '.', current.why, next);
        } else {
          errors++; ui.sfx('err');
          queue.push(current);
          feedback(fb, false, 'Ainda não. A resposta é: ' + cfg.bins[current.bin] + '.', current.why + ' Esse item volta para o fim da fila.', next);
        }
      }
      next();
    });
  }

  function quizGame(cfg, m) {
    return new Promise((resolve) => {
      let i = 0, errors = 0;
      const prog = el('div', 'progress'); const bar = el('div', 'bar'); prog.appendChild(bar);
      m.content.appendChild(prog);
      const q = el('p', 'card question');
      m.content.appendChild(q);
      const opts = el('div', 'options');
      m.content.appendChild(opts);
      const fb = el('div', 'feedback'); fb.hidden = true;
      m.content.appendChild(fb);
      function show() {
        fb.hidden = true;
        bar.style.width = (i / cfg.questions.length * 100) + '%';
        if (i >= cfg.questions.length) { resolve({ errors }); return; }
        const item = cfg.questions[i];
        ui.rich(q, item.q);
        opts.innerHTML = '';
        item.options.forEach((o, k) => {
          const b = richEl('button', 'btn option', o);
          b.addEventListener('click', () => {
            opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
            opts.children[item.answer].classList.add('right');
            const ok = k === item.answer;
            if (!ok) { b.classList.add('wrong'); errors++; ui.sfx('err'); } else ui.sfx('ok');
            i++;
            feedback(fb, ok, ok ? 'Correto!' : 'Não foi dessa vez.', item.why, show);
          });
          opts.appendChild(b);
        });
        opts.firstChild.focus();
      }
      show();
    });
  }

  function pickGame(cfg, m) {
    return new Promise((resolve) => {
      let errors = 0;
      m.content.appendChild(richEl('p', 'prompt', cfg.prompt));
      const grid = el('div', 'pick');
      const chosen = new Set();
      cfg.options.forEach((o, k) => {
        const b = el('button', 'btn toggle', o.label);
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => {
          if (chosen.has(k)) chosen.delete(k); else chosen.add(k);
          b.setAttribute('aria-pressed', chosen.has(k) ? 'true' : 'false');
          ui.sfx('blip');
        });
        grid.appendChild(b);
      });
      m.content.appendChild(grid);
      const confirm = el('button', 'btn primary', 'Confirmar escolha');
      m.content.appendChild(confirm);
      const fb = el('div', 'feedback'); fb.hidden = true;
      m.content.appendChild(fb);
      confirm.addEventListener('click', () => {
        const wrong = cfg.options.filter((o, k) => chosen.has(k) && !o.ok);
        const missing = cfg.options.filter((o, k) => !chosen.has(k) && o.ok);
        if (!wrong.length && !missing.length) {
          ui.sfx('ok');
          confirm.hidden = true;
          grid.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          feedback(fb, true, 'Tudo certo, equipamento completo!', cfg.options.filter((o) => o.ok).map((o) => o.label + ': ' + o.why).join(' '), () => resolve({ errors }));
          return;
        }
        errors++; ui.sfx('err');
        const parts = wrong.map((o) => o.label + ': ' + o.why);
        if (missing.length) parts.push(missing.length > 1 ? 'Estão faltando ' + missing.length + ' itens obrigatórios.' : 'Está faltando 1 item obrigatório.');
        feedback(fb, false, 'Revise sua escolha.', parts.join(' '), () => { fb.hidden = true; confirm.focus(); }, 'Tentar de novo');
      });
    });
  }

  // Executa uma sequência de desafios e devolve estrelas e erros
  ui.challenge = async function (ids, title) {
    ui.lock();
    let errors = 0;
    for (const id of [].concat(ids)) {
      const cfg = VC.CHALLENGES[id];
      const m = ui.modal({ title: cfg.title, wide: true, closable: false });
      m.el.classList.add('challenge');
      const res = await (cfg.type === 'sort' ? sortGame(cfg, m) : cfg.type === 'quiz' ? quizGame(cfg, m) : pickGame(cfg, m));
      errors += res.errors;
      m.close();
    }
    const stars = starsFor(errors);
    ui.unlock();
    await ui.result(title, stars, errors);
    return { stars, errors };
  };

  ui.result = function (title, stars, errors) {
    return new Promise((resolve) => {
      ui.sfx('win');
      const m = ui.modal({ title: title || 'Desafio concluído', closable: false });
      const s = el('div', 'stars');
      s.setAttribute('aria-label', stars + ' de 3 estrelas');
      for (let i = 0; i < 3; i++) s.appendChild(el('span', i < stars ? 'star on' : 'star', '★'));
      m.content.appendChild(s);
      m.content.appendChild(el('p', 'center', errors === 0 ? 'Sem nenhum erro. Excelente!' : errors + (errors === 1 ? ' erro' : ' erros') + ' no caminho, e tudo aprendido.'));
      const b = el('button', 'btn primary', 'Continuar');
      b.addEventListener('click', () => { m.close(); resolve(); });
      m.content.appendChild(b);
    });
  };

  /* ---------- Cartão de capítulo ---------- */
  ui.chapterCard = function (title, lines) {
    return new Promise((resolve) => {
      ui.sfx('win');
      const m = ui.modal({ title, closable: false });
      m.el.classList.add('chapter-card');
      lines.forEach((l) => m.content.appendChild(richEl('p', '', l)));
      const b = el('button', 'btn primary', 'Continuar');
      b.addEventListener('click', () => { m.close(); resolve(); });
      m.content.appendChild(b);
    });
  };

  /* ---------- Teclado ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.target && e.target.tagName === 'INPUT') return;
    const k = e.key.toLowerCase();
    if (k === 'e' || k === ' ' || k === 'enter') {
      if (ui.current) { e.preventDefault(); ui.advance(); return; }
      const a = document.activeElement;
      const inLayer = a && a.closest && a.closest('#layer');
      if (inLayer) { if (k === 'e' && a.tagName === 'BUTTON') a.click(); return; } // botões das janelas
      if (a && a.tagName === 'BUTTON') a.blur();
      if (!ui.isBusy() && VC.world && VC.world.ready) { e.preventDefault(); VC.world.interact(); }
      return;
    }
    if (k === 'escape') {
      if (ui.topModal && ui.topModal.escClose && ui.topModal.el.isConnected) { ui.topModal.close(); return; }
      if (!ui.isBusy() && !$('hud').hidden) ui.menu();
      return;
    }
    if (!$('hud').hidden && !ui.isBusy()) {
      if (k === 'i') ui.inventory();
      if (k === 'c') ui.notebook();
    }
  });

  /* ---------- Controles de toque ---------- */
  ui.isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  ui.init = function () {
    $('coinIcon').src = VC.art.icon('moeda');
    $('btnBag').addEventListener('click', () => ui.inventory());
    $('btnBook').addEventListener('click', () => ui.notebook());
    $('btnMenu').addEventListener('click', () => ui.menu());

    const btnA = $('btnA');
    const pressA = (e) => {
      e.preventDefault();
      btnA.classList.add('down');
      if (!ui.advance() && !ui.isBusy() && VC.world && VC.world.ready) VC.world.interact();
    };
    btnA.addEventListener('pointerdown', pressA);
    btnA.addEventListener('pointerup', () => btnA.classList.remove('down'));
    btnA.addEventListener('pointerleave', () => btnA.classList.remove('down'));

    const stick = $('stick'), knob = $('knob');
    let pid = null;
    function move(e) {
      const r = stick.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let dx = e.clientX - cx, dy = e.clientY - cy;
      const max = r.width / 2 - 8;
      const d = Math.hypot(dx, dy);
      if (d > max) { dx = dx / d * max; dy = dy / d * max; }
      knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      const nx = dx / max, ny = dy / max;
      VC.input.vec = Math.hypot(nx, ny) < 0.25 ? { x: 0, y: 0 } : { x: nx, y: ny };
    }
    function reset() { pid = null; knob.style.transform = ''; VC.input.vec = { x: 0, y: 0 }; }
    stick.addEventListener('pointerdown', (e) => { e.preventDefault(); pid = e.pointerId; stick.setPointerCapture(pid); move(e); });
    stick.addEventListener('pointermove', (e) => { if (e.pointerId === pid) move(e); });
    stick.addEventListener('pointerup', reset);
    stick.addEventListener('pointercancel', reset);

    // Evita zoom por toque duplo durante o jogo
    document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
  };
})();
