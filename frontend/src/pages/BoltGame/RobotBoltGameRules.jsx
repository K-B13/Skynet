import { useEffect, useState } from "react";
import { getRobotByUserId} from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import RobotBoltGame from '../BoltGame/RobotBoltGame'
import "./RobotBoltGameRules.css"

const RobotBoltGameRules = () => {

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
        <div className="robot-bolt-game-page">
        {robotData._id ? (
            <RobotBoltGame robotId={robotData._id} />
        ) : (
            <p>Loading...</p> 
        )}
        </div>
    )
}

export default RobotBoltGameRules