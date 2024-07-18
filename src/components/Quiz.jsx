import { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleteImg from "../assets/quiz-complete.png";
export default function Quiz(){
// const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);  NON NECESSARIO, si può ricavare in altro modo(vedi sotto): meglio gestire meno States
const[userAnswer, setUserAnswer] = useState([]); // memorizzo nell'array le risposte date

const activeQuestionIndex = userAnswer.length; // se l'array è 0 la domanda sarà index 0 (=la prima) e così via
const quizIsComplete = activeQuestionIndex === QUESTIONS.length; // completato se corrisponde al numero di domande

const handleSelectedAnswer = useCallback (function handleSelectedAnswer(selectedAnswer){
    setUserAnswer((prevUserAnswer)=>{
        return [...prevUserAnswer, selectedAnswer];
    });
}, []);

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
                {shuffledAnswers.map((answer) => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
            
        </div>
    </div>
    );
}