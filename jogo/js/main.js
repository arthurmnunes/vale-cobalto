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

  function goFullscreenOnMobile() {
    if (VC.ui.isTouch && document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
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
    startWorld(VC.state.map || 'praca', VC.state.pos || [5, 9], 'down');
  }

  VC.onBoot = function () {
    $('loading').hidden = true;
    $('title').hidden = false;
    const cont = $('btnContinue');
    if (VC.hasSave()) { cont.hidden = false; cont.focus(); } else $('btnNew').focus();
  };

  window.addEventListener('DOMContentLoaded', () => {
    VC.ui.init();
    $('btnNew').addEventListener('click', newGame);
    $('btnContinue').addEventListener('click', continueGame);
    $('version').textContent = 'Versão ' + VC.VERSION;

    VC.game = new Phaser.Game({
      type: /[?&]canvas/.test(location.search) ? Phaser.CANVAS : Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#0f1626',
      pixelArt: true,
      roundPixels: true,
      scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
      physics: { default: 'arcade', arcade: { debug: false } },
      input: { keyboard: { capture: [] } },
      scene: [VC.BootScene, VC.WorldScene]
    });
  });
})();
