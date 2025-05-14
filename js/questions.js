// Tableau des questions
const questions = [
    {
        question: "Quelle est la méthode JavaScript pour sélectionner un élément par son ID?",
        type: "choice",
        answers: [
            "document.getElement(id)",
            "document.querySelector(#id)",
            "document.getElementById(id)",
            "document.findElement(id)"
        ],
        correctAnswer: 2
    },
    {
        question: "Lequel de ces événements se déclenche quand un utilisateur clique sur un élément HTML?",
        type: "choice",
        answers: [
            "onchange",
            "onclick",
            "onmouseover",
            "onsubmit"
        ],
        correctAnswer: 1
    },
    {
        question: "Comment déclarer une variable qui ne peut pas être modifiée en JavaScript?",
        type: "choice",
        answers: [
            "var",
            "let",
            "const",
            "static"
        ],
        correctAnswer: 2
    },
    {
        question: "Quelle fonction permet d'exécuter du code à intervalles réguliers?",
        type: "choice",
        answers: [
            "setTimeout()",
            "setInterval()",
            "requestAnimationFrame()",
            "executeLoop()"
        ],
        correctAnswer: 1
    },
    {
        question: "Écrivez la méthode utilisée pour ajouter un élément à la fin d'un tableau en JavaScript",
        type: "text",
        correctAnswer: "push"
    }
];