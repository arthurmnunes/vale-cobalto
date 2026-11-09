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
  receita: { name: 'Receita dos fogos', icon: 'receita', desc: 'Que sal produz cada cor: sódio, cobre, estrôncio e potássio. Entregue à Prefeita Célia.' },
  amostras: { name: 'Amostras sem rótulo', icon: 'amostras', desc: 'Frascos do Seu Bento que perderam os rótulos. Identifique-os na bancada.' },
  rotulos: { name: 'Rótulos novos', icon: 'relatorio', desc: 'Fórmulas corretas para os frascos do Seu Bento: NaCl, CaCl_2, MgO e Al_2O_3.' },
  detergente: { name: 'Detergente', icon: 'detergente', desc: 'Molécula com ponta polar e cauda apolar: une a água ao óleo. Para limpar a fonte.' },
  repolho: { name: 'Repolho roxo', icon: 'repolho', desc: 'Colhido na horta. O suco dele muda de cor conforme a acidez: um indicador natural.' },
  solo: { name: 'Amostra de solo', icon: 'solo', desc: 'Terra da horta comunitária, onde as folhas estão amareladas. Teste na bancada.' },
  agua_chuva: { name: 'Água da chuva', icon: 'agua_chuva', desc: 'Guardada pelos voluntários da horta na última chuva. Analise na bancada.' },
  relatorio_amb: { name: 'Relatório ambiental', icon: 'laudo', desc: 'As reações da chuva ácida e do filtro, todas balanceadas. Entregue à Prefeita Célia.' },
  phmetro: { name: 'Medidor de pH', icon: 'phmetro', desc: 'Mede a acidez de uma solução com precisão, de 0 a 14. Presente da prefeitura.' },
  pedido: { name: 'Pedido da estação', icon: 'relatorio', desc: 'Encomenda da estação de tratamento de água: sulfato de alumínio, Al_2(SO_4)_3, e cal hidratada, Ca(OH)_2. Quantidade exata, sem sobra.' },
  tabela_massas: { name: 'Tabela de massas atômicas', icon: 'receita', desc: 'H = 1, C = 12, N = 14, O = 16, Na = 23, Al = 27, S = 32, Cl = 35,5, Ca = 40 (em u).' },
  pagina_aurora: { name: 'Última página da pesquisa', icon: 'carta', desc: 'Anotações da Profa. Ítala: "Primeiro, separe o que está misturado. Depois, a Fórmula Aurora na concentração certa: nem mais, nem menos."' },
  amostra_rio: { name: 'Amostra do rio', icon: 'agua_chuva', desc: 'Água turva do rio de Vale Cobalto, com lama, folhas, óleo e sais dissolvidos.' },
  formula_aurora: { name: 'Fórmula Aurora', icon: 'detergente', desc: 'Tanque de 12 L na concentração exata: 2 g/L. Pronta para aplicar no rio.' },
  convite: { name: 'Convite do Congresso', icon: 'receita', desc: 'Congresso Internacional de Química: o Laboratório Aurora foi convidado a apresentar a Fórmula Aurora.' },
  nobel: { name: 'Indicação ao Prêmio Nobel', icon: 'licenca', desc: 'Carta da Academia: indicação ao Prêmio Nobel de Química pela Fórmula Aurora. Assinada também pela Profa. Ítala.' },
  planilha: { name: 'Planilha da encomenda', icon: 'laudo', desc: 'Cada reagente calculado pela equação balanceada, em mol e em gramas. Entregue à Prefeita Célia.' }
};

