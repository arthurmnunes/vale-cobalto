/* Vale Cobalto - dados do jogo (itens, caderno, missões, capítulos) */
window.VC = window.VC || {};

// Itens do inventário. Fórmulas usam _ para subscrito (H_2O).
VC.ITEMS = {
  chave: { name: 'Chave do laboratório', icon: 'chave', desc: 'Abre a porta do Laboratório Aurora. Presente da Prefeita Célia.' },
  carta: { name: 'Carta da Profa. Ítala', icon: 'carta', desc: '"Comece pela segurança. Sempre." E um P.S. sobre alimentar o gato.' },
  epi: { name: 'Kit de EPI', icon: 'epi', desc: 'Jaleco de algodão, óculos de proteção e luvas nitrílicas. Obrigatório na bancada.' },
  balanca: { name: 'Balança de laboratório', icon: 'balanca', desc: 'Mede a massa das substâncias. Vai ser essencial na estequiometria.' },
  relatorio: { name: 'Relatório de ocorrências', icon: 'relatorio', desc: 'Lista de acontecimentos que assustaram a cidade. Precisa de análise na bancada.' },
  laudo: { name: 'Laudo técnico', icon: 'laudo', desc: 'Sua análise dos fenômenos da cidade. Entregue à Prefeita Célia.' },
  licenca: { name: 'Licença provisória', icon: 'licenca', desc: 'Autoriza o funcionamento do Laboratório Aurora. Pendurada na parede do laboratório.' },
  bunsen: { name: 'Bico de Bunsen', icon: 'bunsen', desc: 'Queimador a gás com chama forte e regulável. Presente do Seu Bento para o festival.' },
  receita: { name: 'Receita dos fogos', icon: 'receita', desc: 'Que sal produz cada cor: sódio, cobre, estrôncio e potássio. Entregue à Prefeita Célia.' }
};

// Loja do Seu Bento
VC.SHOP = [
  { id: 'planta', name: 'Samambaia em vaso', price: 30, desc: 'Deixa o laboratório mais vivo.', decor: true },
  { id: 'poltrona', name: 'Poltrona de leitura', price: 45, desc: 'Para estudar com conforto.', decor: true },
  { id: 'lousa', name: 'Lousa branca', price: 60, desc: 'Para rabiscar fórmulas na parede.', decor: true },
  { id: 'modelo', name: 'Modelo atômico', price: 50, desc: 'Um átomo de Bohr com órbitas de arame.', decor: true, needs: 'cap1' },
  { id: 'tubos', name: 'Tubos de ensaio', price: 40, desc: 'Para reações em pequena escala.', lockedText: 'Disponível no Capítulo 3' }
];

// Caderno do Laboratório (conceitos aprendidos)
VC.NOTEBOOK = {
  epi: { title: 'EPI', text: 'Equipamento de Proteção Individual. No laboratório: jaleco de mangas longas, óculos de proteção, luvas adequadas ao reagente, calçado fechado e cabelo preso.' },
  fds: { title: 'Rótulo e FDS', text: 'Antes de usar um reagente, leia o rótulo e a Ficha de Dados de Segurança (FDS). Ela informa riscos, primeiros socorros e descarte. Nunca cheire ou prove reagentes.' },
  emergencia: { title: 'Lava-olhos', text: 'Respingo nos olhos: lave em água corrente no lava-olhos por cerca de 15 minutos e avise o responsável. Não esfregue e não tente neutralizar.' },
  substancia_simples: { title: 'Substância simples', text: 'Formada por átomos de um único elemento químico. Exemplos: O_2, O_3, Fe, H_2.' },
  substancia_composta: { title: 'Substância composta', text: 'Formada por dois ou mais elementos químicos diferentes, unidos quimicamente. Exemplos: H_2O, NaCl, CO_2.' },
  mistura: { title: 'Mistura', text: 'Reunião de duas ou mais substâncias que mantêm suas propriedades. Exemplos: ar atmosférico, água do mar, ouro 18k, granito.' },
  alotropia: { title: 'Alotropia', text: 'Um mesmo elemento pode formar substâncias simples diferentes. O oxigênio forma O_2 (gás oxigênio) e O_3 (ozônio).' },
  fenomeno_fisico: { title: 'Fenômeno físico', text: 'Muda a forma, o tamanho ou o estado físico, mas a substância continua a mesma. Exemplos: derreter gelo, quebrar vidro, dissolver açúcar.' },
  fenomeno_quimico: { title: 'Fenômeno químico', text: 'Formam-se substâncias novas (reação química). Sinais comuns: mudança de cor, liberação de gás, luz ou calor, formação de sólido.' },
  mudancas_estado: { title: 'Mudanças de estado', text: 'Fusão (sólido → líquido), solidificação (líquido → sólido), vaporização (líquido → gás), condensação (gás → líquido) e sublimação (sólido ↔ gás). Em substância pura, a temperatura fica constante durante a mudança.' },
  particulas: { title: 'Partículas do átomo', text: 'Próton: carga +1, fica no núcleo. Nêutron: sem carga, fica no núcleo. Elétron: carga −1, fica na eletrosfera e tem massa quase nula.' },
  numero_atomico: { title: 'Número atômico (Z)', text: 'Z é o número de prótons e define o elemento. Todo átomo com 6 prótons é carbono. No átomo neutro, elétrons = prótons.' },
  numero_massa: { title: 'Número de massa (A)', text: 'A = prótons + nêutrons. Para achar os nêutrons: n = A − Z. Sódio-23: 23 − 11 = 12 nêutrons.' },
  ions_isotopos: { title: 'Íons e isótopos', text: 'Íon: átomo que perdeu elétrons (cátion, carga +, como Na^+) ou ganhou elétrons (ânion, carga −, como Cl^−). Isótopos: mesmo Z e A diferente, como carbono-12 e carbono-14.' },
  camadas: { title: 'Camadas eletrônicas', text: 'No modelo de Bohr, os elétrons ocupam camadas: K, L, M... Nos 20 primeiros elementos, K recebe até 2, L até 8 e M até 8. Sódio: 2-8-1. Cloro: 2-8-7.' },
  tabela: { title: 'Tabela periódica', text: 'Período (linha) = número de camadas. Família ou grupo (coluna) = mesmo número de elétrons na camada de valência, por isso propriedades parecidas.' },
  familias: { title: 'Famílias', text: 'Grupo 1: metais alcalinos (Li, Na, K). Grupo 2: alcalino-terrosos (Mg, Ca). Grupo 17: halogênios (F, Cl, Br). Grupo 18: gases nobres (He, Ne, Ar), com a camada de valência completa.' },
  teste_chama: { title: 'Teste de chama', text: 'Na chama, os elétrons absorvem energia e saltam para camadas mais externas. Ao voltar, emitem luz de cor característica: sódio amarelo, potássio lilás, cobre verde-azulado, estrôncio vermelho.' },
  bohr: { title: 'Modelo de Bohr', text: 'Os elétrons giram em camadas com energia definida. Só mudam de camada absorvendo ou emitindo uma quantidade exata de energia, o que explica as cores do teste de chama.' }
};

