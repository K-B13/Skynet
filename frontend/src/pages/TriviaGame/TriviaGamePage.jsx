import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";



export function TriviaGamePage() {
    const location = useLocation()
    const { robotId } = location.state || '';
    
    const [level, setLevel] = useState('')
    const navigate = useNavigate()

    const handleSelection = (e) =>{
        setLevel(e.target.value)
    }
    
    const handleStart = () =>{
        if(!level){
            console.log("NO LEVEL!");
        }
        else{
            navigate(`/triviagame/${level}?robotId=${robotId}`);
        }
    }
    
    
    return (
    <div id="trivia-game-rules-page">
        <h1>Welcome to the trivia game!</h1>
        <p>You will work through a selection of 20 questions, for every correct question your will gain $10 to spend on your Robot</p>
        <p> Please select your difficult level and then click start</p>
        <button value="easy"onClick={handleSelection}>Easy</button>
        <button value="medium"onClick={handleSelection}>Medium</button>
        <button value="hard"onClick={handleSelection}>Hard</button>
        <button onClick={handleStart}>Start</button>
    </div>
    );
}