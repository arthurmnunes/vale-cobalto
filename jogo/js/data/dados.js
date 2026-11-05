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
  licenca: { name: 'Licença provisória', icon: 'licenca', desc: 'Autoriza o funcionamento do Laboratório Aurora. Pendurada na parede do laboratório.' }
};

// Loja do Seu Bento
VC.SHOP = [
  { id: 'planta', name: 'Samambaia em vaso', price: 30, desc: 'Deixa o laboratório mais vivo.', decor: true },
  { id: 'poltrona', name: 'Poltrona de leitura', price: 45, desc: 'Para estudar com conforto.', decor: true },
  { id: 'lousa', name: 'Lousa branca', price: 60, desc: 'Para rabiscar fórmulas na parede.', decor: true },
  { id: 'bunsen', name: 'Bico de Bunsen', price: 80, desc: 'Chama para o teste de chama.', lockedText: 'Disponível no Capítulo 2' },
  { id: 'tubos', name: 'Tubos de ensaio', price: 40, desc: 'Para reações em pequena escala.', lockedText: 'Disponível no Capítulo 2' }
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
  mudancas_estado: { title: 'Mudanças de estado', text: 'Fusão (sólido → líquido), solidificação (líquido → sólido), vaporização (líquido → gás), condensação (gás → líquido) e sublimação (sólido ↔ gás). Em substância pura, a temperatura fica constante durante a mudança.' }
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
  q_fim_demo: { text: 'Fim do conteúdo disponível. O Capítulo 2 chega na próxima atualização.', target: null }
};

// Roteiro de capítulos (quadro de pedidos)
VC.CHAPTERS = [
  { n: 1, title: 'Fundamentos da Química', topic: 'Segurança, substâncias, misturas e fenômenos', reward: 'Licença provisória e balança' },
  { n: 2, title: 'O átomo e a tabela periódica', topic: 'Partículas, distribuição eletrônica, famílias', reward: 'Bico de Bunsen e mural restaurado' },
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
