



/* =========================================================
   script.js - o comportamento (interatividade) da página
   ========================================================= */

// "use strict" ativa um modo mais rigoroso do JavaScript,
// que ajuda a evitar erros comuns.
"use strict";

/* ---------------------------------------------------------
   1. TEMA CLARO / ESCURO
   --------------------------------------------------------- */

// Pegamos os elementos do HTML pelo atributo id.
// "const" cria uma constante: um nome que guarda um valor e não será reatribuído.
const htmlElement = document.documentElement; // a tag <html>
const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

// Nome sob o qual guardamos a escolha no navegador (localStorage).
const THEME_KEY = "tema-preferido";

// Lê o valor salvo. try/catch protege contra navegadores
// que bloqueiam o localStorage (ex.: modo privado restrito).
function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (erro) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (erro) {
    // Se não for possível salvar, o tema continua funcionando, só não é lembrado.
  }
}

// Aplica o tema na página e atualiza o botão.
function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);

  const isDark = theme === "dark";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode"; // Mudança de texto do botão para acessibilidade
}

// Decide o tema inicial:
// 1) o que a pessoa escolheu antes; 2) a preferência do sistema; 3) claro.
function getInitialTheme() {
  const saved = readSavedTheme();
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

applyTheme(getInitialTheme());

// Quando o botão é clicado, troca o tema atual pelo oposto.
themeButton.addEventListener("click", function () {
  const current = htmlElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  saveTheme(next);
});

/* ---------------------------------------------------------
   2. MENU NO CELULAR (abrir e fechar)
   --------------------------------------------------------- */
const menuButton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-principal");

function setMenuOpen(open) {
  menu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", function () {
  const isOpen = menu.classList.contains("open");
  setMenuOpen(!isOpen);
});

// Ao clicar em um link do menu, fecha o menu (útil no celular).
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenuOpen(false);
  });
});

// A tecla Esc também fecha o menu.
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    setMenuOpen(false);
  }
});

/* ---------------------------------------------------------
   3. DESTACAR NO MENU A SEÇÃO QUE ESTÁ NA TELA
   --------------------------------------------------------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-list a");

// O IntersectionObserver avisa quando um elemento entra ou sai da área visível.
// Se o navegador for muito antigo e não tiver esse recurso, simplesmente pulamos esta parte.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", isCurrent);
            if (isCurrent) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    // A seção conta como "atual" quando cruza a faixa central da tela.
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ---------------------------------------------------------
   4. FORMULÁRIO DE CONTATO
   Abre o aplicativo de e-mail do visitante usando mailto:
   --------------------------------------------------------- */

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Seu endereço de e-mail para receber as mensagens.
const MEU_EMAIL = "sambajam@gmail.com";

// Mostra ou limpa a mensagem de erro de um campo.
function setFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorBox = document.getElementById("erro-" + inputId);
  const field = input.closest(".field");

  errorBox.textContent = message;
  field.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", String(message !== ""));
}

// Verifica o formato básico do endereço de e-mail.
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Valida os campos antes de abrir o aplicativo de e-mail.
function validateForm() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  let firstInvalid = null;

  // Nome
  if (nome === "") {
    setFieldError("nome", "Please enter your name.");
    firstInvalid = firstInvalid || document.getElementById("nome");
  } else {
    setFieldError("nome", "");
  }

  // E-mail do cliente
  if (email === "") {
    setFieldError("email", "Please enter your email address.");
    firstInvalid = firstInvalid || document.getElementById("email");
  } else if (!isValidEmail(email)) {
    setFieldError(
      "email",
      "Please enter a valid email address, like name@domain.com."
    );
    firstInvalid = firstInvalid || document.getElementById("email");
  } else {
    setFieldError("email", "");
  }

  // Mensagem
  if (mensagem.length < 10) {
    setFieldError(
      "mensagem",
      "Please write a message with at least 10 characters."
    );
    firstInvalid = firstInvalid || document.getElementById("mensagem");
  } else {
    setFieldError("mensagem", "");
  }

  // Se houver erros, leva o cursor ao primeiro campo inválido.
  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }

  return true;
}

// Processa o formulário.
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  formStatus.textContent = "";

  // Só continua se os campos forem válidos.
  if (!validateForm()) {
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Assunto do e-mail.
  const assunto = "Contact from website - " + nome;

  // Conteúdo do e-mail.
  const corpo =
    "Name: " + nome +
    "\nEmail: " + email +
    "\n\nMessage:\n" + mensagem;

  // O destinatário é sempre você.
  // O cliente não pode alterar o destinatário através dos campos do formulário.
  const mailtoLink =
    "mailto:" + MEU_EMAIL +
    "?subject=" + encodeURIComponent(assunto) +
    "&body=" + encodeURIComponent(corpo);

  formStatus.textContent =
    "Your email application should open now. " +
    "Please review and send your message.";

  // Abre o aplicativo de e-mail configurado no dispositivo.
  window.location.href = mailtoLink;
});

// Limpa a mensagem de erro quando o cliente corrige um campo.
["nome", "email", "mensagem"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    setFieldError(id, "");
    formStatus.textContent = "";
  });
});



/* ---------------------------------------------------------
   5. ANO AUTOMÁTICO NO RODAPÉ
   --------------------------------------------------------- */
document.getElementById("ano").textContent = new Date().getFullYear();



/* ---------------------------------------------------------
   6. CURRÍCULO: VISUALIZAR E BAIXAR EM DOIS IDIOMAS
   --------------------------------------------------------- */

const cvLanguage = document.getElementById("cv-language");
const viewCV = document.getElementById("view-cv");
const downloadCV = document.getElementById("download-cv");

const cvFiles = {
  en: {
    path: "CV_Jamerson_2026_English.pdf",
    filename: "CV_Jamerson_2026_English.pdf"
  },

  sv: {
    path: "CV_Jamerson_2026_Svenska.pdf",
    filename: "CV_Jamerson_2026_Svenska.pdf"
  }
};

function updateCVLinks() {
  const language = cvLanguage.value;
  const selectedCV = cvFiles[language];

  // Atualiza o link para visualizar o PDF.
  viewCV.href = selectedCV.path;

  // Atualiza o link e o nome sugerido para o download.
  downloadCV.href = selectedCV.path;
  downloadCV.download = selectedCV.filename;

  // Atualiza o texto dos botões.
  viewCV.textContent =
    language === "sv" ? "Visa CV" : "View CV";

  downloadCV.textContent =
    language === "sv" ? "Ladda ner CV" : "Download CV";
}

// Atualiza os links quando o visitante troca o idioma.
cvLanguage.addEventListener("change", updateCVLinks);

// Configura os links quando a página é carregada.
updateCVLinks();