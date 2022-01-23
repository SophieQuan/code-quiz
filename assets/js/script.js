var questionsData = [
    {
        question: "All HTML code must be put inside of these symbols",
        a: "Tags",
        b: "Less than symbol",
        c: "Forward slash",
        d: "Angle brackets",
        correctAnswer: "d",
    },
    {
        question: "Code used with < > to tell the computer you are using HTML",
        a: "TITLE ",
        b: "HTML",
        c: "BODY",
        d: "HEAD",
        correctAnswer: "b",
    },
    {
        question: "The Computer doesn't recognize the difference between these when they are inside tags?",
        a: "Numbers and symbols",
        b: "Capital and lower case letters ",
        c: "Dates and times ",
        d: "Subtraction and division",
        correctAnswer: "b",
    },
    {
        question: "Program used to type in the HTML codes?",
        a: "Browser",
        b: "Text editor",
        c: "Internet Explorer",
        d: "Source",
        correctAnswer: "a",
    },
    {
        question: "A _____________________ is a set of text or button hyperlinks that can be used to access pages in your web site",
        a: "Route bar",
        b: "Map bar",
        c: "Direction bar",
        d: "Navigation bar",
        correctAnswer: "d",
    }
]

//declare elements
var logo = document.querySelector("#logo");
var startBtn = document.querySelector(".startBtn");
var introPage = document.querySelector(".intro");
var questionHeading = document.querySelector(".question-heading");

var answerA = document.querySelector(".btn-a");
var answerB = document.querySelector(".btn-b");
var answerC = document.querySelector(".btn-c");
var answerD = document.querySelector(".btn-d");

var quizContent = document.querySelector(".quiz-content");
var viewHighScores = document.querySelector(".viewHighScores");
var endContent = document.querySelector(".endQuiz-content");
var highscoreContent = document.querySelector(".highscore-content");
var playerScore = document.querySelector(".playerScore");
var time = document.querySelector(".timer");

//initial set
    //for timer countdown
var coundown;
var timer = 100;
var questionNum = 0;
var score = 0;
var highscores = [];

//function to start the quiz
var startQuiz = function (){
    introPage.classList.add("hide");
    playerScore.innerHTML = "Your Score: " + score;

    displayQuestions();
    timerCountdown();
};

//function uses to display questions
var displayQuestions = function(){
    //display quiz content
    quizContent.classList.remove('hide');
    //get current question and answers
    var currentQues = questionsData[questionNum];
    questionHeading.innerHTML = (questionNum+1) + ". " + currentQues.question;
    answerA.innerHTML = currentQues.a;
    answerB.innerHTML = currentQues.b;
    answerC.innerHTML = currentQues.c;
    answerD.innerHTML = currentQues.d;

    //on click check question is correct or incorrect
    answerA.addEventListener("click", checkAnswer);
    answerB.addEventListener("click", checkAnswer);
    answerC.addEventListener("click", checkAnswer);
    answerD.addEventListener("click", checkAnswer);
};

//function uses to set timmer in 100s
var timerCountdown = function(){
    coundown = setInterval(function(){
        time.innerHTML = "<p>Time remaining: "+ timer+ "s</p>";
        timer--;

        if(timer <= 10){
            time.innerHTML = timer + ' second remaining';
        }
        //clear timer when it at 0
        if(timer === 0 || timer < 0){
            clearInterval(coundown);
            endQuiz();
        }
    },1000); 
};

//function uses to check answer
var checkAnswer = function (a){
    //declare correct or incorrect messages
    var correctAns = document.querySelector(".correct");
    var incorrectAns = document.querySelector(".incorrect");
    //define which answer is clicked
    var clickBtn = a.target.getAttribute("value");
    if(clickBtn === questionsData[questionNum].correctAnswer){
        //display message
        correctAns.textContent = "Correct! Wow";
        incorrectAns.textContent = "";
        //a.target.classList.add('correctAnswerStyles');
        //if player answered correct, call function score calculation
        scoreCal();
    }
    else {
        incorrectAns.textContent = "Incorrect, sorry!";
        correctAns.textContent = "";
        //a.target.classList.add('incorrectAnswerStyles');
        //if player answered incorrect, penalize timer by ten seconds
        timer-=10;     
    }
    //loop through all questions, if no more question call end quiz function
    questionNum++;
    if(questionNum < questionsData.length){
        displayQuestions(questionNum);
    }else{
        endQuiz();
    }
}

