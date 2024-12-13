import { killRobot, updateRobotMood } from "../services/robot"

// kill button [apparently] works, but need to actually show the dead robot once it. dies.
// should this new killRobot function be used in the controller for when hardware and battery are 0?
// ^ currently makes tests fail when i do that
// add popup window?
// should redirect to delete and create new robot

// 1. fix images so it's attached to the robot
// 2. add ability to change image depending on mood
// 3. add dead robot image

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