import { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import Question from "./Question";
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


    return( 
    <div id="quiz">
        <Question
         key={activeQuestionIndex}       // per ricreare e distruggere il componente ogni volta che cambia activeQuestionIndex
         questionText={QUESTIONS[activeQuestionIndex].text}
         answers={QUESTIONS[activeQuestionIndex].answers}
         answerState={answerState}
         selectedAnswer={userAnswer[userAnswer.length -1]}
         onsSelectAnswer={handleSelectedAnswer}
         onSkipAnswer={handleSkipAnswer}
         />
    </div>
    );
}