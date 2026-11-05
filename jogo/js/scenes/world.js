/* Vale Cobalto - cena do mundo (mapa, movimento, interação) */
window.VC = window.VC || {};

(function () {
  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const FRAME = { down: 0, up: 2, left: 4, right: 4 };
  const SPEED = 72;

  class WorldScene extends Phaser.Scene {
    constructor() { super('World'); }

    init(data) {
      this.mapKey = data.map || 'praca';
      this.spawn = data.spawn || [5, 8];
      this.face = data.face || 'down';
      this.attract = !!data.attract;
      this.ready = false;
      this.transitioning = false;
      this.doorCooldown = 0;
      this.lastSave = 0;
    }

    create() {
      VC.world = this;
      const def = VC.MAPS[this.mapKey];
      this.def = def;
      this.cameras.main.setBackgroundColor(def.bg);

      const map = this.make.tilemap({ data: def.grid, tileWidth: 16, tileHeight: 16 });
      const ts = map.addTilesetImage('tiles', 'tiles', 16, 16, 1, 2);
      this.layer = map.createLayer(0, ts, 0, 0);
      this.layer.setCollision(VC.art.SOLID);
      this.tilemap = map;
      this.mapW = map.widthInPixels;
      this.mapH = map.heightInPixels;
      this.physics.world.setBounds(0, 0, this.mapW, this.mapH);

      this.solids = this.physics.add.staticGroup();
      this.things = {};
      def.objects.forEach((o) => this.addObject(o));
      this.npcs = {};
      def.npcs.forEach((n) => { if (!n.cond || n.cond()) this.addNpc(n); });

      this.marker = this.add.image(0, 0, 'marker').setOrigin(0.5, 1).setDepth(100000).setVisible(false);
      this.bubble = this.add.image(0, 0, 'bubble').setOrigin(0.5, 1).setDepth(100001).setVisible(false);

      const cam = this.cameras.main;
      cam.roundPixels = true;

      if (this.attract) {
        this.applyZoom();
        cam.centerOn(this.mapW / 2, this.mapH / 2 - 16);
        this.tweens.add({ targets: cam, scrollX: '+=90', duration: 9000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      } else {
        const tex = VC.flag('epi') ? 'player_epi' : 'player';
        this.player = this.physics.add.sprite(this.spawn[0] * 16 + 8, this.spawn[1] * 16 + 14, tex, FRAME[this.face]);
        this.player.setOrigin(0.5, 1);
        this.player.body.setSize(8, 5).setOffset(4, 10);
        this.player.setCollideWorldBounds(true);
        this.player.setFlipX(this.face === 'left');
        this.facing = this.face;
        this.shadow = this.add.image(0, 0, 'sombra').setOrigin(0.5, 0.5);
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.solids);
        this.applyZoom();
        this.snapCamera(true);
        this.keys = this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT', false);
        VC.state.map = this.mapKey;
        VC.state.pos = this.spawn;
        VC.save();
        this.ready = true;
        this.updateMarker();
        VC.story.onEnter(this);
      }

      this.scale.on('resize', this.applyZoom, this);
      this.events.once('shutdown', () => this.scale.off('resize', this.applyZoom, this));
      cam.fadeIn(260, 15, 22, 38);
    }

    applyZoom() {
      const cam = this.cameras.main;
      const w = this.scale.width, h = this.scale.height;
      cam.setSize(w, h);
      // Zoom inteiro em pixels físicos: cada pixel do jogo ocupa sempre o mesmo número de pixels da tela
      const z = Math.max(2, Math.floor(Math.min(h, w * 0.75) / 165));
      cam.setZoom(z);
      this.zoom = z;
      const vw = w / z, vh = h / z;
      const bw = Math.max(this.mapW, vw), bh = Math.max(this.mapH, vh);
      const q = (v) => Math.floor(v * z) / z;
      cam.setBounds(q((this.mapW - bw) / 2), q((this.mapH - bh) / 2), bw, bh);
      if (this.player) this.snapCamera(true);
    }

    // Câmera segue o personagem e para sempre em pixel físico inteiro
    snapCamera(instant) {
      const cam = this.cameras.main;
      const z = this.zoom || cam.zoom;
      const tx = this.player.x - cam.width / 2;
      const ty = this.player.y - 8 - cam.height / 2;
      this.camX = instant || this.camX === undefined ? tx : this.camX + (tx - this.camX) * 0.2;
      this.camY = instant || this.camY === undefined ? ty : this.camY + (ty - this.camY) * 0.2;
      cam.setScroll(Math.round(this.camX * z) / z, Math.round(this.camY * z) / z);
    }

    texOf(o) { return typeof o.tex === 'function' ? o.tex() : o.tex; }

    addObject(o) {
      if (o.cond && !o.cond()) return;
      const img = this.add.image(o.x * 16, (o.y + 1) * 16, this.texOf(o)).setOrigin(0, 1);
      img.setDepth(o.depth !== undefined ? o.depth : img.y);
      const thing = { id: o.id, def: o, sprite: img, talk: o.talk || o.id };
      if (o.solid !== false) {
        const sh = o.solidH || 8;
        const zone = this.add.zone(img.x + img.width / 2, img.y - sh / 2, img.width - 2, sh);
        this.physics.add.existing(zone, true);
        this.solids.add(zone);
        thing.zone = zone;
      }
      this.things[o.id] = thing;
    }

    refreshObject(id) {
      const t = this.things[id];
      if (t) { t.sprite.setTexture(this.texOf(t.def)); return; }
      const o = this.def.objects.find((x) => x.id === id);
      if (o) this.addObject(o);
    }

    addNpc(n) {
      const [tx, ty] = n.pos();
      const isCat = n.sprite === 'cat';
      const s = this.add.sprite(tx * 16 + 8, ty * 16 + 15, n.sprite, isCat ? 0 : FRAME[n.face || 'down']).setOrigin(0.5, 1);
      s.setFlipX(n.face === 'left');
      s.setDepth(s.y);
      if (isCat) s.play('cat-idle');
      const npc = { id: n.id, def: n, sprite: s, talk: n.id, isCat };
      npc.shadow = this.add.image(s.x, s.y - 1, 'sombra').setDepth(s.y - 1);
      if (n.solid !== false) {
        const zone = this.add.zone(s.x, s.y - 3, 10, 6);
        this.physics.add.existing(zone, true);
        this.solids.add(zone);
        npc.zone = zone;
      }
      this.npcs[n.id] = npc;
      this.things['npc:' + n.id] = npc;
      return npc;
    }

    removeNpc(id) {
      const n = this.npcs[id];
      if (!n) return;
      if (n.zone) n.zone.destroy();
      n.shadow.destroy();
      n.sprite.destroy();
      delete this.npcs[id];
      delete this.things['npc:' + id];
    }

    // Faz um NPC andar até um tile (sem colisão, para cenas roteirizadas)
    walkNpc(id, to, speed) {
      return new Promise((resolve) => {
        const n = this.npcs[id];
        if (!n) { resolve(); return; }
        const s = n.sprite;
        const x = to[0] * 16 + 8, y = to[1] * 16 + 15;
        const dx = x - s.x, dy = y - s.y;
        const dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
        s.setFlipX(dir === 'left');
        s.play(n.def.sprite + '-' + (dir === 'left' || dir === 'right' ? 'side' : dir));
        if (n.zone) n.zone.body.enable = false;
        const dur = Math.max(200, Math.hypot(dx, dy) / (speed || 55) * 1000);
        this.tweens.add({
          targets: s, x, y, duration: dur,
          onUpdate: () => { s.setDepth(s.y); n.shadow.setPosition(s.x, s.y - 1).setDepth(s.y - 1); },
          onComplete: () => {
            s.stop(); s.setFrame(FRAME[dir]);
            if (n.zone) { n.zone.setPosition(s.x, s.y - 3); n.zone.body.updateFromGameObject(); n.zone.body.enable = true; }
            resolve();
          }
        });
      });
    }

    faceNpcToPlayer(n) {
      if (!n || n.isCat || !this.player) return;
      const dx = this.player.x - n.sprite.x, dy = this.player.y - n.sprite.y;
      const dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
      n.sprite.setFrame(FRAME[dir]);
      n.sprite.setFlipX(dir === 'left');
    }

    setFacing(dir) {
      this.facing = dir;
      this.player.anims.stop();
      this.player.setFrame(FRAME[dir]);
      this.player.setFlipX(dir === 'left');
    }

    wearEpi() {
      this.player.setTexture('player_epi', FRAME[this.facing]);
    }

    interactPoint() {
      const d = DIRS[this.facing];
      return { x: this.player.x + d[0] * 12, y: this.player.y - 3 + d[1] * 12 };
    }

    findTarget() {
      const p = this.interactPoint();
      let best = null, bestD = Infinity;
      Object.values(this.things).forEach((t) => {
        const b = t.sprite.getBounds();
        const pad = 4;
        const inside = p.x >= b.x - pad && p.x <= b.right + pad && p.y >= b.y - pad && p.y <= b.bottom + pad;
        const cx = Phaser.Math.Clamp(p.x, b.x, b.right), cy = Phaser.Math.Clamp(p.y, b.y, b.bottom);
        const d = Math.hypot(p.x - cx, p.y - cy);
        if ((inside || d < 10) && d < bestD) { best = t; bestD = d; }
      });
      return best;
    }

    tileAt(x, y) {
      const t = this.tilemap.getTileAtWorldXY(x, y, true);
      return t ? { idx: t.index, tx: t.x, ty: t.y } : null;
    }

    async interact() {
      if (!this.ready || this.transitioning) return;
      const t = this.findTarget();
      if (t) {
        if (t.id && this.npcs[t.def.id] === t) this.faceNpcToPlayer(t);
        await VC.story.interact(t.talk, this);
        return;
      }
      const p = this.interactPoint();
      const tile = this.tileAt(p.x, p.y);
      if (!tile) return;
      const talk = (this.def.tileTalk || []).find((k) => k.tx === tile.tx && k.ty === tile.ty);
      if (talk) { await VC.story.narrate(talk.text); return; }
      if (tile.idx === VC.art.T.WATER && this.def.waterText) await VC.story.narrate(this.def.waterText);
    }

    goTo(map, spawn, face) {
      if (this.transitioning) return;
      this.transitioning = true;
      this.player.setVelocity(0, 0);
      VC.ui.sfx('door');
      this.cameras.main.fadeOut(220, 15, 22, 38);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.restart({ map, spawn, face }));
    }

    updateMarker() {
      if (!this.marker) return;
      const q = VC.QUESTS[VC.state.quest];
      this.markerTarget = null;
      if (!q || !q.target || this.attract) { this.marker.setVisible(false); return; }
      const tg = q.target;
      if (tg.map !== this.mapKey) {
        // aponta para a saída que leva ao mapa do objetivo
        const door = this.def.doors.find((d) => d.to === tg.map);
        if (door) this.markerTarget = { x: door.tx * 16 + (this.mapKey === 'lab' ? 16 : 8), y: door.ty * 16 + (this.mapKey === 'lab' ? 4 : 0) };
      } else if (tg.door) {
        const door = this.def.doors.find((d) => d.id === tg.door);
        if (door) this.markerTarget = { x: door.tx * 16 + 8, y: door.ty * 16 };
      } else {
        const t = this.things[tg.id] || this.things['npc:' + tg.id];
        if (t) this.markerTarget = { sprite: t.sprite };
      }
      this.marker.setVisible(!!this.markerTarget);
    }

    update(time) {
      if (this.marker && this.markerTarget) {
        const bob = Math.round(Math.sin(time / 180) * 2);
        const m = this.markerTarget;
        if (m.sprite) {
          if (!m.sprite.active) { this.marker.setVisible(false); this.markerTarget = null; }
          else this.marker.setPosition(Math.round(m.sprite.getBounds().centerX), Math.round(m.sprite.getBounds().y) - 2 + bob);
        } else this.marker.setPosition(m.x, m.y - 2 + bob);
      }
      if (!this.ready || !this.player) return;

      const busy = VC.ui.isBusy() || this.transitioning || this.scripted;
      let vx = 0, vy = 0;
      if (!busy) {
        const k = this.keys;
        if (k.A.isDown || k.LEFT.isDown) vx -= 1;
        if (k.D.isDown || k.RIGHT.isDown) vx += 1;
        if (k.W.isDown || k.UP.isDown) vy -= 1;
        if (k.S.isDown || k.DOWN.isDown) vy += 1;
        vx += VC.input.vec.x; vy += VC.input.vec.y;
      }
      const len = Math.hypot(vx, vy);
      if (len > 1) { vx /= len; vy /= len; }
      this.player.setVelocity(vx * SPEED, vy * SPEED);

      const tex = this.player.texture.key;
      if (len > 0.1) {
        const dir = Math.abs(vx) > Math.abs(vy) ? (vx < 0 ? 'left' : 'right') : (vy < 0 ? 'up' : 'down');
        this.facing = dir;
        this.player.setFlipX(dir === 'left');
        this.player.anims.play(tex + '-' + (dir === 'left' || dir === 'right' ? 'side' : dir), true);
      } else if (this.player.anims.isPlaying) {
        this.player.anims.stop();
        this.player.setFrame(FRAME[this.facing]);
      }
      this.player.setDepth(this.player.y);
      this.snapCamera(false);
      this.shadow.setPosition(this.player.x, this.player.y - 1).setDepth(this.player.y - 1);

      // Portas
      if (!busy && time > this.doorCooldown) {
        const tile = this.tileAt(this.player.x, this.player.y - 2);
        const door = tile && this.def.doors.find((d) => d.tx === tile.tx && d.ty === tile.ty);
        if (door) {
          if (door.needs && !VC.hasItem(door.needs)) {
            this.doorCooldown = time + 1500;
            this.player.y += 6;
            VC.ui.sfx('err');
            VC.story.narrate(door.locked);
          } else {
            this.goTo(door.to, door.spawn, door.face);
          }
        }
      }

      // Balão de "pode interagir"
      const target = busy ? null : this.findTarget();
      if (target) {
        const b = target.sprite.getBounds();
        const hasMarker = this.markerTarget && this.markerTarget.sprite === target.sprite;
        this.bubble.setPosition(Math.round(b.centerX), Math.round(b.y) - (hasMarker ? 15 : 2)).setVisible(true);
      } else this.bubble.setVisible(false);

      // Salva a posição de tempos em tempos
      if (!busy && time - this.lastSave > 4000) {
        this.lastSave = time;
        VC.state.pos = [Math.round((this.player.x - 8) / 16 * 10) / 10, Math.round((this.player.y - 14) / 16 * 10) / 10];
        VC.save();
      }
    }
  }

  VC.WorldScene = WorldScene;
})();
