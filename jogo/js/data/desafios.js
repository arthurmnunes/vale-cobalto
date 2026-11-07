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
,

  /* ================= Capítulo 2 ================= */

  particulas: {
    type: 'quiz',
    title: 'Mural do átomo',
    questions: [
      {
        q: 'Qual partícula tem carga positiva e fica no núcleo?',
        options: ['Elétron', 'Próton', 'Nêutron'],
        answer: 1,
        why: 'O próton tem carga +1 e fica no núcleo, junto com os nêutrons, que não têm carga.'
      },
      {
        q: 'O que define qual elemento químico um átomo é?',
        options: ['O número de nêutrons', 'O número de elétrons', 'O número de prótons (Z)'],
        answer: 2,
        why: 'O número atômico Z é o número de prótons. Todo átomo com 6 prótons é carbono, não importa quantos nêutrons ou elétrons tenha.'
      },
      {
        q: 'Carbono-12 e carbono-14 têm 6 prótons cada, mas massas diferentes. Eles são:',
        options: ['Isótopos', 'Íons', 'Elementos diferentes'],
        answer: 0,
        why: 'Isótopos têm o mesmo número de prótons e números de nêutrons diferentes: 6 no C-12 e 8 no C-14.'
      }
    ]
  },

  atomos: {
    type: 'numbers',
    title: 'Monte os átomos',
    tasks: [
      {
        prompt: 'Monte um átomo neutro de carbono-12. Dados: Z = 6 e A = 12.',
        fields: [['p', 'Prótons'], ['n', 'Nêutrons'], ['e', 'Elétrons']],
        answer: { p: 6, n: 6, e: 6 },
        why: 'Z = 6, então 6 prótons. Neutro: 6 elétrons. Nêutrons = A − Z = 12 − 6 = 6.'
      },
      {
        prompt: 'Monte um átomo neutro de sódio-23. Dados: Z = 11 e A = 23.',
        fields: [['p', 'Prótons'], ['n', 'Nêutrons'], ['e', 'Elétrons']],
        answer: { p: 11, n: 12, e: 11 },
        why: '11 prótons, 11 elétrons (neutro) e 23 − 11 = 12 nêutrons.'
      },
      {
        prompt: 'Agora o íon Na^+: o sódio perdeu 1 elétron.',
        fields: [['p', 'Prótons'], ['n', 'Nêutrons'], ['e', 'Elétrons']],
        answer: { p: 11, n: 12, e: 10 },
        why: 'Perder elétron não muda o núcleo: continuam 11 prótons e 12 nêutrons. Ficam 10 elétrons, e a carga passa a ser +1.'
      },
      {
        prompt: 'Distribua os 11 elétrons do sódio nas camadas.',
        fields: [['K', 'Camada K'], ['L', 'Camada L'], ['M', 'Camada M']],
        answer: { K: 2, L: 8, M: 1 },
        shells: true,
        why: 'K recebe até 2 e L até 8. Sobra 1 elétron para a M: 2-8-1. Esse único elétron externo é fácil de perder, por isso o sódio forma Na^+.'
      },
      {
        prompt: 'Distribua os 17 elétrons do cloro nas camadas.',
        fields: [['K', 'Camada K'], ['L', 'Camada L'], ['M', 'Camada M']],
        answer: { K: 2, L: 8, M: 7 },
        shells: true,
        why: '2-8-7: são 7 elétrons na última camada, falta 1 para completar 8. Por isso o cloro tende a ganhar 1 elétron e formar Cl^−.'
      }
    ]
  },

  familias: {
    type: 'sort',
    title: 'Mural das famílias',
    prompt: 'Coloque cada elemento na sua família da tabela periódica.',
    bins: ['Metais alcalinos', 'Alcalino-terrosos', 'Halogênios', 'Gases nobres'],
    items: [
      { label: 'Lítio (Li)', bin: 0, why: 'Grupo 1: 1 elétron na camada de valência.' },
      { label: 'Sódio (Na)', bin: 0, why: 'Grupo 1. Muito reativo: reage até com a água.' },
      { label: 'Potássio (K)', bin: 0, why: 'Grupo 1, como o lítio e o sódio.' },
      { label: 'Magnésio (Mg)', bin: 1, why: 'Grupo 2: 2 elétrons na camada de valência.' },
      { label: 'Cálcio (Ca)', bin: 1, why: 'Grupo 2. Está nos ossos, no calcário e na casca de ovo.' },
      { label: 'Flúor (F)', bin: 2, why: 'Grupo 17: 7 elétrons na valência. É o mais reativo dos halogênios.' },
      { label: 'Cloro (Cl)', bin: 2, why: 'Grupo 17. Usado no tratamento de água.' },
      { label: 'Bromo (Br)', bin: 2, why: 'Grupo 17. Um dos poucos elementos líquidos à temperatura ambiente.' },
      { label: 'Hélio (He)', bin: 3, why: 'Grupo 18: camada completa, quase não reage. Enche balões.' },
      { label: 'Neônio (Ne)', bin: 3, why: 'Grupo 18. Brilha em letreiros luminosos.' },
      { label: 'Argônio (Ar)', bin: 3, why: 'Grupo 18. Usado dentro de lâmpadas porque não reage com o filamento.' }
    ]
  },

  tabela: {
    type: 'quiz',
    title: 'Lendo a tabela periódica',
    questions: [
      {
        q: 'O que os elementos de uma mesma família (coluna) têm em comum?',
        options: ['A mesma massa', 'O mesmo número de elétrons na camada de valência', 'O mesmo número de prótons'],
        answer: 1,
        why: 'O mesmo número de elétrons na última camada dá propriedades químicas parecidas a toda a família.'
      },
      {
        q: 'O sódio tem distribuição 2-8-1. Em que período ele está?',
        options: ['1º período', '8º período', '3º período'],
        answer: 2,
        why: 'Período = número de camadas. São 3 camadas (K, L, M), então 3º período.'
      },
      {
        q: 'Por que os gases nobres quase não reagem?',
        options: ['Têm a camada de valência completa', 'São leves demais', 'Não têm elétrons'],
        answer: 0,
        why: 'Com a última camada completa, eles já são estáveis e não precisam ganhar, perder ou compartilhar elétrons.'
      }
    ]
  },

  chama: {
    type: 'quiz',
    title: 'Teste de chama',
    questions: [
      {
        flame: '#ffb020',
        q: 'Você leva um sal à chama do bico de Bunsen e ela fica assim. Qual é o sal?',
        options: ['Cloreto de cobre (CuCl_2)', 'Cloreto de sódio (NaCl)', 'Cloreto de potássio (KCl)'],
        answer: 1,
        why: 'O sódio produz um amarelo-alaranjado intenso. É a mesma cor das lâmpadas de vapor de sódio nas ruas.'
      },
      {
        flame: '#2fd3b0',
        q: 'E esta chama verde-azulada?',
        options: ['Cloreto de cobre (CuCl_2)', 'Cloreto de estrôncio (SrCl_2)', 'Cloreto de sódio (NaCl)'],
        answer: 0,
        why: 'O cobre dá a chama verde-azulada. Nos fogos de artifício, sais de cobre fazem o verde e o azul.'
      },
      {
        flame: '#e8323c',
        q: 'A prefeita quer fogos vermelhos. Qual sal produziu esta chama?',
        options: ['Cloreto de potássio (KCl)', 'Cloreto de cobre (CuCl_2)', 'Cloreto de estrôncio (SrCl_2)'],
        answer: 2,
        why: 'O estrôncio dá o vermelho vivo, o mais usado em fogos de artifício e sinalizadores.'
      },
      {
        flame: '#b48ce8',
        q: 'E esta chama lilás, bem suave?',
        options: ['Cloreto de potássio (KCl)', 'Cloreto de sódio (NaCl)', 'Cloreto de estrôncio (SrCl_2)'],
        answer: 0,
        why: 'O potássio produz um lilás fraco, que o amarelo do sódio costuma esconder quando os dois estão juntos.'
      },
      {
        q: 'Por que cada metal produz uma cor diferente?',
        options: [
          'A chama queima o metal e muda a cor dele',
          'Os elétrons absorvem energia, saltam de camada e, ao voltar, emitem luz com energia própria de cada elemento',
          'O gás do bico de Bunsen muda de cor sozinho'
        ],
        answer: 1,
        why: 'É o modelo de Bohr: cada elemento tem camadas com energias próprias, então a luz emitida tem uma cor característica.'
      }
    ]
  }
