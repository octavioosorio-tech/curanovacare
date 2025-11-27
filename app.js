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
  if (
    linkGoRegister &&
    linkGoLogin &&
    loginForm &&
    registerForm &&
    authTitle &&
    authSwitchText
  ) {
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

  // LOGIN: solo guardamos el email y usamos el username ya guardado (si existe)
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email")?.value.trim() || "";
      if (!email) {
        alert("Please write your email.");
        return;
      }

      // Si no hay username guardado, usamos NovaUser
      const existingUser =
        localStorage.getItem("cura_username") || "NovaUser";

      localStorage.setItem("cura_email", email);
      localStorage.setItem("cura_username", existingUser);

      // Ir al chatbot
      window.location.href = "nova.html";
    });
  }

  // REGISTER: guardamos username + email y vamos al chatbot
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

      // Ir al chatbot
      window.location.href = "nova.html";
    });
  }
});

// ================= IDIOMA ACTUAL Y TEXTOS =================

// idioma actual por defecto inglés, o el último guardado
let currentLang = localStorage.getItem("nova_lang") || "en";

const texts = {
  es: {
    greetingFirst: "Hola, soy Nova. ¿Cómo te sientes el día de hoy?",
    greetingShort:
      "Cuéntame cómo te sientes hoy. Dame tus síntomas para poder ayudarte.",
    askSymptoms:
      "Dame tus síntomas para poder darte un diagnóstico probable.\n" +
      "Por favor sepáralos con comas. Ejemplo: fiebre, dolor de estómago, dolor de cabeza.\n" +
      "Mientras más síntomas des, más preciso puede ser el resultado.",
    moreSymptoms:
      "¿Tienes más síntomas o eso es todo?\n" +
      "Puedes responder “eso es todo” o escribir síntomas adicionales.",
    invalidAge:
      "Por favor indica tu edad en años usando solo números. Ejemplo: 15",
    askAge:
      "Entendido. ¿Cuántos años tienes? (no guardaré tu edad, es solo para esta consulta)",
    askWeight:
      "¿Cuánto pesas aproximadamente en kilos? (tampoco se guardará, es solo para esta consulta)",
    invalidWeight:
      "Por favor indica tu peso en kilos usando solo números. Ejemplo: 60",
    askAllergies:
      "¿Tienes alguna alergia a medicamentos? (por ejemplo, paracetamol, ibuprofeno, antibióticos).\n" +
      "Si no tienes, puedes responder: “no tengo alergias” o “ninguna”.",
    askCity:
      "¿En qué ciudad y país te encuentras ahora?\nEjemplo: Villa Alemana, Chile.",
    remindCommas:
      "Si vas a indicar varios síntomas, por favor sepáralos con comas. Ejemplo: fiebre, dolor de estómago, dolor de cabeza.",
    emergency:
      "Tus síntomas pueden ser signos de una URGENCIA MÉDICA.\n\n" +
      "No puedo darte un diagnóstico desde aquí.\n" +
      "Debes acudir de inmediato a un servicio de urgencias o llamar al número de emergencias de tu país.\n\n" +
      "Esta app no reemplaza atención médica profesional.",
    unknownDiagnosis:
      "Con la información que entregaste no puedo sugerir un cuadro específico.\n\n" +
      "Te recomiendo consultar directamente con un profesional de salud.\n\n" +
      "Esta app es solo orientativa y no reemplaza atención médica profesional.",
    newEval:
      "Si quieres otra evaluación, cuéntame nuevamente cómo te sientes.",
    summaryFooter:
      "Esta app no reemplaza atención médica profesional.\n" +
      "Si tus síntomas empeoran o aparecen signos de alarma, acude a urgencias de inmediato.\n\n" +
      "Nos vemos. Cuando te sientas mal, solo háblame de nuevo.",
    diagnosisIntro: "Diagnóstico probable:",
    naturalTitle: "Tratamiento natural sugerido:",
    pharmaTitle: "Tratamiento farmacológico de venta libre (general):",
    specialistTitle: "Especialista recomendado:",
    centerTitle: "Centro de salud recomendado:"
  },
  en: {
    greetingFirst: "Hi, I'm Nova. How are you feeling today?",
    greetingShort:
      "Tell me how you are feeling today. Give me your symptoms so I can help you.",
    askSymptoms:
      "Tell me your symptoms so I can give you a probable diagnosis.\n" +
      "Please separate them with commas. Example: fever, stomach pain, headache.\n" +
      "The more symptoms you give, the more precise the result can be.",
    moreSymptoms:
      "Do you have any other symptoms or is that all?\n" +
      "You can answer “that’s all” or write additional symptoms.",
    invalidAge:
      "Please write your age in years using only numbers. Example: 15",
    askAge:
      "Got it. How old are you? (I will not store your age, it is only for this consultation)",
    askWeight:
      "How much do you weigh approximately in kilograms? (I will not store it either, it is only for this consultation)",
    invalidWeight:
      "Please write your weight in kilograms using only numbers. Example: 60",
    askAllergies:
      "Do you have any allergy to medicines? (for example paracetamol, ibuprofen, antibiotics).\n" +
      "If you don’t, you can answer: “no allergies” or “none”.",
    askCity:
      "In which city and country are you right now?\nExample: Villa Alemana, Chile.",
    remindCommas:
      "If you want to indicate several symptoms, please separate them with commas. Example: fever, stomach pain, headache.",
    emergency:
      "Your symptoms may be signs of a MEDICAL EMERGENCY.\n\n" +
      "I cannot give you a diagnosis from here.\n" +
      "You must go immediately to an emergency department or call the emergency number in your country.\n\n" +
      "This app does not replace professional medical care.",
    unknownDiagnosis:
      "With the information you provided I cannot suggest a specific condition.\n\n" +
      "I recommend consulting directly with a health professional.\n\n" +
      "This app is only educational and does not replace professional medical care.",
    newEval:
      "If you want another evaluation, tell me again how you are feeling.",
    summaryFooter:
      "This app does not replace professional medical care.\n" +
      "If your symptoms get worse or alarm signs appear, go to an emergency service immediately.\n\n" +
      "See you. Whenever you feel bad, just talk to me again.",
    diagnosisIntro: "Probable diagnosis:",
    naturalTitle: "Suggested natural treatment:",
    pharmaTitle: "Over-the-counter pharmacological treatment (general):",
    specialistTitle: "Recommended specialist:",
    centerTitle: "Recommended health center:"
  },
  pt: {
    greetingFirst: "Olá, eu sou a Nova. Como você está se sentindo hoje?",
    greetingShort:
      "Conte-me como você está se sentindo hoje. Diga seus sintomas para eu poder ajudar.",
    askSymptoms:
      "Diga seus sintomas para que eu possa dar um diagnóstico provável.\n" +
      "Por favor, separe-os com vírgulas. Exemplo: febre, dor de estômago, dor de cabeça.\n" +
      "Quanto mais sintomas você informar, mais preciso pode ser o resultado.",
    moreSymptoms:
      "Você tem mais sintomas ou isso é tudo?\n" +
      "Você pode responder “isso é tudo” ou escrever sintomas adicionais.",
    invalidAge:
      "Por favor, informe sua idade em anos usando apenas números. Exemplo: 15",
    askAge:
      "Entendido. Quantos anos você tem? (sua idade não será armazenada, é apenas para esta consulta)",
    askWeight:
      "Qual é o seu peso aproximado em quilos? (também não será armazenado, é apenas para esta consulta)",
    invalidWeight:
      "Por favor, informe seu peso em quilos usando apenas números. Exemplo: 60",
    askAllergies:
      "Você tem alguma alergia a medicamentos? (por exemplo, paracetamol, ibuprofeno, antibióticos).\n" +
      "Se não tiver, você pode responder: “não tenho alergias” ou “nenhuma”.",
    askCity:
      "Em que cidade e país você está agora?\nExemplo: Vila Alemã, Chile.",
    remindCommas:
      "Se você for indicar vários sintomas, separe-os com vírgulas. Exemplo: febre, dor de estômago, dor de cabeça.",
    emergency:
      "Seus sintomas podem ser sinais de uma EMERGÊNCIA MÉDICA.\n\n" +
      "Não posso dar um diagnóstico a partir daqui.\n" +
      "Você deve procurar imediatamente um serviço de emergência ou ligar para o número de emergência do seu país.\n\n" +
      "Este app não substitui o atendimento médico profissional.",
    unknownDiagnosis:
      "Com as informações fornecidas, não consigo sugerir um quadro específico.\n\n" +
      "Recomendo consultar diretamente um profissional de saúde.\n\n" +
      "Este app é apenas orientativo e não substitui o atendimento médico profissional.",
    newEval:
      "Se você quiser outra avaliação, conte novamente como está se sentindo.",
    summaryFooter:
      "Este app não substitui o atendimento médico profissional.\n" +
      "Se seus sintomas piorarem ou surgirem sinais de alarme, procure imediatamente um serviço de emergência.\n\n" +
      "Até mais. Quando se sentir mal, é só falar comigo de novo.",
    diagnosisIntro: "Diagnóstico provável:",
    naturalTitle: "Tratamento natural sugerido:",
    pharmaTitle: "Tratamento farmacológico de venda livre (geral):",
    specialistTitle: "Especialista recomendado:",
    centerTitle: "Centro de saúde recomendado:"
  },
  fr: {
    greetingFirst: "Bonjour, je suis Nova. Comment te sens-tu aujourd'hui ?",
    greetingShort:
      "Dis-moi comment tu te sens aujourd'hui. Donne-moi tes symptômes pour que je puisse t'aider.",
    askSymptoms:
      "Indique-moi tes symptômes pour que je puisse te donner un diagnostic probable.\n" +
      "Sépare-les avec des virgules. Exemple : fièvre, douleur à l’estomac, mal de tête.\n" +
      "Plus tu donnes de symptômes, plus le résultat peut être précis.",
    moreSymptoms:
      "As-tu d'autres symptômes ou est-ce tout ?\n" +
      "Tu peux répondre « c’est tout » ou écrire d'autres symptômes.",
    invalidAge:
      "Indique ton âge en années en utilisant seulement des chiffres. Exemple : 15",
    askAge:
      "D'accord. Quel âge as-tu ? (je ne garderai pas ton âge, c’est seulement pour cette consultation)",
    askWeight:
      "Quel est ton poids approximatif en kilos ? (je ne le garderai pas non plus, c’est seulement pour cette consultation)",
    invalidWeight:
      "Indique ton poids en kilos en utilisant seulement des chiffres. Exemple : 60",
    askAllergies:
      "As-tu une allergie à certains médicaments ? (par exemple paracétamol, ibuprofène, antibiotiques).\n" +
      "Si tu n’en as pas, tu peux répondre : « aucune allergie » ou « aucune ». ",
    askCity:
      "Dans quelle ville et quel pays es-tu maintenant ?\nExemple : Ville Alemana, Chili.",
    remindCommas:
      "Si tu veux indiquer plusieurs symptômes, sépare-les avec des virgules. Exemple : fièvre, douleur à l’estomac, mal de tête.",
    emergency:
      "Tes symptômes peuvent être des signes d’une URGENCE MÉDICALE.\n\n" +
      "Je ne peux pas te donner un diagnostic d’ici.\n" +
      "Tu dois aller immédiatement aux urgences ou appeler le numéro d’urgence de ton pays.\n\n" +
      "Cette application ne remplace pas un avis médical professionnel.",
    unknownDiagnosis:
      "Avec les informations fournies, je ne peux pas suggérer un problème spécifique.\n\n" +
      "Je te recommande de consulter directement un professionnel de santé.\n\n" +
      "Cette application est seulement informative et ne remplace pas un avis médical professionnel.",
    newEval:
      "Si tu veux une nouvelle évaluation, dis-moi encore comment tu te sens.",
    summaryFooter:
      "Cette application ne remplace pas un avis médical professionnel.\n" +
      "Si tes symptômes s’aggravent ou si des signes d’alerte apparaissent, rends-toi immédiatement aux urgences.\n\n" +
      "À bientôt. Quand tu te sens mal, parle-moi de nouveau.",
    diagnosisIntro: "Diagnostic probable :",
    naturalTitle: "Traitement naturel suggéré :",
    pharmaTitle: "Traitement médicamenteux en vente libre (général) :",
    specialistTitle: "Spécialiste recommandé :",
    centerTitle: "Centre de santé recommandé :"
  },
  de: {
    greetingFirst: "Hallo, ich bin Nova. Wie fühlst du dich heute?",
    greetingShort:
      "Erzähl mir, wie du dich heute fühlst. Nenne mir deine Symptome, damit ich dir helfen kann.",
    askSymptoms:
      "Nenne mir deine Symptome, damit ich dir eine wahrscheinliche Einschätzung geben kann.\n" +
      "Bitte trenne sie mit Kommas. Beispiel: Fieber, Bauchschmerzen, Kopfschmerzen.\n" +
      "Je mehr Symptome du angibst, desto genauer kann das Ergebnis sein.",
    moreSymptoms:
      "Hast du noch weitere Symptome oder war das alles?\n" +
      "Du kannst „das ist alles“ antworten oder zusätzliche Symptome schreiben.",
    invalidAge:
      "Bitte gib dein Alter in Jahren nur mit Zahlen an. Beispiel: 15",
    askAge:
      "Verstanden. Wie alt bist du? (dein Alter wird nicht gespeichert, es ist nur für diese Konsultation)",
    askWeight:
      "Wie viel wiegst du ungefähr in Kilogramm? (wird ebenfalls nicht gespeichert, nur für diese Konsultation)",
    invalidWeight:
      "Bitte gib dein Gewicht in Kilogramm nur mit Zahlen an. Beispiel: 60",
    askAllergies:
      "Hast du Allergien gegen bestimmte Medikamente? (z. B. Paracetamol, Ibuprofen, Antibiotika).\n" +
      "Wenn nicht, kannst du antworten: „keine Allergien“ oder „keine“.",
    askCity:
      "In welcher Stadt und in welchem Land befindest du dich gerade?\nBeispiel: Villa Alemana, Chile.",
    remindCommas:
      "Wenn du mehrere Symptome angeben möchtest, trenne sie mit Kommas. Beispiel: Fieber, Bauchschmerzen, Kopfschmerzen.",
    emergency:
      "Deine Symptome können Anzeichen eines MEDIZINISCHEN NOTFALLS sein.\n\n" +
      "Ich kann dir von hier aus keine Diagnose stellen.\n" +
      "Du solltest sofort eine Notaufnahme aufsuchen oder den Notruf in deinem Land wählen.\n\n" +
      "Diese App ersetzt keine professionelle medizinische Versorgung.",
    unknownDiagnosis:
      "Mit den angegebenen Informationen kann ich keine spezifische Erkrankung vorschlagen.\n\n" +
      "Ich empfehle dir, direkt einen Arzt oder eine Ärztin zu konsultieren.\n\n" +
      "Diese App ist nur zur Orientierung und ersetzt keine professionelle medizinische Beratung.",
    newEval:
      "Wenn du eine neue Einschätzung möchtest, sag mir erneut, wie du dich fühlst.",
    summaryFooter:
      "Diese App ersetzt keine professionelle medizinische Versorgung.\n" +
      "Wenn sich deine Symptome verschlimmern oder Warnzeichen auftreten, suche sofort eine Notaufnahme auf.\n\n" +
      "Bis bald. Wenn es dir schlecht geht, sprich einfach wieder mit mir.",
    diagnosisIntro: "Wahrscheinliche Einschätzung:",
    naturalTitle: "Vorgeschlagene natürliche Maßnahmen:",
    pharmaTitle: "Freiverkäufliche medikamentöse Behandlung (allgemein):",
    specialistTitle: "Empfohlener Facharzt:",
    centerTitle: "Empfohlenes Gesundheitszentrum:"
  },
  zh: {
    greetingFirst: "你好，我是 Nova。你今天感觉怎么样？",
    greetingShort:
      "跟我说说你今天的感受吧。把你的症状告诉我，我可以帮你做一个大致判断。",
    askSymptoms:
      "请把你的症状告诉我，这样我可以给出一个可能的诊断。\n" +
      "请用逗号分隔症状。例如：发烧、胃痛、头痛。\n" +
      "你提供的症状越多，结果就可以越接近。",
    moreSymptoms:
      "你还有其他症状吗，还是只有这些？\n" +
      "你可以回答“就这些”或者写下更多症状。",
    invalidAge:
      "请用数字写出你的年龄（岁）。例如：15",
    askAge:
      "好的。你今年几岁？（我不会保存你的年龄，只用于这次判断）",
    askWeight:
      "你大约多少公斤？（同样不会保存，只用于这次判断）",
    invalidWeight:
      "请用数字写出你的体重（公斤）。例如：60",
    askAllergies:
      "你对哪些药物过敏吗？（比如对扑热息痛、布洛芬、抗生素等）。\n" +
      "如果没有，你可以回答：“不过敏”或者“没有过敏”。",
    askCity:
      "你现在所在的城市和国家是哪里？\n例如：Villa Alemana，Chile。",
    remindCommas:
      "如果你要写多个症状，请用逗号分隔。例如：发烧、胃痛、头痛。",
    emergency:
      "你的症状可能是医疗急症的信号。\n\n" +
      "我无法在这里为你做出正式诊断。\n" +
      "你应该立刻前往急诊科，或者拨打你所在国家的急救电话。\n\n" +
      "本应用不能代替专业的医疗诊治。",
    unknownDiagnosis:
      "根据你提供的信息，我无法判断出具体的疾病。\n\n" +
      "建议你尽快咨询专业的医生或医疗机构。\n\n" +
      "本应用仅用于一般性参考，不能代替专业的医疗意见。",
    newEval:
      "如果你需要新的评估，请再次告诉我你现在的感受。",
    summaryFooter:
      "本应用不能代替专业的医疗诊治。\n" +
      "如果你的症状加重或出现危险信号，请立即前往急诊或求助当地急救电话。\n\n" +
      "下次不舒服时，也可以再来找我。",
    diagnosisIntro: "可能的诊断：",
    naturalTitle: "建议的自然调理方式：",
    pharmaTitle: "非处方药物的一般性建议：",
    specialistTitle: "建议就诊的专科医生：",
    centerTitle: "建议前往的医疗机构："
  },
  ja: {
    greetingFirst: "こんにちは、ノヴァです。今日はどんな体調ですか？",
    greetingShort:
      "今日はどんなふうに感じていますか？ 症状を教えてくれれば、お手伝いできます。",
    askSymptoms:
      "症状を教えてください。おおよその診断をお伝えします。\n" +
      "症状はカンマ（ , ）で区切ってください。例： 発熱、胃の痛み、頭痛。\n" +
      "症状が多いほど、結果は少しだけ正確に近づきます。",
    moreSymptoms:
      "ほかに症状はありますか？ それとも以上ですか？\n" +
      "「以上です」と答えるか、追加の症状を書いてください。",
    invalidAge:
      "年齢を数字で入力してください。例：15",
    askAge:
      "わかりました。あなたは何歳ですか？（年齢は保存されず、この相談のみに使われます）",
    askWeight:
      "おおよその体重をキログラムで教えてください。（こちらも保存されません）",
    invalidWeight:
      "体重をキログラム単位で数字だけ入力してください。例：60",
    askAllergies:
      "薬に対するアレルギーはありますか？（例：アセトアミノフェン、イブプロフェン、抗生物質など）\n" +
      "なければ「アレルギーなし」や「特にない」と答えてください。",
    askCity:
      "今どの都市と国にいますか？\n例：Villa Alemana, Chile。",
    remindCommas:
      "複数の症状を書く場合は、カンマで区切ってください。例：発熱、胃の痛み、頭痛。",
    emergency:
      "あなたの症状は医療上の緊急事態の可能性があります。\n\n" +
      "ここから正式な診断を行うことはできません。\n" +
      "すぐに救急外来を受診するか、各国の緊急電話番号に連絡してください。\n\n" +
      "このアプリは医師の診察や専門的な医療を代替するものではありません。",
    unknownDiagnosis:
      "いただいた情報だけでは、特定の病気を判断することができません。\n\n" +
      "できるだけ早く医療機関または医師に相談することをおすすめします。\n\n" +
      "このアプリはあくまで目安であり、専門的な医療判断の代わりにはなりません。",
    newEval:
      "もう一度評価が必要な場合は、あらためて体調を教えてください。",
    summaryFooter:
      "このアプリは医師による診察や専門的な医療行為の代わりにはなりません。\n" +
      "症状が悪化したり、危険な兆候がある場合は、直ちに救急を受診してください。\n\n" +
      "また具合が悪くなったら、いつでも話しかけてください。",
    diagnosisIntro: "考えられる診断：",
    naturalTitle: "推奨される自然な対処法：",
    pharmaTitle: "市販薬に関する一般的なアドバイス：",
    specialistTitle: "受診が望ましい診療科：",
    centerTitle: "受診が望ましい医療機関："
  },
  ko: {
    greetingFirst: "안녕하세요, 저는 노바입니다. 오늘은 기분이 어떠신가요?",
    greetingShort:
      "오늘 몸 상태가 어떤지 말해 주세요. 증상을 알려 주시면 도와드릴 수 있어요.",
    askSymptoms:
      "증상을 알려 주시면 대략적인 추정 진단을 드릴 수 있어요.\n" +
      "증상은 쉼표로 구분해 주세요. 예: 발열, 복통, 두통.\n" +
      "증상을 많이 알려 줄수록 결과가 조금 더 정확해질 수 있습니다.",
    moreSymptoms:
      "다른 증상이 더 있나요, 아니면 이게 전부인가요?\n" +
      "“이게 전부야”라고 답하거나, 추가 증상을 적어 주세요.",
    invalidAge:
      "나이를 숫자로만 입력해 주세요. 예: 15",
    askAge:
      "알겠습니다. 나이가 어떻게 되시나요? (나이는 저장되지 않고, 이번 상담에만 사용됩니다)",
    askWeight:
      "대략 몇 킬로그램인지 알려 주세요. (이 정보도 저장되지 않고, 이번 상담에만 사용됩니다)",
    invalidWeight:
      "몸무게를 킬로그램 단위로 숫자만 입력해 주세요. 예: 60",
    askAllergies:
      "어떤 약에 알레르기가 있으신가요? (예: 파라세타몰, 이부프로펜, 항생제 등)\n" +
      "없다면 “알레르기 없음” 또는 “없음”이라고 답해 주세요.",
    askCity:
      "지금 어느 도시, 어느 나라에 계신가요?\n예: Villa Alemana, Chile.",
    remindCommas:
      "여러 증상을 입력할 때는 쉼표로 구분해 주세요. 예: 발열, 복통, 두통.",
    emergency:
      "현재 증상은 의학적 응급 상황의 신호일 수 있습니다.\n\n" +
      "여기에서 정확한 진단을 드릴 수는 없습니다.\n" +
      "즉시 응급실에 가시거나, 거주 중인 국가의 응급 전화번호로 연락해야 합니다.\n\n" +
      "이 앱은 전문적인 의료 진료를 대신할 수 없습니다.",
    unknownDiagnosis:
      "제공된 정보만으로는 특정 질환을 판단하기 어렵습니다。\n\n" +
      "의료 전문가 또는 병원을 직접 찾아 상담하시길 권장합니다.\n\n" +
      "이 앱은 참고용일 뿐이며, 전문적인 의료 조언을 대체하지 않습니다.",
    newEval:
      "다시 평가받고 싶다면, 현재 상태를 다시 알려 주세요.",
    summaryFooter:
      "이 앱은 전문적인 의료 진료를 대신할 수 없습니다.\n" +
      "증상이 악화되거나 위험 징후가 보이면, 즉시 응급실을 방문하십시오.\n\n" +
      "다시 몸이 안 좋을 때 언제든지 말을 걸어 주세요.",
    diagnosisIntro: "가능한 진단:",
    naturalTitle: "권장되는 자연 요법:",
    pharmaTitle: "일반 의약품에 대한 전반적인 안내:",
    specialistTitle: "권장되는 진료과:",
    centerTitle: "권장되는 의료 기관:"
  }
};

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
  if (!langMenu || !langLabel) return;

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
        resetConversation(); // reinicia chat en el nuevo idioma
      });
      langMenu.appendChild(opt);
    });

  const saved = localStorage.getItem("nova_lang");
  if (saved) {
    currentLang = saved;
  }
  const found = languages.find((l) => l.code === currentLang);
  if (found) {
    langLabel.textContent = found.label;
  } else {
    langLabel.textContent = "English";
    currentLang = "en";
  }
}

