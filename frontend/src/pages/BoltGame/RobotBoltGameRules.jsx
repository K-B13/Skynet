import { useEffect, useState } from "react";
import { getRobotByUserId} from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import RobotBoltGame from '../BoltGame/RobotBoltGame'
import "./RobotBoltGameRules.css"

const RobotBoltGameRules = () => {

    const [robotData, setRobotData] = useState({});
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const fetchRobot = async() => {
            const token = localStorage.getItem("token");
            const user = getPayloadFromToken(token);
            try {
                const robot = await getRobotByUserId(user.userId);
                console.log(robot.robot);
                
                setRobotData(robot.robot);
            } catch (err) {
                console.error("error fetching user robot", err);
            }
        }
        fetchRobot();
    }, []);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <div id="robot-bolt-game-page">
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
                <RobotBoltGame robotId={robotData._id} />
            )}
        
        </div>
    )
}

export default RobotBoltGameRules