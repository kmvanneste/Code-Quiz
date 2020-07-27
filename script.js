var startContainer = document.getElementById('start-container');
var startButton = document.getElementById('start-btn');
var topRow = document.getElementById('top-row');
var questionContainer = document.getElementById('question-container');
var endContainer = document.getElementById('end-container');


startButton.addEventListener("click", startQuiz);


function startQuiz() {
    startContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    var question = document.getElementById('question');
    question.innerHTML = questions.question;
}

function selectAnswer() {

}

var questions = [
    {
        question: 'Which of these birds can fly?',
        answers: [
            {text: 'Penguin', correct: false },
            {text: 'Flamingo', correct: true },
            {text: 'Ostrich', correct: false},
            {text: 'Peacock', correct: false}
        ]
    },
    {
        question: 'What is the fastest animal on earth?',
        answers: [
            {text: 'Eagle', correct: false},
            {text: 'Wolf', correct: false},
            {text: 'Cheetah', correct: true},
            {text: 'Kangaroo', correct: false}
        ]
    },
    {
        question: 'Which animal has the longest migration?',
        answers: [
            {text: 'Arctic Tern', correct: true},
            {text: 'Monarch Butterfly', correct: false},
            {text: 'African Elephant', correct: false},
            {text: 'Humpback Whale', correct: false}
        ]
    },
    {
        question: 'Which is the only mammal that can fly?',
        answers: [
            {text: 'Owl', correct: false},
            {text: 'Moth', correct: false},
            {text: 'Flying Squirrel', correct: false},
            {text: 'Bat', correct: true}
        ]
    },
    {
        question: 'Which of these animals mate for life?',
        answers: [
            {text: 'Spotted Hyena', correct: false},
            {text: 'Bottlenose Dolphin', correct: false},
            {text: 'Bonobos', correct: false},
            {text: 'Beaver', correct: true}
        ]
    }
]



function submitScore() {

}

function viewHighscores() {

}

function goBack() {

}

