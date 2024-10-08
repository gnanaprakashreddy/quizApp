import { useCallback, useEffect } from "react";
import questions from "../questions";
import { useState } from "react";

import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const questionIdx = selectedAnswers.length;
  const quizIsComplete = questionIdx === questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setSelectedAnswers((prevState) => {
      return [...prevState, answer];
    });
  }, []);

  const handleAnswerSkip = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  function restartQuiz() {
    setSelectedAnswers([]);
  }

  if (quizIsComplete) {
    return (
      <Summary userAnswers={selectedAnswers} handleRestart={restartQuiz} />
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={questionIdx}
          index={questionIdx}
          onTimeoutSelect={handleAnswerSkip}
          question={questions[questionIdx]}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
