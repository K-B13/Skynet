import { killRobot } from "../services/robot"
import { useState, useEffect } from "react";

const KillButton = (props) => {
    
    const [disableButton, setdisableButton] = useState(false);

    useEffect(() => {
        const checkAlive = async() => {
            try {
                console.log("energy props", props.isAlive);
                
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
        onClick={handleKill}
        disabled={disableButton}>
            Kill Robot.
        </button>
        </>
    )
}

export default KillButton;