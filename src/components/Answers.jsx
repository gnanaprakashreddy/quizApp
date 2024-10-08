import { useRef, useState } from "react";
import questions from "../questions";

export default function Answers({
  index,
  answer,
  handleAnswerSelect,
  cssClasses,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...questions[index].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((ans, id) => {
        let cssClass = "";
        if (answer.selectedAnswer === ans) {
          cssClass = cssClasses;
        }
        return (
          <li className="answer" key={id}>
            <button
              onClick={() => handleAnswerSelect(ans)}
              className={cssClass}
              disabled={answer.selectedAnswer !== ""}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
