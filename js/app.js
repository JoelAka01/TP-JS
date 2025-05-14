// Éléments du DOM
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress-bar');
const scoreElement = document.getElementById('score');
const answersSummary = document.getElementById('answers-summary');

// Initialisation des événements
function initEvents() {
    startButton.addEventListener('click', startQuiz);
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
    submitButton.addEventListener('click', submitQuiz);
    restartButton.addEventListener('click', restartQuiz);
}