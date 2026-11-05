# Vale Cobalto: O Laboratório Aurora

RPG de Química para o Ensino Médio, jogado direto no navegador (celular, tablet ou computador).

**Jogar:** https://arthurmnunes.github.io/vale-cobalto/

## História

Você herda o Laboratório Aurora da Profa. Ítala Ferraz, sua antiga orientadora, na pequena Vale Cobalto. O laboratório está abandonado, o rio da cidade está poluído e o Grupo Vex, comandado pelo seu rival, quer comprar o prédio. Sua missão: reabrir o laboratório, conquistar a confiança da cidade e concluir a Fórmula Aurora, a pesquisa que pode limpar o rio e levar você ao Prêmio Nobel de Química.

## Controles

| Ação | Teclado | Celular |
|---|---|---|
| Mover | WASD ou setas | Joystick |
| Conversar / examinar | E ou Espaço | Botão A |
| Mochila | I | Ícone da mochila |
| Caderno do Laboratório | C | Ícone do caderno |
| Menu | Esc | Ícone de menu |

## Conteúdos

| Capítulo | Tema | Situação |
|---|---|---|
| 1 | Fundamentos da Química: segurança, substâncias, misturas, fenômenos e mudanças de estado | Pronto |
| 2 | O átomo e a tabela periódica | Planejado |
| 3 | Ligações e interações químicas | Planejado |
| 4 | Compostos e reações inorgânicas | Planejado |
| 5 | Grandezas químicas e estequiometria | Planejado |
| 6 | Soluções e misturas | Planejado |

## Estrutura

```
jogo/
  index.html          página do jogo
  css/style.css       interface
  lib/phaser.min.js   motor Phaser 3 (licença MIT)
  assets/             fonte Pixelify Sans (licença OFL) e ícones
  js/art.js           pixel art gerada por código
  js/maps.js          mapas
  js/story.js         roteiro e missões
  js/ui.js            diálogos, menus e desafios
  js/data/            itens, caderno, missões e perguntas
  js/scenes/          cenas do Phaser
.github/workflows/deploy.yml   publicação automática no GitHub Pages
```

## Publicação

Cada envio para a branch `main` verifica os scripts e publica o jogo automaticamente no GitHub Pages. O progresso do jogador fica salvo no próprio navegador.

Projeto escolar de Química, Ensino Médio.
