
import { useEffect, useState, useRef } from "react";
import { getRobotByUserId, lowerRobotBattery, deleteRobot, getRobotSpeach } from "../../services/robot";

import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions";
import { useNavigate } from "react-router-dom";
import RobotScreen from "../../components/RobotScreen";
import MemoryButtons from "../../components/MemoryButtons";
import RepairButton from "../../components/RepairButton";
import SpeakButton from "../../components/SpeakButton";
import EnergyButtons from "../../components/EnergyButtons";
import KillButton from "../../components/KillButton";
import './LandingPage.css';
import NavBar from "../NavBar/NavBar";
import TeachButton from "../../components/TeachButton";


const LandingPage = () => {
    const [robotData, setRobotData] = useState({});
    const [ robotSpeach, setRobotSpeach ] = useState('')
    const [showSergei, setShowSergei] = useState(false);
    const [renderImage, setRenderImage] = useState(false);

    const [renderTerminatorImage, setRenderTerminatorImage] =useState(false)
    const [showTerminator, setShowTerminator] = useState(false)
    const audioRef = useRef(null);
    const audioRef2 = useRef(null);
    const chance = Math.floor(Math.random() * 5);
    const [flash, setFlash] = useState(false);
    const [ displayMessage, setDisplayMessage ] = useState('')
    const [disabled, setdisabled] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    const messageTimeoutRef = useRef(null);

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
    
    useEffect(() => {
        // const ONE_MINUTE = 60 * 1000; //Left this in incase anyone wants to test it out instead of waiting 30 mins
        const THIRTY_MINUTES = 30 * 60 * 1000;
        const intervalId = setInterval(async () => {
            try {
                const robot = await lowerRobotBattery(robotData._id);
                setRobotData(robot.robot);
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
        setIsLoading(true)
        let duration;
        if (robotData.intelligence <= 100){
            const initialGreetings = `Hello, I am ${robotData.name}. `
            const likes = dealWithOpinions(robotData.likes, 'like')
            const dislikes = dealWithOpinions(robotData.dislikes, 'dislike')
            const sentence = `${initialGreetings} ${likes} ${dislikes}`
            duration = calculateSpeechDuration(sentence)
            setRobotSpeach(sentence)
        } else {
            const response = await getRobotSpeach(robotData._id)
            if (response.audio) {
                const audio = new Audio(response.audio);
                audio.play()
            }
            duration = calculateSpeechDuration(response.message)
            setRobotSpeach(response.message)
        }
        setIsLoading(false)
        speachClearance(duration)
    }

    useEffect(() => {
        if (robotData.isAlive === false) {
            setdisabled(true)
            if(chance ===1){
                setFlash(true)
                setRenderTerminatorImage(true); 
                setTimeout(() => setShowTerminator(true), 10);
                audioRef2.current.play();
                const timer = setTimeout(() => {
                    setShowTerminator(false); 
                    setTimeout(() => setRenderTerminatorImage(false), setFlash(false), audioRef2.current.pause(), 1000);
                }, 11000);

                return () => clearTimeout(timer);
            }
            else{
                audioRef.current.play();
            }
        }
    }, [robotData.isAlive]);

    const handleAudioEnded = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef2.current.pause();
        audioRef2.current.currentTime = 0;
    };

    const calculateSpeechDuration = (speech) => {
        const words = speech.split(/\s+/).length;
        const speechRate = 100
        const duration = (words / speechRate) * 60 
        return duration
    }

    const speachClearance = (duration) => {
        setTimeout(() => {
            setRobotSpeach('')
        }, duration * 1000)
    }

    const createNewRobot =  async () => {
        try {
            const response = await deleteRobot(robotData._id);
            if(response.message === "Robot deleted"){
                navigate("/createrobot", {state: {allowAccess: true}});
            }
        } catch (err) {
            console.error("error deleting user robot", err);
        }
    }

    const showMessage = (message) => {
        setDisplayMessage(message)
    }

    const displayMessageClearance = () => {
        if(messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current)
        }

        messageTimeoutRef.current = setTimeout(() => {
            setDisplayMessage('')
        }, 6000)
    }

    // useEffect(() => {
    //     if (didNotLearn) {
    //         const timeoutId = setTimeout(() => {
    //         setDidNotLearn(false);
    //         }, 5000);

    //         return () => clearTimeout(timeoutId);
    //     }
    //     }, [didNotLearn]);

    return (
        <>
            <div id="landing-page">
                <NavBar robotId={robotData._id}/>
                <div className={`overlay ${flash ? "flash" : ""}`}></div>
                <div id='landing-page-container'>
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
                        isLoading={isLoading}
                        />

                    <div id='button-container'>
                        <div id='main-upper-button-container'>
                            <div id='left-button-container'>
                                <div id='left-upper-button-container'>
                                    <RepairButton
                                        showMessage={showMessage}
                                        setRobotData={setRobotData}
                                        robotId={robotData._id}
                                        isAlive={robotData.isAlive}
                                    />
                                </div>
                                <div id='left-middle-button-container'>
                                    <EnergyButtons
                                        showMessage={showMessage}
                                        setRobotData={setRobotData}
                                        robotId={robotData._id}
                                        batteryLife={robotData.batteryLife}
                                        isAlive={robotData.isAlive}
                                    />
                                </div>
                                <div id='left-lower-button-container'>
                                    <TeachButton 
                                        showMessage={showMessage}
                                        setRobotData={setRobotData}
                                        robotId={robotData._id}
                                        isAlive={robotData.isAlive}
                                    />
                                </div> 
                            </div>
                            <div id='right-button-container'>
                                <MemoryButtons
                                    showMessage={showMessage}
                                    setRobotData={setRobotData}
                                    robotId={robotData._id}
                                    memoryCapacity={robotData.memoryCapacity}
                                    isAlive={robotData.isAlive}
                                />
                                <SpeakButton 
                                    constructSpeach={constructSpeach} 
                                    isAlive={robotData.isAlive}
                                    isLoading={isLoading}
                                />
                                {
                                    !robotData.isAlive ? 
                                        <button 
                                            id='create-new-robot'
                                            onClick={createNewRobot}
                                        >
                                            Create New Robot
                                        </button> :
                                        <KillButton
                                            showMessage={showMessage}
                                            setRobotData={setRobotData}
                                            robotId={robotData._id}
                                            isAlive={robotData.isAlive}
                                        />
                                }
                            </div>
                        </div>
                        <div id='main-lower-button-container'>
                            <button 
                                disabled={disabled}
                                id="play-games-button"
                                onClick={() => {
                                    navigate('/gameselection', {
                                        state: {
                                            robotId: robotData._id
                                        }
                                })}}
                            >Games</button>
                        </div>
                    </div>
                        <div id='button-container-lower'>
                            {renderTerminatorImage && (
                                <img src="terminatorImage.png" alt="Machine uprising" id="terminator-image" className={showTerminator ? "show" : "hide"} />
                            )}
                        </div>
                    {renderImage && (
                        <img src="sergeiWarning.png" alt="Sergei money tip" id="sergei-tip-image" className={showSergei ? "show" : "hide"} />
                    )}
                </div>
                <audio 
                    ref={audioRef} 
                    onEnded={handleAudioEnded}>
                    <source 
                        src="/terminatorBeBack.mp3" 
                        type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
                <audio 
                    ref={audioRef2} 
                    onEnded={handleAudioEnded}>
                    <source 
                        src="/terminatorMusic.mp3" 
                        type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>
    )
}

export default LandingPage