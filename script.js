//Variables from HTML elements
var startContainer = document.getElementById('start-container');
var startButton = document.getElementById('start-btn');
var topRow = document.getElementById('top-row');
var questionContainer = document.getElementById('question-container');
var endContainer = document.getElementById('end-container');
var timeEl = document.getElementById('timer');
var endQuizContainer = document.getElementById('end-container');
var answerDiv = document.getElementById('answer-buttons');

//JS Variables
var secondsLeft = 60;
var userScore = 0;
var questionIndex = 0;

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
    answerDiv.innerHTML = "";
    var questionElement = document.getElementById('quizQuestion');
    console.log("Question element is:", questionElement);
    console.log("question index is:", questionIndex);
    console.log(questions[questionIndex].question);
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

function startTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

function selectAnswer() {
    if (this.value === questions[questionIndex].correct_answer) {
        questionIndex++;
        userScore++;
        setNextQuestion();
    } else {
        secondsLeft -= 5;
            if (secondsLeft <= 0) {
                endQuiz();
            } else {
                questionIndex++;
                setNextQuestion(); 
            }       
    }
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
        question: 'Which of these animals mate for life?',
        answers: ['Spotted Hyena', 'Bottlenose Dolphin', 'Bonobos', 'Beaver'],
        correct_answer: 'Beaver'
    }
]


