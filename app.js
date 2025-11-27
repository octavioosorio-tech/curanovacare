// ================== AUTENTICACIÓN BÁSICA (login / register) ==================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const linkGoRegister = document.getElementById("link-go-register");
  const linkGoLogin = document.getElementById("link-go-login");
  const authTitle = document.getElementById("auth-title");
  const authSwitchText = document.getElementById("auth-switch-text");
  const authLangSelect = document.getElementById("auth-lang");

  // Idioma: usamos la misma clave que Nova (nova_lang)
  if (authLangSelect) {
    const savedLang = localStorage.getItem("nova_lang") || "en";
    authLangSelect.value = savedLang;

    authLangSelect.addEventListener("change", () => {
      localStorage.setItem("nova_lang", authLangSelect.value);
    });
  }

  // Cambiar entre LOGIN y REGISTER
  if (linkGoRegister && linkGoLogin && loginForm && registerForm && authTitle && authSwitchText) {
    linkGoRegister.addEventListener("click", () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      authTitle.textContent = "Register";
      authSwitchText.textContent = "Already have an account?";
      linkGoRegister.style.display = "none";
      linkGoLogin.style.display = "inline-block";
    });

    linkGoLogin.addEventListener("click", () => {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      authTitle.textContent = "Log in";
      authSwitchText.textContent = "Don’t have an account?";
      linkGoLogin.style.display = "none";
      linkGoRegister.style.display = "inline-block";
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email")?.value.trim() || "";
      if (!email) {
        alert("Please write your email.");
        return;
      }

      const existingUser = localStorage.getItem("cura_username") || "NovaUser";

      localStorage.setItem("cura_email", email);
      localStorage.setItem("cura_username", existingUser);

      window.location.href = "nova.html";
    });
  }

  // REGISTER
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username =
        document.getElementById("reg-username")?.value.trim() || "NovaUser";
      const email =
        document.getElementById("reg-email")?.value.trim() || "";

      if (!email) {
        alert("Please write your email.");
        return;
      }

      localStorage.setItem("cura_username", username);
      localStorage.setItem("cura_email", email);

      window.location.href = "nova.html";
    });
  }
});

// ================= IDIOMA ACTUAL Y TEXTOS =================

// idioma actual por defecto inglés, o el último guardado
let currentLang = localStorage.getItem("nova_lang") || "en";

const texts = {/* --- TU BLOQUE DE TEXTOS COMPLETO AQUÍ (sin cambios) --- */};

// función t()
function t(key) {
  const lang = texts[currentLang] ? currentLang : "en";
  return texts[lang][key];
}

// ================= IDIOMAS (selector visual)
const langSelector = document.getElementById("lang-selector");
const langMenu = document.getElementById("lang-menu");
const langLabel = document.getElementById("lang-label");

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" }
];

function buildLanguageMenu() {
  langMenu.innerHTML = "";
  languages
    .sort((a, b) => a.label.localeCompare(b.label, "en"))
    .forEach((lang) => {
      const opt = document.createElement("div");
      opt.className = "lang-option";
      opt.textContent = lang.label;
      opt.dataset.code = lang.code;
      opt.addEventListener("click", () => {
        langLabel.textContent = lang.label;
        langMenu.classList.remove("show");
        currentLang = lang.code;
        localStorage.setItem("nova_lang", lang.code);
        resetConversation();
      });
      langMenu.appendChild(opt);
    });

  const saved = localStorage.getItem("nova_lang");
  if (saved) currentLang = saved;

  const found = languages.find((l) => l.code === currentLang);
  langLabel.textContent = found ? found.label : "English";
}

buildLanguageMenu();

langSelector.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
  langMenu.classList.remove("show");
});

// ================= PERFIL =================
/* --- tu bloque de perfil sin cambios --- */

// ================= RECORDATORIOS =================
/* --- tu bloque de recordatorios sin cambios --- */

// ================= RELOJ LOCAL =================

const timerDisplay = document.getElementById("timer-display");

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  timerDisplay.textContent = `${hh}:${mm}:${ss}`;
}

updateClock();
setInterval(updateClock, 1000);

// ================= CHAT MÉDICO =================

// (todo lo tuyo igual pero con estas 3 correcciones):

// 1) hora del bot
// dentro de createBotMessageBubble reemplazaste:
timeEl.textContent = `${hh}:${mm}`;

// 2) hora del usuario
// dentro de createUserMessageBubble reemplazaste:
timeEl.textContent = `${hh}:${mm}`;

// 3) regex corregido:
const regex = new RegExp(`\\b${wrong}\\b`, "gi");

// 4) mensaje final corregido:
const msg =
  `${t("diagnosisIntro")} ${name} ` +
  ` (Confianza aproximada: ${result.confidence}%)\n\n` +
  `${t("naturalTitle")}\n${naturalLines}\n\n` +
  `${t("pharmaTitle")}\n${pharmaText}\n\n` +
  `${t("specialistTitle")} ${specialist}.\n\n` +
  `${t("centerTitle")}\n` +
  `- Centro de salud cercano en: ${currentCity}.\n\n` +
  t("summaryFooter");

// 5) final correcto
conversationStep = "start";
