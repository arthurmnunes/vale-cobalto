/* Vale Cobalto - roteiro dos capítulos */
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

    const aviso = VC.state.flags.capAviso || (VC.state.flags.cap2Aviso ? 2 : 0);
    if (aviso) {
      delete VC.state.flags.capAviso; delete VC.state.flags.cap2Aviso; VC.save();
      ui().lock();
      try { await S.chapterIntro(aviso, true); } finally { ui().unlock(); }
    }

    if (scene.mapKey === 'praca' && VC.flag('finalPendente')) {
      VC.flag('finalPendente', false);
      await finaleScene(scene);
    }

    if (scene.mapKey === 'praca' && !VC.flag('controlsHint')) {
      VC.flag('controlsHint', true);
      ui().toast(ui().isTouch ? 'Use o joystick para andar e o botão E para conversar.' : 'WASD ou setas para andar, E para conversar. Menu no Esc.');
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
        await S.startChapter2();
      } finally { ui().unlock(); }
    }

    if (scene.mapKey === 'praca' && q() === 'q_volta_prefeita' && !VC.flag('rivalMet')) {
      await rivalScene(scene);
    }
  };

  const starsOf = (keys) => keys.reduce((a, k) => a + (VC.state.stars[k] || 0), 0) + ' de ' + keys.length * 3;

  // Encerramento do jogo
  S.endGame = function () {
    const keys = [];
    Object.values(VC.CHAPTER_DATA).forEach((c) => c.grants.stars.forEach((k) => keys.push(k)));
    return ui().chapterCard('Fim de jogo', [
      'Parabéns, {player}! Você reabriu o Laboratório Aurora, limpou o rio de Vale Cobalto e foi indicado ao Prêmio Nobel de Química.',
      'Estrelas no jogo todo: ' + starsOf(keys) + '. Conceitos no Caderno: ' + VC.state.notebook.length + '.',
      'Obrigado por jogar! Você pode continuar explorando a cidade, rever o Caderno do Laboratório ou voltar a qualquer capítulo pelo menu.',
      'Vale Cobalto: O Laboratório Aurora. Um trabalho escolar de Química do Ensino Médio.'
    ]);
  };

  S.endOfDemo = function () {
    const next = VC.CHAPTERS.find((c) => c.n === VC.IMPLEMENTED + 1);
    if (!next) return S.endGame();
    return ui().chapterCard('Fim da versão atual', [
      'Você concluiu todo o conteúdo disponível de Vale Cobalto.',
      'Conceitos no Caderno: ' + VC.state.notebook.length + '.',
      'O Capítulo ' + next.n + ', ' + next.title + ', chega na próxima atualização. Seu progresso fica salvo.',
      'Até lá, explore a cidade e continue equipando o laboratório na barraca do Seu Bento.'
    ]);
  };

  const CHAPTER_START = {
    2: { quest: 'q2_lia', lines: ['Vale Cobalto se prepara para o Festival das Luzes.', 'A Lia tem novidades. Procure por ela na praça.'] },
    3: { quest: 'q3_bento', lines: ['Depois do festival, a cidade volta à rotina. Mas o Seu Bento está com um problema na barraca.', 'Vá falar com ele na praça.'] },
    4: { quest: 'q4_prefeita', lines: ['A primavera chega a Vale Cobalto, mas a horta comunitária, perto do rio, não vai nada bem.', 'A Prefeita Célia quer falar com você.'] },
    5: { quest: 'q5_prefeita', lines: ['A temporada de chuvas se aproxima, e a estação de tratamento de água precisa se preparar.', 'A Prefeita Célia tem uma encomenda grande para o Aurora.'] },
    6: { quest: 'q6_carta', lines: ['O Aurora é hoje o laboratório mais respeitado da região. Mas o rio de Vale Cobalto continua escuro.', 'Chegou uma carta para você no laboratório.'] }
  };

  S.chapterIntro = function (n, isNew) {
    const ch = VC.CHAPTERS.find((c) => c.n === n);
    const lines = CHAPTER_START[n].lines.slice();
    if (isNew) lines.unshift('Novo capítulo liberado!');
    return ui().chapterCard('Capítulo ' + n + ': ' + ch.title, lines);
  };

  S.startChapter = async function (n) {
    VC.setQuest(CHAPTER_START[n].quest);
    await S.chapterIntro(n, false);
  };
  S.startChapter2 = () => S.startChapter(2);

  // Corrige jogos salvos de versões anteriores
  S.migrate = function () {
    const st = VC.state;
    if (st.quest === 'q_fim1' && st.decor.length > 0) st.quest = 'q_ver_lab';
    if (st.flags.cap2Aviso) { st.flags.capAviso = 2; delete st.flags.cap2Aviso; }
    if (st.quest === 'q_fim_demo') { st.quest = 'q2_lia'; st.flags.capAviso = 2; }
    if (st.quest === 'q2_fim') { st.quest = 'q3_bento'; st.flags.capAviso = 3; }
    if (st.quest === 'q3_fim') { st.quest = 'q4_prefeita'; st.flags.capAviso = 4; }
    if (st.quest === 'q4_fim') { st.quest = 'q5_prefeita'; st.flags.capAviso = 5; }
    if (st.quest === 'q5_fim') { st.quest = 'q6_carta'; st.flags.capAviso = 6; }
    const fromFlags = st.flags.cap5 ? 6 : st.flags.cap4 ? 5 : st.flags.cap3 ? 4 : st.flags.cap2 ? 3 : st.flags.cap1 ? 2 : 1;
    const fromQuest = (VC.QUESTS[st.quest] && VC.QUESTS[st.quest].ch) || 1;
    st.maxCh = Math.max(st.maxCh || 1, fromFlags, fromQuest);
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

  /* ---------- Festival das Luzes (fim do Capítulo 2) ---------- */
  async function festivalScene(scene) {
    await talk([
      ['prefeita', 'A receita dos fogos! Sódio, cobre, estrôncio e potássio... e tudo explicado.'],
      ['prefeita', 'Bem a tempo. Olhe quem está chegando.']
    ]);
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [28, 8], face: 'left', solid: false });
      await scene.walkNpc('rival', [24, 7], 60);
      await talk([
        ['rival', 'Prefeita, o Grupo Vex traz um show de fogos importado. Só cinquenta mil moedas.'],
        ['prefeita', 'Obrigada, {rival}, mas o Aurora já resolveu. E custou bem menos.'],
        ['rival', 'Fogos caseiros? Isso é coisa de amador.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Não é mágica nem sorte: é o modelo de Bohr.', 'Apareça no festival, {rival}. Vai gostar.']);
      await say('rival', c === 0 ? 'Hum. Pelo menos você estudou.' : 'Talvez eu apareça. Só para ver vocês errarem.');
      await scene.walkNpc('rival', [28, 8], 70);
      scene.removeNpc('rival');
    } finally { scene.scripted = false; }

    VC.removeItem('receita');
    VC.addCoins(120);
    await say('narrador', 'Naquela noite, toda Vale Cobalto se reúne na praça.');
    scene.scripted = true;
    const show = scene.festival(7000);
    await talk([
      ['narrador', 'Amarelo do sódio, verde-azulado do cobre, vermelho do estrôncio, lilás do potássio.'],
      ['narrador', 'Cada cor é a luz que os elétrons emitem ao voltar para suas camadas.'],
      ['lia', 'Que lindo! E eu entendi tudo! Amanhã eu gabarito a prova do átomo.']
    ]);
    await show;
    scene.scripted = false;
    VC.flag('cap2', true);
    VC.setQuest('q2_fim');
    await ui().chapterCard('Capítulo 2 concluído', [
      'O Festival das Luzes foi um sucesso, e o mural da Profa. Ítala voltou a brilhar.',
      'Estrelas: ' + starsOf(['mural1', 'mural2', 'chama']) + '. A prefeitura pagou 120 moedas pelos fogos.',
      'O Grupo Vex saiu da praça sem contrato.'
    ]);
    await S.startChapter(3);
  }

  /* ---------- Capítulo 3 ---------- */
  // A fonte é abastecida pelo rio: o óleo vazou de um tambor no depósito do Grupo Vex, rio acima
  async function oilScene(scene) {
    VC.flag('oleo', true);
    scene.refreshObject('fonte');
    scene.scripted = true;
    try {
      await say('prefeita', '{player}! Venha ver a fonte! A água está saindo do cano com uma mancha de óleo!');
      await scene.walkNpc('prefeita', [17, 8], 75);
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [24, 12], face: 'left', solid: false });
      await scene.walkNpc('rival', [19, 9], 60);
      await talk([
        ['rival', 'Antes que alguém pergunte: foi um acidente. Um tambor velho rachou no nosso depósito, na beira do rio, rio acima.'],
        ['prefeita', 'E a fonte puxa água do rio. O óleo desceu pelo cano e veio parar no meio da praça.'],
        ['rival', 'O Grupo Vex já trocou os tambores. A limpeza... fica com quem entende do assunto, não é?']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Acidente ou não, a cidade não pode ficar assim.', 'Água sozinha não tira óleo. Deixa comigo.']);
      await say('rival', c === 0 ? 'Por isso mesmo eu vim avisar. Boa sorte.' : 'Quero ver como você vai resolver isso, então.');
      await scene.walkNpc('rival', [24, 12], 70);
      scene.removeNpc('rival');
      await say('prefeita', 'Conto com você, {player}. Vou voltar para a prefeitura e avisar a população.');
      await scene.walkNpc('prefeita', [23, 6], 75);
    } finally { scene.scripted = false; }
    VC.setQuest('q3_fonte');
  }

  async function finalCap3() {
    await talk([
      ['prefeita', 'A fonte está limpa! E sem jogar mais química perigosa na água. Como você conseguiu?'],
      ['player', 'Detergente: uma ponta gosta de água, a outra gosta de óleo. Ele junta os dois e a água leva tudo.'],
      ['prefeita', 'Genial. E o Grupo Vex vai pagar uma multa por guardar tambores de óleo na beira do rio. Parte dela fica com o Aurora.']
    ]);
    VC.addCoins(120);
    VC.flag('cap3', true);
    VC.setQuest('q3_fim');
    await ui().chapterCard('Capítulo 3 concluído', [
      'As amostras do Seu Bento ganharam rótulos novos e a fonte da praça está limpa.',
      'Estrelas: ' + starsOf(['amostras', 'formulas', 'fonte', 'detergente']) + '. A multa do Grupo Vex rendeu 120 moedas ao Aurora.',
      'A bancada de síntese da Profa. Ítala voltou a funcionar.'
    ]);
    await S.startChapter(4);
  }

  /* ---------- Capítulo 4 ---------- */
  // A caldeira do Grupo Vex queima carvão com enxofre: o SO_2 volta como chuva ácida sobre a horta
  async function rainScene(scene) {
    scene.scripted = true;
    try {
      await scene.walkNpc('prefeita', [20, 13], 75);
      await say('prefeita', 'As folhas já estão mais verdes! Mas me diga, {player}: por que o solo ficou ácido, para começo de conversa?');
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [28, 13], face: 'left', solid: false });
      await scene.walkNpc('rival', [25, 13], 60);
      await talk([
        ['rival', 'Eu sei a resposta, e não gosto dela. A caldeira velha do Grupo Vex queima carvão com enxofre.'],
        ['rival', 'A fumaça leva SO_2 para as nuvens, e ele volta como chuva ácida. Bem em cima desta horta.'],
        ['prefeita', 'Então quero um relatório ambiental com todas as reações, balanceadas, para a agência do estado.'],
        ['rival', 'A minha equipe entrega primeiro, Prefeita. Equações são a nossa especialidade.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Que bom que você assumiu, {rival}. Vamos ver quem termina antes.', 'Lavoisier não perdoa: nenhum átomo pode sumir.']);
      await say('rival', c === 0 ? 'Assumir não é perder. A corrida começa agora.' : 'Ha! Então conte direitinho cada átomo.');
      await scene.walkNpc('rival', [28, 13], 70);
      scene.removeNpc('rival');
      await say('prefeita', 'Os voluntários guardaram água da última chuva. Leve para o laboratório e descubra o que tem nela.');
      VC.addItem('agua_chuva');
      await scene.walkNpc('prefeita', [23, 6], 75);
    } finally { scene.scripted = false; }
    VC.setQuest('q4_chuva');
  }

  async function finalCap4(scene) {
    await talk([
      ['prefeita', 'O relatório ambiental! Cada reação balanceada, da chaminé ao filtro. A agência vai adorar.'],
      ['prefeita', 'Olhe quem chegou.']
    ]);
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [28, 8], face: 'left', solid: false });
      await scene.walkNpc('rival', [24, 7], 60);
      await talk([
        ['rival', 'Atrasado, eu sei. A minha equipe errou o balanceamento do sulfato de cálcio. Duas vezes.'],
        ['rival', 'Mas o Grupo Vex instalou um filtro com cal na caldeira. A base retém o SO_2 antes de ele sair pela chaminé.'],
        ['prefeita', 'Ácido com base. Até o Grupo Vex aprendeu a neutralizar.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Obrigado pelo filtro, {rival}. A horta agradece.', 'Da próxima vez, conte os oxigênios por último.']);
      await say('rival', c === 0 ? 'Não se acostume. Mas... de nada.' : 'Hum. Vou anotar a dica. Só desta vez.');
      await scene.walkNpc('rival', [28, 8], 70);
      scene.removeNpc('rival');
    } finally { scene.scripted = false; }
    await say('prefeita', 'A prefeitura comprou um presente para o Aurora: um medidor de pH e uma capela, para trabalhar com segurança com gases e vapores.');
    VC.removeItem('relatorio_amb');
    VC.addItem('phmetro');
    VC.flag('capelaOk', true);
    VC.addCoins(120);
    VC.flag('cap4', true);
    VC.setQuest('q4_fim');
    await ui().chapterCard('Capítulo 4 concluído', [
      'A horta comunitária voltou a dar repolhos, tomates e alfaces, e a caldeira do Grupo Vex ganhou um filtro.',
      'Estrelas: ' + starsOf(['funcoes', 'indicador', 'calagem', 'chuva', 'equacoes']) + '. A prefeitura pagou 120 moedas pelo relatório.',
      'O medidor de pH está na mochila, e a capela já foi instalada no laboratório.'
    ]);
    await S.startChapter(5);
  }

  /* ---------- Capítulo 5 ---------- */
  // Encomenda da estação de tratamento de água: o Grupo Vex propõe "o dobro, por garantia"
  async function orderScene(scene) {
    await talk([
      ['prefeita', '{player}, a temporada de chuvas está chegando, e a estação de tratamento de água precisa de uma grande encomenda de reagentes.'],
      ['prefeita', 'Sulfato de alumínio e cal. Juntos, eles agrupam a sujeira da água em flocos, que afundam e depois são filtrados.'],
      ['prefeita', 'A prefeitura vai escolher um fornecedor. E olhe só quem também se candidatou.']
    ]);
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [28, 8], face: 'left', solid: false });
      await scene.walkNpc('rival', [24, 7], 60);
      await talk([
        ['rival', 'O Grupo Vex manda o dobro de tudo, Prefeita. Por garantia. Sobra é melhor do que falta.'],
        ['prefeita', 'Sobra é dinheiro jogado fora, {rival}. E reagente em excesso na água acaba indo parar no rio.'],
        ['prefeita', 'Quero a quantidade exata, calculada pela química. Quem acertar fica com o contrato.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Exatidão é com o Aurora.', 'Que vença o melhor cálculo, {rival}.']);
      await say('rival', c === 0 ? 'Veremos. O Grupo Vex tem calculadoras muito caras.' : 'Combinado. E o melhor cálculo vai ser o meu.');
      await scene.walkNpc('rival', [28, 8], 70);
      scene.removeNpc('rival');
    } finally { scene.scripted = false; }
    await say('prefeita', 'Aqui está o pedido da estação. Comece organizando as grandezas no laboratório: massa, mol, volume... Isso é com você.');
    VC.addItem('pedido');
    VC.setQuest('q5_grandezas');
  }

  async function finalCap5(scene) {
    await talk([
      ['prefeita', 'A planilha da encomenda! Cada saco calculado pela equação, em mol e em gramas. Sem sobra e sem falta.'],
      ['prefeita', 'E aí vem a outra proposta.']
    ]);
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [28, 8], face: 'left', solid: false });
      await scene.walkNpc('rival', [24, 7], 60);
      await talk([
        ['rival', 'A proposta do Grupo Vex tinha o dobro de cal. Refiz as contas ontem à noite...'],
        ['rival', 'O sulfato de alumínio é o reagente limitante. Metade da nossa cal ia sobrar sem reagir. Direto para o rio.'],
        ['rival', 'O seu cálculo está certo, {player}. Não vou esquecer essa.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Bom saber que você confere as contas, {rival}.', 'Na próxima, calcule antes de mandar o dobro.']);
      await say('rival', c === 0 ? 'Sempre confiro. Só que dessa vez conferi tarde demais.' : 'Ha! Anotado. O Grupo Vex aprende rápido.');
      await scene.walkNpc('rival', [28, 8], 70);
      scene.removeNpc('rival');
    } finally { scene.scripted = false; }
    await say('prefeita', 'O contrato é do Aurora. Aqui está o pagamento, com uma verba extra para o laboratório. E a balança analítica a prefeitura já pagou ao Seu Bento: agora ela é do Aurora.');
    VC.removeItem('planilha');
    VC.addCoins(150);
    VC.flag('cap5', true);
    VC.setQuest('q5_fim');
    await ui().chapterCard('Capítulo 5 concluído', [
      'A estação de tratamento recebeu a encomenda exata, e nenhum saco de cal vai parar no rio.',
      'Estrelas: ' + starsOf(['grandezas', 'massas', 'calculo']) + '. O contrato rendeu 150 moedas ao Aurora.',
      'A balança analítica agora faz parte do laboratório.'
    ]);
    await S.startChapter(6);
  }

  /* ---------- Capítulo 6 e missão final ---------- */
  // O rival oferece o destilador do Grupo Vex: começo da reconciliação
  async function stillScene(scene) {
    await say('bento', 'Um destilador grande, para tanta água? Esse eu não tenho, {player}.');
    scene.scripted = true;
    try {
      scene.addNpc({ id: 'rival', sprite: 'rival', pos: () => [16, 12], face: 'left', solid: false });
      await scene.walkNpc('rival', [12, 12], 60);
      await talk([
        ['rival', 'Eu tenho. O Grupo Vex tem um destilador industrial parado no depósito.'],
        ['rival', 'O tambor de óleo, a caldeira, a cal em dobro... Uma parte da sujeira do rio é culpa nossa. Deixa o Grupo Vex ajudar.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Aceito. O rio precisa de todo mundo.', 'Aceito. Mas o cálculo continua sendo meu.']);
      await say('rival', c === 0 ? 'Então está combinado. Mando instalar no Aurora hoje mesmo.' : 'Ha! Justo. O destilador chega hoje mesmo.');
      await scene.walkNpc('rival', [16, 12], 70);
      scene.removeNpc('rival');
    } finally { scene.scripted = false; }
    await say('bento', 'Quem diria, o Grupo Vex ajudando. Esse rio ainda vai voltar a ter peixe!');
    VC.flag('destiladorOk', true);
    VC.setQuest('q6_destilacao');
  }

  async function riverScene(scene) {
    await say('narrador', 'Você despeja a Fórmula Aurora no ponto de coleta, e a correnteza leva tudo rio abaixo.');
    VC.removeItem('formula_aurora');
    VC.flag('rioLimpo', true);
    scene.scripted = true;
    try { await scene.cleanRiver(); } finally { scene.scripted = false; }
    ui().sfx('win');
    await say('narrador', 'A água escura clareia, faixa por faixa. Em poucos minutos, o rio de Vale Cobalto corre azul.');
    ui().toast('Missão concluída: A Fórmula Aurora');
    VC.setQuest('q6_prefeita');
  }

  async function inviteScene(scene) {
    await talk([
      ['prefeita', 'O rio! Azul de novo! Eu não via isso desde criança, {player}.'],
      ['prefeita', 'E a notícia correu longe. Chegou um convite para o Aurora.'],
      ['prefeita', 'O Congresso Internacional de Química quer que você apresente a Fórmula Aurora. E pediu que o Grupo Vex vá junto, como parceiro.'],
      ['prefeita', 'A prefeitura também deixou uma verba para a viagem. {rival} está esperando você perto do quadro de pedidos.']
    ]);
    VC.addItem('convite');
    VC.addCoins(200);
    VC.setQuest('q6_congresso');
    const def = scene.def.npcs.find((n) => n.id === 'rival');
    if (def && !scene.npcs.rival) scene.addNpc(def);
    scene.updateMarker();
  }

  async function congressScene(scene) {
    const c = await ui().choose('rival', 'O trem para a capital sai em dez minutos. Pronto para o Congresso, {player}?', ['Vamos!', 'Só mais um minuto.']);
    if (c === 1) { await say('rival', 'Tudo bem. Estou aqui quando você quiser.'); return; }
    const title = 'O Congresso Internacional de Química';
    await ui().story([
      'Na capital, o auditório do Congresso Internacional de Química está lotado. Cientistas do mundo inteiro vieram ver a Fórmula Aurora.',
      'Você e {rival} sobem ao palco. Na tela, o antes e o depois do rio de Vale Cobalto.',
      'Depois da apresentação, a banca de cientistas tem algumas perguntas.'
    ], { title, skippable: false });
    const r = await ui().challenge('banca', 'Banca aprovada');
    VC.state.stars.banca = r.stars;
    await ui().story([
      'A plateia aplaude de pé. Na primeira fila, uma senhora de cabelos brancos sorri: é a Profa. Ítala.',
      'No fim do congresso, a notícia: a Fórmula Aurora foi indicada ao Prêmio Nobel de Química.',
      'De volta a Vale Cobalto, a cidade inteira espera vocês na praça.'
    ], { title, skippable: false });
    VC.removeItem('convite');
    VC.addItem('nobel', true);
    VC.flag('cap6', true);
    VC.flag('finalPendente', true);
    VC.setQuest('q6_fim');
    scene.scene.restart({ map: 'praca', spawn: [7, 9], face: 'up' });
  }

  // De volta à praça: Profa. Ítala, reconciliação com o rival e encerramento
  async function finaleScene(scene) {
    ui().lock();
    scene.scripted = true;
    try {
      await scene.walkNpc('rival', [9, 8], 60);
      await talk([
        ['itala_p', '{player}! Que alegria ver o Aurora assim: organizado, equipado e cheio de vida.'],
        ['itala_p', 'Quando escrevi aquela primeira carta, eu sabia que você ia conseguir. Fui eu que indiquei a Fórmula Aurora ao Congresso.'],
        ['rival', 'E eu assinei a indicação ao Nobel junto com a professora.'],
        ['rival', 'Desculpe pelo tambor de óleo, pela caldeira, pela cal em dobro... O Grupo Vex aprendeu muito com o Aurora.']
      ]);
      const c = await ui().choose('player', 'Responder:', ['Sem o seu destilador, o rio não estaria limpo. Obrigado, {rival}.', 'Parceiros de laboratório daqui para a frente?']);
      await say('rival', c === 0 ? 'Obrigado a você. Agora somos uma equipe.' : 'Parceiros. Mas eu continuo querendo ganhar de você no próximo cálculo.');
      await talk([
        ['itala_p', 'O rio limpo, a cidade confiando na ciência e uma indicação ao Nobel. Estou muito orgulhosa, {player}.'],
        ['itala_p', 'Só mais uma pergunta: e o gato? Está bem alimentado?'],
        ['narrador', 'Em algum lugar do laboratório, {cat} ronrona, satisfeito.']
      ]);
    } finally { scene.scripted = false; }
    try {
      await ui().chapterCard('Capítulo 6 concluído', [
        'O rio de Vale Cobalto está limpo, e a Fórmula Aurora foi apresentada ao mundo.',
        'Estrelas: ' + starsOf(['separacao', 'destilacao', 'formula', 'banca']) + '. A indicação ao Prêmio Nobel de Química está na sua mochila.'
      ]);
      await S.endGame();
    } finally { ui().unlock(); }
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
      const stars = starsOf(['epi', 'estante', 'laudo']);
      await ui().chapterCard('Capítulo 1 concluído', [
        'Você reabriu o Laboratório Aurora e conquistou a licença provisória.',
        'Estrelas: ' + stars + '. Conceitos no Caderno: ' + VC.state.notebook.length + '.',
        'Próximo: Capítulo 2, O átomo e a tabela periódica.',
        'Enquanto isso, use sua verba na barraca do Seu Bento para equipar o laboratório.'
      ]);
      return;
    }
    if (q() === 'q_bancada') { await say('prefeita', 'O relatório está com você. Analise tudo na bancada do laboratório!'); return; }
    if (q() === 'q6_prefeita') { await inviteScene(scene); return; }
    if (q() === 'q6_congresso') { await say('prefeita', '{rival} está esperando você perto do quadro de pedidos. Boa viagem!'); return; }
    if (q() === 'q6_fim') { await say('prefeita', 'Vale Cobalto inteira tem orgulho de você, {player}. E o rio... olhe só esse azul!'); return; }
    if (q().indexOf('q6_') === 0) { await say('prefeita', 'O rio conta com você e com a Fórmula Aurora, {player}!'); return; }
    if (q() === 'q5_prefeita') { await orderScene(scene); return; }
    if (q() === 'q5_entrega') { await finalCap5(scene); return; }
    if (q() === 'q5_fim') { await say('prefeita', 'A estação de tratamento já recebeu tudo, {player}. Nenhum saco sobrando.'); return; }
    if (q().indexOf('q5_') === 0) { await say('prefeita', 'A estação conta com o cálculo exato, {player}. Sem sobra e sem falta!'); return; }
    if (q() === 'q4_prefeita') {
      await talk([
        ['prefeita', '{player}, preciso de ajuda com a horta comunitária, aquela perto do rio.'],
        ['prefeita', 'As folhas estão amarelando, os tomates não crescem e os repolhos estão murchos. Os voluntários já não sabem o que fazer.'],
        ['prefeita', 'Dê uma olhada no canteiro e no galpão de ferramentas. Tem muito produto lá, e ninguém sabe direito o que é cada um.']
      ]);
      VC.setQuest('q4_horta');
      return;
    }
    if (q() === 'q4_entrega') { await finalCap4(scene); return; }
    if (q() === 'q4_fim') { await say('prefeita', 'A horta nunca deu tantos tomates, {player}. E a chuva da semana passada já veio menos ácida.'); return; }
    if (['q4_chuva', 'q4_equacoes'].includes(q())) { await say('prefeita', 'Quero o relatório ambiental antes do Grupo Vex. Conto com você!'); return; }
    if (q().indexOf('q4_') === 0) { await say('prefeita', 'A horta está nas suas mãos, {player}. Ela fica perto do rio, à direita da fonte.'); return; }
    if (q() === 'q3_prefeita') { await finalCap3(); return; }
    if (q() === 'q3_fim') { await say('prefeita', 'A fonte nunca brilhou tanto, {player}. E o Grupo Vex aprendeu a lição.'); return; }
    if (['q3_fonte', 'q3_detergente', 'q3_limpar'].includes(q())) { await say('prefeita', 'Que desastre na fonte! Conto com você para limpar isso, {player}.'); return; }
    if (q().indexOf('q3_') === 0) { await say('prefeita', 'O Seu Bento está precisando de você. Coitado, a barraca virou uma bagunça.'); return; }
    if (q() === 'q2_entrega') { await festivalScene(scene); return; }
    if (q() === 'q2_fim') { await say('prefeita', 'Até hoje a cidade fala dos fogos do festival, {player}. Que espetáculo!'); return; }
    if (q().indexOf('q2_') === 0) { await say('prefeita', 'O Festival das Luzes está chegando! A Lia me contou que você está ajudando.'); return; }
    if (['q_fim1', 'q_ver_lab', 'q_fim_demo'].includes(q())) { await say('prefeita', 'Vale Cobalto agradece, {player}. Logo teremos novos desafios para o Aurora.'); return; }
    await say('prefeita', 'O laboratório é todo seu. Mostre do que ele é capaz!');
  };

  H.bento = async function (scene) {
    if (q() === 'q6_bento') { await stillScene(scene); return; }
    if (q() === 'q5_bento') {
      await talk([
        ['bento', 'Uma encomenda para a estação de tratamento? Então balança de cozinha não serve.'],
        ['bento', 'Tenho uma balança analítica guardada: mede até a décima de miligrama, 0,0001 g. Vou instalar no Aurora agora mesmo.'],
        ['bento', 'E leve esta tabela de massas atômicas. Sem ela, nada de massa molar.']
      ]);
      VC.flag('analiticaOk', true);
      VC.addItem('tabela_massas');
      VC.setQuest('q5_massas');
      return;
    }
    if (q() === 'q3_bento') {
      await talk([
        ['bento', '{player}, que bom que você veio! Uma caixa caiu da carroça e os frascos perderam os rótulos.'],
        ['bento', 'Tem sal, açúcar, metais... Se eu vender a coisa errada, é um perigo.'],
        ['bento', 'Leve as amostras para o laboratório. Você descobre o que é cada uma?']
      ]);
      VC.addItem('amostras');
      VC.setQuest('q3_amostras');
      return;
    }
    if (q() === 'q3_rotulos') {
      await talk([
        ['bento', 'Rótulos novos, com fórmula e tudo! NaCl, CaCl_2, MgO, Al_2O_3... Ficou profissional.'],
        ['bento', 'Tome 40 moedas. E pode levar a estante de tubos de ensaio quando quiser, já está à venda.']
      ]);
      VC.removeItem('rotulos');
      VC.addCoins(40);
      ui().toast('Missão concluída: O estoque misturado');
      await oilScene(scene);
      return;
    }
    if (q() === 'q2_bento') {
      await talk([
        ['bento', 'Fogos para o festival? Então você vai precisar de uma chama forte e limpa.'],
        ['bento', 'Tome, um bico de Bunsen novinho. Por conta da casa: é pela cidade!'],
        ['bento', 'Leve uns sais também: sódio, cobre, estrôncio e potássio. Faça o teste de chama na bancada.']
      ]);
      VC.flag('bentoMet', true);
      VC.addItem('bunsen');
      VC.setQuest('q2_chama');
      return;
    }
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
    q_fim_demo: 'Quando você for estudar átomos, me chama? Quero ser cientista também!',
    q2_mural: 'O mural fica no laboratório, na parede do fundo. Começa pelo átomo: prótons, nêutrons e elétrons!',
    q2_familias: 'Já estou estudando pelo átomo do mural! Agora faltam as famílias da tabela.',
    q2_bento: 'Para fazer fogos, precisa de chama forte. O Seu Bento deve ter alguma coisa.',
    q2_chama: 'Teste de chama! Cada metal deixa a chama de uma cor. Quero ver!',
    q2_entrega: 'Corre, leva a receita dos fogos para a prefeita!',
    q2_fim: 'Tirei 10 na prova do átomo! Obrigada, {player}. Quando tiver ligações químicas, me chama!',
    q3_bento: 'Tirei 10 na prova do átomo! O Seu Bento estava procurando você, parecia preocupado.',
    q3_amostras: 'Dica: metal com não metal costuma ser ligação iônica; só não metais, covalente; só metal, metálica.',
    q3_formulas: 'Fórmula de íons é como uma balança: as cargas positivas e negativas têm que se anular.',
    q3_rotulos: 'Os rótulos ficaram prontos? Leva para o Seu Bento!',
    q3_fonte: 'Óleo na fonte! Veio pelo cano do rio, do depósito do Grupo Vex. E não mistura com a água... por quê?',
    q3_detergente: 'Lá em casa a gente tira gordura da panela com detergente. Será que funciona na fonte?',
    q3_limpar: 'Vai lá limpar a fonte! Eu fico de olho.',
    q3_prefeita: 'A fonte ficou ótima! Conta para a prefeita!',
    q3_fim: 'Ligações químicas são tipo amizades: uns dão, uns dividem, uns compartilham com todo mundo!',
    q4_prefeita: 'A prefeita estava procurando você. Acho que é sobre a horta: está tudo amarelo lá!',
    q4_horta: 'A horta fica perto do rio, à direita da fonte. Dica: ácido começa com H, base tem OH, óxido tem só dois elementos e um deles é o O.',
    q4_indicador: 'Sabia que o suco de repolho roxo muda de cor? Fica vermelho no limão e verde no sabão!',
    q4_calagem: 'Se o solo está ácido, precisa de algo que neutralize. Ácido mais base dá sal e água!',
    q4_chuva: 'Chuva ácida? Então o problema veio do céu! Leva a água para a bancada.',
    q4_equacoes: 'Balancear é contar átomos: cada um precisa aparecer igual dos dois lados. Só mexe nos números da frente!',
    q4_entrega: 'Corre, entrega o relatório antes do Grupo Vex!',
    q4_fim: 'Plantei repolho roxo em casa. Agora eu tenho meu próprio indicador de pH!',
    q5_prefeita: 'A prefeita está procurando você! Parece que é uma encomenda grande.',
    q5_grandezas: 'Mol é como uma dúzia, só que gigante: 6,02 × 10^23 unidades!',
    q5_bento: 'Para uma encomenda tão precisa, balança comum não serve. O Seu Bento tem de tudo!',
    q5_massas: 'Massa molar é só somar as massas dos átomos da fórmula. E o número fora do parêntese multiplica tudo o que está dentro!',
    q5_calculo: 'Os coeficientes da equação são como uma receita de bolo: sempre na mesma proporção.',
    q5_entrega: 'Leva a planilha para a prefeita! Quero ver a cara do Grupo Vex.',
    q5_fim: 'Calculei quantos mol de água cabem no meu copo: uns 11 mol! É muita molécula.',
    q6_carta: 'O carteiro passou no laboratório hoje cedo. Parecia uma carta importante!',
    q6_coleta: 'O ponto de coleta fica na margem do rio, abaixo da fonte.',
    q6_separacao: 'Para cada mistura, um método: filtro para sólidos, funil para líquidos que não se misturam, ímã para o ferro...',
    q6_bento: 'Destilador grande? Nem o Seu Bento deve ter. Mas pergunta lá!',
    q6_destilacao: 'Destilação é como a chuva: a água evapora, condensa e cai limpa.',
    q6_formula: 'Diluir é colocar mais água: o soluto é o mesmo, só fica mais espalhado.',
    q6_rio: 'Vai! Joga a Fórmula Aurora no rio! Quero ver a água ficar azul!',
    q6_prefeita: 'O rio está AZUL! Conta para a prefeita!',
    q6_congresso: 'Congresso Internacional! Traz um autógrafo de algum cientista famoso para mim?',
    q6_fim: 'Decidi: vou estudar Química na faculdade. Um dia eu trabalho no Aurora com você!'
  };

  H.lia = async function () {
    if (q() === 'q2_lia') {
      await talk([
        ['lia', '{player}! Você soube? Sábado tem o Festival das Luzes de Vale Cobalto!'],
        ['lia', 'A prefeita quer fogos coloridos, mas o Grupo Vex está cobrando uma fortuna.'],
        ['lia', 'E eu tenho prova sobre o átomo na segunda... Aquele mural apagado no Aurora era da Profa. Ítala, né?'],
        ['lia', 'Se você restaurar o mural, eu estudo por ele! Dizem até que a cor dos fogos tem a ver com os elétrons.']
      ]);
      VC.setQuest('q2_mural');
      return;
    }
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
    q_entrega: '{cat} boceja. Entregue logo esse laudo.',
    q2_mural: '{cat} encara o mural apagado, com as orelhas em pé.',
    q2_familias: '{cat} dá uma patada no canto do mural onde ficam os gases nobres.',
    q2_chama: '{cat} se afasta da bancada. Gatos e chamas não combinam.',
    q2_fim: '{cat} ainda está assustado com os fogos de ontem.',
    q3_amostras: '{cat} cheira um frasco de sal e torce o nariz.',
    q3_formulas: '{cat} sentou bem em cima das anotações da bancada de síntese.',
    q3_detergente: '{cat} observa as bolhas de sabão com muita desconfiança.',
    q4_indicador: '{cat} cheira o repolho roxo e decide que não é comida de gato.',
    q4_chuva: '{cat} detesta chuva. Ácida, então, nem se fala.',
    q4_equacoes: '{cat} empurra uma molécula de O_2 do modelo para fora da bancada. Agora faltam dois oxigênios.',
    q4_fim: '{cat} dorme em cima da capela nova, que está quentinha.',
    q5_grandezas: '{cat} tenta contar os grãos de sal da bancada. Desiste no terceiro.',
    q5_massas: '{cat} encosta o bigode na balança analítica, e o visor treme na quarta casa decimal.',
    q5_calculo: '{cat} senta em cima das contas. Talvez seja o jeito dele de ajudar.',
    q5_fim: '{cat} dorme ao lado da balança analítica. Em cima dela, nem pensar.',
    q6_separacao: '{cat} encara o funil de decantação, hipnotizado pela gota que cai.',
    q6_destilacao: '{cat} se enrola perto do destilador, que está quentinho.',
    q6_formula: '{cat} cheira o tanque da Fórmula Aurora e espirra.',
    q6_fim: '{cat} ganhou um sachê especial para comemorar. A Profa. Ítala fez questão.'
  };

  H.cat = async function () {
    ui().sfx('blip');
    await say('cat', 'Miau.');
    await say('narrador', CAT_LINES[q()] || '{cat} ronrona, satisfeito com o laboratório.');
  };

  H.mesa = async function (scene) {
    if (q() === 'q6_carta') {
      await talk([
        ['itala', '{player}, se esta carta chegou, é porque o Aurora está de pé de novo. As notícias de Vale Cobalto chegam longe.'],
        ['itala', 'Aqui está a última página da minha pesquisa. Para limpar o rio, primeiro separe o que está misturado nele.'],
        ['itala', 'Depois, a Fórmula Aurora, na concentração certa: 2 g/L. Nem mais, nem menos.'],
        ['itala', 'Comece por uma amostra do rio. Eu acredito em você. P.S.: o gato continua bem alimentado?']
      ]);
      VC.addItem('pagina_aurora');
      VC.setQuest('q6_coleta');
      return;
    }
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

  H.bancada = async function (scene) {
    if (q() === 'q6_separacao') {
      await say('narrador', 'A amostra do rio é uma mistura de muitas misturas. Primeiro, identifique as fases; depois, o método para separar cada uma.');
      const r = await ui().challenge(['misturas', 'separacao'], 'Amostra separada');
      VC.state.stars.separacao = r.stars;
      VC.learn(['mistura_homogenea', 'mistura_heterogenea', 'separacao']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Filtro e funil de decantação resolveram a lama, as folhas e o óleo. Mas os sais dissolvidos só saem com um destilador, e o Aurora não tem um grande o bastante.');
      VC.setQuest('q6_bento');
      return;
    }
    if (q() === 'q5_grandezas') {
      await say('narrador', 'Massa, mol, volume, número de partículas... Antes de calcular qualquer coisa, cada grandeza precisa da unidade certa.');
      const r = await ui().challenge(['grandezas', 'unidades'], 'Grandezas organizadas');
      VC.state.stars.grandezas = r.stars;
      VC.learn(['mol', 'avogadro', 'massa_atomica', 'volume_molar']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Para uma encomenda tão grande, a balança da bancada não basta. O Seu Bento deve ter algo mais preciso.');
      VC.setQuest('q5_bento');
      return;
    }
    if (q() === 'q4_indicador') {
      await say('narrador', 'Você pica o repolho roxo, ferve com água e coa. O suco roxo é o indicador. Uma gota em cada tubo de ensaio.');
      const r = await ui().challenge('indicador', 'Solo testado');
      VC.state.stars.indicador = r.stars;
      VC.learn(['ph', 'indicador']);
      VC.addCoins(15 + 10 * r.stars);
      VC.removeItem('repolho');
      VC.removeItem('solo');
      await say('narrador', 'O solo da horta está ácido demais. No galpão, você tinha visto um saco de calcário. É hora de usar.');
      VC.setQuest('q4_calagem');
      return;
    }
    if (q() === 'q4_chuva') {
      await say('narrador', 'Uma gota de indicador na água da chuva: ela fica rosa. Hora de entender de onde vem esse ácido.');
      const r = await ui().challenge('chuva', 'Chuva analisada');
      VC.state.stars.chuva = r.stars;
      VC.learn(['oxido', 'chuva_acida']);
      VC.addCoins(15 + 10 * r.stars);
      VC.removeItem('agua_chuva');
      await say('narrador', 'Agora falta escrever as reações do relatório, balanceadas. Na bancada de síntese, com os modelos de moléculas.');
      VC.setQuest('q4_equacoes');
      return;
    }
    if (q() === 'q3_amostras') {
      await say('narrador', 'Você testa cada amostra: brilho, dureza, ponto de fusão e se conduz eletricidade.');
      const r = await ui().challenge(['amostras', 'ligacoes'], 'Amostras identificadas');
      VC.state.stars.amostras = r.stars;
      VC.learn(['octeto', 'ligacao_ionica', 'ligacao_covalente', 'ligacao_metalica']);
      VC.addCoins(15 + 10 * r.stars);
      await talk([
        ['narrador', 'Para escrever as fórmulas dos rótulos, você precisa de mais espaço.'],
        ['narrador', 'Debaixo de uma lona no canto, você encontra a bancada de síntese da Profa. Ítala, com modelos de moléculas.']
      ]);
      VC.flag('sinteseOk', true);
      scene.refreshObject('sintese');
      VC.setQuest('q3_formulas');
      return;
    }
    if (q() === 'q2_chama') {
      await say('narrador', 'Bico de Bunsen aceso, chama azul e limpa. Um sal de cada vez na alça de platina.');
      const r = await ui().challenge('chama', 'Teste de chama concluído');
      VC.state.stars.chama = r.stars;
      VC.learn(['teste_chama', 'bohr']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Você anota a receita: cada sal, sua cor. Os fogos do festival estão garantidos.');
      VC.addItem('receita');
      VC.setQuest('q2_entrega');
      return;
    }
    if (VC.hasItem('bunsen') && q() !== 'q_bancada') { await say('narrador', 'Bancada equipada: balança calibrada e bico de Bunsen pronto para uso.'); return; }
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

  H.mural = async function (scene) {
    if (q() === 'q2_mural') {
      await say('narrador', 'No centro do mural, um átomo desenhado à mão pela professora, quase apagado. Hora de refazer.');
      const r = await ui().challenge(['particulas', 'atomos'], 'Átomo restaurado');
      VC.state.stars.mural1 = r.stars;
      VC.flag('muralMeio', true);
      scene.refreshObject('mural');
      VC.learn(['particulas', 'numero_atomico', 'numero_massa', 'ions_isotopos', 'camadas']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'O átomo voltou a aparecer no mural. Em volta dele, a tabela ainda está apagada.');
      VC.setQuest('q2_familias');
      return;
    }
    if (q() === 'q2_familias') {
      await say('narrador', 'Agora as colunas da tabela: cada família tem sua cor no mural.');
      const r = await ui().challenge(['familias', 'tabela'], 'Mural restaurado');
      VC.state.stars.mural2 = r.stars;
      VC.flag('muralOk', true);
      scene.refreshObject('mural');
      VC.learn(['tabela', 'familias']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'O mural da Profa. Ítala está completo de novo, com cores vivas em cada família.');
      ui().toast('Missão concluída: O mural apagado');
      VC.setQuest('q2_bento');
      return;
    }
    if (VC.flag('muralOk')) { await say('narrador', 'O mural restaurado: alcalinos, alcalino-terrosos, halogênios e gases nobres, cada um com sua cor.'); return; }
    await say('narrador', 'Um mural da tabela periódica, quase todo apagado. A Profa. Ítala desenhou cada quadrinho à mão.');
  };

  H.lavaolhos = async function () {
    await say('narrador', 'Lava-olhos e chuveiro de emergência. Em caso de respingo nos olhos, lave por cerca de 15 minutos.');
    if (VC.flag('epi')) VC.learn('emergencia');
  };

  H.lousa = async function () { await say('narrador', 'Você rabisca na lousa: H_2O, CO_2, NaCl, O_3. Ficou bonito.'); };
  H.licenca = async function () { await say('narrador', 'Licença provisória de funcionamento. O Aurora está oficialmente de volta!'); };
  H.planta = async function () { await say('narrador', 'A samambaia gosta da luz do laboratório. Plantas fazem fotossíntese: um fenômeno químico!'); };
  H.sintese = async function () {
    if (q() === 'q6_formula') {
      await say('narrador', 'A receita da Profa. Ítala: 2 g/L, nem mais, nem menos. Primeiro, alguns testes de diluição.');
      const r = await ui().challenge('diluicao', 'Fórmula Aurora pronta');
      VC.state.stars.formula = r.stars;
      VC.learn('diluicao');
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'O tanque de 12 L está pronto: 3 L de concentrado e 9 L de água destilada. A Fórmula Aurora, finalmente.');
      VC.removeItem('amostra_rio');
      VC.addItem('formula_aurora');
      VC.setQuest('q6_rio');
      return;
    }
    if (q() === 'q5_calculo') {
      await say('narrador', 'Os coeficientes da equação balanceada são a receita da reação: dizem quantos mol de cada substância reagem e se formam.');
      const r = await ui().challenge(['proporcoes', 'limitante'], 'Encomenda calculada');
      VC.state.stars.calculo = r.stars;
      VC.learn(['estequiometria', 'limitante', 'proust']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'A planilha está pronta: cada reagente em mol e em gramas, na proporção exata da equação.');
      VC.removeItem('pedido');
      VC.addItem('planilha');
      VC.setQuest('q5_entrega');
      return;
    }
    if (q() === 'q3_formulas') {
      await say('narrador', 'Cada rótulo precisa da fórmula certa: a soma das cargas dos íons tem que dar zero.');
      const r = await ui().challenge('formulas', 'Rótulos prontos');
      VC.state.stars.formulas = r.stars;
      VC.learn('formula_ionica');
      VC.addCoins(15 + 10 * r.stars);
      VC.removeItem('amostras');
      VC.addItem('rotulos');
      VC.setQuest('q3_rotulos');
      return;
    }
    if (q() === 'q3_detergente') {
      await say('narrador', 'Para fazer o detergente certo, primeiro você testa o que se dissolve na água e o que se dissolve no óleo.');
      const r = await ui().challenge('solubilidade', 'Detergente pronto');
      VC.state.stars.detergente = r.stars;
      VC.learn(['semelhante', 'detergente']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Uma molécula com ponta polar e cauda apolar: o detergente está pronto.');
      VC.addItem('detergente');
      VC.setQuest('q3_limpar');
      return;
    }
    if (q() === 'q4_equacoes') {
      await say('narrador', 'Você monta cada reação com os modelos de moléculas. Nenhum átomo pode sumir nem aparecer do nada.');
      const r = await ui().challenge('equacoes', 'Relatório pronto');
      VC.state.stars.equacoes = r.stars;
      VC.learn(['lavoisier', 'balanceamento']);
      VC.addCoins(15 + 10 * r.stars);
      VC.addItem('relatorio_amb');
      VC.setQuest('q4_entrega');
      return;
    }
    await say('narrador', 'A bancada de síntese da Profa. Ítala: modelos de moléculas, frascos e anotações nas margens.');
  };

  H.horta = async function (scene) {
    if (q() === 'q4_horta') {
      await talk([
        ['narrador', 'Folhas amareladas, tomates miúdos e repolhos murchos. Ao lado do canteiro, o galpão está cheio de sacos e frascos misturados.'],
        ['narrador', 'Antes de testar qualquer coisa, melhor saber o que é cada produto.']
      ]);
      const r = await ui().challenge('funcoes', 'Galpão organizado');
      VC.state.stars.funcoes = r.stars;
      VC.learn(['acido', 'base', 'sal', 'oxido']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Você colhe um repolho roxo, o único que ainda está firme, e guarda um pouco de terra do canteiro.');
      VC.addItem('repolho');
      VC.addItem('solo');
      VC.setQuest('q4_indicador');
      return;
    }
    if (q() === 'q4_calagem') {
      await say('narrador', 'Você espalha o calcário no canteiro e mistura bem com a terra.');
      const r = await ui().challenge('calagem', 'Solo corrigido');
      VC.state.stars.calagem = r.stars;
      VC.learn('neutralizacao');
      VC.addCoins(15 + 10 * r.stars);
      VC.flag('hortaOk', true);
      scene.refreshObject('horta');
      ui().sfx('win');
      await say('narrador', 'Alguns dias depois, a horta está verde de novo: repolhos roxos firmes e os primeiros tomates vermelhos.');
      ui().toast('Missão concluída: Solo ácido na horta');
      await rainScene(scene);
      return;
    }
    if (VC.flag('hortaOk')) { await say('narrador', 'A horta comunitária, verde e cheia: repolhos roxos, tomates e alfaces. Nada como um solo com o pH certo.'); return; }
    if (q().indexOf('q4_') === 0) { await say('narrador', 'O canteiro continua amarelado. O solo precisa de cuidado.'); return; }
    await say('narrador', 'A horta comunitária de Vale Cobalto. As folhas andam meio amareladas.');
  };

  H.coleta = async function (scene) {
    if (q() === 'q6_coleta') {
      await say('narrador', 'Você enche um frasco na margem: água turva, folhas, lama, uma película de óleo e, invisíveis, os sais dissolvidos.');
      VC.addItem('amostra_rio');
      VC.setQuest('q6_separacao');
      return;
    }
    if (q() === 'q6_rio') { await riverScene(scene); return; }
    await say('narrador', VC.flag('rioLimpo') ? 'O ponto de coleta. A água do frasco de teste agora sai transparente.' : 'O ponto de coleta de amostras do rio, com um frasco preso à placa.');
  };

  H.destilador = async function () {
    if (q() === 'q6_destilacao') {
      await say('narrador', 'A amostra ferve no balão, o vapor passa pelo condensador e pinga limpo no frasco coletor. No balão, ficam os sais.');
      const r = await ui().challenge(['destilacao', 'concentracao'], 'Amostra purificada');
      VC.state.stars.destilacao = r.stars;
      VC.learn(['destilacao', 'solucao', 'concentracao_comum', 'concentracao_molar', 'saturada']);
      VC.addCoins(15 + 10 * r.stars);
      ui().toast('Missão concluída: O rio por partes');
      await say('narrador', 'Com a água destilada, já dá para preparar a Fórmula Aurora. A concentração precisa ser exata.');
      VC.setQuest('q6_formula');
      return;
    }
    await say('narrador', 'O destilador do Grupo Vex: balão, condensador e frasco coletor. Presente de um rival que virou parceiro.');
  };

  H.rival = async function (scene) {
    if (q() === 'q6_congresso') { await congressScene(scene); return; }
    await say('rival', 'O Grupo Vex agora trata a água antes de devolver ao rio. Ideia de uma certa pessoa do Aurora, {player}.');
  };

  H.itala = async function () {
    await say('itala_p', 'O Aurora está em boas mãos, {player}. Descanse um pouco. Depois, a ciência continua.');
  };

  H.analitica = async function () {
    if (q() === 'q5_massas') {
      await say('narrador', 'Com a tabela de massas atômicas, você calcula a massa molar de cada reagente e confere tudo na balança analítica.');
      const r = await ui().challenge(['massa_molar', 'conversoes'], 'Massas conferidas');
      VC.state.stars.massas = r.stars;
      VC.learn(['massa_molar', 'conversao']);
      VC.addCoins(15 + 10 * r.stars);
      ui().toast('Missão concluída: A grande encomenda');
      await say('narrador', 'Falta o principal: quanto de cada reagente a estação vai usar. A resposta está na equação da reação.');
      VC.setQuest('q5_calculo');
      return;
    }
    await say('narrador', 'A balança analítica: precisão de 0,0001 g, dentro de uma caixinha de vidro para nenhuma corrente de ar atrapalhar a pesagem.');
  };
  H.poster_mol = async function () { await say('narrador', 'O pôster do mol: 6,02 × 10^23. Se fossem grãos de arroz, cobririam a Terra inteira com uma camada de dezenas de metros.'); };

  H.capela = async function () {
    await say('narrador', 'A capela de exaustão: um exaustor puxa gases e vapores para fora do laboratório. Reações com ácidos fortes, só aqui dentro.');
  };
  H.cartaz_ph = async function () { await say('narrador', 'O cartaz da escala de pH: vermelho, rosa, roxo, azul, verde e amarelo. Do ácido forte à base forte.'); };

  H.tubos = async function () { await say('narrador', 'Tubos de ensaio coloridos, prontos para pequenas reações.'); };

  H.modelo = async function () { await say('narrador', 'Um modelo atômico de Bohr: núcleo no centro e elétrons girando em camadas.'); };
  H.poltrona = async function () { await say('narrador', 'Uma poltrona confortável. {cat} já decidiu que ela é dele.'); };
  H.fonte = async function (scene) {
    if (q() === 'q3_fonte') {
      await say('narrador', 'O óleo chega pelo cano que traz a água do rio e forma uma mancha escura, com reflexos coloridos, por cima da água.');
      const r = await ui().challenge('polaridade', 'Problema entendido');
      VC.state.stars.fonte = r.stars;
      VC.learn(['polaridade', 'forcas_intermoleculares']);
      VC.addCoins(15 + 10 * r.stars);
      await say('narrador', 'Água sozinha não resolve. Você precisa de uma molécula que goste das duas coisas: um detergente.');
      VC.setQuest('q3_detergente');
      return;
    }
    if (q() === 'q3_limpar') {
      await talk([
        ['narrador', 'Você espalha o detergente e mexe a água com cuidado.'],
        ['narrador', 'As caudas apolares envolvem as gotas de óleo, e a água da fonte leva tudo para o filtro.']
      ]);
      VC.removeItem('detergente');
      VC.flag('fonteLimpa', true);
      scene.refreshObject('fonte');
      ui().sfx('win');
      VC.setQuest('q3_prefeita');
      return;
    }
    if (VC.flag('oleo') && !VC.flag('fonteLimpa')) { await say('narrador', 'Uma mancha de óleo boia na fonte, com reflexos coloridos.'); return; }
    if (VC.flag('fonteLimpa')) { await say('narrador', 'Sem óleo, a fonte voltou ao normal. A água ainda vem turva do rio, mas isso é um problema para outro dia.'); return; }
    await say('narrador', 'A água da fonte vem do rio. Está turva e tem um leve cheiro de ovo podre.');
  };
  H.placa_lab = async function () { await say('narrador', 'Laboratório Aurora. Fundado pela Profa. Ítala Ferraz.'); };
  H.quadro = async function () { await ui().roadmap(); };

  S.interact = async function (id, scene) {
    if (!H[id]) return;
    ui().lock();
    try { await H[id](scene); } finally { ui().unlock(); }
  };
})();