,

  /* ================= Capítulo 3 ================= */

  amostras: {
    type: 'sort',
    title: 'Amostras do Seu Bento',
    prompt: 'Pelas propriedades, que tipo de ligação mantém cada amostra unida?',
    bins: ['Ligação iônica', 'Ligação covalente', 'Ligação metálica'],
    items: [
      { label: 'Sal de cozinha (NaCl): cristais que conduzem eletricidade dissolvidos em água', bin: 0, why: 'Metal (Na) + não metal (Cl): o sódio transfere um elétron ao cloro. Dissolvidos, os íons se movem e conduzem corrente.' },
      { label: 'Cloreto de cálcio (CaCl_2): pó branco que absorve umidade', bin: 0, why: 'Metal (Ca) + não metal (Cl): ligação iônica, com íons Ca^2+ e Cl^−.' },
      { label: 'Óxido de magnésio (MgO): só derrete a 2.800 °C', bin: 0, why: 'A atração entre íons Mg^2+ e O^2− é tão forte que o ponto de fusão é altíssimo, típico de compostos iônicos.' },
      { label: 'Açúcar (C_12H_22O_11): dissolve, mas não conduz eletricidade', bin: 1, why: 'Só não metais (C, H, O) compartilhando elétrons: forma moléculas, sem íons livres para conduzir corrente.' },
      { label: 'Água destilada (H_2O)', bin: 1, why: 'Hidrogênio e oxigênio são não metais e compartilham pares de elétrons.' },
      { label: 'Gás carbônico (CO_2)', bin: 1, why: 'Carbono e oxigênio compartilham elétrons em duas ligações duplas: O=C=O.' },
      { label: 'Fio de cobre (Cu): brilha e conduz eletricidade sólido', bin: 2, why: 'O "mar de elétrons" livres conduz corrente mesmo no estado sólido.' },
      { label: 'Papel-alumínio (Al): dobra sem quebrar', bin: 2, why: 'Na ligação metálica, as camadas de átomos deslizam sem se separar: o metal é maleável.' },
      { label: 'Prego de ferro (Fe)', bin: 2, why: 'Átomos de um metal unidos por ligação metálica.' }
    ]
  },

  ligacoes: {
    type: 'quiz',
    title: 'Como os átomos se ligam',
    questions: [
      {
        q: 'Por que os átomos fazem ligações químicas?',
        options: ['Para ficar mais pesados', 'Para ficar com a última camada completa, como os gases nobres', 'Para perder todos os elétrons'],
        answer: 1,
        why: 'Regra do octeto: com 8 elétrons na última camada (2, no caso do hidrogênio), o átomo fica estável.'
      },
      {
        q: 'Na ligação iônica entre sódio e cloro, o que acontece com o elétron?',
        options: ['É transferido do sódio para o cloro', 'É compartilhado pelos dois', 'Fica livre entre vários átomos'],
        answer: 0,
        why: 'O sódio (2-8-1) perde 1 elétron e vira Na^+; o cloro (2-8-7) ganha e vira Cl^−. Os íons opostos se atraem.'
      },
      {
        q: 'Cada oxigênio tem 6 elétrons na valência. Na molécula de O_2, a ligação é:',
        options: ['Covalente simples', 'Iônica', 'Covalente dupla'],
        answer: 2,
        why: 'Cada oxigênio precisa de mais 2 elétrons, então os dois compartilham 2 pares: O=O.'
      },
      {
        q: 'Por que os metais conduzem eletricidade?',
        options: ['Porque são frios', 'Porque têm elétrons livres que se movem pelo metal', 'Porque têm muitos nêutrons'],
        answer: 1,
        why: 'Na ligação metálica, os elétrons de valência formam um "mar de elétrons" que se desloca facilmente.'
      }
    ]
  },

  formulas: {
    type: 'numbers',
    title: 'Bancada de síntese: fórmulas',
    tasks: [
      {
        prompt: 'Rótulo 1: junte íons Na^+ e Cl^− até a carga total ser zero, na menor proporção.',
        ions: [['a', 'Na', 1], ['b', 'Cl', -1]],
        answer: { a: 1, b: 1 },
        why: '+1 − 1 = 0. Um de cada: NaCl, o sal de cozinha.'
      },
      {
        prompt: 'Rótulo 2: íons Ca^2+ e Cl^−.',
        ions: [['a', 'Ca', 2], ['b', 'Cl', -1]],
        answer: { a: 1, b: 2 },
        why: 'Uma carga +2 precisa de duas cargas −1: CaCl_2, o cloreto de cálcio.'
      },
      {
        prompt: 'Rótulo 3: íons Mg^2+ e O^2−.',
        ions: [['a', 'Mg', 2], ['b', 'O', -2]],
        answer: { a: 1, b: 1 },
        why: '+2 − 2 = 0: MgO, o óxido de magnésio. Usar 2 de cada também zera, mas a fórmula usa a menor proporção.'
      },
      {
        prompt: 'Rótulo 4: íons Al^3+ e O^2−. Este é mais difícil!',
        ions: [['a', 'Al', 3], ['b', 'O', -2]],
        answer: { a: 2, b: 3 },
        why: '2 × (+3) = +6 e 3 × (−2) = −6. Atalho: cruzar as cargas. Al_2O_3 é a alumina, presente no rubi e na safira.'
      }
    ]
  },

  polaridade: {
    type: 'quiz',
    title: 'Óleo na fonte',
    questions: [
      {
        q: 'Por que a água e o óleo da fonte não se misturam?',
        options: ['A água é polar e o óleo é apolar', 'O óleo é mais pesado que a água', 'A água está fria demais'],
        answer: 0,
        why: 'Moléculas polares se atraem entre si e "expulsam" as apolares. O óleo fica por cima porque é menos denso.'
      },
      {
        q: 'Na molécula de água, o oxigênio:',
        options: ['Perde elétrons para o hidrogênio', 'Atrai mais os elétrons e fica com carga parcial negativa', 'Não participa das ligações'],
        answer: 1,
        why: 'O oxigênio é mais eletronegativo que o hidrogênio. Como a molécula é angular, um lado fica parcialmente negativo e o outro positivo.'
      },
      {
        q: 'As moléculas de água se atraem fortemente umas às outras por:',
        options: ['Ligações iônicas', 'Ligações de hidrogênio', 'Ligações metálicas'],
        answer: 1,
        why: 'É a força intermolecular mais forte. Explica por que a água ferve a 100 °C e por que alguns insetos andam sobre ela.'
      },
      {
        q: 'Como o detergente remove o óleo?',
        options: ['Transforma o óleo em gás', 'Deixa a água mais pesada que o óleo', 'Tem uma ponta polar, que se liga à água, e uma cauda apolar, que se liga ao óleo'],
        answer: 2,
        why: 'As caudas apolares envolvem as gotas de óleo e as pontas polares ficam para fora, na água, que leva tudo embora.'
      }
    ]
  },

  solubilidade: {
    type: 'sort',
    title: 'Bancada de síntese: detergente',
    prompt: 'Semelhante dissolve semelhante: onde cada substância se dissolve melhor?',
    bins: ['Na água (polar)', 'No óleo (apolar)'],
    items: [
      { label: 'Sal de cozinha', bin: 0, why: 'Composto iônico: os íons são atraídos pelos polos da água.' },
      { label: 'Açúcar', bin: 0, why: 'Molécula polar, com vários grupos O–H que fazem ligações de hidrogênio com a água.' },
      { label: 'Álcool etílico', bin: 0, why: 'Tem um grupo O–H polar e se mistura com a água em qualquer proporção.' },
      { label: 'Vinagre (ácido acético)', bin: 0, why: 'Molécula polar: dissolve bem na água.' },
      { label: 'Gasolina', bin: 1, why: 'Mistura de hidrocarbonetos, apolares: não se mistura com a água.' },
      { label: 'Parafina de vela', bin: 1, why: 'Hidrocarboneto sólido e apolar.' },
      { label: 'Iodo sólido (I_2)', bin: 1, why: 'Dois átomos iguais: molécula apolar, quase não dissolve na água.' },
      { label: 'Manteiga', bin: 1, why: 'Gorduras são apolares, por isso a louça engordurada precisa de detergente.' }
    ]
  }
};
