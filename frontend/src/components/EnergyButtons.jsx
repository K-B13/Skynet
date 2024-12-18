import { updateRobotBattery, updateRobotCurrency } from "../services/robot"
import { useState, useEffect } from "react";

const EnergyButtons = (props) => {
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

    const handleChargeByTen = async () => {
        try {
            const response = await updateRobotCurrency(props.robotId, -10);
            if(response.message === "robot currency updated"){
                props.setRobotData(response.robot);
            } else if (!response.robot) {
                props.showMessage(response.message)
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
            } else if (!response.robot) {
                props.showMessage(response.message)
            }
        } catch (err) {
            console.error("error updating robot currency", err);
        }
        try {
            const response = await updateRobotBattery(props.robotId, amountToCharge);
            if(response.message === "robot battery updated"){
                props.setRobotData(response.robot);
            } else if (response.message === 'Robot already fully charged') {
                props.showMessage(response.message)
            }
        } catch (err) {
            console.error("error updating robot batterLife", err);
        }
    }
    
    // const decreaseBattery = async () => {
    //     try {
    //         const response = await updateRobotBattery(props.robotId, -10);
    //         if(response.message === "robot battery updated"){
    //             props.setRobotData(response.robot);
    //         }
    //     } catch (err) {
    //         console.error("error updating robot batteryLife", err);
    //     }
    // }

    // if props.isAlive is false, setdisabledbutton = true
    // and then disabled = disabledButton
    return (

        <>
            <div id='energy-buttons'>
                {/* <p>{disableButton}</p> */}
                <button id='charge-by-10'
                disabled={disableButton}
                onClick={handleChargeByTen}>
                    Charge +10
                </button>
                <button id='charge-to-full'
                disabled={disableButton}
                onClick={handleChargeToFull}>
                    Charge to Full
                </button>
                {/* <button
                onClick={decreaseBattery}>decreaseBattery [TESTING]</button> */}
            </div>
        </>

    )
}

export default EnergyButtons