buildLanguageMenu();

if (langSelector && langMenu) {
  langSelector.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    langMenu.classList.remove("show");
  });
}

// ================= PERFIL

const modalProfile = document.getElementById("modal-profile-backdrop");
const btnOpenProfile = document.getElementById("btn-open-profile");
const btnProfileCancel = document.getElementById("btn-profile-cancel");
const profileUsernameInput = document.getElementById("profile-username");
const profileEmailInput = document.getElementById("profile-email");
const topbarUsername = document.getElementById("topbar-username");
const btnLogout = document.getElementById("btn-logout");

const savedEmail = localStorage.getItem("cura_email");
const savedUsername = localStorage.getItem("cura_username");

if (savedEmail && profileEmailInput) {
  profileEmailInput.value = savedEmail;
}
if (savedUsername) {
  if (profileUsernameInput) profileUsernameInput.value = savedUsername;
  if (topbarUsername) topbarUsername.textContent = savedUsername;
}

if (btnOpenProfile && modalProfile) {
  btnOpenProfile.addEventListener("click", () => {
    modalProfile.classList.add("show");
  });
}

if (btnProfileCancel && modalProfile) {
  btnProfileCancel.addEventListener("click", () => {
    modalProfile.classList.remove("show");
  });

  modalProfile.addEventListener("click", (e) => {
    if (e.target === modalProfile) modalProfile.classList.remove("show");
  });
}

