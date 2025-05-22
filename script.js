// Inicialização EmailJS (opcional)
(function () {
  emailjs.init("user_demoKEY"); // Substituir com tua userID real
})();

// Variáveis principais
let currentQuestionIndex = 0;
let faseAtual = 1;
let respostasPorFase = [];
let resumosFinais = [];

// Seletores de elementos HTML
const titleScreen = document.getElementById("title-screen");
const introScreen = document.getElementById("intro");
const startBtn = document.getElementById("start-btn");
const introStartBtn = document.getElementById("intro-start-btn");

const questionScreen = document.getElementById("question-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

const phaseSummaryScreen = document.getElementById("phase-summary");
const phaseSummaryText = document.getElementById("phase-summary-text");
const nextPhaseBtn = document.getElementById("next-phase-btn");

const resultScreen = document.getElementById("result");
const finalSummaryText = document.getElementById("final-summary-text");

const shareWhatsappBtn = document.getElementById("share-whatsapp");
const copyLinkBtn = document.getElementById("copy-link");
const sendEmailBtn = document.getElementById("send-email");

startBtn.onclick = () => {
  titleScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
};

introStartBtn.onclick = () => {
  introScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
};

nextPhaseBtn.onclick = () => {
  phaseSummaryScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  const questionData = questions[currentQuestionIndex];

  if (!questionData) {
    showFinalSummary();
    return;
  }

  questionEl.textContent = questionData.question;
  answersEl.innerHTML = "";

  questionData.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.onclick = () => handleAnswerClick(answer);
    answersEl.appendChild(button);
  });
}

function handleAnswerClick(answer) {
  respostasPorFase.push(answer);
  currentQuestionIndex++;

  if (currentQuestionIndex % 20 === 0) {
    const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
    resumosFinais.push(resumo);
    phaseSummaryText.textContent = resumo;

    questionScreen.classList.add("hidden");
    phaseSummaryScreen.classList.remove("hidden");

    faseAtual++;
    respostasPorFase = [];
    return;
  }

  showQuestion();
}

function gerarResumoDaFase(fase, respostas) {
  const total = respostas.reduce((acc, cur) => {
    acc[cur.value] = (acc[cur.value] || 0) + 1;
    return acc;
  }, {});

  if (fase === 1) {
    if ((total["emocao"] || 0) >= 10) {
      return `Nesta primeira fase, demonstraste um elevado grau de sensibilidade emocional e ligação profunda ao outro. Mostras uma tendência clara para valorizar gestos subtis, olhares cúmplices e momentos de silêncio com significado. O teu lado afetivo revela-se na maneira como procuras sintonia e segurança emocional antes da entrega física. És alguém que ama com presença e detalhe, alguém que procura mais do que toque: quer ser sentido(a), acolhido(a) e compreendido(a) na alma.`;
    } else {
      return `Revelaste equilíbrio entre emoção e desejo. Ainda que sintas a importância de uma conexão emocional, também dás espaço à leveza, ao jogo e à provocação. Gostas de saber que há entrega, mas também espaço para mistério e desafio. Procuras cumplicidade sem dependência e afetos que fluem com liberdade.`;
    }
  }

  if (fase === 2) {
    if ((total["desejo"] || 0) >= 10) {
      return `Esta fase revelou um desejo intenso, espontâneo e natural. Mostras uma forte atração pela química, pelo toque instintivo e pela energia sexual que flui sem filtros. És alguém que se excita com o momento e deixa o corpo guiar. O impulso e a resposta imediata do desejo parecem ser combustíveis importantes para a tua ligação íntima.`;
    } else {
      return `Apesar de haver desejo, ele está mais controlado, talvez mediado por emoções ou contexto. A tua relação com o prazer é sensível ao ambiente, à ligação emocional e ao sentir do outro. O que te excita não é só o corpo, mas a história por trás do toque.`;
    }
  }

  if (fase === 3) {
    if ((total["curiosidade"] || 0) >= 10) {
      return `Tu tens um espírito explorador. Nesta fase, revelaste que o desconhecido e o que desafia a rotina são fontes de excitação. Fantasias, brincadeiras, jogos psicológicos e provocações não são só bem-vindos — são essenciais. A tua curiosidade transforma a relação num laboratório de descobertas mútuas.`;
    } else {
      return `Gostas de experimentar, mas com cuidado. És alguém que gosta de sair do óbvio, desde que haja confiança. A novidade seduz-te, mas não te domina. Procuras uma relação onde o prazer evolua com o tempo.`;
    }
  }

  if (fase === 4) {
    if ((total["submissao"] || 0) > (total["dominancia"] || 0)) {
      return `Mostras uma clara inclinação para a entrega, para ser guiado(a), explorado(a) e talvez testado(a). Gostas do controlo do outro, da sensação de te deixares levar por ordens, provocações e toques inesperados. Existe prazer na vulnerabilidade, e até na obediência.`;
    } else {
      return `Tens um lado dominante bem presente. O poder de conduzir o momento, ditar regras, provocar reações e dominar o corpo do outro excita-te. A tua energia sexual passa por conquistar, comandar e talvez até marcar território com prazer.`;
    }
  }

  if (fase === 5) {
    if ((total["oral_forte"] || 0) + (total["anal_duro"] || 0) >= 4) {
      return `Tens uma relação direta, crua e intensa com o sexo. O prazer para ti passa pela intensidade do toque, pela profundidade da entrega e pelo jogo sem censura. O corpo inteiro é palco de prazer e não há zona proibida. O sexo é visceral, libertador e profundo.`;
    } else {
      return `Gozas do sexo cru, mas manténs um certo filtro emocional. A entrega existe, mas com ritmo e consentimento constante. As tuas fantasias vão longe, mas queres confiança para vivê-las. O limite não é o corpo, mas a presença.`;
    }
  }

  if (fase === 6) {
    return `Esta fase final revelou o teu desejo por profundidade, cumplicidade e construção a dois. Mais do que prazer, procuras presença emocional. Vês o sexo como uma linguagem de amor, mas também de intimidade psicológica. O teu ideal de relação envolve crescimento mútuo, liberdade com conexão e desejo com verdade.`;
  }

  return "Fase concluída. Segue o teu mergulho.";
}

function showFinalSummary() {
  questionScreen.classList.add("hidden");
  phaseSummaryScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let finalResumo = "Com base nas tuas respostas, criámos um retrato emocional e sexual da tua personalidade:\n\n";

  resumosFinais.forEach((r, i) => {
    finalResumo += `Fase ${i + 1}:\n${r}\n\n`;
  });

  finalResumo += `No total, revelaste uma personalidade que oscila entre entrega emocional e desejo cru. Tens camadas que se cruzam entre o afeto profundo, a exploração ousada e a necessidade de conexão real. O teu percurso sexual e íntimo não é apenas carnal — é emocional, psicológico e muitas vezes espiritual. O teu desejo não é só prazer: é reconhecimento, presença, cumplicidade e descoberta.`;

  finalSummaryText.textContent = finalResumo;
}

