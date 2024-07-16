import { useState } from "react";
import QUESTIONS from "../questions";
export default function Quiz(){
// const[activeQuestionIndex, setActiveQuestionIndex] = useState(0);  NON NECESSARIO, si può ricavare in altro modo(vedi sotto): meglio gestire meno States
const[userAnswer, setUserAnswer] = useState([]); // memorizzo nell'array le risposte date

const activeQuestionIndex = userAnswer.length; // se l'array è 0 la domanda sarà index 0 (=la prima) e così via

function handleSelectedAnswer(selectedAnswer){
    setUserAnswer((prevUserAnswer)=>{
        return [...prevUserAnswer, selectedAnswer];
    });
};

    return <div id="quiz">
        <div className="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">                
                {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}