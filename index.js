// ✅ Complete the design of a Quiz App.
// ✅ Develop the Quiz App with the following features:
// ✅ Show Random Questions for the Quiz.
// ✅ Start a timer for the X(say 15) seconds for user to answer a question.
// ✅ After 15 seconds a Next button should appear to navigate to the next question.
// ✅ If user is not selecting an answer within the 15 seconds, the right answer should be selected by default.
// ✅ When user selects a wrong answer, the right answer should be shown.
// ✅ A result should be shown at the end of all the questions.
// ✅ The result should also store the highest scorer and show that.
// ✅ There shold be a way to restart the game at the end.
// ✅ Non Functional Requirements:
// ✅ Good Look and Feel.
// ✅ Optimal usages of the timer.
// ✅ Clean code.

const quizData = [
  {
      question: "What does DOM stand for?",
      options: [
          "Document Order Model",
          "Document Object Model",
          "Data Object Method",
          "Direct Object Management"
      ],
      correct: 1
  },
  {
      question: "Which method selects by ID?",
      options: [
        "getElementById()",
        "querySelectorAll()",
        "getElement()",
        "getElementsByClassName()"
      ],
      correct: 0
    },
    {
      question: "Which event fires on input change?",
      options: ["click", "submit", "change", "keydown"],
      correct: 2
    }
];

//console.log(quizData[0].options[1]);

let questions = [...quizData].sort(()=>Math.random() -0.5);
console.log(questions);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const questionElm = document.getElementById("question");
const optionElm = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("timer");
const result = document.getElementById("result");


function loadQuestion(){
  clearInterval(timer);
  timeLeft = 15;
  upDateTimer();

  timer = setInterval(() => {
    countDown()
  }, 1000);
  //timer = setTimeout(countDown, 1000)


  const q = questions[currentQuestion];
  questionElm.textContent = `Q ${currentQuestion + 1}.  ${q.question}`;
  optionElm.innerHTML =""

  q.options.forEach((option, index)=>{
    let btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.addEventListener("click", ()=> selectAnswer(index, true))
    optionElm.appendChild(btn);
  });

  nextBtn.style.display = "none";
};


function countDown(){
    timeLeft--;
    upDateTimer();

    if(timeLeft === 0){
        clearInterval(timer);
        selectAnswer(questions[currentQuestion]?.correct, false)
    }
};

function upDateTimer(){
    timeEl.textContent = `⏱️ ${timeLeft}`
};

function selectAnswer(index, shouldScore){
    clearInterval(timer);
  const q = questions[currentQuestion]
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn)=>btn.disabled = "true")

  if(index === q.correct){
    shouldScore && score ++;
    buttons[index].classList.add("correct");
  }else{
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
};


nextBtn.addEventListener("click", ()=>{
  currentQuestion++;

  if(currentQuestion < questions.length ){
    loadQuestion();
  }else{
    //show the result

    showResult();
  }
});

function showResult(){
    nextBtn.style.display = "none";

    const highScore = localStorage.getItem("quizHighScore") || 0;

    const isNew = score > highScore;

    if(isNew){
      localStorage.setItem("quizHighScore", score);
    }

    result.innerHTML = `
    <h2>Hurray !!! Quiz completed</h2>
    <p>You have score ${score} out of ${questions.length} questions</p>
    <p>Highest Score : ${Math.max(score, highScore)}</p>
    ${isNew ? "<p>Hey, new high score </p>" : ""}
    <button onclick="location.reload()">Restart quiz</button>

    `
};


loadQuestion()










// **************************************************************

// let random  = Math.floor(Math.random() * 100) + 900;
// console.log(random);


// let arr = [1, 2, 3, 4, 5];
// let shuffled = arr.sort(() => Math.random() -0.5);

// console.log(shuffled); 

// let numbers = [10,5,100,120,80,75];

// console.log(numbers.sort((a,b)=>a-b))


// let students = [
//   {name : "Tarif", age :21},
//   {name : "Tasnim", age : 18},
//   {name : "Subol", age : 16}
// ]

// students.sort((a,b)=>a.age-b.age)
// console.log(students);