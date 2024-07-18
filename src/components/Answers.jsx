import { useRef } from "react";
export default function Answers({answer, selectedAnswer, answerState, onSelect}){
    const shuffledAnswers = useRef();
// creo un nuovo array per non modificare quello originale in cui devo tenere la 1 risposta come prima perchè la identifica come quella corretta
if(!shuffledAnswers.current){
    shuffledAnswers.current = [...answer];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //mescola le domande il 50% delle volte (0.5), in quanto 'a' e 'b' (che sono sottintesi in (a,b)=>.....) genereranno il 50% delle volte un numero negativo (fino a -1) ed il 50% uno positivo (fino a 1)
    }


    return(
        <ul id="answers">                
                {shuffledAnswers.current.map((answer) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClasses = '';

                    if(answerState === 'answered' && isSelected){
                        cssClasses = 'selected';
                    }

                    if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                        cssClasses = answerState;
                    }

                return    (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssClasses}>
                            {answer}
                        </button>
                    </li>
                    )
                })}
            </ul>
    )
}