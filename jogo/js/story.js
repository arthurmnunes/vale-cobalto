/* Vale Cobalto - roteiro do Capítulo 1 */
window.VC = window.VC || {};

(function () {
  const S = {};
  VC.story = S;
  const ui = () => VC.ui;
  const say = (who, text) => VC.ui.say(who, text);
  const talk = (lines) => VC.ui.talk(lines);
  const q = () => VC.state.quest;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ORDER = Object.keys(VC.QUESTS);
  const after = (id) => ORDER.indexOf(q()) > ORDER.indexOf(id);

  S.narrate = async function (text) {
    ui().lock();
    try { await say('narrador', text); } finally { ui().unlock(); }
  };

  S.intro = [
    'Você acabou de se formar em Química quando chega uma carta com o selo do Laboratório Aurora.',
    'É da Profa. Ítala Ferraz, sua antiga orientadora. Ela se aposentou e deixou o laboratório para você, na pequena Vale Cobalto.',
    'A cidade tem um problema antigo: o rio está poluído há anos. E o Aurora, fechado há tempos, corre o risco de ser vendido.',
    'Sua missão: reabrir o laboratório, conquistar a confiança da cidade e concluir a pesquisa que a professora deixou pela metade.',
    'E, quem sabe, no fim dessa jornada, um Prêmio Nobel de Química.'
  ];

  /* ---------- Ao entrar em um mapa ---------- */
  S.onEnter = async function (scene) {
    await wait(320);
    if (scene !== VC.world || !scene.ready) return;

    if (scene.mapKey === 'praca' && !VC.flag('controlsHint')) {
      VC.flag('controlsHint', true);
      ui().toast(ui().isTouch ? 'Use o joystick para andar e o botão A para conversar.' : 'WASD ou setas para andar, E para conversar. Menu no Esc.');
    }

    if (scene.mapKey === 'lab' && q() === 'q_entrar') {
      ui().lock();
      try {
        await talk([
          ['narrador', 'Poeira, frascos sem rótulo e um cheiro de coisa guardada. O Aurora já viu dias melhores.'],
          ['narrador', 'Sobre a mesa da professora, um envelope com o seu nome.']
        ]);
        VC.setQuest('q_carta');
      } finally { ui().unlock(); }
    }

    if (scene.mapKey === 'lab' && q() === 'q_ver_lab') {
      ui().lock();
      try {
        await talk([
          ['narrador', 'O Aurora está ganhando vida. As melhorias já estão no lugar.'],
          ['narrador', '{cat} inspeciona cada novidade e parece aprovar.']
        ]);
        VC.setQuest('q_fim_demo');
        await S.endOfDemo();
      } finally { ui().unlock(); }
    }

    if (scene.mapKey === 'praca' && q() === 'q_volta_prefeita' && !VC.flag('rivalMet')) {
      await rivalScene(scene);
    }
  };

  S.endOfDemo = function () {
    const stars = Object.values(VC.state.stars).reduce((a, b) => a + b, 0);
    return ui().chapterCard('Fim da versão atual', [
      'Você concluiu todo o conteúdo disponível de Vale Cobalto.',
      'Estrelas: ' + stars + ' de 9. Conceitos no Caderno: ' + VC.state.notebook.length + ' de ' + Object.keys(VC.NOTEBOOK).length + '.',
      'O Capítulo 2, O átomo e a tabela periódica, chega na próxima atualização. Seu progresso fica salvo.',
      'Até lá, explore a cidade e continue equipando o laboratório na barraca do Seu Bento.'
    ]);
  };

  // Corrige jogos salvos parados no fim do Capítulo 1
  S.migrate = function () {
    if (VC.state.quest === 'q_fim1' && VC.state.decor.length > 0) VC.state.quest = 'q_ver_lab';
  };

  /* ---------- Cena do rival ---------- */
  async function rivalScene(scene) {
    ui().lock();
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [13, 7], face: 'left', solid: false });
      await scene.walkNpc('rival', [7, 6], 60);
      scene.setFacing('right');
      await say('rival', 'Ora, ora. Quem diria: você no comando do Aurora?');
      await say('narrador', 'É seu ex-colega de turma, o mais competitivo da sala. Como era mesmo o nome?');
      VC.state.rival = await ui().prompt('Seu rival', 'Qual é o nome do seu rival?', 'Dante');
      VC.save();
      await talk([
        ['rival', 'Sou {rival}, diretor de pesquisa do Grupo Vex. Viemos comprar este prédio velho.'],
        ['rival', 'Química de verdade se faz com dinheiro e equipamento de ponta, não com poeira.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['O Aurora não está à venda.', 'Veremos quem chega primeiro ao Nobel.']);
      await say('rival', c === 0 ? 'Todo mundo tem um preço. Quando cansar, me procure.' : 'Ha! Gosto de uma boa disputa. Veremos.');
      await scene.walkNpc('rival', [13, 7], 70);
      scene.removeNpc('rival');
      VC.flag('rivalMet', true);
    } finally {
      scene.scripted = false;
      ui().unlock();
    }
  }

  /* ---------- Interações ---------- */
  const H = {};

  H.prefeita = async function (scene) {
    if (q() === 'q_prefeita') {
      await talk([
        ['prefeita', 'Que bom que você chegou, {player}! Sou Célia, a prefeita de Vale Cobalto.'],
        ['prefeita', 'A Profa. Ítala falava muito de você. Dizia que você enxerga Química em tudo.'],
        ['prefeita', 'Vou ser direta: o laboratório está fechado há três anos, e tem gente querendo comprá-lo.'],
        ['prefeita', 'Mostre que o Aurora pode ser útil para a cidade e eu garanto a licença de funcionamento.'],
        ['prefeita', 'Aqui está a chave. Estarei na prefeitura, ali no prédio de tijolos.']
      ]);
      VC.addItem('chave');
      VC.setQuest('q_entrar');
      scene.scripted = true;
      await scene.walkNpc('prefeita', [23, 6], 70);
      scene.scripted = false;
      scene.updateMarker();
      return;
    }
    if (q() === 'q_volta_prefeita') {
      await talk([
        ['prefeita', 'Então o laboratório já está de pé? Ótimo. Mas a cidade precisa ver resultados.'],
        ['prefeita', 'Chegou um relatório com ocorrências que assustaram o povo. Todo mundo acha que é "química perigosa".'],
        ['prefeita', 'Separe o que é fenômeno físico do que é fenômeno químico e me traga um laudo técnico.']
      ]);
      VC.addItem('relatorio');
      VC.setQuest('q_bancada');
      return;
    }
    if (q() === 'q_entrega') {
      await talk([
        ['prefeita', 'Um laudo claro e bem explicado! Com isso eu acalmo a cidade inteira.'],
        ['prefeita', '{rival} passou aqui oferecendo uma fortuna pelo prédio. Recusei. O Aurora tem futuro.'],
        ['prefeita', 'Aqui está a licença provisória. E uma verba de 100 moedas para melhorias.']
      ]);
      VC.removeItem('laudo');
      VC.addItem('licenca');
      VC.addCoins(100);
      VC.flag('cap1', true);
      VC.setQuest('q_fim1');
      const stars = Object.values(VC.state.stars).reduce((a, b) => a + b, 0);
      await ui().chapterCard('Capítulo 1 concluído', [
        'Você reabriu o Laboratório Aurora e conquistou a licença provisória.',
        'Estrelas: ' + stars + ' de 9. Conceitos no Caderno: ' + VC.state.notebook.length + '.',
        'Próximo: Capítulo 2, O átomo e a tabela periódica (em breve).',
        'Enquanto isso, use sua verba na barraca do Seu Bento para equipar o laboratório.'
      ]);
      return;
    }
    if (q() === 'q_bancada') { await say('prefeita', 'O relatório está com você. Analise tudo na bancada do laboratório!'); return; }
    if (['q_fim1', 'q_ver_lab', 'q_fim_demo'].includes(q())) { await say('prefeita', 'Vale Cobalto agradece, {player}. Logo teremos novos desafios para o Aurora.'); return; }
    await say('prefeita', 'O laboratório é todo seu. Mostre do que ele é capaz!');
  };

  H.bento = async function () {
    if (!VC.flag('bentoMet')) {
      await talk([
        ['bento', 'Bom dia! Sou o Bento. Vendo de tudo um pouco: vidrarias, reagentes e uns mimos para laboratório.'],
        ['bento', 'Complete trabalhos para a cidade, junte moedas e volte aqui.']
      ]);
      VC.flag('bentoMet', true);
    }
    const c = await ui().choose('bento', 'Vai levar alguma coisa?', ['Ver a barraca', 'Só passando']);
    if (c === 0) await ui().shop();
    if (q() === 'q_fim1' && VC.state.decor.length > 0) {
      await say('bento', 'Já mandei entregar tudo no laboratório. Passe lá para ver como ficou!');
      VC.setQuest('q_ver_lab');
    }
  };

  const LIA_HINTS = {
    q_prefeita: 'A prefeita está esperando você em frente ao laboratório.',
    q_entrar: 'O Aurora é aquele prédio de telhado azul. Dizem que tem um gato morando lá dentro!',
    q_carta: 'Já leu o que a professora deixou? Ela sempre escrevia bilhetes.',
    q_epi: 'Regra número um de laboratório: equipamento de proteção antes de tudo.',
    q_estante: 'Dica: substância simples tem um só elemento. Composta tem dois ou mais elementos unidos. Mistura junta substâncias diferentes.',
    q_volta_prefeita: 'A prefeita está na frente da prefeitura, o prédio de telhado vermelho.',
    q_bancada: 'Dica: no fenômeno químico surge uma substância nova. No físico, a substância continua a mesma.',
    q_entrega: 'Corre, leva o laudo para a prefeita!',
    q_fim1: 'O Seu Bento tem umas coisas ótimas para o laboratório. Dá uma olhada na barraca!',
    q_ver_lab: 'Já foi ver como o laboratório ficou? Quero visitar depois!',
    q_fim_demo: 'Quando você for estudar átomos, me chama? Quero ser cientista também!'
  };

  H.lia = async function () {
    if (!VC.flag('liaMet')) {
      await say('lia', 'Oi! Sou a Lia, estudo no colégio daqui. Química é a minha matéria favorita.');
      VC.flag('liaMet', true);
    }
    await say('lia', LIA_HINTS[q()] || 'Bons estudos!');
  };

  const CAT_LINES = {
    q_epi: '{cat} se esfrega no armário de segurança, como quem dá um recado.',
    q_estante: '{cat} encara a estante bagunçada e espirra com a poeira.',
    q_volta_prefeita: '{cat} olha para a porta. Hora de voltar à praça.',
    q_bancada: '{cat} sobe na bancada e derruba um papel. Era só um guardanapo.',
    q_entrega: '{cat} boceja. Entregue logo esse laudo.'
  };

  H.cat = async function () {
    ui().sfx('blip');
    await say('cat', 'Miau.');
    await say('narrador', CAT_LINES[q()] || '{cat} ronrona, satisfeito com o laboratório.');
  };

  H.mesa = async function (scene) {
    if (q() !== 'q_carta') {
      await say('narrador', 'A mesa da Profa. Ítala. Ainda tem uma xícara de café esquecida.');
      return;
    }
    await talk([
      ['itala', '{player}, se você está lendo isto, aceitou o desafio. Fico feliz.'],
      ['itala', 'O Aurora agora é seu. Ele precisa de ordem, de cuidado e de alguém que enxergue a Química no dia a dia.'],
      ['itala', 'Deixei uma pesquisa inacabada: a Fórmula Aurora, capaz de limpar a água do nosso rio. Você vai chegar lá, um passo de cada vez.'],
      ['itala', 'Comece pela segurança. Sempre.'],
      ['itala', 'P.S.: alimente o gato.']
    ]);
    VC.addItem('carta');
    scene.refreshObject('mesa');
    const def = scene.def.npcs.find((n) => n.id === 'cat');
    scene.addNpc(def);
    ui().sfx('blip');
    await say('narrador', 'Um gato cinza sai de trás da estante e senta no tapete, olhando para você.');
    VC.state.cat = await ui().prompt('Novo amigo', 'Que nome você dá ao gato?', 'Mol');
    await say('cat', 'Miau!');
    VC.setQuest('q_epi');
  };

  H.armario = async function (scene) {
    if (q() === 'q_carta') { await say('narrador', 'Um armário de segurança. Melhor ler a carta da professora primeiro.'); return; }
    if (q() !== 'q_epi') { await say('narrador', 'O armário de EPIs: jaleco, óculos e luvas sempre à mão.'); return; }
    await say('narrador', 'O armário de segurança. Dentro, vários equipamentos misturados com coisas que nem deveriam estar ali.');
    const r = await ui().challenge(['epi', 'seguranca'], 'Segurança em primeiro lugar');
    VC.state.stars.epi = Math.min(3, r.stars);
    VC.flag('epi', true);
    scene.wearEpi();
    VC.addItem('epi');
    VC.addCoins(10 + 5 * r.stars);
    VC.learn(['epi', 'fds', 'emergencia']);
    await say('narrador', 'Jaleco abotoado, óculos no rosto, luvas nas mãos. Agora sim, cara de cientista.');
    VC.setQuest('q_estante');
  };

  H.estante = async function (scene) {
    if (!VC.flag('epi')) { await say('narrador', 'Frascos velhos e sem rótulo. Sem EPI, nada de mexer neles!'); return; }
    if (q() !== 'q_estante') { await say('narrador', 'Frascos organizados e rotulados. A Profa. Ítala ficaria orgulhosa.'); return; }
    await say('narrador', 'Hora de colocar ordem na estante: cada frasco na prateleira certa.');
    const r = await ui().challenge('estante', 'Estante organizada');
    VC.state.stars.estante = r.stars;
    VC.flag('estanteOk', true);
    scene.refreshObject('estante');
    VC.learn(['substancia_simples', 'substancia_composta', 'mistura', 'alotropia']);
    VC.addCoins(15 + 10 * r.stars);
    await say('narrador', 'Atrás dos frascos, você encontra uma balança de laboratório em perfeito estado.');
    VC.addItem('balanca');
    scene.refreshObject('bancada');
    ui().toast('Missão concluída: Reabrindo as portas');
    VC.setQuest('q_volta_prefeita');
  };

  H.bancada = async function () {
    if (!VC.flag('epi')) { await say('narrador', 'Sem EPI, nada de bancada! O armário de segurança fica no canto.'); return; }
    if (q() !== 'q_bancada') {
      await say('narrador', after('q_bancada') ? 'A bancada está limpa e a balança, calibrada.' : 'A bancada está pronta, mas ainda não há nada para analisar.');
      return;
    }
    await say('narrador', 'Você abre o relatório de ocorrências sobre a bancada.');
    const r = await ui().challenge(['fenomenos', 'estados'], 'Laudo técnico concluído');
    VC.state.stars.laudo = r.stars;
    VC.removeItem('relatorio');
    VC.addItem('laudo');
    VC.learn(['fenomeno_fisico', 'fenomeno_quimico', 'mudancas_estado']);
    VC.addCoins(15 + 10 * r.stars);
    VC.setQuest('q_entrega');
  };

  H.mural = async function () {
    await say('narrador', 'Um mural da tabela periódica, quase todo apagado. Restaurá-lo será o desafio do Capítulo 2.');
  };

  H.lavaolhos = async function () {
    await say('narrador', 'Lava-olhos e chuveiro de emergência. Em caso de respingo nos olhos, lave por cerca de 15 minutos.');
    if (VC.flag('epi')) VC.learn('emergencia');
  };

  H.lousa = async function () { await say('narrador', 'Você rabisca na lousa: H_2O, CO_2, NaCl, O_3. Ficou bonito.'); };
  H.licenca = async function () { await say('narrador', 'Licença provisória de funcionamento. O Aurora está oficialmente de volta!'); };
  H.planta = async function () { await say('narrador', 'A samambaia gosta da luz do laboratório. Plantas fazem fotossíntese: um fenômeno químico!'); };
  H.poltrona = async function () { await say('narrador', 'Uma poltrona confortável. {cat} já decidiu que ela é dele.'); };
  H.fonte = async function () { await say('narrador', 'A água da fonte vem do rio. Está turva e tem um leve cheiro de ovo podre.'); };
  H.placa_lab = async function () { await say('narrador', 'Laboratório Aurora. Fundado pela Profa. Ítala Ferraz.'); };
  H.quadro = async function () { await ui().roadmap(); };

  S.interact = async function (id, scene) {
    if (!H[id]) return;
    ui().lock();
    try { await H[id](scene); } finally { ui().unlock(); }
  };
})();