if (profileUsernameInput && topbarUsername) {
  profileUsernameInput.addEventListener("blur", () => {
    const value = profileUsernameInput.value.trim() || "NovaUser";
    topbarUsername.textContent = value;
    localStorage.setItem("cura_username", value);
  });
}

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    alert(
      "Aquí iría la lógica real de cerrar sesión.\nEn este demo solo es un ejemplo."
    );
  });
}

// ================= ACERCA DE

const modalAbout = document.getElementById("modal-about-backdrop");
const btnOpenAbout = document.getElementById("btn-open-about");
const btnAboutClose = document.getElementById("btn-about-close");

if (btnOpenAbout && modalAbout) {
  btnOpenAbout.addEventListener("click", () => {
    modalAbout.classList.add("show");
  });
}
if (btnAboutClose && modalAbout) {
  btnAboutClose.addEventListener("click", () => {
    modalAbout.classList.remove("show");
  });

  modalAbout.addEventListener("click", (e) => {
    if (e.target === modalAbout) modalAbout.classList.remove("show");
  });
}

// ================= RECORDATORIOS

const modalReminder = document.getElementById("modal-reminder-backdrop");
const btnOpenReminder = document.getElementById("btn-open-reminder");
const btnReminderCancel = document.getElementById("btn-reminder-cancel");
const btnReminderSave = document.getElementById("btn-reminder-save");
const remindersList = document.getElementById("reminders-list");