//function uses to calculate player's score
var scoreCal = function(){
    //store all player's score in an array
    var scoreArr = [];
    //set reward point
    var rewardScore = 20;
    //everytime player's get reward, add to score array and sum all up
    scoreArr.push(rewardScore);
    for (var i=0; i in scoreArr; i++){
        score += scoreArr[i]
    }
    //display user's score
    playerScore.innerHTML = "Your Score: " + score;
}
//function end Quiz
var endQuiz = function(){
    //clear timer
    clearInterval(coundown);
    //hide quiz content and display highscore content
    quizContent.classList.add("hide");
    highscoreContent.classList.add("hide");
    endContent.classList.remove("hide");
    
    endContent.innerHTML = 
    "<h2>GAME OVER!</h2></br><p>Your final score is <strong>" + score + "</strong></p>";

    //create a form element to get user input
    var userInput = document.createElement("form");
    endContent.appendChild(userInput);
    var inputName = document.createElement("input");
    userInput.innerText = "Enter your name: ";
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "input-name");
    inputName.setAttribute("placeholder", "your name");
    userInput.appendChild(inputName);

    
    //create submit button
    var submitBtn = document.createElement("button");
    userInput.appendChild(submitBtn);
    submitBtn.className = "saveBtn";
    submitBtn.innerText = "Save";
    
    //on click save user name and score
    submitBtn.addEventListener("click", saveUserInput);

    var ifrm = document.createElement("img");
    ifrm.setAttribute('id', 'ifrm');
    ifrm.setAttribute('src', '../../assets/images/giphy.GIF');

    endContent.appendChild(ifrm);
}

//function to save user info
var saveUserInput = function(e){
    e.preventDefault();

    var getInputName = document.querySelector("input[name='input-name']").value;

    if(!getInputName){
        alert("Please enter your name.");
        saveUserInput()
    }else{
        var playerObj = {
            playerName: getInputName,
            playerScore: score,
        }
        highscores.push(playerObj);
        localStorage.setItem("playerInfo", JSON.stringify(highscores));
    }
    showHighScores();
}

//function show all scores
var showHighScores = function(){
    endContent.classList.add("hide");
    quizContent.classList.add("hide");
    highscoreContent.classList.remove("hide");

    var highScoreHeading = document.createElement("table");
    highscoreContent.innerHTML = "<h2>High Scores</h2><p>The ultimate web design quiz: trivia!</p><hr>";
    highscoreContent.appendChild(highScoreHeading);

    //store all score in an array
    var playerScoresArr = [];
    for (i = 0; i < highscores.length; i++){
        highScoreHeading.innerHTML += "<tr><td>" + highscores[i].playerName +"</td>"+"<td>"+ highscores[i].playerScore + "</td></tr>";
        console.log(highscores);
        playerScoresArr.push(highscores[i].playerScore)
    }
    //get best score
    var bestScore = Math.max.apply(Math, playerScoresArr);
    
    //display best score
    var display =document.createElement("p");
    if(playerScoresArr.length <= 0){
        display.innerHTML += "No scores"
    }else{
        display.innerHTML += "<strong>BEST SCORE: </strong>" + bestScore;
    }
    
    display.className = "displayBestScore";
    highscoreContent.appendChild(display);

    //start quiz button
    var returnMain = document.createElement("button");
    highscoreContent.appendChild(returnMain);
    returnMain.className = "playAgain btn";
    returnMain.innerText = "Start Quiz Again";

    returnMain.addEventListener("click", playAgain);
}

//function play again
var playAgain = function(e){
    questionNum = 0;
    score = 0;
    timer = 100;
    clearInterval(coundown);
    highscoreContent.classList.add("hide");
    introPage.classList.remove("hide");
    time.innerHTML = "";
    startQuiz();
}

//load score from local storage
var loadScores = function() { 
    highscores = localStorage.getItem("playerInfo");

    if (!highscores) {
        highscores = [];
        return false;
    }

    highscores = JSON.parse(highscores);
}

//reload webpage when hit logo section
function reload(){
    window.location.reload();
}
loadScores();
viewHighScores.addEventListener("click", showHighScores);
logo.addEventListener("click", reload);

startBtn.addEventListener("click", startQuiz);