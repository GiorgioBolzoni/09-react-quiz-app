import { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleteImg from "../assets/quiz-complete.png";
export default function Quiz(){

const [answerState, setAnswerState] = useState('');
    // const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);  NON NECESSARIO, si può ricavare in altro modo(vedi sotto): meglio gestire meno States
const[userAnswer, setUserAnswer] = useState([]); // memorizzo nell'array le risposte date

const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length -1; // se l'array è 0 la domanda sarà index 0 (=la prima) e così via
const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // completato se corrisponde al numero di domande

const handleSelectedAnswer = useCallback (function handleSelectedAnswer(selectedAnswer){
    setAnswerState ('answered');
    setUserAnswer((prevUserAnswer)=>{
        return [...prevUserAnswer, selectedAnswer];
    });

    setTimeout(()=>{
        if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
            setAnswerState ('correct');
        } else {
            setAnswerState ('wrong');
        }

        setTimeout(()=>{
            setAnswerState('');
        }, 2000); // dopo un secondo resetto lo stato di risposta
    }, 1000); 

}, [activeQuestionIndex]);

const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

if(quizIsComplete){
    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
);
}
// NB: inserisco questa logica di shuffle qui stotto l'if così che venga eseguito solo quando manca ancora 1 domanda da visualizzare

// creo un nuovo array per non modificare quello originale in cui devo tenere la 1 risposta come prima perchè la identifica come quella corretta
const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
shuffledAnswers.sort(() => Math.random() - 0.5); //mescola le domande il 50% delle volte (0.5), in quanto 'a' e 'b' (che sono sottintesi in (a,b)=>.....) genereranno il 50% delle volte un numero negativo (fino a -1) ed il 50% uno positivo (fino a 1)

    return( 
    <div id="quiz">
        <div className="question">
            <QuestionTimer 
            key={activeQuestionIndex}
            timeout={10000} 
            onTimeout={handleSkipAnswer}
             />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">                
                {shuffledAnswers.map((answer) => {
                    const isSelected = userAnswer[userAnswer.length - 1] === answer;
                    let cssClasses = '';

                    if(answerState === 'answered' && isSelected){
                        cssClasses = 'selected';
                    }

                    if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                        cssClasses = answerState;
                    }

                return    (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)} className={cssClasses}>
                            {answer}
                        </button>
                    </li>
                    )
                })}
            </ul>
            
        </div>
    </div>
    );
}