const reminderTitleInput = document.getElementById("reminder-title");
const reminderDateInput = document.getElementById("reminder-date");
const reminderTimeInput = document.getElementById("reminder-time");

if (
  btnOpenReminder &&
  modalReminder &&
  reminderTitleInput &&
  reminderDateInput &&
  reminderTimeInput &&
  remindersList
) {
  btnOpenReminder.addEventListener("click", () => {
    reminderTitleInput.value = "";
    reminderDateInput.value = "";
    reminderTimeInput.value = "";
    modalReminder.classList.add("show");
    reminderTitleInput.focus();
  });

  function closeReminderModal() {
    modalReminder.classList.remove("show");
  }

  btnReminderCancel.addEventListener("click", closeReminderModal);

  modalReminder.addEventListener("click", (e) => {
    if (e.target === modalReminder) closeReminderModal();
  });

  btnReminderSave.addEventListener("click", () => {
    const title = reminderTitleInput.value.trim();
    const date = reminderDateInput.value;
    const time = reminderTimeInput.value;

    if (!title || !date || !time) {
      alert("Por favor completa nombre, fecha y hora del recordatorio.");
      return;
    }

    const empty = remindersList.querySelector(".reminder-empty");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "reminder-item";

    const titleEl = document.createElement("div");
    titleEl.className = "reminder-title";
    titleEl.textContent = title;

    const metaEl = document.createElement("div");
    metaEl.className = "reminder-meta";
    metaEl.textContent = `${date} • ${time}`;

    item.appendChild(titleEl);
    item.appendChild(metaEl);

    remindersList.appendChild(item);

    closeReminderModal();
  });
}

// ================= RELOJ LOCAL

const timerDisplay = document.getElementById("timer-display");

function updateClock() {
  if (!timerDisplay) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  timerDisplay.textContent = `${hh}:${mm}:${ss}`;
}

updateClock();
setInterval(updateClock, 1000);

// ================= CHAT MÉDICO

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatScroll = document.getElementById("chat-scroll");

let conversationStep = "start"; // start, askSymptoms, moreSymptoms, askAge, askWeight, askAllergies, askCity
let currentSymptoms = [];
let currentAge = null;
let currentWeight = null;
let currentCity = "";
let declaredAllergies = ""; // 🔹 Guardamos lo que diga el usuario sobre alergias

// correcciones simples
const spellingCorrections = {
  fievre: "fiebre",
  fibre: "fiebre",
  estomago: "estómago",
  estomagoo: "estómago",
  guata: "dolor de estómago",
  cabesa: "cabeza",
  dolro: "dolor"
};

