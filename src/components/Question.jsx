import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
export default function Question({questionText, answers, onsSelectAnswer, selectedAnswer, answerState, onSkipAnswer}){
    return (        
    <div className="question">
        <QuestionTimer 
        timeout={10000} 
        onTimeout={onSkipAnswer}
         />
        <h2>{questionText}</h2>
        
        <Answers 
        answer={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onsSelectAnswer}
        />
    </div>
    )
}