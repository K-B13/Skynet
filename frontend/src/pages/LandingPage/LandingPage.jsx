import { useEffect, useState } from "react";
import { getRobotByUserId } from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import RobotScreen from "../../components/RobotScreen"
import MemoryButtons from "../../components/MemoryButtons"
import RepairButton from "../../components/RepairButton"
import SpeakButton from "../../components/SpeakButton"
import EnergyButtons from "../../components/EnergyButtons"
import KillButton from "../../components/KillButton"


const LandingPage = () => {

    const [robotData, setRobotData] = useState({});
    const [didNotLearn, setDidNotLearn] = useState(false)

    useEffect(() => {
        const fetchRobot = async() => {
            const token = localStorage.getItem("token");
            const user = getPayloadFromToken(token);
            try {
                const robot = await getRobotByUserId(user.userId);
                setRobotData(robot.robot);
            } catch (err) {
                console.error("error fetching user robot", err);
            }
        }
        fetchRobot();
    }, []);

    return (
        <>
        <RobotScreen
            name={robotData.name}
            currency={robotData.currency}
            batteryLife={robotData.batteryLife}
            memoryCapacity={robotData.memoryCapacity}
            intelligence={robotData.intelligence}
            hardware={robotData.hardware}
            mood={robotData.mood}
            image={robotData.image}
            isAlive={robotData.isAlive}/>
        {didNotLearn && (
            <p id="learning-fail">Sorry your robot failed to learn!</p>

        )}

        <EnergyButtons
            setRobotData={setRobotData}
            robotId={robotData._id}
            batteryLife={robotData.batteryLife}/>
        <MemoryButtons
            setRobotData={setRobotData}
            robotId={robotData._id}
            memoryCapacity={robotData.memoryCapacity}
            setDidNotLearn={setDidNotLearn}
        />
        <RepairButton
            setRobotData={setRobotData}
            robotId={robotData._id}/>
        <SpeakButton/>
        <KillButton
            setRobotData={setRobotData}
            robotId={robotData._id}/>
        </>
    )
}

export default LandingPage