var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.querySelector(".submit-button");
var question = document.querySelector("#question p");
var choices = document.querySelector("#choices p");

var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "js",
      b: "JavaCsript",
      c: "<script>"
    },
    correctAnswer: "c"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "div",
      b: "body",
      c: "footer"
    },
    correctAnswer: "b"

  }
];


var isAnswered = true;
var timer;
var timerCount;


var timer;
var timerCount;
isAnswered = true;

// The startQuiz function is called when the start button is clicked
function startQuiz() {
    timerCount = 120;
    startTimer()
  }

// timer function
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount === 0) {
        // Tests if win condition is met
        if (isAnswered && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
    
      }
    }, 1000);
  }

  // button that starts the quiz
  startButton.addEventListener("click", startQuiz);
