
"use strict";

const questions = [
  {
    category: "USO RESPONSÁVEL",
    question: "Qual é uma forma responsável de usar a IA nos estudos?",
    options: [
      "Copiar tudo sem ler.",
      "Pedir explicações e verificar as informações.",
      "Acreditar em qualquer resposta."
    ],
    correct: 1,
    explanation: "A IA pode ajudar a explicar conteúdos, mas é importante verificar as informações e compreender o que foi aprendido."
  },
  {
    category: "PENSAMENTO CRÍTICO",
    question: "A IA apresentou um dado que você nunca viu antes. O que fazer?",
    options: [
      "Conferir o dado em fontes confiáveis.",
      "Compartilhar imediatamente.",
      "Considerar o dado verdadeiro porque foi gerado pela IA."
    ],
    correct: 0,
    explanation: "Sistemas de IA podem cometer erros. Comparar informações e consultar fontes confiáveis ajuda a identificar possíveis problemas."
  },
  {
    category: "ÉTICA ESCOLAR",
    question: "Qual atitude demonstra honestidade acadêmica ao usar IA?",
    options: [
      "Entregar um texto gerado por IA como se fosse inteiramente seu.",
      "Usar IA para aprender e seguir as regras de autoria e citação da escola.",
      "Pedir à IA para inventar fontes bibliográficas."
    ],
    correct: 1,
    explanation: "É importante respeitar as orientações do professor, reconhecer a ajuda recebida quando necessário e não apresentar informações inventadas."
  },
  {
    category: "PRIVACIDADE",
    question: "Uma ferramenta pede sua senha e seus dados pessoais para responder a uma atividade. Qual é a melhor atitude?",
    options: [
      "Enviar tudo para receber uma resposta mais rápida.",
      "Usar os dados de outra pessoa.",
      "Não compartilhar os dados e procurar orientação."
    ],
    correct: 2,
    explanation: "Senhas e dados pessoais devem ser protegidos. Verifique se a ferramenta é apropriada e peça orientação a um professor ou responsável."
  },
  {
    category: "APRENDIZAGEM",
    question: "Qual é o melhor papel da IA no processo de aprendizagem?",
    options: [
      "Substituir todo o esforço de estudar.",
      "Ajudar a explorar ideias, praticar e compreender conteúdos.",
      "Decidir sozinha tudo o que o estudante precisa aprender."
    ],
    correct: 1,
    explanation: "A IA pode apoiar o estudo, mas a curiosidade, a prática, a análise crítica e a participação do estudante continuam essenciais."
  }
];

const questionElement = document.getElementById("quiz-question");
const optionsElement = document.getElementById("quiz-options");
const categoryElement = document.getElementById("quiz-category");
const counterElement = document.getElementById("quiz-counter");
const progressElement = document.getElementById("quiz-progress-bar");
const feedbackElement = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("next-question");
const contentElement = document.getElementById("quiz-content");
const resultElement = document.getElementById("quiz-result");
const retryButton = document.getElementById("retry-quiz");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];

  answered = false;
  categoryElement.textContent = question.category;
  counterElement.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

  questionElement.textContent = question.question;
  progressElement.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  feedbackElement.hidden = true;
  feedbackElement.replaceChildren();
  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver meu resultado →"
      : "Próxima pergunta →";

  optionsElement.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";

    const letter = document.createElement("span");
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option;

    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index));

    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const buttons = [...optionsElement.querySelectorAll(".quiz-option")];
  const isCorrect = selectedIndex === question.correct;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
  }

  feedbackElement.hidden = false;
  feedbackElement.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = isCorrect
    ? "✓ Muito bem! Resposta correta."
    : "Vamos aprender com essa resposta.";

  const explanation = document.createElement("span");
  explanation.textContent = question.explanation;

  feedbackElement.append(heading, explanation);
  nextButton.disabled = false;
}

function showResult() {
  contentElement.hidden = true;
  resultElement.hidden = false;

  progressElement.style.width = "100%";
  counterElement.textContent = `${questions.length} / ${questions.length}`;
  categoryElement.textContent = "RESULTADO FINAL";

  document.getElementById("result-score").textContent =
    `${score}/${questions.length}`;

  const title = document.getElementById("result-title");
  const text = document.getElementById("result-text");
  const icon = document.getElementById("result-icon");

  if (score === 5) {
    title.textContent = "Excelente reflexão!";
    text.textContent =
      "Você demonstrou um ótimo entendimento sobre o uso consciente da IA na escola. Continue verificando informações, protegendo seus dados e pensando criticamente.";
    icon.textContent = "✦";
  } else if (score >= 3) {
    title.textContent = "Você está no caminho certo!";
    text.textContent =
      "Você já conhece pontos importantes sobre a IA. Releia as explicações e continue praticando para aprofundar seu conhecimento.";
    icon.textContent = "◇";
  } else {
    title.textContent = "Uma nova oportunidade de aprender!";
    text.textContent =
      "Errar faz parte do aprendizado. Explore novamente as seções do projeto e refaça o quiz para conhecer melhor os cuidados necessários ao usar IA.";
    icon.textContent = "✧";
  }

  resultElement.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

retryButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;

  resultElement.hidden = true;
  contentElement.hidden = false;

  renderQuestion();

  document.getElementById("quiz").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

renderQuestion();
