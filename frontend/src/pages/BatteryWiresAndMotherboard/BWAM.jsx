import { useState } from "react"
import battery from '/BWAM/battery.jpg'
import wires from '/BWAM/wires.jpg'
import motherboard from '/BWAM/motherboard.jpg'
import BWAMChoice from "../../components/BWAM/BWAMChoice"
import BWAMRules from "../../components/BWAM/BWAMRules"
import BWAMResults from "../../components/BWAM/BWAMResults"

const BWAM = () => {
    const [ selectedChoice, setSelectedChoice ] = useState({
        userChoice: '',
        robotChoice: ''
    })
    const [ currentChoice, setCurrentChoice ] = useState('')
    const [ outcome, setOutcome ] = useState('')
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
    
    const checkWinner = () => {
        const robotPick = robotAi()
        setSelectedChoice({ robotChoice: robotPick, userChoice: currentChoice })
        switch (currentChoice) {
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
            <BWAMResults outcome={outcome} selectedChoice={selectedChoice} relatedPic={relatedPic} currentChoice={currentChoice}/>
            <BWAMChoice 
            setCurrentChoice={setCurrentChoice} 
            relatedPic={relatedPic}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
            />
            <button
            onClick={() => {
                makePick()
                const result = checkWinner()
                setCurrentChoice('')
                setOutcome(result)
            }}
            >Choose</button>
        </div>
    )
}

export default BWAM