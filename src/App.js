import React, { useState, useEffect } from "react";
import Startpage from "./Components/Startpage";
import Question from "./Components/Question";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState(undefined);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [score, setScore] = useState({
    0: "wrong-answer",
    1: "wrong-answer",
    2: "wrong-answer",
    3: "wrong-answer",
    4: "wrong-answer",
  });

  useEffect(() => {
    if (!checkAnswers) {
      fetch(
        "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) =>
          setQuizData([
            data.results[0],
            data.results[1],
            data.results[2],
            data.results[3],
            data.results[4],
          ])
        );
      setScore({
        0: "wrong-answer",
        1: "wrong-answer",
        2: "wrong-answer",
        3: "wrong-answer",
        4: "wrong-answer",
      });
    }
  }, [checkAnswers]);

  const questions = () => {
    const newArray = [];
    for (let i = 0; i < 5; i++) {
      newArray.push(
        <Question
          data={quizData[i]}
          questionNumber={i}
          checkAnswers={checkAnswers}
          key={quizData[i].question}
          scoreNumber={scoreNumber}
        />
      );
    }
    return newArray;
  };

  const scoreNumber = (i, answer) => {
    setScore((prevScore) => ({ ...prevScore, [i]: answer }));
  };

  const clickCheckAnswers = () => {
    setCheckAnswers((prevState) => !prevState);
  };

  const clickStart = () => {
    setQuizStarted((prevQuizStarted) => !prevQuizStarted);
  };

  const scoreCounter = [score[0], score[1], score[2], score[3], score[4]];

  return (
    <>
      {quizData && quizStarted ? (
        <>
          {questions()}
          <div className="score-board">
            <h4>
              {checkAnswers &&
                `You scored ${
                  scoreCounter.filter((elem) => elem !== "wrong-answer").length
                }/${quizData.length} correct answers`}
            </h4>
            <button onClick={clickCheckAnswers}>
              {checkAnswers ? `Play again` : `Check answers`}
            </button>
          </div>
        </>
      ) : (
        <Startpage clickStart={clickStart} />
      )}
    </>
  );
};

export default App;
