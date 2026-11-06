/* Vale Cobalto - inicialização */
window.VC = window.VC || {};

(function () {
  const v = '__VERSION__';
  VC.VERSION = v.indexOf('__') === 0 ? 'local' : v;

  const $ = (id) => document.getElementById(id);

  function startWorld(map, spawn, face) {
    $('title').hidden = true;
    VC.ui.showHud(true);
    VC.ui.refreshHud();
    VC.game.scene.getScene('World').scene.restart({ map, spawn, face });
  }

  // Celular: tela cheia e paisagem (o Android permite travar; o iPhone não)
  function goFullscreenOnMobile() {
    if (!VC.ui.isTouch) return;
    const lock = () => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) { /* sem suporte */ } };
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(lock).catch(() => {});
    } else lock();
  }

  function rotateTip() {
    const ios = /iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches;
    if (ios && !standalone) {
      $('rotateTip').textContent = 'Dica: no Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início" para jogar em tela cheia.';
    }
  }

  async function newGame() {
    goFullscreenOnMobile();
    VC.ui.sfx('ok');
    if (VC.hasSave()) {
      $('title').hidden = true;
      const c = await VC.ui.choose('narrador', 'Já existe um jogo salvo. Começar do zero apaga esse progresso.', ['Voltar', 'Apagar e começar']);
      if (c === 0) { $('title').hidden = false; return; }
    }
    VC.clearSave();
    $('title').hidden = true;
    VC.state.player = await VC.ui.prompt('Novo jogo', 'Como você se chama?', 'Ari');
    VC.save();
    await VC.ui.story(VC.story.intro);
    startWorld('praca', [5, 9], 'up');
  }

  function continueGame() {
    goFullscreenOnMobile();
    VC.ui.sfx('ok');
    if (!VC.load()) { newGame(); return; }
    VC.story.migrate();
    VC.save();
    startWorld(VC.state.map || 'praca', VC.state.pos || [5, 9], 'down');
  }

  VC.onBoot = function () {
    $('loading').hidden = true;
    $('title').hidden = false;
    const cont = $('btnContinue');
    if (VC.hasSave()) { cont.hidden = false; cont.focus(); } else $('btnNew').focus();
  };

  // Tamanho do canvas em pixels físicos da tela (evita colunas desiguais com escala 125%, 150%...)
  function devSize() {
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    return { dpr, w: 2 * Math.round(window.innerWidth * dpr / 2), h: 2 * Math.round(window.innerHeight * dpr / 2) };
  }
  function fitGame() {
    if (!VC.game) return;
    const s = devSize();
    VC.dpr = s.dpr;
    VC.game.scale.setZoom(1 / s.dpr);
    VC.game.scale.resize(s.w, s.h);
  }
  VC.dpr = devSize().dpr;
  window.addEventListener('resize', fitGame);
  window.addEventListener('orientationchange', () => setTimeout(fitGame, 200));
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fitGame);

  window.addEventListener('DOMContentLoaded', () => {
    VC.ui.init();
    rotateTip();
    $('btnNew').addEventListener('click', newGame);
    $('btnContinue').addEventListener('click', continueGame);
    $('version').textContent = 'Versão ' + VC.VERSION;

    VC.game = new Phaser.Game({
      type: /[?&]canvas/.test(location.search) ? Phaser.CANVAS : Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#0f1626',
      pixelArt: true,
      roundPixels: true,
      scale: { mode: Phaser.Scale.NONE, width: devSize().w, height: devSize().h, zoom: 1 / devSize().dpr },
      physics: { default: 'arcade', arcade: { debug: false } },
      input: { keyboard: { capture: [] } },
      scene: [VC.BootScene, VC.WorldScene]
    });
  });
})();
