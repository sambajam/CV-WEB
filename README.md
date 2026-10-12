1. Estrutura do projeto
pagina-pessoal/
├── index.html   → o conteúdo (textos, títulos, botões, formulário)
├── style.css    → a aparência (cores, tamanhos, layout, tema escuro)
└── script.js    → o comportamento (trocar tema, menu, validar formulário)

Como os três trabalham juntos. Pense em uma casa:

HTML (HyperText Markup Language) é a estrutura: paredes, portas e janelas. Define o que existe na página.
CSS (Cascading Style Sheets) é a decoração: cor da tinta, móveis, tamanho dos cômodos. Define como parece.
JavaScript é a parte elétrica: o interruptor que acende a luz. Define o que acontece quando você interage.

O index.html conecta os outros dois com estas duas linhas dentro do <head>:

html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
<link> carrega o CSS.
<script> carrega o JavaScript. O defer significa “só execute depois que a página inteira for lida”, para o script encontrar todos os elementos.

Como o JavaScript “conversa” com o HTML e o CSS:

Cada elemento importante do HTML tem um id (um nome único), por exemplo id="theme-toggle".
O JavaScript usa document.getElementById("theme-toggle") para pegar esse elemento.
Ao clicar no botão de tema, o JavaScript escreve data-theme="dark" na tag <html>. O CSS tem regras como :root[data-theme="dark"] { ... } que trocam as cores. Ninguém muda cor “na mão”: o JS muda um atributo e o CSS faz o resto.

Termos que vão aparecer:

Tag/Element: um bloco do HTML, como <h1>Título</h1>.
Attribute: informação extra dentro da tag, como href="#inicio".
Semantic HTML: usar a tag certa para cada função (<header>, <nav>, <main>, <section>, <footer>). Isso ajuda leitores de tela e buscadores.
Responsive: a página se adapta a celular, tablet e computador.
Accessibility (a11y): o site pode ser usado por todas as pessoas, inclusive quem usa só teclado ou leitor de tela.
Event listener: “fique escutando” um evento (clique, tecla) e execute uma função quando ele acontecer.
localStorage: pequena memória do navegador, usada aqui para lembrar seu tema.
ARIA (aria-*): atributos que dão informação extra a leitores de tela.



========================================================================


# CV-WEB
