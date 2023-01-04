import React from "react";
import { nanoid } from "nanoid";

export default function question(props) {
  // If show answer
  //   If answer correctly
  //     => "correct-answer"
  //   If answer wrongly
  //     => "wrong-selected-answer"
  // else
  //   selected answer: purple

  //Mapping expected here for each object
  const questionElements = (
    <div key={props.id} className="question">
      <h1
        className="question--title"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></h1>

      <div className="options-list">
        {/* Render the option */}
        {props.options.map((option) => (
          <button
            // ***** double class *****
            className={`option ${
              props.isShowAnswers && option === props.correct_answer
                ? "correct-answer"
                : props.isShowAnswers &&
                  option !== props.correct_answer &&
                  option === props.selectedAnswer
                ? "wrong-selected-answer"
                : option === props.selectedAnswer
                ? "selected-answer"
                : ""
            }`}
            onClick={() => props.handleSelectAnswer(props.id, option)} // We don't want invoke without clicking
            key={nanoid()}
            dangerouslySetInnerHTML={{ __html: option }}
            disabled={props.isShowAnswers}
          ></button>
        ))}
      </div>
      <hr />
    </div>
  );

  return <div>{questionElements}</div>;
}
