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
var viewHighscoresLink = document.getElementById('highscores');

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
        correct_answer: 'Mountain Lion'
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

//Saving highscores to local storage
var initialsInput = document.getElementById('initials');
var submitScoreBtn = document.getElementById('button-addon2');
var scoreList = document.getElementById('score-list');
var clearScoreBtn = document.getElementById('clear-scores');

submitScoreBtn.addEventListener("click", function(){
    revealScores();
    var initials = initialsInput.value.trim();

    if (initials !== "") {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        var gameObj = {
            score: userScore,
            initials: initials
        }
        highscores.push(gameObj);
        localStorage.setItem("highscores", JSON.stringify(highscores));
     } 
     printScore();
})

clearScoreBtn.addEventListener("click", function() {
    localStorage.clear();
    reloadPage();
})

//JS Variables
let secondsLeft = 60;
let userScore = 0;
let index = randomQuestion();

//Random next question
function randomQuestion() {
 var questionIndex = Math.floor(Math.random() * questions.length)
 return questionIndex;
}

//JS button Events
startButton.addEventListener("click", startQuiz);
restartQuizBtn.addEventListener("click", reloadPage);
viewHighscoresLink.addEventListener("click", function() {
    revealScores();
    printScore();
});

function reloadPage() {
    location.reload();
}

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
    let newQuestion = randomQuestion();
    var questionElement = document.getElementById('quizQuestion');
    questionElement.textContent = questions[newQuestion].question;

    questions[newQuestion].answers.forEach(function(answer, i) {
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
    if (this.value === questions[index].correct_answer) {
        var correctReveal = setInterval(correctAnswerTimer, 50);
            function correctAnswerTimer() {
                answerRevealP.textContent = "Correct!";
                answerRevealP.classList.remove('hide');
                clearInterval(correctReveal);
            }; 
        randomQuestion();
        userScore+=3;
        setNextQuestion();    
    } else {
        secondsLeft -= 10;
            if (secondsLeft <= 0) {
                endQuiz();
                startTimer();
            } else {
                randomQuestion();
                var wrongReveal = setInterval(wrongAnswerTimer, 50);
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
    startContainer.classList.add('hide');
    questionContainer.classList.add('hide');
}

//prints high scores in list on high score page
function printScore() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
    })
    highscores.forEach(function(score){
        var liEl = document.createElement("li");
        liEl.textContent = score.initials + " - " + score.score;
        scoreList.appendChild(liEl);
    })
}

//carousel
$('.carousel').carousel({
    interval: 5000
  })