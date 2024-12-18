import NavBar from '../NavBar/NavBar.jsx';
import VirusSweeperBoard from './VirusSweeperBoard.jsx'; 
import './VirusSweeperPage.css';  
import { useState,useRef } from 'react';
import { useLocation } from "react-router-dom";


const VirusSweeperPage = () => {
const mineImage = '/assets/virus.png'; 
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
    <div id="virus-sweeper-page">
        <NavBar robotId={robotId}/>
        <h1>Virus Sweeper</h1>
        {!gameStarted ? (
            <div id="virus-sweeper-rules">
                    <h2>Rules</h2>
                    <p>The goal is to reveal all the cells that do not contain a virus.
                    <br />
                    <br />
                    Each revealed cell shows a number indicating how many adjacent cells contain mines. 
                    <br />
                    <br />
                    Cells with no adjacent mines are revealed automatically.
                    <br />
                    <br/>
                    The game is won when all non-virus cells are revealed.
                    <br />
                    <br />
                    You will score a point for every safe cell you reveal. 1 point is equal to $1
                    </p>
        
                    <h3 id="virus-sweeper-controls">Controls</h3>
                    <p>Use your mouse to click on a cell to reveal it. If the cell contains a virus, the game is over.</p>
                <button onClick={handleStartGame} id="virus-sweeper-start-button">
                    Start Game
                </button>
                </div>
            ) : (
                <VirusSweeperBoard robotId={robotId}rows={10} cols={10} mineCount={20} mineImage={mineImage} />

            )}
                <audio ref={audioRef} loop>
                <source src="/virussweepermusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
                </audio>
    </div>
    );
};

export default VirusSweeperPage;