// Loja do Seu Bento
VC.SHOP = [
  { id: 'extintor', name: 'Extintor de incêndio', price: 25, desc: 'Segurança em primeiro lugar: pó químico para várias classes de fogo.', decor: true },
  { id: 'planta', name: 'Samambaia em vaso', price: 30, desc: 'Deixa o laboratório mais vivo.', decor: true },
  { id: 'poltrona', name: 'Poltrona de leitura', price: 45, desc: 'Para estudar com conforto.', decor: true },
  { id: 'lousa', name: 'Lousa branca', price: 60, desc: 'Para rabiscar fórmulas na parede.', decor: true },
  { id: 'caminha', name: 'Caminha do gato', price: 40, desc: 'Uma almofada macia para o mascote do Aurora.', decor: true, needs: 'cap1' },
  { id: 'modelo', name: 'Modelo atômico', price: 50, desc: 'Um átomo de Bohr com órbitas de arame.', decor: true, needs: 'cap1' },
  { id: 'microscopio', name: 'Microscópio', price: 100, desc: 'Para ver o que o olho não vê.', decor: true, needs: 'cap1' },
  { id: 'espectroscopio', name: 'Espectroscópio', price: 180, desc: 'Separa a luz de uma chama nas cores de cada elemento.', decor: true, needs: 'cap2' },
  { id: 'tubos', name: 'Estante de tubos de ensaio', price: 40, desc: 'Tubos coloridos para reações em pequena escala.', decor: true, needs: 'cap2' },
  { id: 'cartaz_ph', name: 'Cartaz da escala de pH', price: 35, desc: 'As cores do repolho roxo, do ácido ao básico.', decor: true, needs: 'cap3' },
  { id: 'poster_mol', name: 'Pôster do mol', price: 35, desc: '6,02 × 10²³: o número de Avogadro na parede.', decor: true, needs: 'cap4' },
  { id: 'vidraria', name: 'Kit de vidraria volumétrica', price: 90, desc: 'Balões, pipetas e buretas para medidas precisas.', decor: true, needs: 'cap5' },
  { id: 'aquario', name: 'Aquário com peixes do rio', price: 150, desc: 'Lambaris do rio de Vale Cobalto, agora que a água está limpa.', decor: true, needs: 'cap6' },
  { id: 'moldura', name: 'Moldura da indicação ao Nobel', price: 80, desc: 'Para pendurar a carta mais importante do Aurora.', decor: true, needs: 'cap6' }
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
  octeto: { title: 'Regra do octeto', text: 'Os átomos tendem a fazer ligações até ficar com 8 elétrons na última camada, como os gases nobres. O hidrogênio fica estável com 2, como o hélio.' },
  ligacao_ionica: { title: 'Ligação iônica', text: 'Entre metal e não metal: o metal transfere elétrons e vira cátion; o não metal recebe e vira ânion. Formam cristais duros, quebradiços, que conduzem eletricidade quando dissolvidos ou fundidos. Ex.: NaCl.' },
  ligacao_covalente: { title: 'Ligação covalente', text: 'Entre não metais: os átomos compartilham pares de elétrons. Pode ser simples (H_2), dupla (O_2) ou tripla (N_2). Formam moléculas, como H_2O e CO_2, que em geral não conduzem eletricidade.' },
  ligacao_metalica: { title: 'Ligação metálica', text: 'Entre átomos de metais: os elétrons da camada de valência ficam livres, formando um "mar de elétrons". Por isso metais conduzem eletricidade e calor, têm brilho e podem ser dobrados e esticados em fios.' },
  formula_ionica: { title: 'Fórmula iônica', text: 'A soma das cargas deve dar zero, na menor proporção possível. Atalho: cruzar as cargas. Al^3+ e O^2− formam Al_2O_3, pois 2 × (+3) + 3 × (−2) = 0.' },
  polaridade: { title: 'Polaridade', text: 'Quando um átomo atrai mais os elétrons (é mais eletronegativo), a molécula pode ficar com um lado parcialmente negativo e outro positivo: é polar, como a água. Óleos e gorduras são apolares.' },
  forcas_intermoleculares: { title: 'Forças intermoleculares', text: 'Atrações entre moléculas. A mais forte é a ligação de hidrogênio (H ligado a F, O ou N), que explica o alto ponto de ebulição da água e a tensão superficial que sustenta insetos na água.' },
  semelhante: { title: 'Semelhante dissolve semelhante', text: 'Substâncias polares e iônicas se dissolvem bem em solventes polares, como a água. Substâncias apolares se dissolvem em solventes apolares, como óleo e gasolina.' },
  detergente: { title: 'Detergente', text: 'Molécula longa com uma ponta polar (atraída pela água) e uma cauda apolar (atraída pelo óleo). As caudas envolvem as gotas de óleo e a água as leva embora.' },
  acido: { title: 'Ácidos', text: 'Segundo Arrhenius, em água liberam íons H^+ (que formam H_3O^+). Têm sabor azedo e deixam o indicador de repolho roxo vermelho ou rosa. Exemplos: HCl, H_2SO_4, H_3PO_4 e o ácido acético do vinagre.' },
  base: { title: 'Bases', text: 'Segundo Arrhenius, em água liberam íons OH^− (hidróxido). Têm sabor adstringente e são escorregadias ao tato. Exemplos: NaOH (soda cáustica), Ca(OH)_2 (cal hidratada) e Mg(OH)_2 (leite de magnésia).' },
  sal: { title: 'Sais', text: 'Compostos iônicos com o cátion de uma base e o ânion de um ácido. São formados na neutralização. Exemplos: NaCl, CaCO_3 (calcário), CaSO_4 (gesso) e KNO_3 (fertilizante).' },
  oxido: { title: 'Óxidos', text: 'Compostos de dois elementos em que o oxigênio é o mais eletronegativo. Óxido ácido + água forma ácido (CO_2, SO_2). Óxido básico + água forma base (CaO, Na_2O).' },
  ph: { title: 'Escala de pH', text: 'Mede a acidez de 0 a 14 (a 25 °C). pH menor que 7: ácido. Igual a 7: neutro. Maior que 7: básico. Cada unidade a menos significa 10 vezes mais íons H^+.' },
  indicador: { title: 'Indicador ácido-base', text: 'Substância que muda de cor com o pH. O repolho roxo (antocianinas) fica vermelho ou rosa no ácido, roxo no neutro, azul ou verde na base e amarelo na base forte. A fenolftaleína fica incolor no ácido e rosa na base.' },
  neutralizacao: { title: 'Neutralização', text: 'Ácido + base → sal + água. O H^+ do ácido e o OH^− da base formam H_2O. Ex.: HCl + NaOH → NaCl + H_2O. A calagem usa calcário para neutralizar o solo ácido.' },
  chuva_acida: { title: 'Chuva ácida', text: 'A chuva normal já tem pH perto de 5,6, por causa do CO_2 do ar. Óxidos de enxofre (SO_2) e de nitrogênio (NO_2), lançados por caldeiras e motores, formam ácidos sulfúrico e nítrico e baixam ainda mais o pH. Ela corrói mármore e acidifica solos e lagos.' },
  lavoisier: { title: 'Lei de Lavoisier', text: 'Em um sistema fechado, a massa total antes e depois da reação é a mesma. Os átomos não somem nem aparecem: só se reorganizam em substâncias novas.' },
  mistura_homogenea: { title: 'Mistura homogênea', text: 'Tem uma única fase: não dá para distinguir os componentes, nem ao microscópio comum. Ex.: água com sal dissolvido, ar filtrado, álcool 70%. Também é chamada de solução.' },
  mistura_heterogenea: { title: 'Mistura heterogênea', text: 'Tem duas ou mais fases visíveis. Ex.: água e óleo, água e areia, granito.' },
  separacao: { title: 'Separação de misturas', text: 'Filtração: sólido não dissolvido de líquido, com filtro. Decantação: componentes de densidades diferentes, deixando assentar ou com funil de decantação. Separação magnética: retira metais atraídos pelo ímã, como o ferro.' },
  destilacao: { title: 'Destilação', text: 'Separa por diferença de ponto de ebulição: o líquido vira vapor, passa pelo condensador e volta a ser líquido no outro frasco. Simples: sólido dissolvido em líquido (água do mar). Fracionada: líquidos misturados (água e álcool, petróleo).' },
  solucao: { title: 'Solução', text: 'Mistura homogênea formada por soluto (o que é dissolvido, em menor quantidade) e solvente (o que dissolve). A água é o solvente mais comum.' },
  concentracao_comum: { title: 'Concentração comum', text: 'C = massa do soluto ÷ volume da solução, em g/L. 20 g de sal em 2 L de solução: 10 g/L. O soro fisiológico tem 9 g/L de NaCl.' },
  concentracao_molar: { title: 'Concentração em mol/L', text: 'Quantidade de matéria do soluto ÷ volume da solução. 2 mol de soluto em 4 L: 0,5 mol/L.' },
  diluicao: { title: 'Diluição', text: 'Acrescentar solvente diminui a concentração, mas a quantidade de soluto não muda: C_1 × V_1 = C_2 × V_2.' },
  saturada: { title: 'Solução saturada', text: 'Contém a quantidade máxima de soluto que o solvente dissolve naquela temperatura. O que passar disso fica no fundo, como corpo de chão.' },
  mol: { title: 'Mol', text: 'Unidade de quantidade de matéria no SI. 1 mol contém 6,02 × 10^23 entidades (átomos, moléculas ou íons), assim como 1 dúzia contém 12 unidades.' },
  avogadro: { title: 'Constante de Avogadro', text: 'É o número de entidades em 1 mol: 6,02 × 10^23. Ela faz a ponte entre o mundo dos átomos e as quantidades que pesamos no laboratório.' },
  massa_atomica: { title: 'Massa atômica', text: 'Massa de um átomo em unidades de massa atômica (u), comparada a 1/12 da massa do carbono-12. Está na tabela periódica: H = 1 u, C = 12 u, O = 16 u.' },
  massa_molar: { title: 'Massa molar (M)', text: 'Massa de 1 mol, em g/mol: soma das massas dos átomos da fórmula. Água: 2 × 1 + 16 = 18 g/mol. O número fora do parêntese multiplica tudo o que está dentro: Ca(OH)_2 = 40 + 2 × (16 + 1) = 74 g/mol.' },
  volume_molar: { title: 'Volume molar', text: 'Nas CNTP (0 °C e 1 atm), 1 mol de qualquer gás ocupa cerca de 22,4 L.' },
  conversao: { title: 'Massa e mol', text: 'n = m ÷ M. Exemplo: 36 g de água ÷ 18 g/mol = 2 mol. O caminho inverso: m = n × M.' },
  estequiometria: { title: 'Estequiometria', text: 'Cálculo das quantidades de reagentes e produtos. Os coeficientes da equação balanceada dão a proporção em mol: em 2 H_2 + O_2 → 2 H_2O, são 2 mol de H_2 para 1 mol de O_2, formando 2 mol de água.' },
  limitante: { title: 'Reagente limitante', text: 'É o reagente que acaba primeiro e define quanto produto se forma. O reagente em excesso sobra sem reagir: é desperdício de dinheiro e pode virar resíduo.' },
  proust: { title: 'Lei de Proust', text: 'Uma substância tem sempre a mesma proporção em massa entre seus elementos. Na água, sempre 1 g de hidrogênio para 8 g de oxigênio.' },
  balanceamento: { title: 'Balanceamento', text: 'Coeficientes (os números na frente das fórmulas) igualam a quantidade de cada átomo nos dois lados, nos menores números inteiros. Nunca se mudam os índices das fórmulas. Ex.: 2 H_2 + O_2 → 2 H_2O.' },
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
  q2_fim: { ch: 2, text: 'Fim do conteúdo disponível. O Capítulo 3 chega na próxima atualização.', target: null },
  q3_bento: { ch: 3, text: 'O Seu Bento pediu ajuda. Vá até a barraca.', target: { map: 'praca', id: 'bento' } },
  q3_amostras: { ch: 3, text: 'Identifique as amostras do Seu Bento na bancada.', target: { map: 'lab', id: 'bancada' } },
  q3_formulas: { ch: 3, text: 'Escreva as fórmulas dos rótulos na bancada de síntese.', target: { map: 'lab', id: 'sintese' } },
  q3_rotulos: { ch: 3, text: 'Entregue os rótulos novos ao Seu Bento.', target: { map: 'praca', id: 'bento' } },
  q3_fonte: { ch: 3, text: 'Examine a fonte suja de óleo.', target: { map: 'praca', id: 'fonte' } },
  q3_detergente: { ch: 3, text: 'Prepare um detergente na bancada de síntese.', target: { map: 'lab', id: 'sintese' } },
  q3_limpar: { ch: 3, text: 'Use o detergente para limpar a fonte.', target: { map: 'praca', id: 'fonte' } },
  q3_prefeita: { ch: 3, text: 'Conte à Prefeita Célia que a fonte está limpa.', target: { map: 'praca', id: 'prefeita' } },
  q3_fim: { ch: 3, text: 'Fim do conteúdo disponível. O Capítulo 4 chega na próxima atualização.', target: null },
  q4_prefeita: { ch: 4, text: 'A Prefeita Célia quer falar com você sobre a horta.', target: { map: 'praca', id: 'prefeita' } },
  q4_horta: { ch: 4, text: 'Examine a horta comunitária, perto do rio.', target: { map: 'praca', id: 'horta' } },
  q4_indicador: { ch: 4, text: 'Prepare o indicador de repolho roxo e teste o solo na bancada.', target: { map: 'lab', id: 'bancada' } },
  q4_calagem: { ch: 4, text: 'Corrija o solo ácido da horta.', target: { map: 'praca', id: 'horta' } },
  q4_chuva: { ch: 4, text: 'Analise a água da chuva na bancada.', target: { map: 'lab', id: 'bancada' } },
  q4_equacoes: { ch: 4, text: 'Balanceie as equações do relatório na bancada de síntese.', target: { map: 'lab', id: 'sintese' } },
  q4_entrega: { ch: 4, text: 'Entregue o relatório ambiental à Prefeita Célia.', target: { map: 'praca', id: 'prefeita' } },
  q4_fim: { ch: 4, text: 'Fim do conteúdo disponível. O Capítulo 5 chega na próxima atualização.', target: null },
  q5_prefeita: { ch: 5, text: 'A Prefeita Célia tem uma encomenda grande para o Aurora.', target: { map: 'praca', id: 'prefeita' } },
  q5_grandezas: { ch: 5, text: 'Organize as grandezas da encomenda na bancada.', target: { map: 'lab', id: 'bancada' } },
  q5_bento: { ch: 5, text: 'Peça ao Seu Bento uma balança mais precisa.', target: { map: 'praca', id: 'bento' } },
  q5_massas: { ch: 5, text: 'Calcule as massas molares na balança analítica.', target: { map: 'lab', id: 'analitica' } },
  q5_calculo: { ch: 5, text: 'Calcule a encomenda pela equação na bancada de síntese.', target: { map: 'lab', id: 'sintese' } },
  q5_entrega: { ch: 5, text: 'Entregue a planilha da encomenda à Prefeita Célia.', target: { map: 'praca', id: 'prefeita' } },
  q5_fim: { ch: 5, text: 'Fim do conteúdo disponível. O Capítulo 6 chega na próxima atualização.', target: null },
  q6_carta: { ch: 6, text: 'Chegou uma carta para você. Ela está na mesa do laboratório.', target: { map: 'lab', id: 'mesa' } },
  q6_coleta: { ch: 6, text: 'Colete uma amostra no ponto de coleta, na margem do rio.', target: { map: 'praca', id: 'coleta' } },
  q6_separacao: { ch: 6, text: 'Separe as misturas da amostra na bancada.', target: { map: 'lab', id: 'bancada' } },
  q6_bento: { ch: 6, text: 'Procure um destilador na barraca do Seu Bento.', target: { map: 'praca', id: 'bento' } },
  q6_destilacao: { ch: 6, text: 'Purifique a amostra no destilador.', target: { map: 'lab', id: 'destilador' } },
  q6_formula: { ch: 6, text: 'Prepare a Fórmula Aurora na bancada de síntese.', target: { map: 'lab', id: 'sintese' } },
  q6_rio: { ch: 6, text: 'Aplique a Fórmula Aurora no ponto de coleta do rio.', target: { map: 'praca', id: 'coleta' } },
  q6_prefeita: { ch: 6, text: 'Conte à Prefeita Célia que o rio está limpo.', target: { map: 'praca', id: 'prefeita' } },
  q6_congresso: { ch: 6, text: 'Encontre {rival} na praça para ir ao Congresso.', target: { map: 'praca', id: 'rival' } },
  q6_fim: { ch: 6, text: 'Vale Cobalto está salva! Explore a cidade à vontade.', target: null }
};

