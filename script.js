//Variables from HTML elements
var startContainer = document.getElementById('start-container');
var startButton = document.getElementById('start-btn');
var topRow = document.getElementById('top-row');
var questionContainer = document.getElementById('question-container');
var endContainer = document.getElementById('end-container');
var timeEl = document.getElementById('timer');
var endQuizContainer = document.getElementById('end-container');
var answerDiv = document.getElementById('answer-buttons');
var answerRevealP = document.getElementById('answer-reveal');
var restartQuizBtn = document.getElementById('re-start-btn');
var scoreContainer = document.getElementById('score-container');

//Saving highscores to local storage
var initialsInput = document.getElementById('userInitials');
var submitScoreBtn = document.getElementById('button-addon2');
var scoreList = document.getElementById('score-list');
var clearScoreBtn = document.getElementById('clear-scores');

var score = [];

init();

function renderScore() {
    scoreList.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScore();
}

function storeScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

submitScoreBtn.addEventListener("submit", function(event) {
    event.preventDefault();
    var initialsText = initialsInput.value.trim();
    if (initialsText === "") {
        return;
    }
    scores.push(initialsText);
    initialsInput.value = "";
})

clearScoreBtn.addEventListener("click", function(event) {
    var element = event.target;
    var index = element.parentElement.getAttribute("data-index");
    scores.splice(index, 1);
    
    storeScores();
    renderScore();
})


//JS Variables
var secondsLeft = 60;
var userScore = 0;
var questionIndex = 0;

//JS button Events
startButton.addEventListener("click", startQuiz);
restartQuizBtn.addEventListener("click", location.reload);
submitScoreBtn.addEventListener("click", revealScores);

//press the start button, opens up questions, starts timer!
function startQuiz() {
    startContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

//Brings up new question and generates buttons with corresponding answers
function setNextQuestion() {
    answerDiv.innerHTML = "";
    var questionElement = document.getElementById('quizQuestion');
    questionElement.textContent = questions[questionIndex].question;

    questions[questionIndex].answers.forEach(function(answer, i) {
        var buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "btn-outline-secondary");
        buttonEl.setAttribute("value", answer);
        buttonEl.textContent = answer;
        buttonEl.onclick = selectAnswer;
        answerDiv.appendChild(buttonEl);
    })
}

//Timer
function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if(secondsLeft <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

//Action after selecting the right or wrong answer, also gives user Correct or Wrong message
function selectAnswer() {
    if (this.value === questions[questionIndex].correct_answer) {
        var correctReveal = setInterval(correctAnswerTimer, 100);
            function correctAnswerTimer() {
                answerRevealP.textContent = "Correct!";
                answerRevealP.classList.remove('hide');
                clearInterval(correctReveal);
            }; 
        questionIndex++;
        userScore+=3;
        setNextQuestion();    
    } else {
        secondsLeft -= 10;
            if (secondsLeft <= 0) {
                endQuiz();
                startTimer();
            } else {
                questionIndex++;
                var wrongReveal = setInterval(wrongAnswerTimer, 100);
                    function wrongAnswerTimer() {
                        answerRevealP.textContent = "Wrong";
                        answerRevealP.classList.remove('hide');
                        clearInterval(wrongReveal);
                    };
                setNextQuestion();
            }       
        }
}

//Reveals End Quiz Container
function endQuiz() {
    questionContainer.classList.add('hide');
    endQuizContainer.classList.remove('hide');
    userEndScore = document.getElementById('scoreTotal');
    userEndScore.innerText = "Your final score is: " + userScore;
}

//Reveals Highscore Container
function revealScores() {
    endQuizContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scores.push(userEndScore);
}

var questions = [
    {
        question: 'Which of these birds can fly?',
        answers: ['Penguin', 'Flamingo', 'Ostrich', 'Kiwi'],
        correct_answer: 'Flamingo'
    },
    {
        question: 'What is the fastest animal on earth?',
        answers: ['Eagle', 'Wolf', 'Cheetah', 'Kangaroo'],
        correct_answer: 'Cheetah'
    },
    {
        question: 'Which animal has the longest migration?',
        answers: ['Arctic Tern', 'Monarch Butterfly','African Elephant', 'Humpback Whale'],
        correct_answer: 'Arctic Tern'
    },
    {
        question: 'Which is the only mammal that can fly?',
        answers: ['Owl', 'Moth', 'Flying Squirrel', 'Bat'],
        correct_answer: 'Bat'
    },
    {
        question: 'Which of these animals buries it\'s prey to snack on later?',
        answers: ['Moose', 'Magpie', 'Mountain Lion', 'Manatee'],
        correct_answer: 'Cardinal'
    },
    {
        question: 'Which of these animals mate for life?',
        answers: ['Spotted Hyena', 'Bottlenose Dolphin', 'Bonobos', 'Beaver'],
        correct_answer: 'Beaver'
    },
    {
        question: 'Which of these animals has the longest nose?',
        answers: ['Aardvark', 'Rat', 'Wolverine', 'Elephant'],
        correct_answer: 'Elephant'
    },
    {
        question: 'Which of these animals has spots?',
        answers: ['Zebra', 'Giraffe', 'Skunk', 'Ring-tailed Lemur'],
        correct_answer: 'Giraffe'
    },
    {
        question: 'Which of these animals is red?',
        answers: ['Cardinal', 'Toad', 'Rabbit', 'Deer'],
        correct_answer: 'Cardinal'
    },
    {
        question: 'Which of these animals lives in Australia?',
        answers: ['Tiger', 'Gorilla', 'Koala', 'Polar Bear'],
        correct_answer: 'Koala'
    }
]