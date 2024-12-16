import { useEffect, useState } from "react";
import { getRobotByUserId, lowerRobotBattery, deleteRobot } from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { useNavigate } from "react-router-dom";
import RobotScreen from "../../components/RobotScreen"
import MemoryButtons from "../../components/MemoryButtons"
import RepairButton from "../../components/RepairButton"
import SpeakButton from "../../components/SpeakButton"
import EnergyButtons from "../../components/EnergyButtons"
import KillButton from "../../components/KillButton"


const LandingPage = () => {
    const [robotData, setRobotData] = useState({});
    const [didNotLearn, setDidNotLearn] = useState(false)
    const [ robotSpeach, setRobotSpeach ] = useState('')
    const navigate = useNavigate();

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

    const constructSpeach = (dealWithOpinions) => {
        const initialGreetings = `Hello, I am ${robotData.name}. `
        const likes = dealWithOpinions(robotData.likes, 'like')
        const dislikes = dealWithOpinions(robotData.dislikes, 'dislike')
        setRobotSpeach(`${initialGreetings} ${likes} ${dislikes}`)
        speachClearance()
    }

    const speachClearance = () => {
        setTimeout(() => {
            setRobotSpeach('')
        }, 5000)
    }

    const createNewRobot =  async () => {
        try {
            const response = await deleteRobot(robotData._id);
            if(response.message === "Robot deleted"){
                navigate("/createrobot");
            }
        } catch (err) {
            console.error("error deleting user robot", err);
        }
    }

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
            isAlive={robotData.isAlive}
            robotSpeach={robotSpeach}
            />

        {didNotLearn && (
            <p id="learning-fail">Sorry your robot failed to learn!</p>

        )}

        <EnergyButtons
            setRobotData={setRobotData}
            isAlive={robotData.isAlive}
            robotId={robotData._id}
            batteryLife={robotData.batteryLife}/>
        <MemoryButtons
            robot={robotData}
            setRobotData={setRobotData}
            isAlive={robotData.isAlive}
            robotId={robotData._id}
            memoryCapacity={robotData.memoryCapacity}
            setDidNotLearn={setDidNotLearn}
        />
        <RepairButton
            setRobotData={setRobotData}
            isAlive={robotData.isAlive}
            robotId={robotData._id}/>
        <SpeakButton 
            constructSpeach={constructSpeach}
            isAlive={robotData.isAlive} 
            />
        <KillButton
            setRobotData={setRobotData}
            isAlive={robotData.isAlive}
            robotId={robotData._id}/>

        {!robotData.isAlive && 
            <button id='create-new-robot'
            onClick={createNewRobot}>
                Create New Robot
            </button>
        }
        </>
    )
}

export default LandingPage