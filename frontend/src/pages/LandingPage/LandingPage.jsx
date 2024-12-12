import { useEffect } from "react";
import RobotScreen from "../../components/RobotScreen"
import MemoryButtons from "../../components/MemoryButtons"
import RepairButton from "../../components/RepairButton"
import SpeakButton from "../../components/SpeakButton"
import EnergyButtons from "../../components/EnergyButtons"

const LandingPage = () => {

    useEffect(() => {
        const async robot = await fetch(getRobotData);
    }, []);

    return (
        <>
        <RobotScreen/>
        <EnergyButtons/>
        <MemoryButtons/>
        <RepairButton/>
        <SpeakButton/>
        </>
    )
}

export default LandingPage