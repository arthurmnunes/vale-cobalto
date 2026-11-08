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
    need: 2,
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
      },
      {
        q: 'Quando um procedimento pede para sentir o cheiro de uma substância, como fazer?',
        options: ['Aproximar o nariz da boca do frasco e inspirar', 'Abanar o vapor com a mão em direção ao nariz', 'Aquecer o frasco para o cheiro ficar mais forte'],
        answer: 1,
        why: 'Abanar traz só um pouco do vapor. Inspirar direto no frasco pode causar intoxicação ou queimadura nas vias respiratórias.'
      },
      {
        q: 'Sobrou reagente no fim do experimento. O que fazer?',
        options: ['Jogar na pia com bastante água', 'Jogar no lixo comum', 'Descartar no recipiente indicado pelo responsável'],
        answer: 2,
        why: 'Cada resíduo tem um descarte adequado. Na pia ou no lixo comum, ele pode contaminar a água, o solo ou reagir com outros resíduos.'
      }
    ]
  },

  // Missão 1c: organizar a estante
  estante: {
    type: 'sort',
    need: 6,
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
      { label: 'Granito', bin: 2, why: 'Rocha formada por quartzo, feldspato e mica: dá para ver os grãos diferentes.' },
      { label: 'Gás hidrogênio (H_2)', bin: 0, why: 'Só o elemento hidrogênio.' },
      { label: 'Gás nitrogênio (N_2)', bin: 0, why: 'Só o elemento nitrogênio. É o principal componente do ar.' },
      { label: 'Diamante (C)', bin: 0, why: 'Só carbono. Diamante e grafite são alótropos do carbono.' },
      { label: 'Fio de cobre (Cu)', bin: 0, why: 'Um único elemento: cobre.' },
      { label: 'Amônia (NH_3)', bin: 1, why: 'Nitrogênio e hidrogênio unidos quimicamente.' },
      { label: 'Gás metano (CH_4)', bin: 1, why: 'Carbono e hidrogênio unidos: é o principal componente do gás natural.' },
      { label: 'Glicose (C_6H_12O_6)', bin: 1, why: 'Três elementos (C, H e O) formando uma única substância.' },
      { label: 'Bronze', bin: 2, why: 'Liga metálica: cobre misturado com estanho.' },
      { label: 'Vinagre', bin: 2, why: 'Água com ácido acético dissolvido: mistura.' },
      { label: 'Leite', bin: 2, why: 'Água, gorduras, proteínas, açúcares e sais misturados.' }
    ]
  },

  // Missão 2a: relatório de ocorrências
  fenomenos: {
    type: 'sort',
    need: 6,
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
      { label: 'Moeram o milho para fazer fubá', bin: 0, why: 'Só mudou o tamanho dos pedaços.' },
      { label: 'A cera da vela escorreu e endureceu', bin: 0, why: 'Fusão e depois solidificação: continua sendo parafina.' },
      { label: 'O vidro do carro embaçou no frio', bin: 0, why: 'Condensação do vapor de água: a água continua sendo água.' },
      { label: 'Picaram papel para fazer confete', bin: 0, why: 'Só mudou o tamanho: os pedaços continuam sendo papel.' },
      { label: 'Amassaram uma lata de alumínio', bin: 0, why: 'Mudou a forma, mas o metal é o mesmo.' },
      { label: 'Tiraram sal da água do mar por evaporação', bin: 0, why: 'A água evapora e o sal fica: nenhuma substância nova se forma.' },
      { label: 'O ovo cozinhou na água fervente', bin: 1, why: 'O calor muda as proteínas do ovo de forma permanente: não volta a ficar cru.' },
      { label: 'A palha de aço enferrujou na pia', bin: 1, why: 'O ferro reage com oxigênio e água e forma ferrugem.' },
      { label: 'Riscaram um fósforo e ele pegou fogo', bin: 1, why: 'Combustão: liberação de luz e calor e formação de novas substâncias.' },
      { label: 'A banana escureceu na fruteira', bin: 1, why: 'Substâncias da fruta reagem com o oxigênio do ar e formam pigmentos escuros.' },
      { label: 'A lenha da fogueira virou carvão e cinzas', bin: 1, why: 'A madeira se decompõe e queima: surgem substâncias novas.' }
    ]
  },

  // Missão 2b: mudanças de estado
  estados: {
    type: 'quiz',
    need: 3,
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
      },
      {
        q: 'A roupa seca no varal porque a água passa por:',
        options: ['Condensação', 'Evaporação', 'Fusão'],
        answer: 1,
        why: 'Evaporação é a vaporização lenta, na superfície, abaixo da temperatura de ebulição.'
      },
      {
        q: 'A água vira gelo no congelador. Essa mudança é a:',
        options: ['Solidificação', 'Sublimação', 'Fusão'],
        answer: 0,
        why: 'Solidificação: passagem do estado líquido para o sólido.'
      },
      {
        q: 'O gelo-seco (CO_2 sólido) solta "fumaça" e some sem virar líquido. Ele passa por:',
        options: ['Fusão', 'Solidificação', 'Sublimação'],
        answer: 2,
        why: 'O CO_2 sólido passa direto para gás. A "fumaça" é vapor de água do ar que condensa no frio.'
      },
      {
        q: 'Ao nível do mar, a água pura ferve a:',
        options: ['0 °C', '100 °C', '50 °C'],
        answer: 1,
        why: 'Em lugares altos, com pressão menor, a água ferve abaixo de 100 °C.'
      }
    ]
  }
