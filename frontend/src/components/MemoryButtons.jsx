import {updateRobotMemory, updateRobotIntelligence, updateRobotCurrency} from "../services/robot"

const MemoryButtons = (props) => {
    const handleTeach = async () => {
        try {
            const response = await updateRobotIntelligence(props.robotId, 5);
            if(response.message === "Robot intelligence increased"){
                props.setRobotData(response.robot);
            }
            if(response.message === "Robot intelligence did not increase"){
                props.setDidNotLearn(true)
            }
        } catch (err) {
            console.error("error updating robot intelligence", err);
        }
            

    }

    const handleUpgrade = async () => {

        try {
            const response = await updateRobotMemory(props.robotId);
            if(response.message === "Robot memory upgraded"){
                props.setRobotData(response.robot);
            }
    
        } catch (err) {
            console.error("error upgrading robot Memory", err);
        }
    }

    const handleCashGrab = async () => {

        try {
            const response = await updateRobotCurrency(props.robotId, 500);
            if(response.message === "robot currency updated"){
                props.setRobotData(response.robot);
                
            }
            
    
        } catch (err) {
            console.error("error upgrading robot Memory", err);
        }
    }

    return (
        <div id='memory-buttons'>
            <button id='teach-button' onClick={handleTeach}>teach</button>
            <button id='upgrade-button' onClick={handleUpgrade}>upgrade memory</button>
            <button id='add-cash' onClick={handleCashGrab}>ADD CASH</button>
        </div>
    )
}

export default MemoryButtons