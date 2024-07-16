import { useState } from "react";
import QUESTIONS from "../questions";
export default function Quiz(){
// const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);  NON NECESSARIO, si può ricavare in altro modo(vedi sotto): meglio gestire meno States
const[userAnswer, setUserAnswer] = useState([]); // memorizzo nell'array le risposte date

const activeQuestionIndex = userAnswer.length; // se l'array è 0 la domanda sarà index 0 (=la prima) e così via

// creo un nuovo array per non modificare quello originale in cui devo tenere la 1 risposta come prima perchè la identifica come quella corretta
const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
shuffledAnswers.sort(() => Math.random() - 0.5); //mescola le domande il 50% delle volte (0.5), in quanto 'a' e 'b' (che sono sottintesi in (a,b)=>.....) genereranno il 50% delle volte un numero negativo (fino a -1) ed il 50% uno positivo (fino a 1)

function handleSelectedAnswer(selectedAnswer){
    setUserAnswer((prevUserAnswer)=>{
        return [...prevUserAnswer, selectedAnswer];
    });
};

    return <div id="quiz">
        <div className="question">
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
}