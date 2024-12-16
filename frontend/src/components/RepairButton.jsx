import { updateRobotHardware } from "../services/robot"

const RepairButton = (props) => {

    const handleRepair = async () => {
        try {
            const response = await updateRobotHardware(props.robotId, 50);
            if(response.message === "robot hardware updated"){
                props.setRobotData(response.robot);
            } else if (response.message === 'Insufficient funds') {
                return
            }
        } catch (err) {
            console.error("error updating robot hardware", err);
        }
    }

    return (
        <div id='repair-button-container'>
            <button id='repair-button'
            onClick={handleRepair}
            >Repair Hardware</button>
        </div>
    )
}

export default RepairButton