// Início de cada capítulo e o que ele concede ao ser concluído (para "Escolher capítulo")
VC.CHAPTER_DATA = {
  1: {
    start: { quest: 'q_prefeita', spawn: [5, 9], face: 'up' },
    grants: {
      inv: ['chave', 'carta', 'epi', 'balanca', 'licenca'],
      flags: ['epi', 'estanteOk', 'rivalMet', 'cap1', 'bentoMet', 'liaMet'],
      notebook: ['epi', 'fds', 'emergencia', 'substancia_simples', 'substancia_composta', 'mistura', 'alotropia', 'fenomeno_fisico', 'fenomeno_quimico', 'mudancas_estado'],
      stars: ['epi', 'estante', 'laudo']
    }
  },
  2: {
    start: { quest: 'q2_lia', spawn: [5, 6], face: 'down' },
    grants: {
      inv: ['bunsen'],
      flags: ['muralMeio', 'muralOk', 'cap2'],
      notebook: ['particulas', 'numero_atomico', 'numero_massa', 'ions_isotopos', 'camadas', 'tabela', 'familias', 'teste_chama', 'bohr'],
      stars: ['mural1', 'mural2', 'chama']
    }
  },
  3: {
    start: { quest: 'q3_bento', spawn: [5, 6], face: 'down' },
    grants: {
      inv: [],
      flags: ['sinteseOk', 'oleo', 'fonteLimpa', 'cap3'],
      notebook: ['octeto', 'ligacao_ionica', 'ligacao_covalente', 'ligacao_metalica', 'formula_ionica', 'polaridade', 'forcas_intermoleculares', 'semelhante', 'detergente'],
      stars: ['amostras', 'formulas', 'fonte', 'detergente']
    }
  },
  4: {
    start: { quest: 'q4_prefeita', spawn: [5, 6], face: 'down' },
    grants: {
      inv: ['phmetro'],
      flags: ['hortaOk', 'capelaOk', 'cap4'],
      notebook: ['acido', 'base', 'sal', 'oxido', 'ph', 'indicador', 'neutralizacao', 'chuva_acida', 'lavoisier', 'balanceamento'],
      stars: ['funcoes', 'indicador', 'calagem', 'chuva', 'equacoes']
    }
  },
  5: {
    start: { quest: 'q5_prefeita', spawn: [5, 6], face: 'down' },
    grants: {
      inv: [],
      flags: ['analiticaOk', 'cap5'],
      notebook: ['mol', 'avogadro', 'massa_atomica', 'volume_molar', 'massa_molar', 'conversao', 'estequiometria', 'limitante', 'proust'],
      stars: ['grandezas', 'massas', 'calculo']
    }
  },
  6: {
    start: { quest: 'q6_carta', spawn: [5, 6], face: 'down' },
    grants: {
      inv: ['nobel'],
      flags: ['destiladorOk', 'rioLimpo', 'cap6'],
      notebook: ['mistura_homogenea', 'mistura_heterogenea', 'separacao', 'destilacao', 'solucao', 'concentracao_comum', 'concentracao_molar', 'diluicao', 'saturada'],
      stars: ['separacao', 'destilacao', 'formula', 'banca']
    }
  }
};

