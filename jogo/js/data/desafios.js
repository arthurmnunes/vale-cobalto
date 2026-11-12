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
    need: 4,
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
    need: 4,
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
    need: 4,
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
    need: 4,
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
    need: 4,
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
  },

  /* ================= Capítulo 4 ================= */

  funcoes: {
    type: 'sort',
    need: 4,
    title: 'Galpão da horta',
    prompt: 'Organize os produtos do galpão: cada um é ácido, base, sal ou óxido?',
    bins: ['Ácido', 'Base', 'Sal', 'Óxido'],
    items: [
      { label: 'Ácido muriático (HCl), para limpar pedras', bin: 0, why: 'Em água libera H^+ e Cl^−. Começa com H e é ácido de Arrhenius.' },
      { label: 'Ácido sulfúrico (H_2SO_4), da bateria do trator', bin: 0, why: 'Libera H^+ em água. É um dos ácidos mais usados na indústria.' },
      { label: 'Ácido fosfórico (H_3PO_4), do refrigerante de cola', bin: 0, why: 'Libera H^+ em água. Dá o gosto levemente azedo ao refrigerante.' },
      { label: 'Ácido nítrico (HNO_3), usado para fazer adubo', bin: 0, why: 'Libera H^+ em água. Reagindo com bases, forma nitratos, que são fertilizantes.' },
      { label: 'Água com gás (H_2CO_3)', bin: 0, why: 'O CO_2 dissolvido na água forma ácido carbônico, um ácido fraco.' },
      { label: 'Soda cáustica (NaOH)', bin: 1, why: 'Em água libera OH^−: é uma base forte e corrosiva. Só com luvas e óculos!' },
      { label: 'Cal hidratada (Ca(OH)_2)', bin: 1, why: 'Hidróxido de cálcio: libera OH^− em água. Usada em obras e na agricultura.' },
      { label: 'Leite de magnésia (Mg(OH)_2)', bin: 1, why: 'Hidróxido de magnésio, uma base fraca usada como antiácido.' },
      { label: 'Hidróxido de potássio (KOH)', bin: 1, why: 'Metal alcalino com o grupo OH: base forte.' },
      { label: 'Amoníaco de limpeza (NH_4OH)', bin: 1, why: 'A amônia dissolvida em água forma hidróxido de amônio, uma base fraca.' },
      { label: 'Calcário (CaCO_3)', bin: 2, why: 'Cátion Ca^2+ com o ânion carbonato (CO_3^2−): é um sal. Também é o mármore e a casca de ovo.' },
      { label: 'Bicarbonato de sódio (NaHCO_3)', bin: 2, why: 'Cátion Na^+ com o ânion bicarbonato: um sal com caráter levemente básico.' },
      { label: 'Gesso agrícola (CaSO_4)', bin: 2, why: 'Sulfato de cálcio: cátion de uma base (Ca^2+) e ânion de um ácido (SO_4^2−).' },
      { label: 'Salitre (KNO_3), adubo', bin: 2, why: 'Nitrato de potássio: sal que fornece nitrogênio e potássio às plantas.' },
      { label: 'Sulfato de cobre (CuSO_4), da calda bordalesa', bin: 2, why: 'Sal azul usado, junto com cal, para proteger plantas contra fungos.' },
      { label: 'Sal de cozinha (NaCl)', bin: 2, why: 'O sal mais conhecido: Na^+ da base NaOH e Cl^− do ácido HCl.' },
      { label: 'Cal virgem (CaO)', bin: 3, why: 'Dois elementos, sendo um deles o oxigênio: óxido. Com água, vira cal hidratada.' },
      { label: 'Ferrugem da enxada (Fe_2O_3)', bin: 3, why: 'Óxido de ferro: o ferro reagiu com o oxigênio do ar e a umidade.' },
      { label: 'Areia (SiO_2)', bin: 3, why: 'Dióxido de silício: dois elementos, um deles o oxigênio.' },
      { label: 'Pomada de óxido de zinco (ZnO)', bin: 3, why: 'Óxido de zinco, usado em pomadas contra assaduras.' },
      { label: 'Gás carbônico (CO_2) do extintor', bin: 3, why: 'Óxido de carbono. Com água, forma ácido carbônico: é um óxido ácido.' }
    ]
  },

  indicador: {
    type: 'quiz',
    need: 3,
    title: 'Indicador de repolho roxo',
    questions: [
      {
        tube: '#d8264a',
        q: 'Suco de limão com o indicador de repolho roxo ficou assim. A solução é:',
        options: ['Ácida', 'Neutra', 'Básica'],
        answer: 0,
        why: 'Vermelho indica ácido forte, com pH perto de 2. O limão tem ácido cítrico.'
      },
      {
        tube: '#7a4aa8',
        q: 'Água destilada com o indicador ficou roxa. A solução é:',
        options: ['Ácida', 'Neutra', 'Básica'],
        answer: 1,
        why: 'Roxo é a cor do indicador no meio neutro, com pH perto de 7.'
      },
      {
        tube: '#3c6fd0',
        q: 'Bicarbonato de sódio dissolvido em água ficou azul. A solução é:',
        options: ['Ácida', 'Neutra', 'Básica'],
        answer: 2,
        why: 'Azul indica meio levemente básico, com pH perto de 8. Por isso o bicarbonato alivia a azia.'
      },
      {
        tube: '#3aa35a',
        q: 'Sabão em pó dissolvido em água ficou verde. A solução é:',
        options: ['Ácida', 'Neutra', 'Básica'],
        answer: 2,
        why: 'Verde indica meio básico, com pH perto de 11. Sabões e detergentes em pó costumam ser básicos.'
      },
      {
        tube: '#e8d23a',
        q: 'Uma gota de soda cáustica (NaOH) deixou o indicador amarelo. Isso indica:',
        options: ['Ácido forte', 'Meio neutro', 'Base forte'],
        answer: 2,
        why: 'Amarelo é a cor do repolho roxo em pH perto de 13 ou 14, típico de bases fortes como o NaOH.'
      },
      {
        tube: '#c2508c',
        q: 'A amostra de solo da horta, misturada com água e filtrada, deixou o indicador rosa. O solo está:',
        options: ['Ácido, com pH abaixo de 7', 'Neutro, com pH 7', 'Básico, com pH acima de 7'],
        answer: 0,
        why: 'Rosa indica pH perto de 4 ou 5. Em solo ácido demais, as raízes não absorvem bem os nutrientes e as folhas amarelam.'
      },
      {
        q: 'Por que o suco de repolho roxo muda de cor?',
        options: ['Ele tem antocianinas, pigmentos que mudam de cor conforme o pH', 'Ele apodrece em contato com o ácido', 'A luz do laboratório muda a cor dele'],
        answer: 0,
        why: 'As antocianinas mudam de estrutura conforme a quantidade de H^+ do meio, e cada estrutura tem uma cor.'
      },
      {
        q: 'Na escala de pH, quanto menor o número:',
        options: ['Mais básica é a solução', 'Mais ácida é a solução', 'Mais neutra é a solução'],
        answer: 1,
        why: 'pH baixo significa muitos íons H^+. Cada unidade a menos representa 10 vezes mais acidez.'
      },
      {
        q: 'A fenolftaleína é incolor no ácido. Que cor ela fica em uma base?',
        options: ['Azul', 'Rosa', 'Continua incolor'],
        answer: 1,
        why: 'A fenolftaleína fica rosa em meio básico. É um dos indicadores mais usados em laboratório.'
      }
    ]
  },

  calagem: {
    type: 'quiz',
    need: 3,
    title: 'Corrigindo o solo',
    questions: [
      {
        q: 'O solo da horta está ácido. O que adicionar para corrigir?',
        options: ['Vinagre', 'Calcário (CaCO_3)', 'Mais adubo ácido'],
        answer: 1,
        why: 'O calcário reage com o ácido do solo e eleva o pH. Os agricultores chamam isso de calagem.'
      },
      {
        q: 'Complete a neutralização: HCl + NaOH → ? + H_2O',
        options: ['NaCl', 'NaOH_2', 'HClO'],
        answer: 0,
        why: 'Ácido + base → sal + água. O Na^+ da base e o Cl^− do ácido formam o sal NaCl.'
      },
      {
        q: 'Na neutralização, o H^+ do ácido se junta ao OH^− da base e forma:',
        options: ['Gás oxigênio', 'Água (H_2O)', 'Gás hidrogênio'],
        answer: 1,
        why: 'H^+ + OH^− → H_2O. Por isso toda neutralização entre ácido e base de Arrhenius forma água.'
      },
      {
        q: 'Segundo Arrhenius, uma base é a substância que, em água, libera:',
        options: ['Íons H^+', 'Íons OH^−', 'Íons Na^+'],
        answer: 1,
        why: 'Bases liberam o íon hidróxido, OH^−. Ácidos liberam H^+.'
      },
      {
        q: 'Quem tem azia toma leite de magnésia (Mg(OH)_2). Por que funciona?',
        options: ['A base neutraliza o excesso de ácido do estômago', 'O leite esfria o estômago', 'O magnésio produz mais ácido'],
        answer: 0,
        why: 'O suco gástrico tem ácido clorídrico. Uma base fraca neutraliza o excesso e alivia a queimação.'
      },
      {
        q: 'O calcário reage com o ácido do solo e solta bolhas. Que gás é esse?',
        options: ['Gás oxigênio (O_2)', 'Gás carbônico (CO_2)', 'Gás cloro (Cl_2)'],
        answer: 1,
        why: 'CaCO_3 + 2 H^+ → Ca^2+ + H_2O + CO_2. O carbonato vira gás carbônico e água.'
      },
      {
        q: 'H_2SO_4 + 2 NaOH → Na_2SO_4 + 2 H_2O. Que sal se formou?',
        options: ['Sulfato de sódio (Na_2SO_4)', 'Cloreto de sódio (NaCl)', 'Hidróxido de sódio (NaOH)'],
        answer: 0,
        why: 'O Na^+ da base se une ao ânion sulfato (SO_4^2−) do ácido sulfúrico.'
      },
      {
        q: 'Um ácido e uma base são misturados na proporção exata. O pH final fica perto de:',
        options: ['1', '7', '14'],
        answer: 1,
        why: 'Quando todo o H^+ reage com todo o OH^−, a solução fica neutra, com pH perto de 7 (para ácido e base fortes).'
      }
    ]
  },

  chuva: {
    type: 'quiz',
    need: 3,
    title: 'Água da chuva',
    questions: [
      {
        tube: '#c2508c',
        q: 'A água da chuva deixou o indicador rosa: pH perto de 4,5. A chuva normal tem pH perto de 5,6. Por que até a chuva normal é um pouco ácida?',
        options: ['O CO_2 do ar se dissolve na água e forma ácido carbônico', 'A água da chuva é salgada', 'As nuvens são feitas de ácido'],
        answer: 0,
        why: 'CO_2 + H_2O → H_2CO_3, um ácido fraco. A chuva só é chamada de ácida quando o pH fica abaixo de 5,6.'
      },
      {
        q: 'A caldeira do Grupo Vex queima carvão com enxofre e libera SO_2. Na atmosfera, ele:',
        options: ['Vira oxigênio puro', 'Reage com o oxigênio e a água e forma ácido sulfúrico', 'Se transforma em sal de cozinha'],
        answer: 1,
        why: 'O SO_2 vira SO_3, que com a água forma H_2SO_4. É a principal causa da chuva ácida.'
      },
      {
        q: 'SO_2 e CO_2 formam ácidos quando reagem com a água. Por isso são chamados de:',
        options: ['Óxidos ácidos', 'Óxidos básicos', 'Sais'],
        answer: 0,
        why: 'Óxidos de não metais costumam ser ácidos: com água, formam ácidos.'
      },
      {
        q: 'Cal virgem (CaO) com água forma cal hidratada, Ca(OH)_2. O CaO é um:',
        options: ['Óxido ácido', 'Óxido básico', 'Ácido'],
        answer: 1,
        why: 'Óxidos de metais costumam ser básicos: com água, formam bases.'
      },
      {
        q: 'Por que as estátuas de mármore (CaCO_3) da praça se desgastam com a chuva ácida?',
        options: ['O ácido reage com o carbonato de cálcio, libera CO_2 e a pedra vai sendo consumida', 'A chuva é forte demais', 'O mármore derrete com o calor'],
        answer: 0,
        why: 'CaCO_3 + H_2SO_4 → CaSO_4 + H_2O + CO_2. O carbonato reage, o gás escapa e a superfície vira sulfato de cálcio, que esfarela e é levado pela chuva aos poucos.'
      },
      {
        q: 'Como uma caldeira pode lançar menos SO_2 no ar?',
        options: ['Com um filtro que usa cal para reter o SO_2 da fumaça', 'Pintando a chaminé de branco', 'Ligando a caldeira só à noite'],
        answer: 0,
        why: 'A cal, que é básica, reage com o SO_2, que é ácido, e o gás fica preso no filtro na forma de sal.'
      },
      {
        q: 'Os motores dos carros liberam óxidos de nitrogênio (NO_2). Com a água da chuva, eles formam:',
        options: ['Ácido nítrico (HNO_3)', 'Amônia (NH_3)', 'Gás nitrogênio puro'],
        answer: 0,
        why: 'Os óxidos de nitrogênio também causam chuva ácida, formando ácido nítrico.'
      },
      {
        q: 'Um óxido é um composto formado por dois elementos, sendo o mais eletronegativo deles:',
        options: ['O hidrogênio', 'O oxigênio', 'Um metal'],
        answer: 1,
        why: 'CO_2, CaO, Fe_2O_3 e SiO_2: todos têm o oxigênio e mais um elemento.'
      }
    ]
  },

  equacoes: {
    type: 'numbers',
    title: 'Bancada de síntese: equações',
    tasks: [
      {
        prompt: 'Equação 1: a formação da água. Ajuste os coeficientes até cada átomo ter a mesma quantidade nos dois lados.',
        eq: [[['a', 'H_2', { H: 2 }], ['b', 'O_2', { O: 2 }]], [['c', 'H_2O', { H: 2, O: 1 }]]],
        answer: { a: 2, b: 1, c: 2 },
        why: '2 H_2 + O_2 → 2 H_2O: 4 H e 2 O de cada lado. Lavoisier: os átomos só se reorganizam.'
      },
      {
        prompt: 'Equação 2: na chaminé, o SO_2 reage com o oxigênio do ar e vira SO_3.',
        eq: [[['a', 'SO_2', { S: 1, O: 2 }], ['b', 'O_2', { O: 2 }]], [['c', 'SO_3', { S: 1, O: 3 }]]],
        answer: { a: 2, b: 1, c: 2 },
        why: '2 SO_2 + O_2 → 2 SO_3: 2 S e 6 O de cada lado. Depois, SO_3 + H_2O → H_2SO_4, o ácido da chuva.'
      },
      {
        prompt: 'Equação 3: a queima do gás metano (CH_4) que aquece a caldeira nova.',
        eq: [[['a', 'CH_4', { C: 1, H: 4 }], ['b', 'O_2', { O: 2 }]], [['c', 'CO_2', { C: 1, O: 2 }], ['d', 'H_2O', { H: 2, O: 1 }]]],
        answer: { a: 1, b: 2, c: 1, d: 2 },
        why: 'CH_4 + 2 O_2 → CO_2 + 2 H_2O. Dica: comece pelo C e pelo H, e deixe o O, que aparece em dois lugares, para o fim.'
      },
      {
        prompt: 'Equação 4: o filtro de cal neutraliza o ácido sulfúrico. Este é mais difícil!',
        eq: [[['a', 'Ca(OH)_2', { Ca: 1, O: 2, H: 2 }], ['b', 'H_2SO_4', { H: 2, S: 1, O: 4 }]], [['c', 'CaSO_4', { Ca: 1, S: 1, O: 4 }], ['d', 'H_2O', { H: 2, O: 1 }]]],
        answer: { a: 1, b: 1, c: 1, d: 2 },
        why: 'Ca(OH)_2 + H_2SO_4 → CaSO_4 + 2 H_2O. Base + ácido → sal + água: os 2 OH^− e os 2 H^+ formam 2 moléculas de água.'
      }
    ]
  },

  /* ================= Capítulo 5 ================= */

  grandezas: {
    type: 'quiz',
    need: 3,
    title: 'Grandezas da encomenda',
    questions: [
      {
        q: 'Quantas entidades (átomos, moléculas ou íons) existem em 1 mol?',
        options: ['12', '6,02 × 10^23', '100'],
        answer: 1,
        why: 'É a constante de Avogadro. O mol funciona como uma dúzia, só que muito maior: 1 mol = 6,02 × 10^23 unidades.'
      },
      {
        q: 'Qual é a unidade de quantidade de matéria no Sistema Internacional?',
        options: ['Grama (g)', 'Litro (L)', 'Mol (mol)'],
        answer: 2,
        why: 'Massa se mede em gramas, volume em litros e quantidade de matéria em mol.'
      },
      {
        q: 'A massa molar da água é 18 g/mol. Isso significa que:',
        options: ['1 mol de moléculas de água tem massa de 18 g', 'Uma molécula de água tem massa de 18 g', '18 mol de água têm massa de 1 g'],
        answer: 0,
        why: 'Massa molar é a massa de 1 mol. Uma única molécula de água tem massa de apenas 18 u, minúscula.'
      },
      {
        q: 'A massa atômica do carbono é 12 u. Qual é a massa de 1 mol de átomos de carbono?',
        options: ['12 u', '12 g', '6,02 g'],
        answer: 1,
        why: 'O número é o mesmo, mas a unidade muda: 1 átomo tem 12 u, e 1 mol de átomos tem 12 g.'
      },
      {
        q: 'Nas CNTP (0 °C e 1 atm), quanto espaço ocupa 1 mol de qualquer gás?',
        options: ['1 L', '22,4 L', '6,02 L'],
        answer: 1,
        why: 'É o volume molar dos gases nas CNTP: cerca de 22,4 L, seja oxigênio, nitrogênio ou gás carbônico.'
      },
      {
        q: 'Quantas moléculas existem em 2 mol de gás carbônico (CO_2)?',
        options: ['2 moléculas', '6,02 × 10^23 moléculas', '12,04 × 10^23 moléculas'],
        answer: 2,
        why: '2 × 6,02 × 10^23 = 12,04 × 10^23 moléculas (o mesmo que 1,204 × 10^24).'
      }
    ]
  },

  unidades: {
    type: 'sort',
    need: 4,
    title: 'Caderno de encomendas',
    prompt: 'Que grandeza cada anotação está medindo?',
    bins: ['Massa', 'Quantidade de matéria', 'Volume', 'Número de entidades'],
    items: [
      { label: '18 g de água', bin: 0, why: 'Grama (g) é unidade de massa.' },
      { label: '2,5 kg de cal', bin: 0, why: 'Quilograma (kg) é unidade de massa: 2,5 kg = 2.500 g.' },
      { label: '500 mg de vitamina C', bin: 0, why: 'Miligrama (mg) é a milésima parte do grama: unidade de massa.' },
      { label: '2 mol de gás oxigênio', bin: 1, why: 'Mol é a unidade de quantidade de matéria.' },
      { label: '0,5 mol de sal de cozinha', bin: 1, why: 'Meio mol: quantidade de matéria.' },
      { label: '3 mol de átomos de ferro', bin: 1, why: 'Mol conta entidades em "pacotes" de 6,02 × 10^23.' },
      { label: '22,4 L de gás nas CNTP', bin: 2, why: 'Litro (L) é unidade de volume. Esse é o volume de 1 mol de gás nas CNTP.' },
      { label: '1,5 L de água', bin: 2, why: 'Litro é unidade de volume.' },
      { label: '250 mL de soro', bin: 2, why: 'Mililitro (mL) é a milésima parte do litro: unidade de volume.' },
      { label: '6,02 × 10^23 moléculas de água', bin: 3, why: 'É uma contagem de moléculas: número de entidades (no caso, exatamente 1 mol).' },
      { label: '3 × 10^20 átomos de ouro', bin: 3, why: 'Contagem de átomos: número de entidades.' },
      { label: '1,2 × 10^24 íons Na^+', bin: 3, why: 'Contagem de íons: número de entidades (cerca de 2 mol).' }
    ]
  },

  massa_molar: {
    type: 'quiz',
    need: 3,
    title: 'Balança analítica: massas molares',
    questions: [
      {
        q: 'Massas atômicas: H = 1 e O = 16. Qual é a massa molar da água, H_2O?',
        options: ['17 g/mol', '18 g/mol', '34 g/mol'],
        answer: 1,
        why: '2 átomos de H e 1 de O: 2 × 1 + 16 = 18 g/mol.'
      },
      {
        q: 'C = 12 e O = 16. Qual é a massa molar do gás carbônico, CO_2?',
        options: ['28 g/mol', '44 g/mol', '56 g/mol'],
        answer: 1,
        why: '12 + 2 × 16 = 44 g/mol.'
      },
      {
        q: 'Na = 23 e Cl = 35,5. Qual é a massa molar do sal de cozinha, NaCl?',
        options: ['58,5 g/mol', '47 g/mol', '70 g/mol'],
        answer: 0,
        why: '23 + 35,5 = 58,5 g/mol.'
      },
      {
        q: 'Ca = 40, C = 12 e O = 16. Qual é a massa molar do calcário, CaCO_3?',
        options: ['68 g/mol', '112 g/mol', '100 g/mol'],
        answer: 2,
        why: '40 + 12 + 3 × 16 = 100 g/mol.'
      },
      {
        q: 'H = 1, S = 32 e O = 16. Qual é a massa molar do ácido sulfúrico, H_2SO_4?',
        options: ['98 g/mol', '49 g/mol', '82 g/mol'],
        answer: 0,
        why: '2 × 1 + 32 + 4 × 16 = 98 g/mol.'
      },
      {
        q: 'Ca = 40, O = 16 e H = 1. Qual é a massa molar da cal hidratada, Ca(OH)_2?',
        options: ['57 g/mol', '58 g/mol', '74 g/mol'],
        answer: 2,
        why: 'O 2 fora do parêntese multiplica o OH inteiro: 40 + 2 × (16 + 1) = 74 g/mol.'
      },
      {
        q: 'Al = 27, S = 32 e O = 16. Qual é a massa molar do sulfato de alumínio, Al_2(SO_4)_3?',
        options: ['123 g/mol', '342 g/mol', '150 g/mol'],
        answer: 1,
        why: '2 × 27 + 3 × (32 + 4 × 16) = 54 + 288 = 342 g/mol.'
      },
      {
        q: 'Ca = 40 e O = 16. Qual é a massa molar da cal virgem, CaO?',
        options: ['56 g/mol', '40 g/mol', '72 g/mol'],
        answer: 0,
        why: '40 + 16 = 56 g/mol.'
      }
    ]
  },

  conversoes: {
    type: 'quiz',
    need: 3,
    title: 'Balança analítica: massa e mol',
    questions: [
      {
        q: 'Quantos mol há em 36 g de água (M = 18 g/mol)?',
        options: ['0,5 mol', '2 mol', '648 mol'],
        answer: 1,
        why: 'n = m ÷ M = 36 ÷ 18 = 2 mol.'
      },
      {
        q: 'Quantos mol há em 88 g de gás carbônico (M = 44 g/mol)?',
        options: ['2 mol', '44 mol', '0,5 mol'],
        answer: 0,
        why: 'n = 88 ÷ 44 = 2 mol.'
      },
      {
        q: 'Qual é a massa de 0,5 mol de gás oxigênio, O_2 (M = 32 g/mol)?',
        options: ['64 g', '32 g', '16 g'],
        answer: 2,
        why: 'm = n × M = 0,5 × 32 = 16 g.'
      },
      {
        q: 'Qual é a massa de 3 mol de cal virgem, CaO (M = 56 g/mol)?',
        options: ['168 g', '59 g', '18,7 g'],
        answer: 0,
        why: 'm = 3 × 56 = 168 g.'
      },
      {
        q: '3,01 × 10^23 moléculas de água correspondem a quantos mol?',
        options: ['3,01 mol', '0,5 mol', '2 mol'],
        answer: 1,
        why: 'É metade de 6,02 × 10^23, então meio mol.'
      },
      {
        q: 'Quantos litros ocupam 2 mol de gás nitrogênio nas CNTP?',
        options: ['22,4 L', '11,2 L', '44,8 L'],
        answer: 2,
        why: '2 × 22,4 L = 44,8 L.'
      },
      {
        q: 'Quantos mol há em 740 g de cal hidratada, Ca(OH)_2 (M = 74 g/mol)?',
        options: ['10 mol', '74 mol', '1 mol'],
        answer: 0,
        why: 'n = 740 ÷ 74 = 10 mol.'
      }
    ]
  },

  proporcoes: {
    type: 'numbers',
    title: 'Bancada de síntese: a encomenda',
    tasks: [
      {
        calc: true,
        prompt: '2 H_2 + O_2 → 2 H_2O. Para formar 6 mol de água, quantos mol de cada reagente são necessários?',
        fields: [['a', 'mol de H_2'], ['b', 'mol de O_2']],
        answer: { a: 6, b: 3 },
        why: 'A proporção é 2 : 1 : 2. Para 6 mol de água (3 vezes a receita), são 6 mol de H_2 e 3 mol de O_2.'
      },
      {
        calc: true,
        prompt: 'N_2 + 3 H_2 → 2 NH_3. Com 2 mol de N_2, quantos mol de H_2 são consumidos e quantos mol de amônia se formam?',
        fields: [['a', 'mol de H_2'], ['b', 'mol de NH_3']],
        answer: { a: 6, b: 4 },
        why: 'Proporção 1 : 3 : 2. Com o dobro de N_2, tudo dobra: 6 mol de H_2 e 4 mol de NH_3.'
      },
      {
        calc: true,
        prompt: 'C + O_2 → CO_2. Você tem 24 g de carvão (C = 12 g/mol). Quantos mol de carbono são? Quantos mol de CO_2 se formam?',
        fields: [['a', 'mol de C'], ['b', 'mol de CO_2']],
        answer: { a: 2, b: 2 },
        why: 'Primeiro a massa vira mol: 24 ÷ 12 = 2 mol de C. A proporção é 1 : 1, então formam-se 2 mol de CO_2.'
      },
      {
        calc: true,
        prompt: 'Na estação: Al_2(SO_4)_3 + 3 Ca(OH)_2 → 2 Al(OH)_3 + 3 CaSO_4. Para 2 mol de sulfato de alumínio, quantos mol de cal hidratada são necessários? Quantos mol de Al(OH)_3, o floco que prende a sujeira, se formam?',
        fields: [['a', 'mol de Ca(OH)_2'], ['b', 'mol de Al(OH)_3']],
        answer: { a: 6, b: 4 },
        why: 'Proporção 1 : 3 : 2 : 3. Com 2 mol de sulfato de alumínio, são 6 mol de cal e formam-se 4 mol de Al(OH)_3. Nem um saco a mais.'
      }
    ]
  },

  limitante: {
    type: 'quiz',
    need: 3,
    title: 'Sem sobra e sem falta',
    questions: [
      {
        q: 'O Grupo Vex quer mandar o dobro de cal "por garantia". O que acontece com o excesso?',
        options: ['Forma o dobro de produto', 'Sobra sem reagir: é desperdício e pode virar resíduo', 'Faz a reação acontecer mais rápido e some'],
        answer: 1,
        why: 'A quantidade de produto é limitada pelo reagente que acaba primeiro. O que passa da proporção sobra sem reagir.'
      },
      {
        q: '2 H_2 + O_2 → 2 H_2O. Há 4 mol de H_2 e 5 mol de O_2. Qual é o reagente limitante?',
        options: ['O_2', 'Nenhum, estão na proporção certa', 'H_2'],
        answer: 2,
        why: '4 mol de H_2 só reagem com 2 mol de O_2. O H_2 acaba primeiro, e sobram 3 mol de O_2 em excesso.'
      },
      {
        q: 'Nessa mesma mistura (4 mol de H_2 e 5 mol de O_2), quantos mol de água se formam?',
        options: ['4 mol', '5 mol', '9 mol'],
        answer: 0,
        why: 'Quem manda é o limitante: 4 mol de H_2 formam 4 mol de água. O O_2 em excesso não ajuda.'
      },
      {
        q: 'Uma receita usa 2 ovos e 1 xícara de farinha por bolo. Você tem 10 ovos e 3 xícaras. Quantos bolos dá para fazer?',
        options: ['5 bolos', '3 bolos', '13 bolos'],
        answer: 1,
        why: 'A farinha é o "reagente limitante": dá para 3 bolos, e sobram 4 ovos em excesso.'
      },
      {
        q: 'Pela Lei de Lavoisier, 12 g de carbono reagem com 32 g de oxigênio formando quantos gramas de CO_2?',
        options: ['20 g', '32 g', '44 g'],
        answer: 2,
        why: 'Num sistema fechado, a massa se conserva: 12 g + 32 g = 44 g de CO_2.'
      },
      {
        q: 'A água sempre tem 1 g de hidrogênio para 8 g de oxigênio, venha de onde vier. Isso é a:',
        options: ['Lei de Proust (proporções definidas)', 'Constante de Avogadro', 'Lei de Lavoisier'],
        answer: 0,
        why: 'Proust: cada substância tem uma proporção fixa em massa entre seus elementos.'
      }
    ]
  },

  /* ================= Capítulo 6 ================= */

  misturas: {
    type: 'sort',
    need: 4,
    title: 'Amostra do rio: misturas',
    prompt: 'Cada mistura tem quantas fases?',
    bins: ['Homogênea (1 fase)', 'Heterogênea (2 ou mais fases)'],
    items: [
      { label: 'Água com sal dissolvido', bin: 0, why: 'O sal dissolvido não aparece: uma única fase.' },
      { label: 'Ar filtrado', bin: 0, why: 'Os gases se misturam por completo: uma fase.' },
      { label: 'Álcool 70%', bin: 0, why: 'Água e álcool se misturam em qualquer proporção: uma fase.' },
      { label: 'Vinagre', bin: 0, why: 'Ácido acético dissolvido em água: uma fase.' },
      { label: 'Ouro 18k', bin: 0, why: 'Liga metálica: os metais ficam misturados por igual.' },
      { label: 'Soro fisiológico', bin: 0, why: 'Sal dissolvido em água: solução, uma fase.' },
      { label: 'Água e óleo', bin: 1, why: 'O óleo forma uma camada separada: duas fases.' },
      { label: 'Água e areia', bin: 1, why: 'A areia fica no fundo: duas fases.' },
      { label: 'Granito', bin: 1, why: 'Dá para ver os grãos de quartzo, feldspato e mica: três fases.' },
      { label: 'Água do rio com lama e folhas', bin: 1, why: 'Lama e folhas aparecem: várias fases.' },
      { label: 'Limalha de ferro com areia', bin: 1, why: 'Os grãos de ferro e de areia são visíveis: duas fases.' },
      { label: 'Feijão com arroz cru', bin: 1, why: 'Cada grão é visível: duas fases.' }
    ]
  },

  separacao: {
    type: 'sort',
    need: 4,
    title: 'Amostra do rio: separação',
    prompt: 'Qual método separa melhor cada mistura?',
    bins: ['Filtração', 'Decantação', 'Destilação', 'Separação magnética'],
    items: [
      { label: 'Água e areia', bin: 0, why: 'O filtro segura a areia e deixa a água passar.' },
      { label: 'Café coado', bin: 0, why: 'O filtro de papel segura o pó; o café passa.' },
      { label: 'Ar com poeira, no aspirador', bin: 0, why: 'O filtro do aspirador segura a poeira e deixa o ar passar.' },
      { label: 'Água e óleo', bin: 1, why: 'No funil de decantação, o óleo fica em cima e a água é retirada por baixo.' },
      { label: 'Água barrenta na caixa d’água', bin: 1, why: 'Em repouso, a terra, mais densa, assenta no fundo.' },
      { label: 'Água e óleo de motor no rio', bin: 1, why: 'Líquidos que não se misturam e têm densidades diferentes: decantação.' },
      { label: 'Sal dissolvido na água do mar, recuperando a água', bin: 2, why: 'Destilação simples: a água evapora, condensa no outro frasco e o sal fica.' },
      { label: 'Água e álcool', bin: 2, why: 'Destilação fracionada: o álcool ferve antes da água.' },
      { label: 'Petróleo, separando gasolina e diesel', bin: 2, why: 'Destilação fracionada, pelos pontos de ebulição diferentes.' },
      { label: 'Limalha de ferro e areia', bin: 3, why: 'O ímã atrai o ferro e deixa a areia.' },
      { label: 'Pregos misturados na serragem', bin: 3, why: 'O ímã puxa os pregos de ferro.' },
      { label: 'Enxofre em pó e limalha de ferro', bin: 3, why: 'Só o ferro é atraído pelo ímã.' }
    ]
  },

  destilacao: {
    type: 'quiz',
    need: 3,
    title: 'Destilador',
    questions: [
      {
        q: 'A destilação separa os componentes de uma mistura pela diferença de:',
        options: ['Cor', 'Ponto de ebulição', 'Massa molar'],
        answer: 1,
        why: 'O componente que ferve primeiro vira vapor, passa pelo condensador e é recolhido separado.'
      },
      {
        q: 'No destilador, para que serve o condensador?',
        options: ['Esfriar o vapor para ele voltar a ser líquido', 'Aquecer a mistura', 'Filtrar a lama'],
        answer: 0,
        why: 'A água fria que circula por fora do condensador resfria o vapor, que se condensa e escorre para o frasco coletor.'
      },
      {
        q: 'Na destilação simples da água do mar, o que fica no balão de aquecimento?',
        options: ['A água pura', 'O sal', 'Nada'],
        answer: 1,
        why: 'A água evapora e é recolhida; o sal, que não evapora a essa temperatura, fica no balão.'
      },
      {
        q: 'Para separar água e álcool, que se misturam completamente, usa-se a:',
        options: ['Filtração', 'Decantação', 'Destilação fracionada'],
        answer: 2,
        why: 'Os dois são líquidos com pontos de ebulição diferentes (álcool cerca de 78 °C, água 100 °C): destilação fracionada.'
      },
      {
        q: 'Enquanto a água pura está fervendo no destilador, ao nível do mar, a temperatura do vapor:',
        options: ['Fica constante em 100 °C', 'Sobe sem parar', 'Cai até 0 °C'],
        answer: 0,
        why: 'Na mudança de estado de uma substância pura, a temperatura fica constante.'
      },
      {
        q: 'Por que a água destilada é usada em laboratório?',
        options: ['Porque é mais gelada', 'Porque não tem sais nem outras substâncias dissolvidas', 'Porque tem mais oxigênio'],
        answer: 1,
        why: 'Sem impurezas dissolvidas, ela não interfere nas reações e nas medidas.'
      }
    ]
  },

  concentracao: {
    type: 'quiz',
    need: 3,
    title: 'Destilador: soluções',
    questions: [
      {
        q: 'No soro fisiológico (água com sal), qual é o soluto e qual é o solvente?',
        options: ['Soluto: água; solvente: sal', 'Soluto: sal; solvente: água', 'Os dois são solventes'],
        answer: 1,
        why: 'O soluto é o que se dissolve (sal); o solvente é o que dissolve (água).'
      },
      {
        q: '20 g de sal dissolvidos formam 2 L de solução. Qual é a concentração?',
        options: ['10 g/L', '40 g/L', '0,1 g/L'],
        answer: 0,
        why: 'C = m ÷ V = 20 g ÷ 2 L = 10 g/L.'
      },
      {
        q: 'O soro fisiológico tem 9 g/L de NaCl. Quanto sal há em 500 mL de soro?',
        options: ['9 g', '18 g', '4,5 g'],
        answer: 2,
        why: '500 mL é meio litro: 9 g/L × 0,5 L = 4,5 g.'
      },
      {
        q: '2 mol de glicose dissolvidos formam 4 L de solução. Qual é a concentração?',
        options: ['2 mol/L', '0,5 mol/L', '8 mol/L'],
        answer: 1,
        why: '2 mol ÷ 4 L = 0,5 mol/L.'
      },
      {
        q: '58,5 g de NaCl (M = 58,5 g/mol) formam 1 L de solução. Qual é a concentração em mol/L?',
        options: ['58,5 mol/L', '1 mol/L', '0,5 mol/L'],
        answer: 1,
        why: '58,5 g é 1 mol de NaCl. 1 mol em 1 L: 1 mol/L.'
      },
      {
        q: 'Você junta mais água a um suco. O que acontece com a concentração e com a quantidade de açúcar?',
        options: ['A concentração diminui; a quantidade de açúcar não muda', 'As duas aumentam', 'A concentração aumenta; o açúcar diminui'],
        answer: 0,
        why: 'Isso é uma diluição: o mesmo soluto fica espalhado num volume maior.'
      },
      {
        q: 'Uma solução saturada é aquela que:',
        options: ['Não tem soluto', 'Tem o máximo de soluto que o solvente dissolve naquela temperatura', 'Tem mais solvente do que soluto'],
        answer: 1,
        why: 'Passando desse limite, o soluto extra não dissolve e fica no fundo, como corpo de chão.'
      }
    ]
  },

  diluicao: {
    type: 'numbers',
    title: 'Bancada de síntese: Fórmula Aurora',
    tasks: [
      {
        calc: true,
        prompt: 'Teste: 1 L de solução de 10 g/L recebe água até completar 2 L. Qual é a nova concentração?',
        fields: [['a', 'g/L']],
        answer: { a: 5 },
        why: 'C_1 × V_1 = C_2 × V_2: 10 × 1 = C_2 × 2, então C_2 = 5 g/L. O volume dobrou, a concentração caiu pela metade.'
      },
      {
        calc: true,
        prompt: 'Teste: 2 L de solução de 3 g/L são aquecidos até restar 1 L (só a água evapora). Qual é a nova concentração?',
        fields: [['a', 'g/L']],
        answer: { a: 6 },
        why: 'O soluto não sai: 3 × 2 = C_2 × 1, então C_2 = 6 g/L. Menos solvente, mais concentrada.'
      },
      {
        calc: true,
        prompt: 'Teste: 2 L de solução de 4 mol/L devem ser diluídos até 1 mol/L. Qual será o volume final? Quantos litros de água acrescentar?',
        fields: [['a', 'L de volume final'], ['b', 'L de água']],
        answer: { a: 8, b: 6 },
        why: '4 × 2 = 1 × V_2, então V_2 = 8 L. Já havia 2 L, então acrescentam-se 6 L de água.'
      },
      {
        calc: true,
        prompt: 'A Fórmula Aurora: o tanque de 12 L precisa ter 2 g/L. O concentrado tem 8 g/L. Quantos litros de concentrado usar? Quantos litros de água acrescentar?',
        fields: [['a', 'L de concentrado'], ['b', 'L de água']],
        answer: { a: 3, b: 9 },
        why: '8 × V_1 = 2 × 12, então V_1 = 3 L de concentrado, completados com 9 L de água. Nem mais, nem menos, como pediu a Profa. Ítala.'
      }
    ]
  },

  banca: {
    type: 'quiz',
    need: 5,
    title: 'A banca do Congresso',
    questions: [
      {
        q: 'Capítulo 1. Qual destes é um fenômeno químico?',
        options: ['Gelo derretendo', 'Ferro enferrujando', 'Papel sendo rasgado'],
        answer: 1,
        why: 'A ferrugem é uma substância nova: fenômeno químico. Derreter e rasgar são fenômenos físicos.'
      },
      {
        q: 'Capítulo 1. O que se usa ao trabalhar numa bancada de laboratório?',
        options: ['Sandália e cabelo solto', 'Jaleco, óculos de proteção e luvas', 'Só as luvas'],
        answer: 1,
        why: 'Os EPIs protegem pele, olhos e mãos. Calçado fechado e cabelo preso também.'
      },
      {
        q: 'Capítulo 2. O número atômico (Z) indica o número de:',
        options: ['Nêutrons', 'Prótons', 'Camadas'],
        answer: 1,
        why: 'Z é o número de prótons e define o elemento químico.'
      },
      {
        q: 'Capítulo 2. Por que cada metal deixa a chama de uma cor no teste de chama?',
        options: ['Os elétrons emitem luz de energia característica ao voltar para a camada de origem', 'O metal derrete e muda de cor', 'O gás do bico muda sozinho'],
        answer: 0,
        why: 'Modelo de Bohr: cada elemento tem camadas com energias próprias.'
      },
      {
        q: 'Capítulo 3. No sal de cozinha (NaCl), a ligação entre sódio e cloro é:',
        options: ['Covalente', 'Metálica', 'Iônica'],
        answer: 2,
        why: 'O sódio (metal) transfere um elétron ao cloro (não metal): ligação iônica.'
      },
      {
        q: 'Capítulo 3. Por que o óleo não se mistura com a água?',
        options: ['A água é polar e o óleo é apolar', 'O óleo é mais pesado', 'A água está fria'],
        answer: 0,
        why: 'Semelhante dissolve semelhante.'
      },
      {
        q: 'Capítulo 4. Uma solução com pH 3 é:',
        options: ['Neutra', 'Básica', 'Ácida'],
        answer: 2,
        why: 'pH abaixo de 7 é ácido; 7 é neutro; acima de 7, básico.'
      },
      {
        q: 'Capítulo 4. Ácido + base forma:',
        options: ['Sal + água', 'Óxido + gás', 'Só água'],
        answer: 0,
        why: 'É a neutralização, usada para corrigir o solo ácido da horta.'
      },
      {
        q: 'Capítulo 5. Quantos mol há em 36 g de água (M = 18 g/mol)?',
        options: ['18 mol', '2 mol', '0,5 mol'],
        answer: 1,
        why: 'n = m ÷ M = 36 ÷ 18 = 2 mol.'
      },
      {
        q: 'Capítulo 5. O reagente que acaba primeiro e define quanto produto se forma é o:',
        options: ['Reagente em excesso', 'Catalisador', 'Reagente limitante'],
        answer: 2,
        why: 'O que passa da proporção sobra sem reagir.'
      },
      {
        q: 'Capítulo 6. Qual método separa a areia da água?',
        options: ['Filtração', 'Destilação fracionada', 'Separação magnética'],
        answer: 0,
        why: 'O filtro segura o sólido que não se dissolveu.'
      },
      {
        q: 'Capítulo 6. A Fórmula Aurora precisava de 2 g/L. Se a concentração fosse maior, o que aconteceria?',
        options: ['Limparia mais rápido, sem problema', 'Seria desperdício, e o excesso poderia virar poluição no rio', 'A concentração não importa'],
        answer: 1,
        why: 'Na química, a dose certa importa: nem mais, nem menos.'
      }
    ]
  }
};
