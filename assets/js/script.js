// Selecting HTML elements
var timerEl = document.querySelector(".timer");
var questionEl = document.getElementById("questionContainer");
var startButton = document.getElementById("start");
var mainEl = document.getElementById("main");
var score = document.querySelector(".score");
var inputEl = document.getElementById("input-container");
var submitButton = document.getElementById("submit");

var scoreCounter = 0;

// Array of questions and answer options with correct answers
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "<js>",
      b: "<JavaScript>",
      c: "<script>"
    },
    correctAnswer: "c"
  },
  {
    question: "Where is the correct place to link JavaScript to HTML file?",
    answers: {
      a: "<meta>",
      b: "<body>",
      c: "<footer>"
    },
    correctAnswer: "b"

  },
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    answers: {
      a: "var",
      b: "let",
      c: "all of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "How to stop an interval timer in Javascript?",
    answers: {
      a: "clearInterval",
      b: "stopInterval",
      c: "timerEnd"
    },
    correctAnswer: "a"
  },
  {
    question: "Which of the following represents a stict equality operator",
    answers: {
      a: "==",
      b: "!=",
      c: "==="
    },
    correctAnswer: "c"
  },
  {
    question: "How do we write a comment in javascript?",
    answers: {
      a: "//",
      b: "<!-- -->",
      c: "<comment>"
    },
    correctAnswer: "a"
  },
];

var timerCount = 300;
var questionIndex = 0;
var timerInterval;

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  // Hide the Start button
  startButton.style.display = "none";
  startTimer();
  // Start rendering questions from the first question 
  renderQuestion();
}

// Renders questions and answer options in order from the question array
function renderQuestion() {
  var currentQuestion = quizQuestions[questionIndex];
  questionEl.textContent = currentQuestion.question; // Displays Questions from the array

  // Creating ul element in html document to display answer options for current question
  var answerList = document.createElement("ul");

  // Starting a for...in loop over the properties of the 'answers' object from the quizQuestions array
  for (var answerKey in currentQuestion.answers) {
    var answerItem = document.createElement("li");
    var answerLink = document.createElement("a");

    answerLink.textContent = currentQuestion.answers[answerKey]; // retrieves the text content for each answer choice and assigns it to the textContent property of the answerLink anchor element. This sets the visible text of the answer choice in the anchor element that the user can click on.
    answerLink.setAttribute("href", ""); // sets new href attribute of the anchor element with no leading

    // Adds event listener for a click action to the anchor element
    answerLink.addEventListener("click", function (event) {
      event.preventDefault();
      var selectedAnswer = answerKey; // At the time of the event it captures the selected answer key
      checkAnswer(selectedAnswer, currentQuestion.correctAnswer); // function call to
    });

    answerItem.appendChild(answerLink); // appends li child (a) element
    answerList.appendChild(answerItem); // appends ul child (li) element
  }

  questionEl.appendChild(answerList); // appends div child (ul) element 
}

// Checking users answers and displaying a message
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Correct!");
    scoreCounter++
  } else {
    alert("Incorrect! -10 seconds");
    timerCount -= 10; // subtract 10 seconds for a wrong answer
  }
  questionIndex++; // Increments index to keep track of current question displayed
  // If any left, displays the next question in order from the question array
  if (questionIndex < quizQuestions.length) {
    clearQuestion();
    renderQuestion();
    // if not, quiz finished
  } else {
    clearQuestion();
    questionEl.textContent = "Quiz finished!";
    clearInterval(timerInterval); // Stop the timer when quiz is finished
    endQuiz();
  }
}

// Clearing content from the questionEl
function clearQuestion() {
  questionEl.textContent = "";
}

// Starting the timer function
function startTimer() {
  // Sets timer and displays remaining time
  timerInterval = setInterval(function () {
    timerCount--;
    timerEl.textContent = "Time remaining: " + timerCount + " seconds";
    // Tests if time has run out, displays "time is up" message
    if (timerCount === 0) {
      clearInterval(timerInterval);
      clearQuestion();
      questionEl.textContent = "Time is up!";
    }
  }, 1000);
}

// Button that starts the quiz on click
startButton.addEventListener("click", startQuiz);

// Saves user's score and initials 
function setScore() {
  score.textContent = scoreCounter;
  // Saving score to localStorage
  var storedScore = JSON.parse(localStorage.getItem("scoreCount")) || []
  var userInput = document.getElementById("initials").value;
  var userScoreObj = {
    initials: userInput,
    score: scoreCounter
  }
  storedScore.push(userScoreObj);
  localStorage.setItem("scoreCount", JSON.stringify(storedScore));
}

// Get the user's score from the localStorage
function getScore() {
  var storedScore = local.Storage.getItem("scoreCount");
  score.textContent = scoreCounter;
  if (storedScore === null) {
    scoreCounter = 0;
  }
  else {
    scoreCounter = storedScore;
  }
  score.textContent = scoreCounter;
}

// The init function is called when the page loads 
function init() {
  getScore();
}

// End the quiz and render initials input
function endQuiz() {
  renderInitials();
}

// Render initials input
function renderInitials() {
  inputEl.classList.remove("hidden");
  questionEl.classList.add("hidden");
}

// Listen for submit button for user's initials and score to be saved
submitButton.addEventListener("click", setScore);