,

  /* ================= Capítulo 2 ================= */

  particulas: {
    type: 'quiz',
    need: 3,
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
      },
      {
        q: 'Qual partícula do átomo tem carga negativa?',
        options: ['Elétron', 'Próton', 'Nêutron'],
        answer: 0,
        why: 'O elétron tem carga −1 e fica na eletrosfera, em volta do núcleo.'
      },
      {
        q: 'Onde fica quase toda a massa do átomo?',
        options: ['Na eletrosfera', 'Dividida igualmente pelo átomo', 'No núcleo, nos prótons e nêutrons'],
        answer: 2,
        why: 'Prótons e nêutrons têm massa cerca de 1.840 vezes maior que a do elétron.'
      },
      {
        q: 'Um átomo neutro perdeu 2 elétrons. Ele virou:',
        options: ['Um ânion de carga 2−', 'Um cátion de carga 2+', 'Um isótopo'],
        answer: 1,
        why: 'Ficou com 2 prótons a mais que elétrons: carga 2+. Cátion é o íon positivo.'
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
    need: 6,
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
      { label: 'Argônio (Ar)', bin: 3, why: 'Grupo 18. Usado dentro de lâmpadas porque não reage com o filamento.' },
      { label: 'Rubídio (Rb)', bin: 0, why: 'Grupo 1: metal alcalino, reage violentamente com a água.' },
      { label: 'Césio (Cs)', bin: 0, why: 'Grupo 1. É usado nos relógios atômicos mais precisos.' },
      { label: 'Frâncio (Fr)', bin: 0, why: 'Grupo 1, último da família. É radioativo e raríssimo.' },
      { label: 'Berílio (Be)', bin: 1, why: 'Grupo 2: 2 elétrons na camada de valência.' },
      { label: 'Estrôncio (Sr)', bin: 1, why: 'Grupo 2. É o vermelho dos fogos de artifício.' },
      { label: 'Bário (Ba)', bin: 1, why: 'Grupo 2. Seus sais dão chama verde-amarelada.' },
      { label: 'Iodo (I)', bin: 2, why: 'Grupo 17. Usado como antisséptico e adicionado ao sal de cozinha.' },
      { label: 'Astato (At)', bin: 2, why: 'Grupo 17, o último halogênio. É radioativo.' },
      { label: 'Criptônio (Kr)', bin: 3, why: 'Grupo 18: camada de valência completa.' },
      { label: 'Xenônio (Xe)', bin: 3, why: 'Grupo 18. Usado em faróis de carro e flashes de câmera.' },
      { label: 'Radônio (Rn)', bin: 3, why: 'Grupo 18. É um gás radioativo.' }
    ]
  },

  tabela: {
    type: 'quiz',
    need: 3,
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
      },
      {
        q: 'As linhas horizontais da tabela periódica se chamam:',
        options: ['Períodos', 'Famílias', 'Camadas'],
        answer: 0,
        why: 'São 7 períodos. As colunas verticais são as famílias, ou grupos.'
      },
      {
        q: 'O cloro tem distribuição 2-8-7. Quantos elétrons ele tem na camada de valência?',
        options: ['17', '3', '7'],
        answer: 2,
        why: 'A camada de valência é a última: a M, com 7 elétrons. Por isso o cloro está no grupo 17.'
      },
      {
        q: 'Os elementos do lado esquerdo e do centro da tabela, como sódio e ferro, são em geral:',
        options: ['Metais', 'Gases nobres', 'Não metais'],
        answer: 0,
        why: 'A maior parte da tabela é formada por metais. Os não metais ficam no canto superior direito.'
      }
    ]
  },

  chama: {
    type: 'quiz',
    need: 3,
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
      },
      {
        flame: '#ff6a3d',
        q: 'Esta chama alaranjada-avermelhada veio de qual sal?',
        options: ['Cloreto de cálcio (CaCl_2)', 'Cloreto de cobre (CuCl_2)', 'Cloreto de potássio (KCl)'],
        answer: 0,
        why: 'O cálcio produz uma chama laranja-avermelhada.'
      },
      {
        flame: '#c8e05a',
        q: 'E esta chama verde-amarelada?',
        options: ['Cloreto de potássio (KCl)', 'Cloreto de bário (BaCl_2)', 'Cloreto de estrôncio (SrCl_2)'],
        answer: 1,
        why: 'O bário dá o verde-amarelado. Nos fogos, também é usado para tons de verde.'
      },
      {
        flame: '#d6224a',
        q: 'Esta chama vermelho-carmim veio de qual sal?',
        options: ['Cloreto de sódio (NaCl)', 'Cloreto de cobre (CuCl_2)', 'Cloreto de lítio (LiCl)'],
        answer: 2,
        why: 'O lítio produz um vermelho-carmim, parecido com o do estrôncio.'
      },
      {
        q: 'No modelo de Bohr, o elétron emite luz quando:',
        options: ['Volta de uma camada mais externa para uma mais interna', 'Sai do núcleo do átomo', 'Ganha um nêutron'],
        answer: 0,
        why: 'Ao voltar para uma camada de menor energia, o elétron libera a diferença de energia na forma de luz.'
      },
      {
        q: 'NaCl e Na_2CO_3 são sais diferentes, mas dão a mesma cor de chama. Por quê?',
        options: ['Porque os dois são brancos', 'Porque a cor vem do elemento metálico, o sódio', 'Porque a chama não depende do sal'],
        answer: 1,
        why: 'No teste de chama, quem emite a cor característica é o metal. Por isso o teste identifica o metal presente.'
      }
    ]
  }
