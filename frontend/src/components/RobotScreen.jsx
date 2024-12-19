
import { FaRegHourglass } from "react-icons/fa";

import './RobotScreen.css'
const RobotScreen = (props) => {
    return (
        <div id='robot-screen'>
            <div id='robot-screen-main'>
                <div id='robot-screen-upper'>
                    <div id='currency-container'>
                        <div id='currency-container-inner'>
                            <p id='currency'>Currency ${props.currency}</p>
                        </div>
                    </div>
                    <div id='robot-image-container'>
                        {props.isLoading && <FaRegHourglass id='hourglass'/>}
                        <img id='robot-image' src={props.image}/> 
                    </div>
                    
                    <div id='robot-stats-container'>
                        <div id='robot-stats'>
                            <p id='name'>Name: {props.name} </p>
                            <p id='battery-life'> Battery: {props.batteryLife}%</p>
                            <p id='memory-capacity'>Memory: {props.memoryCapacity}GB</p>
                            <p id='intelligence'>Intelligence: {props.intelligence}</p>
                            <p id='hardware'>Hardware {props.hardware}%</p>
                            <p id='mood'>Mood: {props.mood}</p>
                            <p id='alive'>Condition: {props.isAlive ? 'Alive': 'Deceased'}</p>
                        </div>
                    </div>
                </div>
                
                <div id='robot-speach-container'>
                    {props.robotSpeach !== '' && <p
                    id='robot-speach'
                    >{props.robotSpeach}</p>}
                </div>
                <div id='robot-display-message-container'>
                    {
                        props.displayMessage &&
                        <p id='robot-display-message'>{props.displayMessage}</p>
                    }
                </div>
                {/* <div id='learning-fail-container'>
                    {props.didNotLearn && (
                        <p id="learning-fail">Sorry your robot failed to learn!</p>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default RobotScreen;
