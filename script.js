//targeting options
const optionList = $(".option-list");



//clicked activity
// when you click start btn
$(".start-btn").click(function(){
    $(".quiz-rules").addClass("activeRules");
});
//when you click exit quiz
$(".quit").click(function(){
    $(".quiz-rules").removeClass("activeRules");
})
//when you click continue
$(".restart").click(function(){
    $(".quiz-rules").removeClass("activeRules");
    $(".quiz-box").addClass("activeRules");
    displayQuestion(0);
    totalQuestionCount(1);
    startTimer(15);
})


let count = 0;
let quesNumber = 1;
let timeCount;
let timevalue = 10;
let userScore = 0;


// if next btn is clicked
 $(".next-btn").click(function(){
    if(count < questions.length -1){
        count++;
        quesNumber++;
    displayQuestion(count);
    totalQuestionCount(quesNumber);
    clearInterval(timeCount);
    startTimer(timevalue);
    $(".next-btn").css("display", "none");

    }else{
        console.log("completed");
       displayResultBox();
    }
    
 })

 

//extracting questions and options from array in quizquestion1.js

function displayQuestion(number) {
    let  quesTag = '<span>' + questions[number].numb +'.'+ questions[number].question
+ '</span>';
let optionTag = '<div class = "option">' + questions[number].options[0] + '<span></span></div>' 
+ '<div class = "option">' + questions[number].options[1] + '<span></span></div>' 
+ '<div class = "option">' + questions[number].options[2] + '<span></span></div>' 
+ '<div class = "option">' + questions[number].options[3] + '<span></span></div>';
$(".que-text").html(quesTag);
$(".option-list").html(optionTag);

/// to check for ans that was clicked
const option = $(".option");
for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
    
}
}


// effect when user clicks wrong or correct option
function optionSelected(answer) {
    clearInterval(timeCount);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[count].answer;
    let allOption = optionList.children(".option").length;
    let checkOption = optionList.children(".option");
    if(userAnswer===correctAnswer){
    answer.classList.add("correct");
    userScore++;
    console.log(userScore)
    console.log('correct')
    } else{
        answer.classList.add("wrong");
        console.log('wrong')
        //if useranswer is wrong,let the correct answer be ticked 
        for (let i = 0; i< allOption; i++) {
                if (checkOption[i].textContent == correctAnswer) {
                    checkOption[i].setAttribute("class", "option correct")
                }
            }
    }





    //once user selects an option all other options should be disabled
    for (let i = 0; i <allOption; i++) {
        optionList.children(".option")[i].classList.add("disabled");
        
    }
    $(".next-btn").css("display", "block");
}

// for the timer

function startTimer(time){
    timeCount = setInterval(timer, 1000);
    function timer(){
        $(".timer-sec").html(time);
        time--;
        if(time < 0){
            clearInterval(timeCount);
            $(".timer-sec").html("00");
        }
        if (time === 0){
            let correctAnswer = questions[count].answer;
            let allOption = optionList.children(".option").length;
            let checkOption = optionList.children(".option");

            
            // timer runs out, let all options run out
            for (let i = 0; i< allOption; i++) {
                if (checkOption[i].textContent == correctAnswer) {
                    checkOption[i].setAttribute("class", "option correct")
                }
            }

        
      //once timer runs out all other options should be disabled
    for (let i = 0; i <allOption; i++) {
        optionList.children(".option")[i].classList.add("disabled");
        
    $(".next-btn").css("display", "block");
            
        }
    }
    }
}




// for number at the bottom of footer to change as question changes
function totalQuestionCount(number) {
    let totalQuestionCount = '<span><p>' + number + '</p>of <p>' + questions.length + '</p>Questions</span>';
    $(".total-que").html(totalQuestionCount);
}

// show result box
function displayResultBox() {
    $(".quiz-rules").removeClass("activeRules"); // hide quiz rules
    $(".quiz-box").removeClass("activeRules");// hide quiz box
    $(".result-box").addClass("activeResult");//show result box
    if(userScore >= 10 ){
        let ScoreTag = '<span>Congrats, you scored <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        $(".score-text").html(ScoreTag);
    }
   else if(userScore >= 6  ){
        let ScoreTag = '<span>nice try, you scored <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        $(".score-text").html(ScoreTag);
    }else{
        let ScoreTag = '<span>and sorry, you only got<p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        $(".score-text").html(ScoreTag);
    }


}

//when replay btn is clicked
$(".restart").click(function(){
    $(".quiz-box").addClass("activeRules");
    $(".result-box").removeClass("activeResult");
count = 0;
 quesNumber = 1;
 timevalue = 10;
 userScore = 0;
displayQuestion(count);
totalQuestionCount(quesNumber);
clearInterval(timeCount);
startTimer(timevalue);
$(".next-btn").css("display", "none");

})
//this was removed for easy navigation of site
/* // quit quiz btn
$(".quit").click(function(){
    window.location.reload();
}) */
