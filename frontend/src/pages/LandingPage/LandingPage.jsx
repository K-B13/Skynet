import { useEffect, useState } from "react";
import { getRobotByUserId, lowerRobotBattery } from "../../services/robot";
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

    useEffect(() => {
        // const ONE_MINUTE = 60 * 1000; //Left this in incase anyone wants to test it out instead of waiting 30 mins
        const THIRTY_MINUTES = 30 * 60 * 1000;
        const intervalId = setInterval(async () => {
            try {
                const robot = await lowerRobotBattery(robotData._id);
                setRobotData(robot.robot);
                console.log('Battery lowered successfully');
            } catch (error) {
                console.error('Error decreasing battery:', error);
            }
        }, THIRTY_MINUTES);
        return () => clearInterval(intervalId);
    }, [robotData._id]);

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
            img={robotData.img}
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