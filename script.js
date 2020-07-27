//Variables from HTML elements
var startContainer = document.getElementById('start-container');
var startButton = document.getElementById('start-btn');
var topRow = document.getElementById('top-row');
var questionContainer = document.getElementById('question-container');
var endContainer = document.getElementById('end-container');
var timeEl = document.getElementById('timer');
var endQuizContainer = document.getElementById('end-container');
//JS Variables
var secondsLeft = 60;
var userScore = 0;

//JS button Events
startButton.addEventListener("click", startQuiz);

//press the start button, opens up questions, starts timer!
function startQuiz() {
    startContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
    startTimer();
}
//Brings up new question
function setNextQuestion() {
    var questionElement = document.getElementById('quizQuestion');
    var questionIndex = Math.floor(Math.random() * 6);
    console.log("Question element is:", questionElement);
    console.log("question index is:", questionIndex);
    questionElement.innerText = questions[questionIndex][question];

}

function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    })
}

function selectAnswer() {

}

function endQuiz() {
    questionContainer.classList.add('hide');
    endQuizContainer.classList.remove('hide');
    userEndScore = document.getElementById('scoreTotal');
    userEndScore.innerText = "Your final score is: " + userScore;
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