const questions = [
  {
    question: "1. O que mais fortalece a nossa ligação?",
    answers: [
      { text: "Olhares demorados", value: "emocao" },
      { text: "Conversas sem pressa", value: "emocao" },
      { text: "Silêncios confortáveis", value: "emocao" },
      { text: "Toques sinceros", value: "emocao" },
      { text: "Pequenos gestos", value: "emocao" }
    ]
  },
  {
    question: "2. Quando te sentes mais ligado(a) a mim?",
    answers: [
      { text: "Ao acordar ao teu lado", value: "emocao" },
      { text: "Durante conversas profundas", value: "emocao" },
      { text: "Quando me abraças forte", value: "emocao" },
      { text: "Ao partilharmos memórias", value: "emocao" },
      { text: "Num olhar em silêncio", value: "emocao" }
    ]
  },
  {
    question: "3. O que te faz sentir seguro(a) comigo?",
    answers: [
      { text: "A tua escuta ativa", value: "emocao" },
      { text: "A forma como me olhas", value: "emocao" },
      { text: "O teu carinho constante", value: "emocao" },
      { text: "A tua presença nos meus dias", value: "emocao" },
      { text: "O teu silêncio que abraça", value: "emocao" }
    ]
  },
  {
    question: "4. Qual o maior sinal de carinho para ti?",
    answers: [
      { text: "Cuidar sem ser pedido", value: "emocao" },
      { text: "Atenção aos detalhes", value: "emocao" },
      { text: "A forma como me tocas", value: "emocao" },
      { text: "A tua paciência comigo", value: "emocao" },
      { text: "Palavras doces ao acaso", value: "emocao" }
    ]
  },
  {
    question: "5. Quando sentes que somos mais unidos?",
    answers: [
      { text: "Durante os momentos difíceis", value: "emocao" },
      { text: "Nos risos espontâneos", value: "emocao" },
      { text: "No silêncio partilhado", value: "emocao" },
      { text: "Quando fazemos planos", value: "emocao" },
      { text: "No toque sutil durante o dia", value: "emocao" }
    ]
  },
  {
    question: "6. Como sabes que é mais do que paixão?",
    answers: [
      { text: "Quando me acalmas", value: "emocao" },
      { text: "Quando confio sem pensar", value: "emocao" },
      { text: "Quando te vejo vulnerável", value: "emocao" },
      { text: "Quando sei que te tenho", value: "emocao" },
      { text: "Quando és meu refúgio", value: "emocao" }
    ]
  },
  {
    question: "7. O que torna o nosso toque diferente?",
    answers: [
      { text: "O tempo que dura", value: "emocao" },
      { text: "A intenção por trás", value: "emocao" },
      { text: "A conexão que cria", value: "emocao" },
      { text: "A segurança que dá", value: "emocao" },
      { text: "A forma como arrepia", value: "emocao" }
    ]
  },
  {
    question: "8. Quando sentes que me pertences?",
    answers: [
      { text: "Quando me olhas sem dizer nada", value: "emocao" },
      { text: "Quando me abraças sem motivo", value: "emocao" },
      { text: "Quando me escutas com o corpo", value: "emocao" },
      { text: "Quando sorris com os olhos", value: "emocao" },
      { text: "Quando dormimos colados", value: "emocao" }
    ]
  },
  {
    question: "9. O que representa um beijo nosso?",
    answers: [
      { text: "Confirmação", value: "emocao" },
      { text: "Entrega", value: "emocao" },
      { text: "Segurança", value: "emocao" },
      { text: "Desejo com sentimento", value: "emocao" },
      { text: "A nossa linguagem", value: "emocao" }
    ]
  },
  {
    question: "10. O que te faz voltar sempre a mim?",
    answers: [
      { text: "A forma como me completas", value: "emocao" },
      { text: "O teu cuidado", value: "emocao" },
      { text: "A tua entrega emocional", value: "emocao" },
      { text: "A tua escuta sem julgamento", value: "emocao" },
      { text: "O amor silencioso", value: "emocao" }
    ]
  },
  {
    question: "11. O que procuras no nosso amor?",
    answers: [
      { text: "Paz e intensidade", value: "emocao" },
      { text: "Presença constante", value: "emocao" },
      { text: "Crescimento mútuo", value: "emocao" },
      { text: "Respeito e desejo", value: "emocao" },
      { text: "Amor que aquece", value: "emocao" }
    ]
  },
  {
    question: "12. O que é mais importante no sexo para ti?",
    answers: [
      { text: "Conexão emocional", value: "emocao" },
      { text: "Olhares verdadeiros", value: "emocao" },
      { text: "Ritmo e respiração", value: "emocao" },
      { text: "Segurança para me entregar", value: "emocao" },
      { text: "Sintonia além do corpo", value: "emocao" }
    ]
  },
  {
    question: "13. Quando sentes que te amo?",
    answers: [
      { text: "Em cada toque cuidadoso", value: "emocao" },
      { text: "Na forma como te escuto", value: "emocao" },
      { text: "Na minha paciência contigo", value: "emocao" },
      { text: "No respeito pelas tuas dores", value: "emocao" },
      { text: "No meu silêncio que acolhe", value: "emocao" }
    ]
  },
  {
    question: "14. Como sentes o nosso silêncio?",
    answers: [
      { text: "Como conforto", value: "emocao" },
      { text: "Como presença real", value: "emocao" },
      { text: "Como linguagem própria", value: "emocao" },
      { text: "Como união sem palavras", value: "emocao" },
      { text: "Como aconchego", value: "emocao" }
    ]
  },
  {
    question: "15. Quando sabes que estamos bem?",
    answers: [
      { text: "Quando sorrimos sem razão", value: "emocao" },
      { text: "Quando nos ouvimos", value: "emocao" },
      { text: "Quando respiramos juntos", value: "emocao" },
      { text: "Quando me olhas calado(a)", value: "emocao" },
      { text: "Quando me tocas com intenção", value: "emocao" }
    ]
  },
  {
    question: "16. O que torna a nossa relação única?",
    answers: [
      { text: "A verdade entre nós", value: "emocao" },
      { text: "A nossa história", value: "emocao" },
      { text: "A profundidade do amor", value: "emocao" },
      { text: "A sintonia nos detalhes", value: "emocao" },
      { text: "A conexão além do físico", value: "emocao" }
    ]
  },
  {
    question: "17. Qual é o nosso maior gesto de amor?",
    answers: [
      { text: "Estar presente", value: "emocao" },
      { text: "Olhar com ternura", value: "emocao" },
      { text: "Cuidar em silêncio", value: "emocao" },
      { text: "Tocar com intenção", value: "emocao" },
      { text: "Ficar mesmo quando é difícil", value: "emocao" }
    ]
  },
  {
    question: "18. Que memória mais te toca?",
    answers: [
      { text: "Nosso primeiro olhar", value: "emocao" },
      { text: "A primeira vez que choraste comigo", value: "emocao" },
      { text: "A forma como me abraçaste", value: "emocao" },
      { text: "As palavras que não disseste", value: "emocao" },
      { text: "O silêncio cheio de amor", value: "emocao" }
    ]
  },
  {
    question: "19. Que parte de mim mais te prende?",
    answers: [
      { text: "A alma", value: "emocao" },
      { text: "O olhar", value: "emocao" },
      { text: "O cuidado", value: "emocao" },
      { text: "A escuta", value: "emocao" },
      { text: "A entrega", value: "emocao" }
    ]
  },
  {
    question: "20. Se me perdesses, o que mais sentirias falta?",
    answers: [
      { text: "Do teu toque emocional", value: "emocao" },
      { text: "Da tua presença sem ruído", value: "emocao" },
      { text: "Do teu silêncio que me lê", value: "emocao" },
      { text: "Da tua entrega", value: "emocao" },
      { text: "Do teu abraço sem pressa", value: "emocao" }
    ]
  },
  {
    question: "21. Quando sentes desejo de mim do nada?",
    answers: [
      { text: "Ao lembrar do teu cheiro", value: "desejo" },
      { text: "Quando vejo a tua boca", value: "desejo" },
      { text: "Ao ouvir a tua voz baixa", value: "desejo" },
      { text: "Quando me tocas mesmo sem intenção", value: "desejo" },
      { text: "Ao imaginar o teu toque", value: "desejo" }
    ]
  },
  {
    question: "22. O que desperta teu corpo primeiro?",
    answers: [
      { text: "O beijo profundo", value: "desejo" },
      { text: "Um olhar provocador", value: "desejo" },
      { text: "Palavras sussurradas", value: "desejo" },
      { text: "Um toque no lugar certo", value: "desejo" },
      { text: "A tua respiração perto", value: "desejo" }
    ]
  },
  {
    question: "23. Onde gostas de ser provocado(a)?",
    answers: [
      { text: "No pescoço", value: "desejo" },
      { text: "Na nuca", value: "desejo" },
      { text: "Na parte interna das coxas", value: "desejo" },
      { text: "Nos ouvidos", value: "desejo" },
      { text: "Com o olhar à distância", value: "desejo" }
    ]
  },
  {
    question: "24. Quando te entregas mais ao prazer?",
    answers: [
      { text: "Quando estou em silêncio", value: "desejo" },
      { text: "Quando te sinto rendido(a)", value: "desejo" },
      { text: "Quando há urgência", value: "desejo" },
      { text: "Quando o corpo domina a razão", value: "desejo" },
      { text: "Quando não sei o que vem a seguir", value: "desejo" }
    ]
  },
  {
    question: "25. Qual é o toque mais excitante?",
    answers: [
      { text: "O que não espero", value: "desejo" },
      { text: "O que começa leve e intensifica", value: "desejo" },
      { text: "O que vem com olhar", value: "desejo" },
      { text: "O que me prende e provoca", value: "desejo" },
      { text: "O que me faz perder o foco", value: "desejo" }
    ]
  },
  {
    question: "26. Qual parte do teu corpo mais deseja?",
    answers: [
      { text: "A boca", value: "desejo" },
      { text: "As mãos", value: "desejo" },
      { text: "A pele que arrepia", value: "desejo" },
      { text: "Os quadris", value: "desejo" },
      { text: "O coração que dispara", value: "desejo" }
    ]
  },
  {
    question: "27. O que não pode faltar no sexo contigo?",
    answers: [
      { text: "Beijos longos", value: "desejo" },
      { text: "Mãos exploradoras", value: "desejo" },
      { text: "Toques ousados", value: "desejo" },
      { text: "Gemidos contidos", value: "desejo" },
      { text: "Olhos nos olhos", value: "desejo" }
    ]
  },
  {
    question: "28. O que faz o teu corpo estremecer?",
    answers: [
      { text: "Quando tocas onde mais desejo", value: "desejo" },
      { text: "Quando me agarras com força", value: "desejo" },
      { text: "Quando és firme no prazer", value: "desejo" },
      { text: "Quando me surpreendes", value: "desejo" },
      { text: "Quando me dizes que me queres", value: "desejo" }
    ]
  },
  {
    question: "29. Como te sentes quando o prazer cresce?",
    answers: [
      { text: "Fora de mim", value: "desejo" },
      { text: "Como se o tempo parasse", value: "desejo" },
      { text: "Com fome de mais", value: "desejo" },
      { text: "Em estado bruto", value: "desejo" },
      { text: "Com medo de gozar cedo", value: "desejo" }
    ]
  },
  {
    question: "30. Qual dessas cenas mais te excita?",
    answers: [
      { text: "Sexo de pé contra a parede", value: "desejo" },
      { text: "Sexo oral intenso", value: "desejo" },
      { text: "Ser agarrado(a) com força", value: "desejo" },
      { text: "Gemidos no ouvido", value: "desejo" },
      { text: "Olhos fechados a sentir tudo", value: "desejo" }
    ]
  },
  {
    question: "31. Quando te deixas levar sem pensar?",
    answers: [
      { text: "Quando sinto teu cheiro", value: "desejo" },
      { text: "Quando sussurras no meu ouvido", value: "desejo" },
      { text: "Quando roças em mim com intenção", value: "desejo" },
      { text: "Quando és firme e provocante", value: "desejo" },
      { text: "Quando sinto tua mão segurar forte", value: "desejo" }
    ]
  },
  {
    question: "32. Qual posição te tira do eixo?",
    answers: [
      { text: "De quatro", value: "desejo" },
      { text: "Por cima a dominar", value: "desejo" },
      { text: "De lado com suspiros", value: "desejo" },
      { text: "De frente com beijo", value: "desejo" },
      { text: "No escuro sem planejar", value: "desejo" }
    ]
  },
  {
    question: "33. Quando sentes que és mais desejado(a)?",
    answers: [
      { text: "Quando toco e sorris", value: "desejo" },
      { text: "Quando gemes meu nome", value: "desejo" },
      { text: "Quando gozas em mim", value: "desejo" },
      { text: "Quando me pedes mais", value: "desejo" },
      { text: "Quando teus olhos me devoram", value: "desejo" }
    ]
  },
  {
    question: "34. O que mais gostas de ouvir no sexo?",
    answers: [
      { text: "Gemidos soltos", value: "desejo" },
      { text: "Palavrões de prazer", value: "desejo" },
      { text: "Teu nome sendo dito", value: "desejo" },
      { text: "Respiração acelerada", value: "desejo" },
      { text: "Confissões picantes", value: "desejo" }
    ]
  },
  {
    question: "35. Qual destas sensações te define no prazer?",
    answers: [
      { text: "Pressa em te ter", value: "desejo" },
      { text: "Sede de sentir tudo", value: "desejo" },
      { text: "Fome de prazer", value: "desejo" },
      { text: "Vontade de dominar", value: "desejo" },
      { text: "Desejo de te ver rendido(a)", value: "desejo" }
    ]
  },
  {
    question: "36. Qual das situações te excita mais?",
    answers: [
      { text: "Sexo no carro", value: "desejo" },
      { text: "Sexo escondido", value: "desejo" },
      { text: "Sexo com espelhos", value: "desejo" },
      { text: "Sexo após briga", value: "desejo" },
      { text: "Sexo proibido", value: "desejo" }
    ]
  },
  {
    question: "37. Como sabes que estás no teu auge de tesão?",
    answers: [
      { text: "Quando perco o controlo", value: "desejo" },
      { text: "Quando grito ou mordo", value: "desejo" },
      { text: "Quando te agarro com força", value: "desejo" },
      { text: "Quando esqueço o mundo", value: "desejo" },
      { text: "Quando sinto que gozo vai ser forte", value: "desejo" }
    ]
  },
  {
    question: "38. Quando o toque vira necessidade?",
    answers: [
      { text: "Quando espero há muito", value: "desejo" },
      { text: "Quando estás quente e perto", value: "desejo" },
      { text: "Quando já não aguento mais", value: "desejo" },
      { text: "Quando o olhar já disse tudo", value: "desejo" },
      { text: "Quando sonho contigo nu(a)", value: "desejo" }
    ]
  },
  {
    question: "39. Qual parte tua pede mais prazer?",
    answers: [
      { text: "A língua", value: "desejo" },
      { text: "Os dedos", value: "desejo" },
      { text: "Os quadris", value: "desejo" },
      { text: "Os seios/nádegas", value: "desejo" },
      { text: "O olhar que provoca", value: "desejo" }
    ]
  },
  {
    question: "40. Quando sentes que teu corpo pede mais?",
    answers: [
      { text: "Quando gozo e quero repetir", value: "desejo" },
      { text: "Quando me perco em ti", value: "desejo" },
      { text: "Quando o prazer vira vício", value: "desejo" },
      { text: "Quando não te quero parar", value: "desejo" },
      { text: "Quando esqueço de mim", value: "desejo" }
    ]
  },
  {
    question: "41. Qual destas fantasias mais te intriga?",
    answers: [
      { text: "Ser vendado(a) e explorado(a)", value: "curiosidade" },
      { text: "Sexo em público", value: "curiosidade" },
      { text: "Ver-me a tocar", value: "curiosidade" },
      { text: "Partilhar fantasias por mensagem", value: "curiosidade" },
      { text: "Usar brinquedos sexuais juntos", value: "curiosidade" }
    ]
  },
  {
    question: "42. Como reagirias se eu te sugerisse algo novo na cama?",
    answers: [
      { text: "Com vontade de tentar", value: "curiosidade" },
      { text: "Com excitação", value: "curiosidade" },
      { text: "Com mente aberta", value: "curiosidade" },
      { text: "Com surpresa boa", value: "curiosidade" },
      { text: "Com um desafio interno", value: "curiosidade" }
    ]
  },
  {
    question: "43. Como te sentes ao falar de fetiches?",
    answers: [
      { text: "Curioso(a)", value: "curiosidade" },
      { text: "Levemente excitado(a)", value: "curiosidade" },
      { text: "Aberto(a) ao tema", value: "curiosidade" },
      { text: "Inseguro(a) mas interessado(a)", value: "curiosidade" },
      { text: "Animado(a) para experimentar", value: "curiosidade" }
    ]
  },
  {
    question: "44. Como seria uma noite diferente contigo?",
    answers: [
      { text: "Com jogos sensuais", value: "curiosidade" },
      { text: "Com troca de papéis", value: "curiosidade" },
      { text: "Com desafios sexuais", value: "curiosidade" },
      { text: "Com provocações inesperadas", value: "curiosidade" },
      { text: "Com planos secretos", value: "curiosidade" }
    ]
  },
  {
    question: "45. Qual destas práticas já pensaste em experimentar?",
    answers: [
      { text: "Roleplay (personagens)", value: "curiosidade" },
      { text: "Vibrador durante o sexo", value: "curiosidade" },
      { text: "Fitas ou vendas", value: "curiosidade" },
      { text: "Sexo em local proibido", value: "curiosidade" },
      { text: "Observar ou ser observado(a)", value: "curiosidade" }
    ]
  },
  {
    question: "46. O que te excita mais numa provocação?",
    answers: [
      { text: "Palavras ousadas", value: "curiosidade" },
      { text: "Olhares fixos", value: "curiosidade" },
      { text: "Movimentos lentos", value: "curiosidade" },
      { text: "Brincadeiras arriscadas", value: "curiosidade" },
      { text: "Risadas no meio do prazer", value: "curiosidade" }
    ]
  },
  {
    question: "47. Qual destas te desafia mais?",
    answers: [
      { text: "Experimentar algo novo", value: "curiosidade" },
      { text: "Falar dos meus desejos", value: "curiosidade" },
      { text: "Propor algo ousado", value: "curiosidade" },
      { text: "Mostrar minha vulnerabilidade", value: "curiosidade" },
      { text: "Despir tabus", value: "curiosidade" }
    ]
  },
  {
    question: "48. Qual frase te excitaria mais?",
    answers: [
      { text: "Hoje mando eu", value: "curiosidade" },
      { text: "Fica quieto(a) e sente", value: "curiosidade" },
      { text: "Não vais saber o que vem", value: "curiosidade" },
      { text: "Quero explorar cada parte tua", value: "curiosidade" },
      { text: "Fecha os olhos e confia", value: "curiosidade" }
    ]
  },
  {
    question: "49. Se fizéssemos algo novo hoje, o que gostarias?",
    answers: [
      { text: "Tocar-te com olhos vendados", value: "curiosidade" },
      { text: "Usar brinquedos novos", value: "curiosidade" },
      { text: "Explorar posições não habituais", value: "curiosidade" },
      { text: "Desafiar a minha zona de conforto", value: "curiosidade" },
      { text: "Tocar-te sem pressa, só para provocar", value: "curiosidade" }
    ]
  },
  {
    question: "50. O que mais mexe com a tua curiosidade sexual?",
    answers: [
      { text: "O que ainda não vivemos", value: "curiosidade" },
      { text: "O que não sei se te agrada", value: "curiosidade" },
      { text: "O que é arriscado", value: "curiosidade" },
      { text: "O que sussurras sem me contar tudo", value: "curiosidade" },
      { text: "O que é segredo só nosso", value: "curiosidade" }
    ]
  },
  {
    question: "51. Qual destas brincadeiras gostarias de tentar?",
    answers: [
      { text: "Amarrar/ser amarrado(a)", value: "curiosidade" },
      { text: "Dominar ou ser dominado(a)", value: "curiosidade" },
      { text: "Usar brinquedos com vibração", value: "curiosidade" },
      { text: "Sexo em local inusitado", value: "curiosidade" },
      { text: "Ver-nos ao espelho", value: "curiosidade" }
    ]
  },
  {
    question: "52. O que mais te instiga no inesperado?",
    answers: [
      { text: "Não saber o que vem", value: "curiosidade" },
      { text: "Ser surpreendido(a)", value: "curiosidade" },
      { text: "O risco", value: "curiosidade" },
      { text: "A entrega", value: "curiosidade" },
      { text: "A tensão entre medo e prazer", value: "curiosidade" }
    ]
  },
  {
    question: "53. Qual dessas cenas gostarias de encenar?",
    answers: [
      { text: "Médico(a) e paciente", value: "curiosidade" },
      { text: "Desconhecidos num hotel", value: "curiosidade" },
      { text: "Polícia e preso(a)", value: "curiosidade" },
      { text: "Chefe e funcionário(a)", value: "curiosidade" },
      { text: "Professor(a) e aluno(a)", value: "curiosidade" }
    ]
  },
  {
    question: "54. Se eu te dissesse 'hoje vais ser meu brinquedo', o que pensavas?",
    answers: [
      { text: "Curiosidade pura", value: "curiosidade" },
      { text: "Excitação imediata", value: "curiosidade" },
      { text: "Desejo de saber mais", value: "curiosidade" },
      { text: "Rendição silenciosa", value: "curiosidade" },
      { text: "Vontade de provocar ainda mais", value: "curiosidade" }
    ]
  },
  {
    question: "55. Com que frequência pensas em explorar novas práticas?",
    answers: [
      { text: "Sempre que posso", value: "curiosidade" },
      { text: "Depende da confiança", value: "curiosidade" },
      { text: "Quando o clima está certo", value: "curiosidade" },
      { text: "Quando sinto que estás disponível", value: "curiosidade" },
      { text: "Quase sempre — em segredo", value: "curiosidade" }
    ]
  },
  {
    question: "56. O que mais gostavas de ouvir de mim numa noite ousada?",
    answers: [
      { text: "Hoje vais obedecer", value: "curiosidade" },
      { text: "Não vais saber o que te espera", value: "curiosidade" },
      { text: "Quero que sintas tudo", value: "curiosidade" },
      { text: "És só meu/minha esta noite", value: "curiosidade" },
      { text: "Fecha os olhos e goza", value: "curiosidade" }
    ]
  },
  {
    question: "57. Qual destas situações te deixa mais exposto(a)?",
    answers: [
      { text: "Ser despido(a) lentamente", value: "curiosidade" },
      { text: "Ficar à mercê do teu toque", value: "curiosidade" },
      { text: "Te contar uma fantasia", value: "curiosidade" },
      { text: "Ser observado(a) enquanto me tocas", value: "curiosidade" },
      { text: "Ficar imóvel enquanto me dominas", value: "curiosidade" }
    ]
  },
  {
    question: "58. O que te prende numa experiência nova?",
    answers: [
      { text: "O mistério", value: "curiosidade" },
      { text: "A entrega do outro", value: "curiosidade" },
      { text: "O jogo psicológico", value: "curiosidade" },
      { text: "O não saber o que vem", value: "curiosidade" },
      { text: "O prazer em cada risco", value: "curiosidade" }
    ]
  },
  {
    question: "59. Qual dessas sensações te excita mais?",
    answers: [
      { text: "A antecipação", value: "curiosidade" },
      { text: "O suspense do toque", value: "curiosidade" },
      { text: "O medo misturado com prazer", value: "curiosidade" },
      { text: "A surpresa de cada gesto", value: "curiosidade" },
      { text: "A entrega sem saber o fim", value: "curiosidade" }
    ]
  },
  {
    question: "60. Se tivéssemos uma noite sem limites, o que experimentarias?",
    answers: [
      { text: "Algo que nunca confessei", value: "curiosidade" },
      { text: "Tudo o que o corpo aguentar", value: "curiosidade" },
      { text: "Uma nova versão de nós", value: "curiosidade" },
      { text: "Prazer sem pudor", value: "curiosidade" },
      { text: "Um mergulho sem volta", value: "curiosidade" }
    ]
  },
  {
    question: "61. O que sentes ao obedecer no sexo?",
    answers: [
      { text: "Entrego-me totalmente", value: "submissao" },
      { text: "Sinto-me liberto(a)", value: "submissao" },
      { text: "É excitante ser guiado(a)", value: "submissao" },
      { text: "Perco o controlo com prazer", value: "submissao" },
      { text: "É um jogo intenso", value: "submissao" }
    ]
  },
  {
    question: "62. O que te excita mais ao dominar?",
    answers: [
      { text: "Conduzir o ritmo", value: "dominancia" },
      { text: "Dar ordens e ser seguido(a)", value: "dominancia" },
      { text: "Ver o outro render-se", value: "dominancia" },
      { text: "Explorar limites", value: "dominancia" },
      { text: "Ser temido(a) e desejado(a)", value: "dominancia" }
    ]
  },
  {
    question: "63. O que te faz sentir submisso(a)?",
    answers: [
      { text: "Quando sou imobilizado(a)", value: "submissao" },
      { text: "Quando és firme comigo", value: "submissao" },
      { text: "Quando me proíbes de tocar", value: "submissao" },
      { text: "Quando ordenas com voz baixa", value: "submissao" },
      { text: "Quando não sei o que vem", value: "submissao" }
    ]
  },
  {
    question: "64. Que tipo de ordens te excita ouvir?",
    answers: [
      { text: "Tira a roupa, agora", value: "submissao" },
      { text: "Fica de joelhos", value: "submissao" },
      { text: "Não te mexas", value: "submissao" },
      { text: "Grita meu nome", value: "submissao" },
      { text: "Sente sem pensar", value: "submissao" }
    ]
  },
  {
    question: "65. O que gostas de controlar?",
    answers: [
      { text: "O ritmo do prazer", value: "dominancia" },
      { text: "As palavras ditas", value: "dominancia" },
      { text: "A posição do outro", value: "dominancia" },
      { text: "Os sons que ele(a) faz", value: "dominancia" },
      { text: "Tudo — até quando goza", value: "dominancia" }
    ]
  },
  {
    question: "66. O que te excita num olhar submisso?",
    answers: [
      { text: "Ver rendição total", value: "dominancia" },
      { text: "Ver desejo sem resistência", value: "dominancia" },
      { text: "Ver que esperas por mim", value: "dominancia" },
      { text: "Ver que te entregas", value: "dominancia" },
      { text: "Ver que não reages sem ordem", value: "dominancia" }
    ]
  },
  {
    question: "67. Como te sentes ao ser dominado(a)?",
    answers: [
      { text: "Livre na entrega", value: "submissao" },
      { text: "Mais excitado(a)", value: "submissao" },
      { text: "Desejoso(a) de mais", value: "submissao" },
      { text: "Aquecido(a) por dentro", value: "submissao" },
      { text: "Em transe", value: "submissao" }
    ]
  },
  {
    question: "68. O que mais gostas de mandar fazer?",
    answers: [
      { text: "Despir-se lentamente", value: "dominancia" },
      { text: "Ficar imóvel enquanto toco", value: "dominancia" },
      { text: "Pedir para implorar por mais", value: "dominancia" },
      { text: "Obedecer sem pensar", value: "dominancia" },
      { text: "Beijar onde eu mandar", value: "dominancia" }
    ]
  },
  {
    question: "69. Onde gostas de ser submisso(a)?",
    answers: [
      { text: "Na cama", value: "submissao" },
      { text: "Em qualquer lugar seguro", value: "submissao" },
      { text: "Na palavra e no toque", value: "submissao" },
      { text: "No olhar", value: "submissao" },
      { text: "Em todo o corpo", value: "submissao" }
    ]
  },
  {
    question: "70. Qual dessas ações te domina mais?",
    answers: [
      { text: "Segurar meu queixo e olhar fixo", value: "submissao" },
      { text: "Me virar de costas com força", value: "submissao" },
      { text: "Me proibir de gozar", value: "submissao" },
      { text: "Segurar meus pulsos", value: "submissao" },
      { text: "Mandar sem me deixar pensar", value: "submissao" }
    ]
  },
  {
    question: "71. Qual dessas frases gostarias de ouvir no ouvido?",
    answers: [
      { text: "Tu és meu/minha", value: "submissao" },
      { text: "Obedece agora", value: "dominancia" },
      { text: "Quero ver tua rendição", value: "dominancia" },
      { text: "Não tens escolha", value: "dominancia" },
      { text: "Foste feito(a) para mim", value: "submissao" }
    ]
  },
  {
    question: "72. O que mais te excita no domínio psicológico?",
    answers: [
      { text: "Saber que controlo teu prazer", value: "dominancia" },
      { text: "Ver que me obedeces sem palavras", value: "dominancia" },
      { text: "Jogar com teus limites", value: "dominancia" },
      { text: "Ter poder sobre tua mente", value: "dominancia" },
      { text: "Ser teu dono(a) naquele momento", value: "dominancia" }
    ]
  },
  {
    question: "73. Quando te sentes mais submisso(a)?",
    answers: [
      { text: "Quando sou tocado(a) com autoridade", value: "submissao" },
      { text: "Quando não posso me mexer", value: "submissao" },
      { text: "Quando me dizes o que fazer", value: "submissao" },
      { text: "Quando confio cegamente", value: "submissao" },
      { text: "Quando não sei o que vem", value: "submissao" }
    ]
  },
  {
    question: "74. Como te excita castigar (ou ser castigado)?",
    answers: [
      { text: "Com tapas leves", value: "dominancia" },
      { text: "Com palavras sujas", value: "dominancia" },
      { text: "Com suspense", value: "dominancia" },
      { text: "Com controle total", value: "dominancia" },
      { text: "Com prazer e tensão", value: "dominancia" }
    ]
  },
  {
    question: "75. Qual o teu limite no jogo de poder?",
    answers: [
      { text: "A dor física", value: "curiosidade" },
      { text: "Perder o controlo real", value: "curiosidade" },
      { text: "Não saber a palavra de segurança", value: "curiosidade" },
      { text: "Ser visto(a) em público", value: "curiosidade" },
      { text: "Não ter conexão emocional", value: "curiosidade" }
    ]
  },
  {
    question: "76. Qual papel mexe mais contigo?",
    answers: [
      { text: "Submisso(a) completo(a)", value: "submissao" },
      { text: "Dominante cuidadoso(a)", value: "dominancia" },
      { text: "Switch (alterno os papéis)", value: "curiosidade" },
      { text: "Submisso(a) que provoca", value: "submissao" },
      { text: "Dominante que exige tudo", value: "dominancia" }
    ]
  },
  {
    question: "77. Como gostas de provocar submissão?",
    answers: [
      { text: "Com toques imprevisíveis", value: "dominancia" },
      { text: "Com ordens calmas", value: "dominancia" },
      { text: "Com controlo do tempo", value: "dominancia" },
      { text: "Com proibições tentadoras", value: "dominancia" },
      { text: "Com gestos dominadores", value: "dominancia" }
    ]
  },
  {
    question: "78. Qual castigo sexual te excita mais?",
    answers: [
      { text: "Ficar de joelhos", value: "submissao" },
      { text: "Esperar para ser tocado(a)", value: "submissao" },
      { text: "Não poder gozar", value: "submissao" },
      { text: "Ser amarrado(a)", value: "submissao" },
      { text: "Ouvir palavras brutas", value: "submissao" }
    ]
  },
  {
    question: "79. Qual destas ordens te faria gemer só de ouvir?",
    answers: [
      { text: "Fica de quatro agora", value: "submissao" },
      { text: "Toca-te enquanto assisto", value: "dominancia" },
      { text: "Engole sem reclamar", value: "dominancia" },
      { text: "Não te atrevas a parar", value: "dominancia" },
      { text: "Vira-te. Agora.", value: "dominancia" }
    ]
  },
  {
    question: "80. O que significa submissão para ti?",
    answers: [
      { text: "Entrega com prazer", value: "submissao" },
      { text: "Confiança total", value: "submissao" },
      { text: "Erotismo mental", value: "submissao" },
      { text: "Serviço voluntário", value: "submissao" },
      { text: "Jogo onde ganho mesmo rendido(a)", value: "submissao" }
    ]
  },
  {
    question: "81. O que te faz implorar por sexo?",
    answers: [
      { text: "Oral prolongado", value: "oral_forte" },
      { text: "Beijos com domínio", value: "oral_forte" },
      { text: "Toques entre as pernas sem continuar", value: "oral_forte" },
      { text: "O cheiro do teu corpo", value: "oral_forte" },
      { text: "Palavras sujas no ouvido", value: "oral_forte" }
    ]
  },
  {
    question: "82. O que mais gostas num bom oral?",
    answers: [
      { text: "Quando é lento e molhado", value: "oral_forte" },
      { text: "Quando alternas ritmo", value: "oral_forte" },
      { text: "Quando usas a língua inteira", value: "oral_forte" },
      { text: "Quando me seguras firme", value: "oral_forte" },
      { text: "Quando me olhas enquanto fazes", value: "oral_forte" }
    ]
  },
  {
    question: "83. O que te excita no anal?",
    answers: [
      { text: "A proibição implícita", value: "anal_duro" },
      { text: "O prazer inesperado", value: "anal_duro" },
      { text: "A preparação intensa", value: "anal_duro" },
      { text: "O domínio de quem penetra", value: "anal_duro" },
      { text: "A entrega de quem recebe", value: "anal_duro" }
    ]
  },
  {
    question: "84. Qual destas posições mais te deixa louco(a)?",
    answers: [
      { text: "De quatro", value: "anal_duro" },
      { text: "Na borda da cama", value: "oral_forte" },
      { text: "Montado(a) por cima", value: "oral_forte" },
      { text: "Com as mãos presas", value: "anal_duro" },
      { text: "Deitado(a) e submisso(a)", value: "anal_duro" }
    ]
  },
  {
    question: "85. O que sentes ao receber ou dar oral até o fim?",
    answers: [
      { text: "Poder absoluto", value: "oral_forte" },
      { text: "Prazer em dominar", value: "oral_forte" },
      { text: "Vontade de engolir tudo", value: "oral_forte" },
      { text: "Tensão que explode", value: "oral_forte" },
      { text: "Excitação só em imaginar", value: "oral_forte" }
    ]
  },
  {
    question: "86. Qual destas combinações mais te enlouquece?",
    answers: [
      { text: "Oral + palmadas", value: "oral_forte" },
      { text: "Anal + mãos firmes", value: "anal_duro" },
      { text: "Beijo + puxões de cabelo", value: "oral_forte" },
      { text: "Mordidas + penetração", value: "anal_duro" },
      { text: "Oral com gemidos teus", value: "oral_forte" }
    ]
  },
  {
    question: "87. Como te excita ouvir 'engole tudo'?",
    answers: [
      { text: "Sinto que pertenço a ti", value: "oral_forte" },
      { text: "Fico com tesão na hora", value: "oral_forte" },
      { text: "Sinto prazer só em obedecer", value: "oral_forte" },
      { text: "Imagino e fico molhado(a)", value: "oral_forte" },
      { text: "Perco o controlo", value: "oral_forte" }
    ]
  },
  {
    question: "88. O que te excita mais numa penetração anal?",
    answers: [
      { text: "Ser dominado(a) com força", value: "anal_duro" },
      { text: "Sentir cada centímetro", value: "anal_duro" },
      { text: "Ser aberto(a) lentamente", value: "anal_duro" },
      { text: "Ser guiado(a) e rendido(a)", value: "anal_duro" },
      { text: "Misturar dor e prazer", value: "anal_duro" }
    ]
  },
  {
    question: "89. Como preferes começar o sexo intenso?",
    answers: [
      { text: "Com oral demorado", value: "oral_forte" },
      { text: "Com tapinhas e provocações", value: "oral_forte" },
      { text: "Com domínio verbal", value: "anal_duro" },
      { text: "Com penetração direta", value: "anal_duro" },
      { text: "Com tensão entre palavras", value: "anal_duro" }
    ]
  },
  {
    question: "90. Qual destas provoca mais prazer físico?",
    answers: [
      { text: "Ser puxado(a) com força", value: "anal_duro" },
      { text: "Ser penetrado(a) devagar", value: "anal_duro" },
      { text: "Sentir língua onde ninguém vai", value: "oral_forte" },
      { text: "Oral com pressão no rosto", value: "oral_forte" },
      { text: "Gemidos teus na minha boca", value: "oral_forte" }
    ]
  },
  {
    question: "91. O que torna o sexo cru mais excitante?",
    answers: [
      { text: "Não planejar nada", value: "anal_duro" },
      { text: "Explodir juntos sem regra", value: "anal_duro" },
      { text: "Oral no meio do caminho", value: "oral_forte" },
      { text: "Anal sem palavras, só desejo", value: "anal_duro" },
      { text: "Suor e gemidos brutos", value: "anal_duro" }
    ]
  },
  {
    question: "92. O que te faria gozar só com palavras?",
    answers: [
      { text: "Descreve o que vais fazer", value: "oral_forte" },
      { text: "Manda-me de forma firme", value: "oral_forte" },
      { text: "Grita que sou teu/ tua", value: "oral_forte" },
      { text: "Faz-me prometer que vou engolir", value: "oral_forte" },
      { text: "Diz que vais dentro sem parar", value: "anal_duro" }
    ]
  },
  {
    question: "93. Qual destas tu repetias sem pensar?",
    answers: [
      { text: "Oral até eu gozar", value: "oral_forte" },
      { text: "Anal com domínio total", value: "anal_duro" },
      { text: "Beijo molhado com gemido", value: "oral_forte" },
      { text: "Tapas enquanto me chamas de teu/tua", value: "anal_duro" },
      { text: "Oral com mãos firmes", value: "oral_forte" }
    ]
  },
  {
    question: "94. Como imaginas um sexo insano entre nós?",
    answers: [
      { text: "Garganta funda sem fim", value: "oral_forte" },
      { text: "Anal até gemer alto", value: "anal_duro" },
      { text: "Oral + anal alternado", value: "anal_duro" },
      { text: "Sexo de costas com domínio", value: "anal_duro" },
      { text: "Me suga até implorar", value: "oral_forte" }
    ]
  },
  {
    question: "95. Qual palavra excita mais quando dita com firmeza?",
    answers: [
      { text: "Chupa", value: "oral_forte" },
      { text: "Grita", value: "oral_forte" },
      { text: "Entra", value: "anal_duro" },
      { text: "Vira", value: "anal_duro" },
      { text: "Goza", value: "oral_forte" }
    ]
  },
  {
    question: "96. Quando sentes que és 100% meu/minha?",
    answers: [
      { text: "Quando estou na tua boca", value: "oral_forte" },
      { text: "Quando me dominas com penetração", value: "anal_duro" },
      { text: "Quando engulo tudo de ti", value: "oral_forte" },
      { text: "Quando me usas com firmeza", value: "anal_duro" },
      { text: "Quando gememos no mesmo tempo", value: "anal_duro" }
    ]
  },
  {
    question: "97. Como imaginas um oral/anal simultâneo?",
    answers: [
      { text: "Mente explode", value: "anal_duro" },
      { text: "Corpo treme", value: "anal_duro" },
      { text: "Gemido ecoa", value: "oral_forte" },
      { text: "Olho para ti rendido(a)", value: "oral_forte" },
      { text: "Perco o controlo", value: "anal_duro" }
    ]
  },
  {
    question: "98. O que queres ouvir enquanto me entregas tudo?",
    answers: [
      { text: "Continua até o fim", value: "oral_forte" },
      { text: "Vem com tudo", value: "anal_duro" },
      { text: "Faz-me teu/ tua", value: "anal_duro" },
      { text: "Não te atrevas a parar", value: "oral_forte" },
      { text: "Quero gozar em ti", value: "oral_forte" }
    ]
  },
  {
    question: "99. Qual dessas palavras descreve melhor teu orgasmo?",
    answers: [
      { text: "Explosão", value: "anal_duro" },
      { text: "Submissão total", value: "oral_forte" },
      { text: "Tremor interno", value: "oral_forte" },
      { text: "Libertação", value: "anal_duro" },
      { text: "Vício", value: "oral_forte" }
    ]
  },
  {
    question: "100. Se esta fosse nossa última vez, o que pedirias?",
    answers: [
      { text: "Suga-me até o fim", value: "oral_forte" },
      { text: "Vem por trás e domina", value: "anal_duro" },
      { text: "Faz-me gozar só com palavras", value: "oral_forte" },
      { text: "Fica em mim até o fim", value: "anal_duro" },
      { text: "Faz tudo, como se fosse a última", value: "anal_duro" }
    ]
  },
  {
    question: "101. O que é mais importante para o nosso futuro?",
    answers: [
      { text: "Crescer juntos", value: "cumplicidade" },
      { text: "Explorar novas versões de nós", value: "cumplicidade" },
      { text: "Confiar e rir sempre", value: "cumplicidade" },
      { text: "Nunca perder a intimidade", value: "cumplicidade" },
      { text: "Amar mesmo nas diferenças", value: "cumplicidade" }
    ]
  },
  {
    question: "102. Como imaginas um amor que dura?",
    answers: [
      { text: "Leve e provocante", value: "cumplicidade" },
      { text: "Profundo e verdadeiro", value: "cumplicidade" },
      { text: "Com pausas e reconexão", value: "cumplicidade" },
      { text: "Com prazer e diálogo", value: "cumplicidade" },
      { text: "Com respeito e loucura", value: "cumplicidade" }
    ]
  },
  {
    question: "103. O que sustenta a nossa ligação íntima?",
    answers: [
      { text: "Transparência", value: "cumplicidade" },
      { text: "Vontade mútua", value: "cumplicidade" },
      { text: "Entrega emocional", value: "cumplicidade" },
      { text: "Prazer partilhado", value: "cumplicidade" },
      { text: "Ritual de carinho", value: "cumplicidade" }
    ]
  },
  {
    question: "104. O que é mais sagrado entre nós?",
    answers: [
      { text: "O silêncio partilhado", value: "cumplicidade" },
      { text: "O respeito mútuo", value: "cumplicidade" },
      { text: "O sexo com verdade", value: "cumplicidade" },
      { text: "O abraço que cura", value: "cumplicidade" },
      { text: "O desejo que renasce", value: "cumplicidade" }
    ]
  },
  {
    question: "105. Como sabes que somos certos um para o outro?",
    answers: [
      { text: "Quando me olhas em silêncio", value: "cumplicidade" },
      { text: "Quando te escolho todos os dias", value: "cumplicidade" },
      { text: "Quando rimos do nada", value: "cumplicidade" },
      { text: "Quando gozo contigo e depois abraço", value: "cumplicidade" },
      { text: "Quando o amor continua mesmo sem sexo", value: "cumplicidade" }
    ]
  },
  {
    question: "106. O que gostarias que nunca mudasse entre nós?",
    answers: [
      { text: "A liberdade de ser quem somos", value: "cumplicidade" },
      { text: "A vontade de tocar", value: "cumplicidade" },
      { text: "A risada depois do gozo", value: "cumplicidade" },
      { text: "A confiança nos olhos", value: "cumplicidade" },
      { text: "A forma como me chamas de teu/tua", value: "cumplicidade" }
    ]
  },
  {
    question: "107. Como te imaginas comigo daqui a anos?",
    answers: [
      { text: "Deitados depois de fazer amor", value: "cumplicidade" },
      { text: "Rindo e ainda desejando", value: "cumplicidade" },
      { text: "Contando segredos novos", value: "cumplicidade" },
      { text: "Descobrindo novas formas de prazer", value: "cumplicidade" },
      { text: "Velhos e ainda nus um para o outro", value: "cumplicidade" }
    ]
  },
  {
    question: "108. O que mais gostas no nosso sexo?",
    answers: [
      { text: "A liberdade de rir e gozar", value: "cumplicidade" },
      { text: "A entrega emocional", value: "cumplicidade" },
      { text: "O corpo que conhece o outro", value: "cumplicidade" },
      { text: "O jeito como me chamas", value: "cumplicidade" },
      { text: "A verdade no prazer", value: "cumplicidade" }
    ]
  },
  {
    question: "109. Qual é o nosso superpoder como casal?",
    answers: [
      { text: "Respeitar e provocar", value: "cumplicidade" },
      { text: "Rir e gozar juntos", value: "cumplicidade" },
      { text: "Chorar e perdoar", value: "cumplicidade" },
      { text: "Querer sem precisar", value: "cumplicidade" },
      { text: "Ser um só sem se perder", value: "cumplicidade" }
    ]
  },
  {
    question: "110. Quando sentes que a nossa relação está mais forte?",
    answers: [
      { text: "Depois de uma noite intensa", value: "cumplicidade" },
      { text: "Quando conversamos com verdade", value: "cumplicidade" },
      { text: "Quando descobrimos algo novo", value: "cumplicidade" },
      { text: "Quando te deixo ver minhas sombras", value: "cumplicidade" },
      { text: "Quando acordamos colados", value: "cumplicidade" }
    ]
  },
  {
    question: "111. Qual frase define melhor o nosso amor?",
    answers: [
      { text: "Profundo e provocante", value: "cumplicidade" },
      { text: "Verdadeiro e sexual", value: "cumplicidade" },
      { text: "Livre e comprometido", value: "cumplicidade" },
      { text: "Louco e constante", value: "cumplicidade" },
      { text: "Imperfeito mas inteiro", value: "cumplicidade" }
    ]
  },
  {
    question: "112. O que mais valorizas após o orgasmo?",
    answers: [
      { text: "A conversa ou silêncio", value: "cumplicidade" },
      { text: "O abraço", value: "cumplicidade" },
      { text: "O olhar com ternura", value: "cumplicidade" },
      { text: "A forma como me cobres", value: "cumplicidade" },
      { text: "A presença depois do prazer", value: "cumplicidade" }
    ]
  },
  {
    question: "113. Como reconheces o amor verdadeiro?",
    answers: [
      { text: "Quando há desejo e respeito", value: "cumplicidade" },
      { text: "Quando o silêncio conforta", value: "cumplicidade" },
      { text: "Quando gozo contigo e sorrio", value: "cumplicidade" },
      { text: "Quando continuo a escolher-te", value: "cumplicidade" },
      { text: "Quando não preciso fingir", value: "cumplicidade" }
    ]
  },
  {
    question: "114. O que representa fazer amor contigo?",
    answers: [
      { text: "Fusão", value: "cumplicidade" },
      { text: "Verdades trocadas em pele", value: "cumplicidade" },
      { text: "Ritual nosso", value: "cumplicidade" },
      { text: "Conexão com alma", value: "cumplicidade" },
      { text: "Libertação e amor", value: "cumplicidade" }
    ]
  },
  {
    question: "115. Como sabes que és meu/minha?",
    answers: [
      { text: "Pelo toque que me conhece", value: "cumplicidade" },
      { text: "Pela forma como me aceitas", value: "cumplicidade" },
      { text: "Por me olhares sem medo", value: "cumplicidade" },
      { text: "Por seres casa no caos", value: "cumplicidade" },
      { text: "Por continuares mesmo nas tempestades", value: "cumplicidade" }
    ]
  },
  {
    question: "116. Quando sentes que és parte de mim?",
    answers: [
      { text: "Quando gozas comigo", value: "cumplicidade" },
      { text: "Quando me entendes em silêncio", value: "cumplicidade" },
      { text: "Quando cuidas de mim sem pedir", value: "cumplicidade" },
      { text: "Quando dormes no meu peito", value: "cumplicidade" },
      { text: "Quando toco a tua alma", value: "cumplicidade" }
    ]
  },
  {
    question: "117. Como imaginas o nosso envelhecer juntos?",
    answers: [
      { text: "Com humor e desejo", value: "cumplicidade" },
      { text: "Com beijos lentos", value: "cumplicidade" },
      { text: "Com histórias sujas para contar", value: "cumplicidade" },
      { text: "Com a mesma cama e loucura", value: "cumplicidade" },
      { text: "Com gratidão e prazer", value: "cumplicidade" }
    ]
  },
  {
    question: "118. O que manteria vivo o desejo com os anos?",
    answers: [
      { text: "Exploração constante", value: "cumplicidade" },
      { text: "Liberdade e conexão", value: "cumplicidade" },
      { text: "Jogos provocantes", value: "cumplicidade" },
      { text: "Vontade de descobrir mais", value: "cumplicidade" },
      { text: "Toques com verdade", value: "cumplicidade" }
    ]
  },
  {
    question: "119. Qual gesto representa o teu amor?",
    answers: [
      { text: "Ouvir em silêncio", value: "cumplicidade" },
      { text: "Tocar com calma", value: "cumplicidade" },
      { text: "Beijar sem pressa", value: "cumplicidade" },
      { text: "Dar espaço e presença", value: "cumplicidade" },
      { text: "Escolher-te de novo", value: "cumplicidade" }
    ]
  },
  {
    question: "120. Como imaginas a nossa relação no futuro?",
    answers: [
      { text: "Mais profunda emocionalmente", value: "cumplicidade" },
      { text: "Sempre com surpresa e paixão", value: "cumplicidade" },
      { text: "Com espaço e liberdade", value: "cumplicidade" },
      { text: "A crescer juntos", value: "cumplicidade" },
      { text: "Mais intensa sexualmente", value: "cumplicidade" }
    ]
  }
];
