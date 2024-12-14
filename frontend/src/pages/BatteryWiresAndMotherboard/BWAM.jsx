import { useState } from "react"
import battery from '/BWAM/battery.jpg'
import wires from '/BWAM/wires.jpg'
import motherboard from '/BWAM/motherboard.jpg'
import BWAMChoice from "../../components/BWAM/BWAMChoice"
import BWAMRules from "../../components/BWAM/BWAMRules"
import BWAMResults from "../../components/BWAM/BWAMResults"

const BWAM = () => {
    const [ userChoice,setUserChoice ] = useState('')
    const [ outcome, setOutcome ] = useState('')
    const [ robotChoice, setRobotChoice ] = useState('')
    const options = [
        'Battery',
        'Wires',
        'Motherboard'
    ]

    const relatedPic = {
        Battery: battery,
        Wires: wires,
        Motherboard: motherboard
    }

    const robotAi = () => {
        const rdm = Math.floor(Math.random() * 3)
        return options[rdm]
    }

    const checkWinner = (userPick) => {
        const robotPick = robotAi()
        setRobotChoice(robotPick)
        switch (userPick) {
            case 'Battery':
                if (robotPick === 'Battery') {
                    return 'Draw!'
                } else if (robotPick === 'Wires') {
                    return 'You Win!'
                } else {
                    return 'You Lose!'
                }
            
            case 'Wires':
                if (robotPick === 'Wires') {
                    return 'Draw'
                } else if (robotPick === 'Motherboard') {
                    return 'You Win!'
                } else {
                    return 'You Lose!'
                }

            case 'Motherboard':
                if (robotPick === 'Motherboard') {
                    return 'Draw!'
                } else if (robotPick === 'Battery') {
                    return 'You Win!'
                } else {
                    return 'You Lose!'
                }
            
            default:
                return 'Invalid Choice'
        }
    }
    return (
        <div>
            <BWAMRules />
            <BWAMResults outcome={outcome} userChoice={userChoice} robotChoice={robotChoice} relatedPic={relatedPic}/>
            <BWAMChoice setUserChoice={setUserChoice} relatedPic={relatedPic}/>
            <button
            onClick={() => {
                const result = checkWinner(userChoice)
                setOutcome(result)
            }}
            >Choose</button>
        </div>
    )
}

export default BWAM