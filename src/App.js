import "./App.css";
import React from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";
import shapeTop from "./images/yellow_blob.png";
import shapeBottom from "./images/blue_blob.png";

function App() {
  // for dynamic rendering starting page or quiz page
  const [isStart, setIsStart] = React.useState(false);
  // for dynamic rendering Check or Play again button
  const [isShowAnswers, setIsShowAnswers] = React.useState(false);

  // Flip from false to true
  // if user click check answer and not all answer is selected
  const [error, setError] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const apiLink = "https://opentdb.com/api.php?amount=5";

  // Get Question and Reshuffle Options
  React.useEffect(
    function () {
      fetch(apiLink)
        .then((res) => res.json())
        .then((data) =>
          setQuestions(
            data.results.map((result) => {
              // Still reshuffle options even when there's only 2 option (True and False question)
              // if (result.incorrect_answers.length > 1) {
              return {
                ...result,

                // Adding more key to each object

                options: [
                  result.correct_answer,
                  ...result.incorrect_answers,
                ].sort(() => Math.random() - 0.5),
                selectedAnswer: "",
                id: nanoid(),
              };
              // } else {
              //   return {
              //     ...result,

              //     options: [result.correct_answer, ...result.incorrect_answers],
              //     selectedAnswer: "",
              //     id: nanoid(),
              //   };
              // }
              // }
            })
          )
        );
    },
    [isStart]
  );

  function startGame() {
    setIsStart(true);
  }

  function handleSelectAnswer(id, option) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQuestion) => {
        return prevQuestion.id === id
          ? { ...prevQuestion, selectedAnswer: option }
          : prevQuestion;
      })
    );
  }

  function checkAnswer() {
    // const allAnswer = questions.selectedAnswer.every
    const allAnswered = questions.every(
      (question) => question.selectedAnswer !== ""
    );

    if (allAnswered) {
      for (let i = 0; i < questions.length; i++) {
        // console.log(questions[i]);
        // console.log(questions[i].correct_answer);
        if (questions[i].selectedAnswer === questions[i].correct_answer) {
          setScore((prevScore) => prevScore + 1);
        }
      }
      setError(false);
      setIsShowAnswers(true);
    } else {
      setError(true);
    }
  }

  function resetGame() {
    setIsShowAnswers(false);
    setScore(0);
    setIsStart((prev) => !prev);
  }

  const questionsEl = questions.map((question) => (
    <Question
      {...question}
      handleSelectAnswer={handleSelectAnswer}
      key={question.id}
      isShowAnswers={isShowAnswers}
    />
  ));

  return (
    <div className="App">
      <main className="container">
        <img className="shape-top" src={shapeTop} alt="Shape Top" />
        {isStart ? (
          <div>
            {questionsEl}

            {/* Check Answer */}

            {isShowAnswers ? (
              <div className="reset-flex">
                <p className="scores">You scored {score}/5 correct answer</p>
                <button className="check-btn" onClick={resetGame}>
                  Play again
                </button>
              </div>
            ) : (
              <div>
                {error && <p className="ErrorMessage">Answer All Questions</p>}
                <button className="check-btn" onClick={checkAnswer}>
                  Check answer
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={startGame}>Start quiz</button>
          </div>
        )}
      </main>
      <img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />
    </div>
  );
}

export default App;
