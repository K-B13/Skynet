import { killRobot, updateRobotMood } from "../services/robot"

// should this new killRobot function be used in the controller for when hardware and battery are 0?
// ^ currently makes tests fail when i do that
// add popup window?
// should redirect to delete and create new robot


const KillButton = (props) => {
    
    const handleKill = async () => {
        try {
            const response = await killRobot(props.robotId);
            if(response.message === "killed robot"){
                props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error("error killing robot", err);
        }
    }

    const changeMood = async () => {
        try {
            const response = await updateRobotMood(props.robotId, "Sad");
            if(response.message === 'updated mood'){
            props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error('error updating mood');
        }
    }

    return (
        <>
        <button id='kill-robot'
        onClick={handleKill}>
            Kill Robot.
        </button>
        <button onClick={changeMood}>changeMood [TESTING]</button>
        </>
    )
}

export default KillButton;