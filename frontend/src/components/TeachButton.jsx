import { updateRobotIntelligence} from "../services/robot"
import { useState, useEffect } from "react";

const TeachButton = ({ showMessage, setRobotData, robotId, isAlive }) => {
    const [disableButton, setdisableButton] = useState(false);

    useEffect(() => {
        const checkAlive = async() => {
            try {
                
                if(isAlive === false){
                    setdisableButton(true);
                } else if(isAlive === true){
                    setdisableButton(false);
                }

            } catch (err) {
                console.error("error fetching user robot", err);
            }
        }
        checkAlive();
    }, [isAlive]);

    const handleTeach = async () => {
        try {
            const response = await updateRobotIntelligence(robotId);
            if(response.message === "Robot intelligence increased"){
                setRobotData(response.robot);
                return
            }
            if(response.message === "Robot intelligence did not increase"){
                showMessage(response.message)
                return
            }
            if(!response.robot) {
                showMessage(response.message)
                return
            }

        } catch (err) {
            console.error("error updating robot intelligence", err);
        }
    }

    return (
        <>
            <div id='teach-button-container'>
                <button id='teach-button' disabled={disableButton} onClick={handleTeach}>Teach</button>
            </div>
        </>
    )
}

export default TeachButton