function createBotMessageBubble(text, urgent = false) {
  if (!chatScroll) return;

  const row = document.createElement("div");
  row.className = "chat-message-row";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "N";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (urgent) bubble.classList.add("bubble-urgent");

  const textEl = document.createElement("div");
  textEl.className = "bubble-text";
  textEl.textContent = text;

  const timeEl = document.createElement("div");
  timeEl.className = "bubble-time";
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${hh}:${mm}`;

  bubble.appendChild(textEl);
  bubble.appendChild(timeEl);

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatScroll.appendChild(row);

  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function createUserMessageBubble(text) {
  if (!chatScroll) return;

  const row = document.createElement("div");
  row.className = "chat-message-row";
  row.style.justifyContent = "flex-end";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.backgroundColor = "#1d9bf0";
  bubble.style.color = "#ffffff";
  bubble.style.borderRadius = "14px 14px 4px 14px";

  const textEl = document.createElement("div");
  textEl.className = "bubble-text";
  textEl.textContent = text;

  const timeEl = document.createElement("div");
  timeEl.className = "bubble-time";
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${hh}:${mm}`;

  bubble.appendChild(textEl);
  bubble.appendChild(timeEl);
  row.appendChild(bubble);
  chatScroll.appendChild(row);

  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function resetConversation() {
  if (!chatScroll) return;
  chatScroll.innerHTML = "";
  currentSymptoms = [];
  currentAge = null;
  currentWeight = null;
  currentCity = "";
  declaredAllergies = "";

  createBotMessageBubble(t("greetingFirst"));
  conversationStep = "start";
}

// primer saludo
resetConversation();

function parseSymptoms(text) {
  let clean = text.toLowerCase();

  Object.keys(spellingCorrections).forEach((wrong) => {
    const right = spellingCorrections[wrong];
    const regex = new RegExp(`\\b${wrong}\\b`, "gi");
    clean = clean.replace(regex, right);
  });

  const hasComma = clean.includes(",");
  const hasY = /\sy\s/.test(clean);
  if (!hasComma && hasY) {
    createBotMessageBubble(t("remindCommas"));
  }

  return clean
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// reglas demo de condiciones
const conditionRules = [
  {
    id: "gripe",
    name: {
      es: "Gripe o resfrío común",
      en: "Common cold or flu",
      pt: "Gripe ou resfriado comum",
      fr: "Grippe ou rhume",
      de: "Erkältung oder Grippe",
      zh: "感冒或流感",
      ja: "かぜ・インフルエンザの可能性",
      ko: "감기 또는 독감 가능성"
    },
    keywords: [
      "fiebre",
      "fever",
      "tos",
      "cough",
      "dolor de cabeza",
      "headache",
      "dolor muscular",
      "myalgia",
      "congestión",
      "congestion"
    ],
    confidence: 60,
    natural: {
      es: [
        "Descanso en un lugar ventilado.",
        "Hidratación abundante en pequeños sorbos durante el día.",
        "Miel con limón y jengibre si no eres alérgico."
      ],
      en: [
        "Rest in a well-ventilated place.",
        "Drink fluids frequently in small sips during the day.",
        "Honey with lemon and ginger if you are not allergic."
      ],
      pt: [
        "Descansar em um local arejado.",
        "Hidratação abundante em pequenos goles ao longo do dia.",
        "Mel com limão e gengibre se não houver alergia."
      ],
      fr: [
        "Repos dans un endroit bien aéré.",
        "Hydratation fréquente par petites gorgées.",
        "Miel avec citron et gingembre en l’absence d’allergie."
      ],
      de: [
        "Ruhe in einem gut belüfteten Raum.",
        "Häufige Flüssigkeitsaufnahme in kleinen Schlucken.",
        "Honig mit Zitrone und Ingwer, sofern keine Allergie besteht."
      ],
      zh: [
        "在通风良好的地方休息。",
        "一天中多次少量饮水或补液。",
        "如不过敏，可饮用蜂蜜柠檬姜饮。"
      ],
      ja: [
        "風通しの良い場所でゆっくり休む。",
        "一日を通して少量ずつこまめに水分をとる。",
        "アレルギーがなければ、はちみつレモンとショウガの飲み物もよいでしょう。"
      ],
      ko: [
        "통풍이 잘 되는 곳에서 충분히 휴식합니다.",
        "하루 동안 자주, 조금씩 수분을 섭취합니다.",
        "알레르기가 없다면 꿀, 레몬, 생강을 넣은 따뜻한 음료가 도움이 될 수 있습니다."
      ]
    },
    pharma: {
      es: "Se utilizan analgésicos y antipiréticos de venta libre para fiebre y dolor, siempre siguiendo las indicaciones del envase y de un profesional de salud.",
      en: "Over-the-counter pain and fever relievers are used, always following the package instructions and the guidance of a health professional.",
      pt: "Usam-se analgésicos e antitérmicos de venda livre para febre e dor, sempre seguindo a bula e a orientação de um profissional de saúde.",
      fr: "On utilise des antalgiques et antipyrétiques en vente libre pour la fièvre et la douleur, en suivant toujours la notice et l’avis d’un professionnel de santé.",
      de: "Man verwendet freiverkäufliche Schmerz- und Fiebermittel, stets gemäß Packungsbeilage und ärztlicher Empfehlung.",
      zh: "通常会使用非处方的退烧或止痛药，但应严格按照说明书和医生或药师的建议服用。",
      ja: "一般的に市販の解熱鎮痛薬が使われることがありますが、必ず用法・用量と医療従事者의 指示에従ってください。",
      ko: "일반의약품인 해열제·진통제를 사용할 수 있지만, 포장지의 사용법과 의료 전문가의 지시를 반드시 따라야 합니다."
    },
    specialist: {
      es: "Médico general",
      en: "General practitioner",
      pt: "Clínico geral",
      fr: "Médecin généraliste",
      de: "Hausarzt / Allgemeinmediziner",
      zh: "全科医生",
      ja: "一般内科医",
      ko: "가정의 / 일반내과 의사"
    }
  },
  {
    id: "gastro",
    name: {
      es: "Gastroenteritis o irritación digestiva",
      en: "Gastroenteritis or digestive irritation",
      pt: "Gastroenterite ou irritação digestiva",
      fr: "Gastro-entérite ou irritation digestive",
      de: "Gastroenteritis oder Magen-Darm-Reizung",
      zh: "肠胃炎或消化道刺激",
      ja: "胃腸炎または消化器の不調",
      ko: "장염 또는 소화기 자극"
    },
    keywords: [
      "dolor de estómago",
      "diarrea",
      "diarrhea",
      "náuseas",
      "nausea",
      "vomito",
      "vómito",
      "vomiting"
    ],
    confidence: 55,
    natural: {
      es: [
        "Hidratación frecuente (agua o suero oral en pequeños sorbos).",
        "Evitar comidas pesadas, grasosas o muy condimentadas.",
        "Reposo y observación de la evolución de los síntomas."
      ],
      en: [
        "Frequent hydration (water or oral rehydration solution in small sips).",
        "Avoid heavy, greasy or very spicy foods.",
        "Rest and monitor how symptoms evolve."
      ],
      pt: [
        "Hidratação frequente (água ou soro de reidratação oral em pequenos goles).",
        "Evitar comidas pesadas, gordurosas ou muito condimentadas.",
        "Repouso e observação da evolução dos sintomas."
      ],
      fr: [
        "Hydratation fréquente (eau ou solution de réhydratation orale par petites gorgées).",
        "Éviter les aliments lourds, gras ou très épicés.",
        "Repos et surveillance de l’évolution des symptômes."
      ],
      de: [
        "Häufige Flüssigkeitszufuhr (Wasser oder orale Rehydratationslösung in kleinen Schlucken).",
        "Vermeide schwere, fettige oder stark gewürzte Speisen.",
        "Ruhe und Beobachtung des weiteren Verlaufs."
      ],
      zh: [
        "经常少量饮水或口服补液盐。",
        "避免油腻、辛辣和难消化的食物。",
        "注意休息，并观察症状变化。"
      ],
      ja: [
        "水や経口補水液をこまめに少量ずつ飲む。",
        "脂っこい・辛い・消化に悪い食べ物を避ける。",
        "よく休み、症状の変化を観察する。"
      ],
      ko: [
        "물이나 경구 수분 보충제를 자주, 조금씩 마십니다.",
        "기름지거나 자극적인 음식은 피합니다.",
        "충분히 휴식하면서 증상의 변화를 관찰합니다."
      ]
    },
    pharma: {
      es: "En algunos casos se usan sueros de rehidratación oral y medicamentos digestivos de venta libre, siempre consultando a un profesional de salud.",
      en: "In some cases, oral rehydration solutions and over-the-counter digestive medications are used, always under the guidance of a health professional.",
      pt: "Em alguns casos utilizam-se soluções de reidratação oral e medicamentos digestivos de venda livre, sempre com orientação de um profissional de saúde.",
      fr: "Dans certains cas, des solutions de réhydratation orale et des médicaments digestifs en vente libre peuvent être utilizados, toujours avec l’avis d’un professionnel de santé.",
      de: "In einigen Fällen werden orale Rehydratationslösungen und freiverkäufliche Magen-Darm-Medikamente eingesetzt, stets nach Empfehlung eines Gesundheitsprofis.",
      zh: "有时可以在医生或药师建议下使用口服补液盐和一些非处方的消化类药物。",
      ja: "場合によっては、経口補水液や市販の胃腸薬が使われることがありますが、必ず医療専門職や薬剤師의 説明に従ってください。",
      ko: "일부 경우에는 경구 수분 보충제와 일반 소화제 등이 사용될 수 있지만, 반드시 의료 전문가의 지시에 따르는 것이 좋습니다."
    },
    specialist: {
      es: "Médico general o gastroenterólogo",
      en: "General practitioner or gastroenterologist",
      pt: "Clínico geral ou gastroenterologista",
      fr: "Médecin généraliste ou gastro-entérologue",
      de: "Hausarzt oder Gastroenterologe",
      zh: "全科医生或消化科医生",
      ja: "一般内科医または消化器内科医",
      ko: "가정의 또는 소화기내과 전문의"
    }
  },
  {
    id: "alergia",
    name: {
      es: "Alergia leve o rinitis alérgica",
      en: "Mild allergy or allergic rhinitis",
      pt: "Alergia leve ou rinite alérgica",
      fr: "Allergie légère ou rhinite allergique",
      de: "Leichte Allergie oder allergische Rhinitis",
      zh: "轻度过敏或过敏性鼻炎",
      ja: "軽いアレルギーまたはアレルギー性鼻炎",
      ko: "가벼운 알레르기 또는 알레르기성 비염"
    },
    keywords: [
      "estornudos",
      "sneezing",
      "picazón",
      "itching",
      "ojos llorosos",
      "watery eyes",
      "moqueo",
      "runny nose"
    ],
    confidence: 50,
    natural: {
      es: [
        "Evitar el contacto con el posible alérgeno (polvo, polen, mascotas, etc.).",
        "Ventilar y limpiar con frecuencia la habitación y la ropa de cama."
      ],
      en: [
        "Avoid contact with possible allergens (dust, pollen, pets, etc.).",
        "Ventilate and clean your room and bedding frequently."
      ],
      pt: [
        "Evitar contato com o possível alérgeno (poeira, pólen, animais, etc.).",
        "Ventilar e limpar com frequência o quarto e a roupa de cama."
      ],
      fr: [
        "Éviter le contact avec les allergènes possibles (poussière, pollen, animaux, etc.).",
        "Aérer et nettoyer régulièrement la chambre et la literie."
      ],
      de: [
        "Kontakt mit möglichen Allergenen (Staub, Pollen, Haustiere usw.) vermeiden.",
        "Zimmer und Bettwäsche regelmäßig lüften und reinigen."
      ],
      zh: [
        "尽量避免接触可能的过敏原（灰尘、花粉、宠物等）。",
        "经常通风并清洁房间和床上用品。"
      ],
      ja: [
        "ホコリ・花粉・ペットなど、疑わしいアレルゲンとの接触をできるだけ避ける。",
        "部屋や寝具をこまめに換気・掃除する。"
      ],
      ko: [
        "먼지, 꽃가루, 반려동물 등 의심되는 알레르기 유발 물질과의 접촉을 피합니다.",
        "방과 침구를 자주 환기하고 청소합니다."
      ]
    },
    pharma: {
      es: "Suelen utilizarse antihistamínicos de venta libre, siempre según indicación del envase y de un profesional de salud.",
      en: "Over-the-counter antihistamines are often used, always following the package instructions and a health professional’s advice.",
      pt: "Costumam ser utilizados anti-histamínicos de venda livre, sempre seguindo a bula e a orientação de um profissional de saúde.",
      fr: "Des antihistaminiques en vente libre sont souvent utilisés, toujours en suivant la notice et l’avis d’un professionnel de santé.",
      de: "Häufig werden freiverkäufliche Antihistaminika verwendet, stets entsprechend der Packungsbeilage und ärztlicher Empfehlung.",
      zh: "通常会使用非处方抗组胺药，但应严格按照说明书及专业人员建议服用。",
      ja: "一般的に市販の抗ヒスタミン薬가使われることがありますが、必ず用法・用量と医療従事者の指示に従ってください。",
      ko: "일반적으로는 일반의약품인 항히스타민제가 사용되지만, 포장지의 사용법과 의료 전문가의 조언을 반드시 따라야 합니다."
    },
    specialist: {
      es: "Médico general o alergólogo",
      en: "General practitioner or allergist",
      pt: "Clínico geral ou alergologista",
      fr: "Médecin généraliste ou allergologue",
      de: "Hausarzt oder Allergologe",
      zh: "全科医生或过敏专科医生",
      ja: "一般内科医またはアレルギー専門医",
      ko: "가정의 또는 알레르기 전문의"
    }
  },
  {
    id: "muscular",
    name: {
      es: "Dolor muscular o lesión leve",
      en: "Muscular pain or minor injury",
      pt: "Dor muscular ou lesão leve",
      fr: "Douleur musculaire ou blessure légère",
      de: "Muskelschmerzen oder leichte Verletzung",
      zh: "肌肉疼痛或轻微损伤",
      ja: "筋肉痛または軽いけが",
      ko: "근육통 또는 가벼운 부상"
    },
    keywords: [
      "dolor muscular",
      "muscle pain",
      "golpe",
      "torcedura",
      "esguince",
      "sprain",
      "bruise"
    ],
    confidence: 50,
    natural: {
      es: [
        "Reposo de la zona afectada.",
        "Aplicar frío local envuelto en un paño durante intervalos cortos.",
        "Elevar la parte lesionada si es posible."
      ],
      en: [
        "Rest the affected area.",
        "Apply local cold (ice wrapped in a cloth) for short intervals.",
        "Elevate the injured area if possible."
      ],
      pt: [
        "Repousar a área afetada.",
        "Aplicar frio local (gelo envolto em pano) por intervalos curtos.",
        "Elevar a área lesionada, se possível."
      ],
      fr: [
        "Mettre au repos la zone concernée.",
        "Appliquer du froid local (glace dans un linge) par períodos curtos.",
        "Surélever la zone blessée si possible."
      ],
      de: [
        "Die betroffene Körperstelle schonen.",
        "Kälte lokal anwenden (z. B. Eis in einem Tuch) in kurzen Intervallen.",
        "Die verletzte Extremität, wenn möglich, hochlagern."
      ],
      zh: [
        "让受伤部位尽量休息，避免用力。",
        "可使用毛巾包裹的冰袋短时间冷敷。",
        "如果可以，将受伤部位抬高。"
      ],
      ja: [
        "痛みのある部位をできるだけ動かさず安静にする。",
        "タオルで包んだ保冷剤や氷を短時間あてて冷やす。",
        "可能であれば患部を心臓より高く上げておく。"
      ],
      ko: [
        "아픈 부위를 가능한 한 쉬게 합니다.",
        "수건에 싼 얼음팩 등을 짧은 시간 동안 대어 냉찜질합니다.",
        "가능하다면 다친 부위를 심장보다 높게 올려 둡니다."
      ]
    },
    pharma: {
      es: "Pueden utilizarse analgésicos de venta libre para aliviar el dolor, siempre siguiendo las recomendaciones del envase y de un profesional de salud.",
      en: "Over-the-counter pain relievers may be used to ease discomfort, always following the package instructions and a health professional’s advice.",
      pt: "Podem ser usados analgésicos de venda livre para aliviar a dor, sempre seguindo a bula e a orientação de um profissional de saúde.",
      fr: "Des antalgiques en vente libre peuvent être utilisés pour soulager la douleur, en suivant toujours la notice et l’avis d’un professionnel de santé.",
      de: "Zur Linderung der Schmerzen können freiverkäufliche Schmerzmittel eingesetzt werden, immer gemäß Packungsbeilage und ärztlicher Empfehlung.",
      zh: "可在医生或药师建议下使用非处方止痛药缓解疼痛，务必遵循说明书。",
      ja: "痛みを和らげるために市販の鎮痛薬을 사용할 수 있지만, 必ず用法・用量と 医療従事者의 指示に従ってください。",
      ko: "통증 완화를 위해 일반 진통제를 사용할 수 있지만, 포장지의 사용법과 의료 전문가의 지침을 반드시 따라야 합니다."
    },
    specialist: {
      es: "Médico general o traumatólogo",
      en: "General practitioner or orthopedist",
      pt: "Clínico geral ou ortopedista",
      fr: "Médecin généraliste ou traumatologue",
      de: "Hausarzt oder Orthopäde",
      zh: "全科医生或骨科医生",
      ja: "一般内科医または整形外科医",
      ko: "가정의 또는 정형외과 전문의"
    }
  }
];

const emergencyKeywords = [
  "dolor en el pecho",
  "dolor pecho",
  "falta de aire",
  "no puedo respirar",
  "dificultad para respirar",
  "dolor brazo izquierdo",
  "dolor en el brazo izquierdo",
  "cara caída",
  "no puedo hablar bien",
  "debilidad de un lado del cuerpo",
  "desmayo",
  "pérdida de conciencia"
];

function evaluateConditions(symptoms) {
  const allText = symptoms.join(" ");

  if (emergencyKeywords.some((k) => allText.includes(k))) {
    return { type: "emergency" };
  }

  let best = null;
  let bestScore = 0;

  conditionRules.forEach((rule) => {
    let score = 0;
    rule.keywords.forEach((kw) => {
      if (allText.includes(kw)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  });

  if (!best || bestScore === 0) {
    return {
      type: "unknown"
    };
  }

  return {
    type: "normal",
    rule: best,
    confidence:
      best.confidence + bestScore * 5 > 90
        ? 90
        : best.confidence + bestScore * 5
  };
}

// =============== TRATAMIENTO FARMACOLÓGICO CON MG + ALERGIAS ===============

function buildPharmaText(ruleId, lang, allergiesText) {
  const a = (allergiesText || "").toLowerCase();
  const allergicToParacetamol =
    /paracetamol|acetaminof[eé]n|acetaminophen/.test(a);
  const allergicToIbuprofen = /ibuprofeno|ibuprofen/.test(a);

  const isES = lang === "es";
  const isEN = lang === "en";

  const ruleObj = conditionRules.find((r) => r.id === ruleId);
  let base =
    ruleObj && ruleObj.pharma && ruleObj.pharma[lang]
      ? ruleObj.pharma[lang]
      : ruleObj && ruleObj.pharma && ruleObj.pharma["en"]
      ? ruleObj.pharma["en"]
      : "";

  if (!isES && !isEN) {
    return base;
  }

  const commonWarningES =
    "⚠ Dosis orientativa para adultos sin enfermedades crónicas, embarazo ni lactancia.\n" +
    "No des estos medicamentos a niños sin indicación pediátrica.\n" +
    "Siempre respeta las instrucciones del envase y, ante dudas, consulta a un profesional de salud.\n" +
    "No los uses si tienes enfermedad hepática, renal, úlcera, sangrado digestivo u otra condición grave.";

  const commonWarningEN =
    "⚠ This dose is an orientative example for adults without chronic diseases, pregnancy or breastfeeding.\n" +
    "Do NOT give these medicines to children without pediatric guidance.\n" +
    "Always follow the package instructions and, if in doubt, ask a health professional.\n" +
    "Do not use them if you have liver or kidney disease, ulcers, GI bleeding or any serious condition.";

  let extra = "";

  // GRIPE / RESFRÍO
  if (ruleId === "gripe") {
    if (isES) {
      if (!allergicToParacetamol) {
        extra +=
          "\n\nEjemplo de pauta habitual en adultos:\n" +
          "- Paracetamol 500–1000 mg VO cada 6–8 horas según necesidad, máximo 3.000 mg al día.\n";
        if (!allergicToIbuprofen) {
          extra +=
            "- Si no puedes usar paracetamol, se suele utilizar ibuprofeno 400 mg VO cada 8 horas, " +
            "máximo 1.200 mg al día, siempre que no tengas antecedentes de úlcera, problemas renales o gástricos.\n";
        } else {
          extra +=
            "- Indicaste alergia a ibuprofeno, así que evita ibuprofeno y otros AINEs.\n";
        }
      } else if (!allergicToIbuprofen) {
        extra +=
          "\n\nIndicaste alergia a paracetamol. Como ejemplo habitual en adultos:\n" +
          "- Ibuprofeno 400 mg VO cada 8 horas, máximo 1.200 mg al día, " +
          "siempre que NO tengas antecedentes de úlcera, problemas renales o gástricos.\n";
      } else {
        extra +=
          "\n\nEn tu caso, indicas alergia a paracetamol e ibuprofeno.\n" +
          "Evita ambos y consulta directamente con un profesional de salud para alternativas seguras.\n";
      }

      extra += "\n" + commonWarningES;
    }

    if (isEN) {
      if (!allergicToParacetamol) {
        extra +=
          "\n\nExample of usual adult dosing:\n" +
          "- Paracetamol/acetaminophen 500–1000 mg PO every 6–8 hours as needed, maximum 3,000 mg per day.\n";
        if (!allergicToIbuprofen) {
          extra +=
            "- If you cannot use paracetamol, adults often use ibuprofen 400 mg PO every 8 hours, " +
            "maximum 1,200 mg per day, only if you have no history of ulcers, kidney or stomach problems.\n";
        } else {
          extra +=
            "- You reported ibuprofen allergy. Avoid ibuprofen and other NSAIDs.\n";
        }
      } else if (!allergicToIbuprofen) {
        extra +=
          "\n\nYou reported paracetamol allergy. As a usual adult example:\n" +
          "- Ibuprofen 400 mg PO every 8 hours, maximum 1,200 mg per day, " +
          "only if you have no history of ulcers, kidney or stomach problems.\n";
      } else {
        extra +=
          "\n\nYou reported allergy to both paracetamol and ibuprofen.\n" +
          "Avoid both and ask a health professional for safe alternatives.\n";
      }

      extra += "\n" + commonWarningEN;
    }
  }

  // GASTROENTERITIS
  if (ruleId === "gastro") {
    if (isES) {
      extra +=
        "\n\nEjemplo habitual en adultos para malestar digestivo leve:\n" +
        "- Suero de rehidratación oral según indicación del envase, en pequeños sorbos frecuentes.\n";
      if (!allergicToParacetamol) {
        extra +=
          "- Para el dolor o la fiebre se suele usar paracetamol 500–1000 mg VO cada 6–8 horas, máximo 3.000 mg al día.\n";
      } else {
        extra +=
          "- Evita paracetamol (alergia indicada). Para el dolor o fiebre consulta con un profesional sobre otras opciones.\n";
      }
      extra += "\n" + commonWarningES;
    }

    if (isEN) {
      extra +=
        "\n\nTypical example in adults for mild digestive discomfort:\n" +
        "- Oral rehydration solution following the package instructions, in small frequent sips.\n";
      if (!allergicToParacetamol) {
        extra +=
          "- For pain or fever, adults often use paracetamol/acetaminophen 500–1000 mg PO every 6–8 hours, maximum 3,000 mg per day.\n";
      } else {
        extra +=
          "- Avoid paracetamol (reported allergy). For pain or fever, ask a professional for safe alternatives.\n";
      }
      extra += "\n" + commonWarningEN;
    }
  }

  // DOLOR MUSCULAR / LESIÓN
  if (ruleId === "muscular") {
    if (isES) {
      if (!allergicToIbuprofen) {
        extra +=
          "\n\nEjemplo habitual en adultos para dolor muscular leve:\n" +
          "- Ibuprofeno 400 mg VO cada 8 horas según necesidad, máximo 1.200 mg al día, " +
          "siempre que no tengas antecedentes de úlcera, problemas renales o gástricos.\n";
      }
      if (!allergicToParacetamol) {
        extra +=
          "- Puedes alternar o usar solo paracetamol 500–1000 mg VO cada 6–8 horas, máximo 3.000 mg al día.\n";
      }
      if (allergicToParacetamol && allergicToIbuprofen) {
        extra +=
          "\nEn tu caso, al tener alergia a paracetamol e ibuprofeno, " +
          "debes consultar con un profesional para que indique un analgésico adecuado.\n";
      }
      extra += "\n" + commonWarningES;
    }

    if (isEN) {
      if (!allergicToIbuprofen) {
        extra +=
          "\n\nExample of usual adult dosing for mild muscular pain:\n" +
          "- Ibuprofen 400 mg PO every 8 hours as needed, maximum 1,200 mg per day, " +
          "if you have no history of ulcers, kidney or stomach problems.\n";
      }
      if (!allergicToParacetamol) {
        extra +=
          "- You can use or alternate with paracetamol/acetaminophen 500–1000 mg PO every 6–8 hours, maximum 3,000 mg per day.\n";
      }
      if (allergicToParacetamol && allergicToIbuprofen) {
        extra +=
          "\nSince you reported allergy to paracetamol and ibuprofen, " +
          "you should ask a health professional for a safe analgesic.\n";
      }
      extra += "\n" + commonWarningEN;
    }
  }

  // ALERGIA / RINITIS
  if (ruleId === "alergia") {
    if (isES) {
      extra +=
        "\n\nEjemplo habitual en adultos para rinitis alérgica leve:\n" +
        "- Loratadina 10 mg VO una vez al día.\n" +
        "- Como alternativa, cetirizina 10 mg VO una vez al día.\n\n" +
        "No tomes varios antihistamínicos orales al mismo tiempo.\n" +
        commonWarningES;
    }

    if (isEN) {
      extra +=
        "\n\nCommon example in adults for mild allergic rhinitis:\n" +
        "- Loratadine 10 mg PO once daily.\n" +
        "- Alternatively, cetirizine 10 mg PO once daily.\n\n" +
        "Do not take several oral antihistamines at the same time.\n" +
        commonWarningEN;
    }
  }

  if (!extra.trim()) {
    return base;
  }

  return base + "\n\n" + extra;
}

// envío

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    createUserMessageBubble(text);
    chatInput.value = "";

    handleConversation(text);
  });
}

function handleConversation(userText) {
  const lower = userText.toLowerCase();

  if (conversationStep === "start") {
    createBotMessageBubble(t("askSymptoms"));
    conversationStep = "askSymptoms";
    return;
  }

  if (conversationStep === "askSymptoms") {
    currentSymptoms = parseSymptoms(userText);
    createBotMessageBubble(t("moreSymptoms"));
    conversationStep = "moreSymptoms";
    return;
  }

  if (conversationStep === "moreSymptoms") {
    if (
      lower.includes("eso es todo") ||
      lower.includes("no tengo más") ||
      lower.includes("no tengo mas") ||
      lower.includes("that’s all") ||
      lower.includes("thats all")
    ) {
      createBotMessageBubble(t("askAge"));
      conversationStep = "askAge";
    } else {
      const extra = parseSymptoms(userText);
      currentSymptoms = currentSymptoms.concat(extra);
      createBotMessageBubble(t("moreSymptoms"));
    }
    return;
  }

  if (conversationStep === "askAge") {
    const age = parseInt(userText, 10);
    if (isNaN(age) || age <= 0 || age > 120) {
      createBotMessageBubble(t("invalidAge"));
      return;
    }
    currentAge = age;
    createBotMessageBubble(t("askWeight"));
    conversationStep = "askWeight";
    return;
  }

  if (conversationStep === "askWeight") {
    const w = parseInt(userText, 10);
    if (isNaN(w) || w <= 0 || w > 300) {
      createBotMessageBubble(t("invalidWeight"));
      return;
    }
    currentWeight = w;

    // Preguntar por alergias
    createBotMessageBubble(t("askAllergies"));
    conversationStep = "askAllergies";
    return;
  }

  if (conversationStep === "askAllergies") {
    declaredAllergies = userText.trim();
    createBotMessageBubble(t("askCity"));
    conversationStep = "askCity";
    return;
  }

  if (conversationStep === "askCity") {
    currentCity = userText.trim();

    const result = evaluateConditions(currentSymptoms);

    if (result.type === "emergency") {
      createBotMessageBubble(t("emergency"), true);
    } else if (result.type === "unknown") {
      createBotMessageBubble(t("unknownDiagnosis"));
    } else {
      const rule = result.rule;
      const lang = texts[currentLang] ? currentLang : "en";

      const name = rule.name[lang] || rule.name["en"];
      const naturalArray = rule.natural[lang] || rule.natural["en"];
      const naturalLines = naturalArray.map((x) => "- " + x).join("\n");
      const pharmaText = buildPharmaText(rule.id, lang, declaredAllergies);
      const specialist = rule.specialist[lang] || rule.specialist["en"];

      const msg =
        `${t("diagnosisIntro")} ${name} (Confianza aproximada: ${result.confidence}% )\n\n` +
        `${t("naturalTitle")}\n${naturalLines}\n\n` +
        `${t("pharmaTitle")}\n${pharmaText}\n\n` +
        `${t("specialistTitle")} ${specialist}.\n\n` +
        `${t("centerTitle")}\n- Centro de salud cercano en: ${currentCity}.\n\n` +
        t("summaryFooter");

      createBotMessageBubble(msg);
    }

    currentSymptoms = [];
    currentAge = null;
    currentWeight = null;
    currentCity = "";
    declaredAllergies = "";
    conversationStep = "start";
    return;
  }

  createBotMessageBubble(t("newEval"));
  conversationStep = "start";
}
