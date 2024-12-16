import {useState } from "react";
import RobotBoltGame from '../BoltGame/RobotBoltGame'
import "./RobotBoltGameRules.css"
import { useLocation } from "react-router-dom";

const RobotBoltGameRules = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const location = useLocation()
    const { robotId } = location.state || '';

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
            <div id="robot-bolt-game-rules-container">
            <h1 id="bolt-game-title">Rules</h1>
            <p>When the game begins bolts will fall down, your job is to catch them which will earn you money!
            <br />
            <br />
            For every bolt you catch you will earn $1 if you miss a bolt the game will end.
            <br />
            <br/>
            The more bolts you catch the faster they will fall.
            </p>

            <h2 id="bolt-game-controls">Controls</h2>
                
            <p>Use your arrow keys to move left and right to catch the falling bolts</p>
            
            {!gameStarted ? (
                <button onClick={handleStartGame} id="bolt-game-start-button">
                    Start Game
                </button>
            ) : (
                <RobotBoltGame robotId={robotId} />
            )}
            </div>
    )
}

export default RobotBoltGameRules