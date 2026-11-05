/* Vale Cobalto - conteúdo dos desafios. Fórmulas usam _ para subscrito. */
window.VC = window.VC || {};

VC.CHALLENGES = {
  // Missão 1a: escolher os EPIs corretos
  epi: {
    type: 'pick',
    title: 'Armário de segurança',
    prompt: 'Toque nos itens que você deve usar antes de trabalhar na bancada.',
    options: [
      { label: 'Jaleco de algodão', ok: true, why: 'Protege pele e roupa de respingos. Algodão queima menos perigosamente que tecido sintético.' },
      { label: 'Óculos de proteção', ok: true, why: 'Os olhos são a parte mais sensível a respingos e vapores.' },
      { label: 'Luvas nitrílicas', ok: true, why: 'Protegem as mãos do contato direto com reagentes.' },
      { label: 'Sandália aberta', ok: false, why: 'No laboratório o calçado deve ser fechado: um frasco quebrado ou respingo atinge os pés.' },
      { label: 'Cabelo solto', ok: false, why: 'Cabelo comprido deve ficar preso, longe de chamas e reagentes.' },
      { label: 'Lanche na bancada', ok: false, why: 'Nunca se come ou bebe no laboratório: há risco de contaminação.' }
    ]
  },

  // Missão 1b: perguntas rápidas de segurança
  seguranca: {
    type: 'quiz',
    title: 'Regras de ouro',
    questions: [
      {
        q: 'Um reagente respingou no seu olho. O que fazer primeiro?',
        options: ['Lavar no lava-olhos por cerca de 15 minutos', 'Esfregar com um papel limpo', 'Pingar outro reagente para neutralizar'],
        answer: 0,
        why: 'Água corrente em abundância dilui e remove o reagente. Esfregar ou "neutralizar" pode piorar a lesão.'
      },
      {
        q: 'Como descobrir os riscos de um reagente desconhecido?',
        options: ['Cheirar diretamente o frasco', 'Ler o rótulo e a Ficha de Dados de Segurança (FDS)', 'Provar uma quantidade bem pequena'],
        answer: 1,
        why: 'O rótulo e a FDS trazem riscos, primeiros socorros e descarte. Nunca cheire ou prove reagentes.'
      }
    ]
  },

  // Missão 1c: organizar a estante
  estante: {
    type: 'sort',
    title: 'Estante de reagentes',
    prompt: 'Classifique cada frasco na prateleira certa.',
    bins: ['Substância simples', 'Substância composta', 'Mistura'],
    items: [
      { label: 'Gás oxigênio (O_2)', bin: 0, why: 'Formado só pelo elemento oxigênio.' },
      { label: 'Ozônio (O_3)', bin: 0, why: 'Também só oxigênio. O_2 e O_3 são alótropos do mesmo elemento.' },
      { label: 'Ferro (Fe)', bin: 0, why: 'Um único elemento: ferro.' },
      { label: 'Água destilada (H_2O)', bin: 1, why: 'Dois elementos (H e O) unidos quimicamente.' },
      { label: 'Cloreto de sódio (NaCl)', bin: 1, why: 'Sódio e cloro unidos: substância composta.' },
      { label: 'Gás carbônico (CO_2)', bin: 1, why: 'Carbono e oxigênio unidos quimicamente.' },
      { label: 'Ar atmosférico', bin: 2, why: 'Mistura de N_2, O_2, argônio, CO_2 e outros gases.' },
      { label: 'Água do mar', bin: 2, why: 'Água com vários sais dissolvidos: mistura.' },
      { label: 'Ouro 18k', bin: 2, why: 'É uma liga: ouro misturado com cobre e prata.' },
      { label: 'Granito', bin: 2, why: 'Rocha formada por quartzo, feldspato e mica: dá para ver os grãos diferentes.' }
    ]
  },

  // Missão 2a: relatório de ocorrências
  fenomenos: {
    type: 'sort',
    title: 'Relatório de ocorrências',
    prompt: 'Cada ocorrência da cidade é um fenômeno físico ou químico?',
    bins: ['Fenômeno físico', 'Fenômeno químico'],
    items: [
      { label: 'O gelo da sorveteria derreteu', bin: 0, why: 'Continua sendo água, só mudou de estado (fusão).' },
      { label: 'O portão de ferro da escola enferrujou', bin: 1, why: 'O ferro reagiu com oxigênio e água, formando ferrugem: substância nova.' },
      { label: 'Queimaram folhas secas no terreno', bin: 1, why: 'Combustão: forma CO_2, água e cinzas.' },
      { label: 'O açúcar dissolveu no café', bin: 0, why: 'O açúcar continua lá, apenas misturado (dá para sentir o gosto doce).' },
      { label: 'O leite azedou no mercado', bin: 1, why: 'Bactérias transformam a lactose em ácido lático: substância nova.' },
      { label: 'A vitrine da loja quebrou', bin: 0, why: 'Só mudou a forma: os cacos continuam sendo vidro.' },
      { label: 'O comprimido efervescente soltou bolhas', bin: 1, why: 'A reação libera gás carbônico: formação de gás é sinal de reação.' },
      { label: 'A água da poça secou no sol', bin: 0, why: 'Evaporação: a água passou para o estado gasoso, mas continua sendo água.' },
      { label: 'O bolo cresceu no forno', bin: 1, why: 'O fermento reage com o calor e libera CO_2, que faz a massa crescer.' },
      { label: 'Moeram o milho para fazer fubá', bin: 0, why: 'Só mudou o tamanho dos pedaços.' }
    ]
  },

  // Missão 2b: mudanças de estado
  estados: {
    type: 'quiz',
    title: 'Mudanças de estado',
    questions: [
      {
        q: 'Gelo virando água líquida é chamado de:',
        options: ['Solidificação', 'Fusão', 'Sublimação'],
        answer: 1,
        why: 'Fusão: passagem do estado sólido para o líquido.'
      },
      {
        q: 'Gotas aparecem do lado de fora de um copo de suco gelado. Isso é:',
        options: ['Condensação do vapor de água do ar', 'O suco atravessando o vidro', 'Fusão do vidro'],
        answer: 0,
        why: 'O vapor de água do ar esfria ao tocar o copo e volta ao estado líquido.'
      },
      {
        q: 'A naftalina some do armário sem nunca virar líquido. Isso é:',
        options: ['Vaporização', 'Condensação', 'Sublimação'],
        answer: 2,
        why: 'Sublimação: passagem direta do sólido para o gasoso.'
      },
      {
        q: 'Enquanto o gelo puro derrete, a temperatura dele:',
        options: ['Aumenta sem parar', 'Fica constante (0 °C ao nível do mar)', 'Diminui'],
        answer: 1,
        why: 'Em uma substância pura, a energia é usada para mudar de estado, e a temperatura fica constante.'
      }
    ]
  }
};
