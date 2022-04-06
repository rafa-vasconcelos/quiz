import React, {useState, useEffect, useMemo} from "react"
import { shuffle } from "lodash"
import { nanoid } from 'nanoid'
import he from "he"
 
export default function Question(props,) {
        
    const [clickedAnswer, setClickedAnswer] = useState(-1)
    
    useEffect(() => setClickedAnswer(-1), [props.data])
    
    useEffect(() => {
        if(!props.checkAnswers) {
            setClickedAnswer(-1)
        }
    }, [props.checkAnswers])
        
    const questions = useMemo(() => {
        return shuffle([
        {
            data: props.data.incorrect_answers[0],
            id: 'wrong-answer',
            onClick: (i, id) => () => {               
                setClickedAnswer(i);
                props.scoreNumber(props.questionNumber, id)               
            },
        },
        {
            data: props.data.incorrect_answers[1],
            id: 'wrong-answer',
            onClick: (i, id) => () => {                
                setClickedAnswer(i);
                props.scoreNumber(props.questionNumber, id)               
            },
        },
        {
            data: props.data.incorrect_answers[2],
            id: 'wrong-answer',
            onClick: (i, id) => () => {                
                setClickedAnswer(i);
                props.scoreNumber(props.questionNumber, id)                              
            },
        },
        {
            data: props.data.correct_answer,
            id: nanoid(),
            onClick: (i, id) => () => {
                // console.log('correct answer')                
                setClickedAnswer(i);
                props.scoreNumber(props.questionNumber, id)                                
            },
        },
    ])}, [props.data])
           
   function buttonColor(item, i) {
       if(!props.checkAnswers) {
           return clickedAnswer === i ? 'clicker' : undefined
        } else if(props.checkAnswers && item.data === props.data.correct_answer){
            return 'green-answer'
        } else if(props.checkAnswers && clickedAnswer === i && item.data !== props.data.correct_answer) {
            return 'red-answer'
        } else {
            return 'unclicked-answer'
        }
    }
            
    const buttons = questions.map((item, i) => <button id={i}
                key={i} 
                onClick={!props.checkAnswers ? item.onClick(i, item.id) : undefined}
                className={buttonColor(item, i)}
                >{he.decode(item.data)}</button>)
                
    return (
        <div className="questions">
            <h3>{he.decode(props.data.question)}</h3>
            <div className="answers">
                {buttons}                
            </div>
            <hr/>
        </div>
    )
}