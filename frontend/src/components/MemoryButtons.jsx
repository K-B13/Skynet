import { updateRobotMemory } from "../services/robot"
import { useState, useEffect } from "react";

const MemoryButtons = (props) => {
    const [disableButton, setdisableButton] = useState(false);

    useEffect(() => {
        const checkAlive = async() => {
            try {
                
                if(props.isAlive === false){
                    setdisableButton(true);
                } else if(props.isAlive === true){
                    setdisableButton(false);
                }

            } catch (err) {
                console.error("error fetching user robot", err);
            }
        }
        checkAlive();
    }, [props.isAlive]);

    // const handleTeach = async () => {
    //     try {
    //         const response = await updateRobotIntelligence(props.robotId);
    //         if(response.message === "Robot intelligence increased"){
    //             props.setRobotData(response.robot);
    //         }
    //         if(response.message === "Robot intelligence did not increase"){
    //             props.setDidNotLearn(true)
    //         }
    //         if(!response.robot) {
    //             props.showMessage(response.message)
    //             return
    //         }

    //     } catch (err) {
    //         console.error("error updating robot intelligence", err);
    //     }
    // }

    const handleUpgrade = async () => {
        try {
            const response = await updateRobotMemory(props.robotId);
            if(response.message === "Robot memory upgraded"){
                props.setRobotData(response.robot);
            } else if (!response.robot) {
                props.showMessage(response.message)
                return
            }
    
        } catch (err) {
            console.error("error upgrading robot Memory", err);
        }
    }

    // const handleCashGrab = async () => {
    //     try {
    //         const response = await updateRobotCurrency(props.robotId, 500);
    //         if(response.message === "robot currency updated"){
    //             props.setRobotData(response.robot);
    //         }
            
    
    //     } catch (err) {
    //         console.error("error upgrading robot Memory", err);
    //     }
    // }

    return (
        <>
            <div id='memory-buttons'>
                {/* <button id='teach-button' disabled={disableButton} onClick={handleTeach}>teach</button> */}
                <button id='upgrade-button' disabled={disableButton} onClick={handleUpgrade}>Upgrade Memory</button>
                {/* <button id='add-cash' disabled={disableButton} onClick={handleCashGrab}>ADD CASH</button> */}
            </div>
        </>

    )
}

export default MemoryButtons