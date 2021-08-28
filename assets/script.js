var quizContainer = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questions = document.querySelector('#questions');

// Sets up an array of objects containing questions options and answers
var myQuestions = [
    {
        question: "What is the real name of JavaScript?",
        options: ["Java", "Node.js", "LiveScript",],
        correctAnswer: "LiveScript",
    },
    {
        question: "How is an array denoted in JavaScript?",
        options: ["<>", "[]","{}",],
        correctAnswer:"[]",
    },
        
    {
        question: "When was the first computer built?",
        options:["1943", "1985", "1972"],
        correctAnswer:"1943"
    },
        
    {
        question: "Who developed the internet?",
        options:["Bill Gates?", "Robert Frost", "Vinton Cerf and Bob Kahn"],
        correctAnswer:"Vinton Cerf and Bob Kahn"
    },
    {
        question: "What is the name of the fastest computer in the world?",
        options:["Fugaku", "MacIntosh", "Sierra Supercomputer"],
        correctAnswer:"Fugaku"
    },
];

// Set up of global variables for the quiz
var score = 0;
var questionsIndex = 0;
var secondsRemaining = 76;
var baseInterval = 0;
var penalty = 10;
var ulCreate = document.createElement('ul');
var submit = document.createElement('button');

// When the begin button is clicked, starts the timer function under the currentTime div. and renders the questions and options.
timer.addEventListener("click", function() {
    // Using my base interval to start the timer and diplay in currenTimer div.
    if (baseInterval === 0) {
        baseInterval = setInterval(function(){
            secondsRemaining--;
            currentTime.textContent = "Time " + secondsRemaining;

            // When the seconds remaing = 0 the interval is cleared and we run the finishedQuiz function.
            if (secondsRemaining <= 0){
                clearInterval(baseInterval);
                finishedQuiz();
                currentTime.textContent = "Time's Up!";
            };
        }, 1000);
    };
    // Renders the question and options of quiz. 
    render(questionsIndex);
});

function render(questionsIndex){
    // Clears HTML of what the user sees
    questions.innerHTML = "";
    timer.remove();
    ulCreate.innerHTML = "";

    // For loop to iterate through myQuestions array both questions and options.
    for(var i = 0; i < myQuestions.length; i++){

        userQuestion = myQuestions[questionsIndex].question;
        userOptions = myQuestions[questionsIndex].options;

        questions.textContent = userQuestion;
    };

    // userOptions var is creating <li> element for each string in options array. 
    userOptions.forEach(function (listOption){
        var optionsList = document.createElement('li');
        optionsList.textContent = listOption;
        // Moves created ul to bottom of questions div.
        questions.appendChild(ulCreate);
        //Puts <li> created under create <ul>
        ulCreate.appendChild(optionsList);
        // When option from <li> is clicked, run compareAnswers function.
        optionsList.addEventListener('click', (compareAnswers));
    });
};


function compareAnswers(event){

    var choice = event.target;

    if(choice.matches('li')) {
        var createNote = document.createElement('div');

        
        
        if(choice.textContent == myQuestions[questionsIndex].correctAnswer){
            score++;
            createNote.textContent = 'Congrats ' + myQuestions[questionsIndex].correctAnswer + ' was the correct answer!';
            console.log(createNote);
        } else{
            secondsRemaining = secondsRemaining - penalty;
            createNote.textContent= 'Sorry ' + myQuestions[questionsIndex].correctAnswer + ' is the correct answer.';
        };
        

        questions.appendChild(createNote);
    
        questionsIndex++
    };

    if (questionsIndex >= myQuestions.length) {
        finishedQuiz();

    } else {
        render(questionsIndex);
    };
};

function finishedQuiz(){
    questions.innerHTML = "";
    currentTime.innerHTML = "";

    var createTitle = document.createElement('h1');
    createTitle.textContent = "Finished Quiz!"

    questions.appendChild(createTitle);

    if (secondsRemaining >= 0){
        var timeLeft = secondsRemaining;
        var quizInfo = document.createElement('p');
        clearInterval(baseInterval);
        quizInfo.textContent = "Your final time is " + timeLeft;

    };

    questions.appendChild(quizInfo);

    var label = document.createElement('label');
    label.textContent = 'Enter initials: '

    questions.appendChild(label);


    var initialsInput = document.createElement('input');
    initialsInput.textContent = "";

    questions.appendChild(initialsInput);

    submit.textContent = "Submit";

    questions.appendChild(submit);


    submit.addEventListener("click", function(){

        if (initialsInput.value === null){
        var comment = document.createElement('<p>');
        questions.appendChild(comment);
        comment.textContent = "Please put something in the input.";

        } else {
            var myStorage = {
                initials: initialsInput.value,
                finalScore: score.value,
            };
            console.log(myStorage);
            questions.innerHTML = "";
            currentTime.innerHTML = "";
            

            var createH1 = document.createElement('h1');
            questions.appendChild(createH1);
            createH1.textContent = "Highscores";

            


            
        };



    })};
