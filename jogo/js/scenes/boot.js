/* Vale Cobalto - prepara texturas e animações geradas por código */
window.VC = window.VC || {};

(function () {
  const CHARS = ['player', 'player_epi', 'prefeita', 'bento', 'lia', 'rival'];

  class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }

    create() {
      const art = VC.art;
      const tx = this.textures;

      tx.addCanvas('tiles', art.extrude(art.tiles(), 16));

      const objs = art.objects();
      Object.keys(objs).forEach((k) => tx.addCanvas(k, objs[k]));

      VC.portraits = {};
      CHARS.forEach((key) => {
        const sheet = art.characterSheet(key);
        const t = tx.addCanvas(key, sheet);
        for (let i = 0; i < 6; i++) t.add(i, 0, i * 16, 0, 16, 16);
        VC.portraits[key] = art.portrait(sheet, 0);
        ['down', 'up', 'side'].forEach((dir, d) => {
          this.anims.create({ key: key + '-' + dir, frames: [{ key, frame: d * 2 + 1 }, { key, frame: d * 2 }], frameRate: 6, repeat: -1 });
        });
      });

      const cat = art.catSheet();
      const ct = tx.addCanvas('cat', cat);
      ct.add(0, 0, 0, 0, 16, 16); ct.add(1, 0, 16, 0, 16, 16);
      VC.portraits.cat = art.portrait(cat, 0);
      this.anims.create({
        key: 'cat-idle',
        frames: [{ key: 'cat', frame: 0, duration: 2600 }, { key: 'cat', frame: 1, duration: 160 }],
        repeat: -1
      });

      this.scene.start('World', { map: 'praca', attract: true });
      VC.onBoot && VC.onBoot();
    }
  }

  VC.BootScene = BootScene;
})();
