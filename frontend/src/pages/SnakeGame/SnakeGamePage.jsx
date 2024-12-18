import NavBar from '../NavBar/NavBar.jsx';
import './SnakeGamePage.css';  
import { useState,useRef } from 'react';
import { useLocation } from "react-router-dom";
import SnakeGame from './SnakeGame.jsx'


const SnakeGamePage = () => {
const [gameStarted, setGameStarted] = useState(false);
const audioRef = useRef(null);
const location = useLocation()
const { robotId } = location.state || '';


const handleStartGame = () => {
    setGameStarted(true);
    if (audioRef.current) {
        audioRef.current.play();
    }

    

};

    return (
    <div id="snake-game-page">
        <NavBar robotId={robotId}/>
        <h1>Snake Game</h1>
        {!gameStarted ? (
            <div id="snake-game-rules">
                    <h2>Rules</h2>
                    <p>The goal is to eat as much food as possible to earn $, you will earn 5 times your score, so if you eat 5 bits of food you will earn $25
                    <br />
                    <br />
                    The game ends when the snake:
                    <br />
                    <br />
                        Collides with the edge of the screen.
                        <br />
                        <br />
                        Collides with itself.
                    </p>
                    <br />
                    <br />
                    <h3>Movement</h3>
                    <p>
                    The snake continuously moves in the current direction (up, down, left, or right).
                    <br />
                    <br />
                    You can change the direction of the snake using your arrow keys.
                    <br />
                    <br />
                    The snake cannot turn directly back on itself (e.g., if moving left, you cannot immediately move right).
                    </p>
                    <h4>Food</h4>
                    <p>Food spawns randomly on the screen, and the snake must eat the food by moving its head onto the foods position.
                    <br />
                    <br />
                    Each time the snake eats food:
                    <br />
                    <br />
                    The snake grows longer by one segment.
                    <br />
                    <br />
                    You earn 1 point.
                    </p>
                    
                <button onClick={handleStartGame} id="snake-game-start-button">
                    Start Game
                </button>
                </div>
            ) : (
                <SnakeGame robotId={robotId} />

            )}
                <audio ref={audioRef} loop>
                <source src="/snakeGameMusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
                </audio>
    </div>
    );
};

export default SnakeGamePage;