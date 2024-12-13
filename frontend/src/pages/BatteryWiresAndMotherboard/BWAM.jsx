import { useState } from "react"

const BWAM = () => {
    const [ userChoice,setUserChoice ] = useState('')
    const [ outcome, setOutcome ] = useState('')
    const options = [
        'Battery',
        'Wires',
        'Motherboard'
    ]

    const robotAi = () => {
        const rdm = Math.floor(Math.random() * 3)
        return options[rdm]
    }

    const checkWinner = (userPick) => {
        const robotPick = robotAi()
        console.log(robotPick)
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
            <div>
                <p>Rules: </p>
                <p>Battery beats Wires</p>
                <p>Wires beats Motherboard</p>
                <p>Motherboard beats Battery</p>
            </div>
            {outcome && <p>Result = {outcome}</p>}
            <p>{userChoice}</p>
            <div>
                <button
                onClick = {() => setUserChoice('Battery')}
                >Battery</button>
                <button
                onClick = {() => setUserChoice('Wires')}
                >Wires</button>
                <button
                onClick = {() => setUserChoice('Motherboard')}
                >Motherboard</button>
            </div>
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