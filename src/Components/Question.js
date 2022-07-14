import React, { useState, useEffect, useMemo } from "react";
import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import he from "he";
import PropTypes from "prop-types";

const Question = (props) => {
  Question.propTypes = {
    data: PropTypes.object,
    checkAnswers: PropTypes.bool,
    scoreChanger: PropTypes.func,
    questionNumber: PropTypes.number,
  };

  const [clickedAnswer, setClickedAnswer] = useState(-1);

  useEffect(() => setClickedAnswer(-1), [props.data]);

  useEffect(() => {
    if (!props.checkAnswers) {
      setClickedAnswer(-1);
    }
  }, [props.checkAnswers]);

  const questions = useMemo(() => {
    return shuffle([
      {
        data: props.data.incorrect_answers[0],
        id: "wrong-answer",
        onClick: (i, id) => () => {
          setClickedAnswer(i);
          props.scoreChanger(props.questionNumber, id);
        },
      },
      {
        data: props.data.incorrect_answers[1],
        id: "wrong-answer",
        onClick: (i, id) => () => {
          setClickedAnswer(i);
          props.scoreChanger(props.questionNumber, id);
        },
      },
      {
        data: props.data.incorrect_answers[2],
        id: "wrong-answer",
        onClick: (i, id) => () => {
          setClickedAnswer(i);
          props.scoreChanger(props.questionNumber, id);
        },
      },
      {
        data: props.data.correct_answer,
        id: nanoid(),
        onClick: (i, id) => () => {
          setClickedAnswer(i);
          props.scoreChanger(props.questionNumber, id);
        },
      },
    ]);
  }, [props.data]);

  const buttonColor = (item, i) => {
    if (!props.checkAnswers) {
      return clickedAnswer === i ? "clicker" : undefined;
    } else if (props.checkAnswers && item.data === props.data.correct_answer) {
      return "green-answer";
    } else if (
      props.checkAnswers &&
      clickedAnswer === i &&
      item.data !== props.data.correct_answer
    ) {
      return "red-answer";
    } else {
      return "unclicked-answer";
    }
  };

  const buttons = questions.map((item, i) => (
    <button
      id={i}
      key={i}
      onClick={!props.checkAnswers ? item.onClick(i, item.id) : undefined}
      className={buttonColor(item, i)}
    >
      {he.decode(item.data)}
    </button>
  ));

  return (
    <div className="question">
      <h3>{he.decode(props.data.question)}</h3>
      <div className="answer">{buttons}</div>
      <hr />
    </div>
  );
};

export default Question;
