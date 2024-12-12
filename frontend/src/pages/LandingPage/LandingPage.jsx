import { useEffect, useState } from "react";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import RobotScreen from "../../components/RobotScreen"
import MemoryButtons from "../../components/MemoryButtons"
import RepairButton from "../../components/RepairButton"
import SpeakButton from "../../components/SpeakButton"
import EnergyButtons from "../../components/EnergyButtons"
import { getRobotByUserId } from "../../services/robot";

const LandingPage = () => {

    const [robotData, setRobotData] = useState([]);

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
            img={robotData.img}/>
        <EnergyButtons
            setRobotData={setRobotData}
            robotId={robotData._id}
            batteryLife={robotData.batteryLife}/>
        <MemoryButtons/>
        <RepairButton
            setRobotData={setRobotData}
            robotId={robotData._id}/>
        <SpeakButton/>
        </>
    )
}

export default LandingPage