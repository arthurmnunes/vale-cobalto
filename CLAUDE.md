# Vale Cobalto: O Laboratório Aurora

RPG de Química para o Ensino Médio, jogado no navegador. Trabalho escolar de Química.
Este projeto foi iniciado no chat do Claude.ai e continua aqui no Claude Code. Este arquivo resume tudo o que já foi decidido.

- **Repositório:** arthurmnunes/vale-cobalto (branch `main`)
- **Jogo publicado:** https://arthurmnunes.github.io/vale-cobalto/
- **Idioma:** todo o jogo, os commits e as issues em português do Brasil.

## Objetivo e história

O jogador herda o Laboratório Aurora da Profa. Ítala Ferraz, sua antiga orientadora, na cidade de Vale Cobalto. O laboratório está abandonado, o rio está poluído e o Grupo Vex, comandado pelo rival, quer comprar o prédio. O jogador precisa reabrir o laboratório, conquistar a cidade e concluir a **Fórmula Aurora**, que purifica o rio. O desfecho é a apresentação no Congresso Internacional de Química e a indicação ao **Prêmio Nobel**.

## Regras de design (não mudar sem a autora pedir)

- Estilo Stardew Valley: personagem anda pela cidade e administra o laboratório.
- Mobile-first, jogado com o celular **deitado** (paisagem); também tablet e computador.
- **Fácil e curto:** cerca de 10 a 15 minutos por capítulo; 45 a 60 minutos no total.
- **Sem game over:** o erro gera explicação e dica (gato ou Lia).
- Missões curtas que liberam melhorias, fórmulas e instrumentos.
- Conteúdo químico correto e adequado ao Ensino Médio.
- Cada conceito aprendido entra no **Caderno do Laboratório** (glossário de revisão).

## NPCs

| NPC | Papel |
|---|---|
| Protagonista | Nome escolhido pelo jogador |
| Rival (Grupo Vex) | Nome escolhido pelo jogador; disputa missões e se reconcilia no final |
| Gato do laboratório | Nome escolhido pelo jogador; dá dicas |
| Profa. Ítala | Narra por cartas; aparece no final |
| Prefeita Célia | Missões cívicas |
| Seu Bento | Loja de melhorias e instrumentos |
| Lia | Estudante; sistema de ajuda |

## Status dos capítulos

| Cap. | Tema | Situação |
|---|---|---|
| 1 | Fundamentos: segurança, substâncias, misturas, fenômenos, mudanças de estado | Publicado |
| 2 | O átomo e a tabela periódica: partículas, íons, isótopos, camadas, famílias, teste de chama (missões: O mural apagado; Festival das Luzes) | Publicado (issue #3) |
| 3 | Ligações e interações: iônica, covalente, metálica, fórmulas iônicas, polaridade, solubilidade (missões: O estoque misturado; Óleo na fonte) | Publicado (issue #7) |
| 4 | Compostos e reações inorgânicas: ácidos, bases, sais, óxidos, pH, neutralização, chuva ácida, balanceamento (missões: Solo ácido na horta; A chuva ácida) | Publicado (issue #13) |
| 5 | Grandezas e estequiometria: mol, massa molar, proporções | **Próximo** |
| 6 | Soluções e misturas: concentração, diluição, separação; final do jogo | Planejado |

### Planejamento dos próximos capítulos

- **Cap. 5:** grande encomenda; calcular mol e massa sem desperdício, em disputa com o rival. Recompensa: balança analítica e verba extra.
- **Cap. 6:** concentração e diluição; separação de misturas; a Fórmula Aurora purifica o rio. Recompensa: destilador.
- **Missão final (13ª):** Congresso Internacional, reconciliação com o rival, aparição da Profa. Ítala e indicação ao Nobel.

Cada capítulo tem 2 missões e cerca de 5 desafios curtos, no mesmo formato dos capítulos já publicados.

## Stack e estrutura

- Phaser 3 salvo em `jogo/lib/phaser.min.js` (sem CDN externo).
- Pixel art gerada por código em `js/art.js` (sem arquivos de imagem).
- Textos em **Atkinson Hyperlegible**; fonte em pixel (Pixelify Sans) só no logotipo.
- Progresso salvo no navegador.

```
jogo/
  index.html
  css/style.css
  lib/phaser.min.js
  assets/             fontes e ícones
  js/art.js           pixel art por código
  js/maps.js          mapas (praça e laboratório)
  js/story.js         roteiro, missões, handlers de NPCs/objetos, S.migrate
  js/ui.js            diálogos, menus, loja, caderno e desafios (pick, sort, quiz, numbers...)
  js/data/dados.js    itens, loja, caderno, quests, VC.CHAPTERS, VC.IMPLEMENTED
  js/data/desafios.js conteúdo dos desafios (_ = subscrito, ^ = sobrescrito)
  js/scenes/          cenas do Phaser
.github/workflows/deploy.yml
README.md
```

### Padrões do código

- Quests por capítulo com prefixo `qN_` e campo `ch: N` em `dados.js`.
- Capítulo concluído = flag `capN`. Ao adicionar um capítulo, atualizar `VC.IMPLEMENTED`.
- Transição entre capítulos em `story.js` (`S.startChapterN`) e tela de fim de conteúdo (`S.endOfDemo`).
- **Compatibilidade de saves:** jogos salvos no fim do conteúdo anterior devem continuar no novo capítulo sem recomeçar (tratar em `S.migrate`).
- Atualizar a tabela de capítulos do `README.md` a cada capítulo publicado.

## Fluxo de trabalho (obrigatório)

1. **Uma issue no GitHub para cada correção ou feature**, com descrição, plano em checklist e critério de aceite (etiqueta `bug` ou `enhancement`).
2. Bugs relatados durante os testes são **acumulados** e aplicados juntos **em um único patch**, quando a autora disser que terminou de testar.
3. Antes de publicar: `node --check` nos scripts e teste do jogo de ponta a ponta (computador e tela de celular deitado, ex.: 844×340), incluindo continuação de jogo salvo.
4. Commit em português, com resumo das mudanças e `Closes #N` das issues resolvidas.
5. Push na `main` publica automaticamente: o workflow verifica os scripts, troca `__VERSION__` pela versão (evita cache) e publica no GitHub Pages.

## Limitações conhecidas

- No iPhone, o Safari não permite travar a orientação nem tela cheia; o jogo mostra a dica de "Adicionar à Tela de Início".
- Testes automatizados rodam em Chromium simulando celular; o Safari real é testado pela autora.

## Próximo passo

Conferir as issues abertas (`gh issue list`) e, se não houver pendências, criar a issue do **Capítulo 5** e implementá-lo.
