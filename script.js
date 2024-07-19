const questions = [{
        question: "Which is the longest river in India?",
        answers: [
            { text: "Ganga", correct: true },
            { text: "Tapi", correct: false },
            { text: "Krishna", correct: false },
            { text: "Kaveri", correct: false },
        ]
    },
    {
        question: "Which is the longest river in World?",
        answers: [
            { text: "Ganga", correct: false },
            { text: "Nile", correct: true },
            { text: "Amazon", correct: false },
            { text: "Niger", correct: false },
        ]
    },
    {
        question: "Which bank is called bankers Bank of India?",
        answers: [
            { text: "Reserve Bank of India", correct: true },
            { text: "Panjab National Bank", correct: false },
            { text: "state Bank of India", correct: false },
            { text: "ICICI Bank", correct: false },
        ]
    },
    {
        question: "The metal used to recover copper from a solution of copper sulphate is ",
        answers: [
            { text: "Na", correct: false },
            { text: "Ag", correct: false },
            { text: "Hg", correct: false },
            { text: "Fe", correct: true },
        ]
    },
    {
        question: "Which is the highest dam of India?",
        answers: [
            { text: "Rihand Dam", correct: false },
            { text: "Tehri Dam", correct: true },
            { text: "Mettur Dam", correct: false },
            { text: "Sardar Sarovar Dam", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = 'You Scored ${Score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();