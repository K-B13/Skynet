import { updateRobotHardware } from "../services/robot"
import { useState, useEffect } from "react";

const RepairButton = (props) => {

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

    const handleRepair = async () => {
        try {
            const response = await updateRobotHardware(props.robotId, 50);
            if(response.message === "robot hardware updated"){
                props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error("error updating robot hardware", err);
        }
    }

    return (
        <>
            <button id='repair-button'
            disabled={disableButton}
            onClick={handleRepair}
            >Repair Hardware</button>
        </>
    )
}

export default RepairButton