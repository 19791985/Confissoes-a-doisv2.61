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
  // continua até 60...];
