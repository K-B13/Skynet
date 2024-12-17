import { useEffect, useState } from "react";
import { getRobotByUserId, lowerRobotBattery, deleteRobot, getRobotSpeach } from "../../services/robot";
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { useNavigate } from "react-router-dom";
import RobotScreen from "../../components/RobotScreen"
import MemoryButtons from "../../components/MemoryButtons"
import RepairButton from "../../components/RepairButton"
import SpeakButton from "../../components/SpeakButton"
import EnergyButtons from "../../components/EnergyButtons"
import KillButton from "../../components/KillButton"
import './LandingPage.css'


const LandingPage = () => {
    const [robotData, setRobotData] = useState({});
    const [didNotLearn, setDidNotLearn] = useState(false)
    const [ robotSpeach, setRobotSpeach ] = useState('')
    const [showSergei, setShowSergei] = useState(false);
    const [renderImage, setRenderImage] = useState(false);
    const [ displayMessage, setDisplayMessage ] = useState('')

    const navigate = useNavigate()

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
        displayMessageClearance()
    }, [displayMessage])

    console.log("MY ROBOT IS ALIVE: ", robotData.isAlive);
    
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

    useEffect(() => {
        if (robotData.currency < 50) {
            setRenderImage(true); 
            setTimeout(() => setShowSergei(true), 10);
            const timer = setTimeout(() => {
                setShowSergei(false); 
                setTimeout(() => setRenderImage(false), 1000);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [robotData.currency]);

    const constructSpeach = async (dealWithOpinions) => {
        if (robotData.intelligence <= 100){
            const initialGreetings = `Hello, I am ${robotData.name}. `
            const likes = dealWithOpinions(robotData.likes, 'like')
            const dislikes = dealWithOpinions(robotData.dislikes, 'dislike')
            setRobotSpeach(`${initialGreetings} ${likes} ${dislikes}`)
        } else {

            const response = await getRobotSpeach(robotData._id)
            if (response.audio) {
                const audio = new Audio(response.audio);
                audio.play()
            }
            setRobotSpeach(response.message)
        }
        speachClearance()
    }

    const speachClearance = () => {
        setTimeout(() => {
            setRobotSpeach('')
        }, 8000)
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

    const showMessage = (message) => {
        setDisplayMessage(message)
    }

    const displayMessageClearance = () => {
        setTimeout(() => {
            setDisplayMessage('')
        }, 6000)
    }

    return (
        <>
        <div className="landing-page">
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
            displayMessage={displayMessage}
            />

        {didNotLearn && (
            <p id="learning-fail">Sorry your robot failed to learn!</p>

        )}

        <div id='button-container'>
            <div id='button-contianer-upper'>
                <EnergyButtons
                    showMessage={showMessage}
                    setRobotData={setRobotData}
                    robotId={robotData._id}
                    batteryLife={robotData.batteryLife}
                    isAlive={robotData.isAlive}/>
                <MemoryButtons
                    showMessage={showMessage}
                    setRobotData={setRobotData}
                    robotId={robotData._id}
                    memoryCapacity={robotData.memoryCapacity}
                    setDidNotLearn={setDidNotLearn}
                    isAlive={robotData.isAlive}
                />
                <RepairButton
                    showMessage={showMessage}
                    setRobotData={setRobotData}
                    robotId={robotData._id}
                    isAlive={robotData.isAlive}/>
            </div>
            <div id='button-contianer-lower'>
                <SpeakButton 
                    constructSpeach={constructSpeach} 
                    isAlive={robotData.isAlive}
                    />
                <KillButton
                    showMessage={showMessage}
                    setRobotData={setRobotData}
                    robotId={robotData._id}
                    isAlive={robotData.isAlive}/>
                    {!robotData.isAlive && 
                    <button id='create-new-robot'
                    onClick={createNewRobot}>
                    Create New Robot
                    </button>
                    }
            <button id="play-games-button"
            onClick={() => {navigate('/gameselection', {
                state: {
                    robotId: robotData._id
                }
            })}}
            >Play games</button>
            </div>
        </div>
        
        {renderImage && (
            <img src="sergeiWarning.png" alt="Sergei money tip" id="sergei-tip-image" className={showSergei ? "show" : "hide"} />
        )}
        </div>
        </>
    )
}

export default LandingPage