// Missões: texto do objetivo e alvo do marcador "!"
VC.QUESTS = {
  q_prefeita: { text: 'Fale com a Prefeita Célia, em frente ao laboratório.', target: { map: 'praca', id: 'prefeita' } },
  q_entrar: { text: 'Entre no Laboratório Aurora (telhado azul).', target: { map: 'praca', door: 'lab' } },
  q_carta: { text: 'Leia a carta sobre a mesa da professora.', target: { map: 'lab', id: 'mesa' } },
  q_epi: { text: 'Pegue os EPIs no armário de segurança.', target: { map: 'lab', id: 'armario' } },
  q_estante: { text: 'Organize os frascos da estante de reagentes.', target: { map: 'lab', id: 'estante' } },
  q_volta_prefeita: { text: 'Volte à praça e fale com a Prefeita Célia.', target: { map: 'praca', id: 'prefeita' } },
  q_bancada: { text: 'Analise o relatório de ocorrências na bancada.', target: { map: 'lab', id: 'bancada' } },
  q_entrega: { text: 'Entregue o laudo à Prefeita Célia.', target: { map: 'praca', id: 'prefeita' } },
  q_fim1: { text: 'Capítulo 1 concluído. Use sua verba na barraca do Seu Bento.', target: { map: 'praca', id: 'bento' } },
  q_ver_lab: { text: 'Veja as melhorias no laboratório.', target: { map: 'lab' } },
  q_fim_demo: { text: 'Fim do conteúdo disponível. O Capítulo 2 chega na próxima atualização.', target: null },
  q2_lia: { ch: 2, text: 'A Lia tem novidades. Procure por ela na praça.', target: { map: 'praca', id: 'lia' } },
  q2_mural: { ch: 2, text: 'Restaure o mural do átomo no laboratório.', target: { map: 'lab', id: 'mural' } },
  q2_familias: { ch: 2, text: 'Termine o mural: as famílias da tabela periódica.', target: { map: 'lab', id: 'mural' } },
  q2_bento: { ch: 2, text: 'Fale com o Seu Bento sobre os fogos do festival.', target: { map: 'praca', id: 'bento' } },
  q2_chama: { ch: 2, text: 'Faça o teste de chama na bancada.', target: { map: 'lab', id: 'bancada' } },
  q2_entrega: { ch: 2, text: 'Leve a receita dos fogos à Prefeita Célia.', target: { map: 'praca', id: 'prefeita' } },
  q2_fim: { ch: 2, text: 'Fim do conteúdo disponível. O Capítulo 3 chega na próxima atualização.', target: null }
};

// Capítulos já implementados
VC.IMPLEMENTED = 2;

// Roteiro de capítulos (quadro de pedidos)
VC.CHAPTERS = [
  { n: 1, short: 'Fundamentos', title: 'Fundamentos da Química', topic: 'Segurança, substâncias, misturas e fenômenos', reward: 'Licença provisória e balança' },
  { n: 2, short: 'O átomo', title: 'O átomo e a tabela periódica', topic: 'Partículas, distribuição eletrônica, famílias', reward: 'Bico de Bunsen e mural restaurado' },
  { n: 3, title: 'Ligações e interações', topic: 'Iônica, covalente, metálica e polaridade', reward: 'Bancada de síntese' },
  { n: 4, title: 'Compostos e reações inorgânicas', topic: 'Ácidos, bases, sais, óxidos e balanceamento', reward: 'Medidor de pH e capela' },
  { n: 5, title: 'Grandezas e estequiometria', topic: 'Mol, massa molar e proporções', reward: 'Balança analítica' },
  { n: 6, title: 'Soluções e misturas', topic: 'Concentração, diluição e separação', reward: 'Destilador e a Fórmula Aurora' }
];

// Personagens que falam
VC.SPEAKERS = {
  prefeita: { name: 'Prefeita Célia', sprite: 'prefeita' },
  bento: { name: 'Seu Bento', sprite: 'bento' },
  lia: { name: 'Lia', sprite: 'lia' },
  rival: { name: () => VC.state.rival || '???', sprite: 'rival' },
  cat: { name: () => VC.state.cat || 'Gato', sprite: 'cat' },
  player: { name: () => VC.state.player, sprite: 'player' },
  itala: { name: 'Profa. Ítala (carta)', sprite: null },
  narrador: { name: '', sprite: null }
};
