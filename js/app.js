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


function initEvents() {
    startButton.addEventListener('click', startQuiz);
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
    submitButton.addEventListener('click', submitQuiz);
    restartButton.addEventListener('click', restartQuiz);
}

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    userAnswers = Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    updateProgressBar();
        prevButton.style.visibility = index === 0 ? 'hidden' : 'visible';
    
    if (index === questions.length - 1) {
        nextButton.classList.add('hidden');
        submitButton.classList.remove('hidden');
    } else {
        nextButton.classList.remove('hidden');
        submitButton.classList.add('hidden');
    }
    
    const currentQuestion = questions[index];
    questionText.textContent = currentQuestion.question;
    
    answersContainer.innerHTML = '';
    
    if (currentQuestion.type === 'choice') {
        currentQuestion.answers.forEach((answer, answerIndex) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-option';
            answerElement.textContent = answer;
            
            if (userAnswers[currentQuestionIndex] === answerIndex) {
                answerElement.classList.add('selected');
            }
            
            answerElement.addEventListener('click', () => {
                document.querySelectorAll('.answer-option').forEach(el => {
                    el.classList.remove('selected');
                });
                
                answerElement.classList.add('selected');
                
                userAnswers[currentQuestionIndex] = answerIndex;
            });
            
            answersContainer.appendChild(answerElement);
        });
    } else if (currentQuestion.type === 'text') {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'text-input';
        inputElement.placeholder = 'Entrez votre réponse ici';
        
        if (userAnswers[currentQuestionIndex] !== null) {
            inputElement.value = userAnswers[currentQuestionIndex];
        }
        
        inputElement.addEventListener('input', (e) => {
            userAnswers[currentQuestionIndex] = e.target.value;
        });
        
        answersContainer.appendChild(inputElement);
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function submitQuiz() {
    let score = 0;
    const summaryItems = [];
    
    questions.forEach((question, index) => {
        let isCorrect = false;
        let userAnswer = userAnswers[index];
        
        if (question.type === 'choice') {
            isCorrect = userAnswers[index] === question.correctAnswer;
            userAnswer = userAnswer !== null ? question.answers[userAnswer] : 'Non répondu';
        } else if (question.type === 'text') {
            isCorrect = userAnswers[index] && userAnswers[index].toLowerCase() === question.correctAnswer.toLowerCase();
            userAnswer = userAnswer || 'Non répondu';
        }
        
        if (isCorrect) {
            score++;
        }
    
        const summaryItem = {
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.type === 'choice' ? question.answers[question.correctAnswer] : question.correctAnswer,
            isCorrect: isCorrect
        };
        
        summaryItems.push(summaryItem);
    });
    
    scoreElement.textContent = `${score}/${questions.length}`;
    
    createAnswersSummary(summaryItems);
    
    saveToLocalStorage(score, questions.length);
    
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

function createAnswersSummary(summaryItems) {
    answersSummary.innerHTML = '<h3>Détails des réponses</h3>';
    
    summaryItems.forEach((item, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
        
        answerItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${item.question}</p>
            <p><strong>Votre réponse:</strong> ${item.userAnswer}</p>
            <p><strong>Réponse correcte:</strong> ${item.correctAnswer}</p>
        `;
        
        answersSummary.appendChild(answerItem);
    });
}

function saveToLocalStorage(score, total) {
    const previousResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    
    previousResults.push({
        date: new Date().toLocaleString(),
        score: score,
        total: total
    });
    
    localStorage.setItem('quizResults', JSON.stringify(previousResults));
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

initEvents();