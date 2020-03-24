import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Question from './Question';
import HUD from './HUD';
import { loadQuestions } from '../helpers/questionsHelper';
import SaveScoreForm from './SaveScoreForm';

export default function Game( { history }) {

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);

    useEffect( () => {
        loadQuestions()
            .then( setQuestions )
            .catch( console.error )
    },[]);


    const changeQuestion = useCallback( (bonus = 0) => {
        if(questions.length === 0) {
            setDone(true);
            return setScore(score + bonus);
        }

        // get random index of question
        const randomQuestionIndex = Math.floor( Math.random() * questions.length )

        // set current question to that random index
        const currentQuestion = questions[randomQuestionIndex];

        // remove that question from the questions going forward
        const remainingQuestions = [...questions];
        remainingQuestions.splice(randomQuestionIndex, 1);
        // update state to reflect changes
        setQuestions(remainingQuestions);
        setCurrentQuestion(currentQuestion);
        setLoading(false);
        setScore(score + bonus);
        setQuestionNumber(questionNumber + 1);
    }, [score, questions, questionNumber, setQuestions, setLoading, setQuestionNumber, setCurrentQuestion]);

    const scoreSaved = () => {
        history.push('/');
    };

    useEffect( () => {
        if(!currentQuestion && questions.length) {
            changeQuestion();
        }
    }, [currentQuestion, questions, changeQuestion]);

    return (
        <Fragment>
            {loading && !done && <div id="loader" />}
            {!done
                && !loading
                && currentQuestion && (
                <>
                    <HUD score={score} questionNumber={questionNumber} />
                    <Question
                        question={currentQuestion}
                        changeQuestion={changeQuestion}
                    />
                </>
            )}
            {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}

        </Fragment>
    )
}
