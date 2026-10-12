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


# CV - WEB - DOCKER

meu-portfolio/
├── index.html
├── style.css
├── script.js
├── cv-english.pdf
├── cv-svenska.pdf
├── images/
│   └── profile.jpg
├── Dockerfile
├── docker-compose.yml
└── .dockerignore

================================
Dockerfile
===================================
FROM nginx:alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the portfolio files into Nginx's web directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Copy CV files if they exist in the project root
COPY cv-*.pdf /usr/share/nginx/html/

EXPOSE 80

================================

Como funciona:
- FROM nginx:alpine: utiliza uma imagem oficial do Nginx baseada no Alpine Linux, que é leve.
- RUN: remove a página de boas-vindas padrão do Nginx.
- COPY: copia os arquivos do seu computador para dentro da imagem.
- EXPOSE 80: documenta a porta HTTP usada pelo servidor dentro do contêiner.


========================

docker-compose.yml

=======================


services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: meu-portfolio
    ports:
      - "8082:80"
    restart: unless-stopped

==============================================

Explicação das configurações:

Configuração	Significado
build	Constrói a imagem usando seu Dockerfile.
container_name	Define o nome do contêiner.
8080:80	Encaminha a porta 8080 do Mac para a porta 80 do contêiner.
restart: unless-stopped	Reinicia o contêiner automaticamente após uma falha ou reinicialização do Docker, exceto quando você o tiver parado manualmente.

==================================================

.dockerignore

==================================================

.git
.DS_Store
.vscode/
node_modules/
.env

===================================================

Isso ajuda a evitar arquivos desnecessários e reduz o risco de incluir configurações locais ou arquivos com segredos na imagem.

===================================================

Construir a imagem e iniciar o serviço:

docker compose up -d --build


=====================================

Verificar se o contêiner está funcionando:

docker compose ps

====================================

Verificar os logs do Nginx:

docker compose logs --tail=50 portfolio

==========================================

Acessar:

http://localhost:8082


============================================

Apos mudancas:

docker compose up -d --build


============================================
Depois de iniciar a aplicação:

curl -I http://localhost:8082

curl -I http://localhost:8082/style.css
curl -I http://localhost:8082/script.js
curl -I http://localhost:8082/images/profile.jpg
curl -I http://localhost:8082/cv_Jamerson_2016_English.pdf


===================================================================

Ativar o GitHub Pages:


1. Abra o repositório meu-portfolio no GitHub.
2. Entre em Settings.
3. No menu lateral, clique em Pages.
4. Na seção Build and deployment, selecione Deploy from a branch.
5. Em Branch, selecione main.
6. Em Folder, selecione /(root).
7. Clique em Save.

Aguarde a publicação. O endereço deverá ser parecido com:

https://sambajam.github.io/CV-WEB/

=====================================================

MICROSOFT AZURE: Static Web App

=====================================================