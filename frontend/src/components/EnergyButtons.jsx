import { updateRobotBattery, updateRobotCurrency } from "../services/robot"

const EnergyButtons = (props) => {

    const handleChargeByTen = async () => {
        try {
            const response = await updateRobotCurrency(props.robotId, -10);
            if(response.message === "robot currency updated"){
                props.setRobotData(response.robot);
            } else if (response.robot) {
                return
            }
        } catch (err) {
            console.error("error updating robot currency", err);
        }
        try {
            const response = await updateRobotBattery(props.robotId, 10);
            if(response.message === "robot battery updated"){
                props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error("error updating robot batteryLife", err);
        }
    }

    const handleChargeToFull = async () => {
        const amountToCharge = 100 - props.batteryLife;
        const chargeCost = amountToCharge * (-1);

        try {
            const response = await updateRobotCurrency(props.robotId, chargeCost);
            if(response.message === "robot currency updated"){
                props.setRobotData(response.robot);
            } else if (response.message === 'Insufficient funds') {
                return
            }
        } catch (err) {
            console.error("error updating robot currency", err);
        }
        try {
            const response = await updateRobotBattery(props.robotId, amountToCharge);
            if(response.message === "robot battery updated"){
                props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error("error updating robot batterLife", err);
        }
    }
    
    const decreaseBattery = async () => {
        try {
            const response = await updateRobotBattery(props.robotId, -10);
            if(response.message === "robot battery updated"){
                props.setRobotData(response.robot);
            }
        } catch (err) {
            console.error("error updating robot batteryLife", err);
        }
    }

    return (
        <div id='energy-buttons'>
            <button id='charge-by-10'
            onClick={handleChargeByTen}>
                charge +10
            </button>
            <button id='charge-to-full'
            onClick={handleChargeToFull}>
                charge full
            </button>
            <button
            onClick={decreaseBattery}>decreaseBattery [TESTING]</button>
        </div>
    )
}

export default EnergyButtons

// robotId and batteryLife passed down to calculate how to full

// add services
// pass down props through LandingPage
// button functionality on this page:
//  - make a handle function for each change
//  - 