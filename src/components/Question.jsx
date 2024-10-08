import { useState } from "react";
import Answers from "./Answers";
import QuizTimer from "./QuizTimer";
import questions from "../questions";

export default function Question({
  index,
  onTimeoutSelect,
  question,
  onSelectAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer !== "") {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  let cssClasses = "";

  function handleAnswerSelect(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === questions[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  if (answer.selectedAnswer !== "" && answer.isCorrect !== null) {
    cssClasses = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer !== "") {
    cssClasses = "answered";
  }

  return (
    <>
      <QuizTimer
        key={timer}
        timer={timer}
        onTimeout={answer.selectedAnswer === "" ? onTimeoutSelect : null}
        mode={cssClasses}
      />
      <h2>{question.text}</h2>
      <Answers
        index={index}
        answer={answer}
        handleAnswerSelect={handleAnswerSelect}
        cssClasses={cssClasses}
      />
    </>
  );
}