,

  /* ================= Capítulo 3 ================= */

  amostras: {
    type: 'sort',
    need: 6,
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
      { label: 'Prego de ferro (Fe)', bin: 2, why: 'Átomos de um metal unidos por ligação metálica.' },
      { label: 'Iodeto de potássio (KI): cristais brancos usados no sal iodado', bin: 0, why: 'Metal (K) + não metal (I): íons K^+ e I^−.' },
      { label: 'Fluoreto de sódio (NaF), do creme dental', bin: 0, why: 'Metal (Na) + não metal (F): ligação iônica.' },
      { label: 'Cal virgem (CaO): pó branco que esquenta com água', bin: 0, why: 'Metal (Ca) + não metal (O): íons Ca^2+ e O^2−.' },
      { label: 'Álcool etílico (C_2H_6O): líquido que não conduz eletricidade', bin: 1, why: 'Só não metais compartilhando elétrons: forma moléculas.' },
      { label: 'Gás oxigênio (O_2)', bin: 1, why: 'Dois átomos de oxigênio compartilham dois pares de elétrons.' },
      { label: 'Amônia (NH_3)', bin: 1, why: 'Nitrogênio e hidrogênio, ambos não metais, compartilham elétrons.' },
      { label: 'Anel de ouro (Au)', bin: 2, why: 'Metal puro: ligação metálica, com brilho característico.' },
      { label: 'Placa de zinco (Zn)', bin: 2, why: 'Átomos de um metal unidos pelo mar de elétrons.' },
      { label: 'Colher de prata (Ag): o melhor condutor de eletricidade', bin: 2, why: 'A prata é o metal que melhor conduz eletricidade, graças aos elétrons livres.' }
    ]
  },

  ligacoes: {
    type: 'quiz',
    need: 3,
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
      },
      {
        q: 'As ligações entre o hidrogênio e o oxigênio na água (H_2O) são:',
        options: ['Iônicas', 'Covalentes', 'Metálicas'],
        answer: 1,
        why: 'Dois não metais compartilham pares de elétrons: ligação covalente.'
      },
      {
        q: 'Quantas ligações covalentes um átomo de hidrogênio faz?',
        options: ['1', '2', '4'],
        answer: 0,
        why: 'O hidrogênio tem 1 elétron e fica estável com 2, como o hélio. Por isso faz só uma ligação.'
      },
      {
        q: 'Cada nitrogênio tem 5 elétrons de valência. Na molécula de N_2, a ligação é:',
        options: ['Simples', 'Dupla', 'Tripla'],
        answer: 2,
        why: 'Cada nitrogênio precisa de mais 3 elétrons, então os dois compartilham 3 pares.'
      },
      {
        q: 'Por que o sal sólido não conduz eletricidade, mas dissolvido na água conduz?',
        options: ['A água tem eletricidade própria', 'No sólido os íons estão presos; dissolvidos, ficam livres para se mover', 'O sal derrete na água'],
        answer: 1,
        why: 'Corrente elétrica precisa de cargas em movimento. No cristal, os íons ficam fixos.'
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
    need: 3,
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
      },
      {
        q: 'O CO_2 tem ligações polares, mas a molécula é apolar. Por quê?',
        options: ['Porque é um gás', 'Porque é linear e as duas polaridades se anulam', 'Porque o carbono não atrai elétrons'],
        answer: 1,
        why: 'O=C=O é uma molécula em linha reta: os dois lados puxam os elétrons com a mesma força, em sentidos opostos.'
      },
      {
        q: 'Por que o gelo boia na água?',
        options: ['Porque tem ar dentro', 'Porque o gelo é mais frio', 'Porque as ligações de hidrogênio formam uma estrutura aberta e o gelo fica menos denso'],
        answer: 2,
        why: 'No gelo, as moléculas ficam mais afastadas, presas pelas ligações de hidrogênio. Por isso os lagos congelam só na superfície.'
      },
      {
        q: 'Qual destas substâncias é polar?',
        options: ['Água', 'Óleo de cozinha', 'Gasolina'],
        answer: 0,
        why: 'A água é polar. Óleo e gasolina são formados principalmente por carbono e hidrogênio, que formam moléculas apolares.'
      },
      {
        q: 'Alguns insetos andam sobre a água graças:',
        options: ['À tensão superficial, causada pelas ligações de hidrogênio', 'Ao peso leve que os faz flutuar sem tocar a água', 'A uma camada de óleo na superfície'],
        answer: 0,
        why: 'As moléculas da superfície se atraem fortemente e formam uma espécie de película.'
      }
    ]
  },

  solubilidade: {
    type: 'sort',
    need: 6,
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
      { label: 'Manteiga', bin: 1, why: 'Gorduras são apolares, por isso a louça engordurada precisa de detergente.' },
      { label: 'Bicarbonato de sódio', bin: 0, why: 'Composto iônico: se dissolve bem na água.' },
      { label: 'Suco em pó', bin: 0, why: 'Açúcar e corantes polares: dissolvem na água.' },
      { label: 'Vitamina C', bin: 0, why: 'Vitamina hidrossolúvel: molécula polar, com vários grupos O–H.' },
      { label: 'Amônia de limpeza', bin: 0, why: 'A amônia é polar e faz ligações de hidrogênio com a água.' },
      { label: 'Vitamina A', bin: 1, why: 'Vitamina lipossolúvel: dissolve em gorduras, não na água.' },
      { label: 'Cera de abelha', bin: 1, why: 'Formada por moléculas longas e apolares.' },
      { label: 'Querosene', bin: 1, why: 'Hidrocarbonetos apolares, como a gasolina.' },
      { label: 'Graxa de motor', bin: 1, why: 'Derivada do petróleo: apolar, sai com solvente ou detergente, não com água pura.' }
    ]
  }
};
