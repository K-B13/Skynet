import VirusSweeperBoard from './VirusSweeperBoard.jsx'; 
import './VirusSweeperPage.css';  
import { useState, useEffect } from 'react';
import { getRobotByUserId} from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";

const VirusSweeperPage = () => {
const mineImage = '/assets/virus.png'; 
const [robotData, setRobotData] = useState({});

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

    return (
    <div id="minesweeper-page">
        <h1>Virus Sweeper</h1>
        <VirusSweeperBoard robotId={robotData._id}rows={10} cols={10} mineCount={20} mineImage={mineImage} />
    </div>
    );
};

export default VirusSweeperPage;
