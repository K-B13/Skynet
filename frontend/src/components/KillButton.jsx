import { killRobot } from "../services/robot"

// add popup window?
// should redirect to delete and create new robot

// tests of updateMood in controller


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

    return (
        <>
        <button id='kill-robot'
        onClick={handleKill}>
            Kill Robot.
        </button>
        </>
    )
}

export default KillButton;