const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz(){
    // variable to store output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        const answers = [];
  
        for(letter in currentQuestion.answers){
  
          // add radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    quizContainer.innerHTML = output.join('');
  }


function showResults(){

    // gather answer containers
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of answers
    let numCorrect = 0;
  
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // checking if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
  
        answerContainers[questionNumber].style.color = 'green';
      }

      // wrong/blank ans
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers
    resultsContainer.innerHTML = "<b>Score: </b>"+ `<b>${numCorrect} / ${myQuestions.length}</b>`;
  }

const myQuestions = [
    {
      question: "Which of the following are false symptoms of Covid-19?",
      answers: {
        a: "Fever",
        b: "Cough",
        c: "Poor concentration",
        d: "Lost of taste/smell",
        e: "Loss of speech/mobility or confusion"
      },
      correctAnswer: "c"
    },
    {
      question: "Can the Covid-19 vaccines cause you to become magnetic?",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "b"
    },
    {
      question: "Who can contract Covid-19?",
      answers: {
        a: "Everyone",
        b: "Chidren",
        c: "Elderly",
        d: "Adults"
      },
      correctAnswer: "a"
    },
    {
        question: "Can home remedies (vitamin C, essential oils, fish tank cleaner, bleach etc.) cure and protect against Covid-19?",
        answers: {
          a: "Yes, defintely",
          b: "No, these do not protect and cure you against Covid-19 even if you sip it every 15 minutes.",
        },
        correctAnswer: "b"
    },
    {
        question: "Did Covid-19 start beacause people drank bat soup?",
        answers: {
          a: "Yes, obviously",
          b: "No, despite research showing that the virus may have started in animals, there is no evidence that soup was involved. ",
        },
        correctAnswer: "b"
    }
  ];

  
  
//start and display quiz
buildQuiz();
submitButton.addEventListener('click', showResults);

function ani() {
    document.getElementById('submit');
  }