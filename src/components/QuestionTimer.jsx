import { useState, useEffect, StrictMode } from "react";
export default function QuestionTimer({timeout, onTimeout}){
const [remainingTime, setRemainingTime] = useState(timeout);

useEffect(()=>{
    console.log('SETTING TIMEOUT');
const timer = setTimeout(onTimeout, timeout);     // onTimeout è la funzione che viene chiamta ogni volta che il timer scade

return ()=>{
    clearTimeout(timer);
};

},[onTimeout, timeout])

useEffect(()=>{
    console.log('SETTING INTERVAL');
    const interval = setInterval(()=>{
        setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
    }, 10);

    return() => {
        clearInterval(interval);
    };  // devo usare questa Cleanup function per evitare che la funzione setInterval venga rieseguita 2 volte a causa dello StrictMode nel main.jsx

}, [])



      return <progress id="question-time" max={timeout} value={remainingTime}/>
}