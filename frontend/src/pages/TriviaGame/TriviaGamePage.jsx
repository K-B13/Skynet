import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import './TriviaGamePage.css'
import NavBar from "../NavBar/NavBar";


export function TriviaGamePage() {
    const location = useLocation()
    const { robotId } = location.state || '';
    const [easyButtonClicked, setEasyButtonClicked] = useState(false)
    const [mediumButtonClicked, setMediumButtonClicked] = useState(false)
    const [hardButtonClicked, setHardButtonClicked] = useState(false)
    
    const [level, setLevel] = useState('')
    const navigate = useNavigate()

    const handleSelection = (e) =>{
        setLevel(e.target.value)
        if(e.target.value === 'easy'){
            setEasyButtonClicked(true)
            setMediumButtonClicked(false) 
            setHardButtonClicked(false) 
        } else if(e.target.value === 'medium'){
            setEasyButtonClicked(false)
            setMediumButtonClicked(true)
            setHardButtonClicked(false) 
        } else if(e.target.value === 'hard'){
            setEasyButtonClicked(false)
            setMediumButtonClicked(false) 
            setHardButtonClicked(true) 
        }

    }
    
    const handleStart = () =>{
        if(!level){
            console.log("NO LEVEL!");
        }
        else{
            navigate(`/triviagame/${level}?robotId=${robotId}`);
        }
    }
    
    // const handleClick = () => {
    //     const buttons = document.querySelectorAll('.difficulty-buttons');
    //     buttons.forEach(button => {
    //         button.addEventListener('click', () => {
    //             document.querySelector('.clicked')?.classList.remove('clicked');
    //             button.classList.add('clicked');
    //         });
    //     });        
    // }


    return (
    <div id="trivia-game-rules-page">
        <NavBar robotId={robotId}/>
        <div id="trivia-game-rules-container">
        <h1>Welcome to the trivia game!</h1>
        <p>You will work through a selection of 20 questions, for every correct question you will gain $ to spend on your Robot</p>
        <h2>Scoring</h2>
        <p>Easy level will give you $5 x your final score
            <br/>
            <br/>
            Medium level will give you $10 x your final score
            <br/>
            <br/>
            Hard level will give you $15 x your final score
        </p>
        <h3> Please select your difficulty level</h3>
        <button className={easyButtonClicked ? 'clicked' : ''} value="easy"onClick={handleSelection}>Easy</button>
        <button className={mediumButtonClicked ? 'clicked' : ''} value="medium"onClick={handleSelection}>Medium</button>
        <button className={hardButtonClicked ? 'clicked' : ''} value="hard"onClick={handleSelection}>Hard</button>
        <p>Click start to start the game</p>
        <button onClick={handleStart}>Start</button>
        </div>
    </div>
    );
}