// Capítulos já implementados
VC.IMPLEMENTED = 6;

// Roteiro de capítulos (quadro de pedidos)
VC.CHAPTERS = [
  { n: 1, short: 'Fundamentos', title: 'Fundamentos da Química', topic: 'Segurança, substâncias, misturas e fenômenos', reward: 'Licença provisória e balança' },
  { n: 2, short: 'O átomo', title: 'O átomo e a tabela periódica', topic: 'Partículas, distribuição eletrônica, famílias', reward: 'Bico de Bunsen e mural restaurado' },
  { n: 3, short: 'Ligações', title: 'Ligações e interações', topic: 'Iônica, covalente, metálica e polaridade', reward: 'Bancada de síntese' },
  { n: 4, short: 'Reações', title: 'Compostos e reações inorgânicas', topic: 'Ácidos, bases, sais, óxidos e balanceamento', reward: 'Medidor de pH e capela' },
  { n: 5, short: 'Estequiometria', title: 'Grandezas e estequiometria', topic: 'Mol, massa molar e proporções', reward: 'Balança analítica' },
  { n: 6, short: 'Soluções', title: 'Soluções e misturas', topic: 'Concentração, diluição e separação', reward: 'Destilador e a Fórmula Aurora' }
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
  itala_p: { name: 'Profa. Ítala', sprite: 'itala' },
  narrador: { name: '', sprite: null }
};
