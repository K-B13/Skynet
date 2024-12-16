import { useState, useEffect } from "react"
import battery from '/BWAM/battery.jpg'
import wires from '/BWAM/wires.jpg'
import motherboard from '/BWAM/motherboard.jpg'
import BWAMChoice from "../../components/BWAM/BWAMChoice"
import BWAMRules from "../../components/BWAM/BWAMRules"
import BWAMResults from "../../components/BWAM/BWAMResults"
import BWAMScoreboard from "../../components/BWAM/BWAMScoreboard"
import { useNavigate, useLocation } from "react-router-dom";
import './BWAM.css'
import { updateRobotCurrency } from "../../services/robot"

const BWAM = () => {
    const [ selectedChoice, setSelectedChoice ] = useState({
        userChoice: '',
        robotChoice: ''
    })
    const [ currentChoice, setCurrentChoice ] = useState('')
    const [ outcome, setOutcome ] = useState('')
    const [ scoreboard, setScoreboard ] = useState({
        games: 0,
        userScore: 0,
        robotScore: 0
    })
    const [ activeGame, setActiveGame ] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';

    useEffect(() => {
        if (scoreboard.userScore === 3 || scoreboard.robotScore === 3) {
            setActiveGame(false)
            addCurrency()
        }
    }, [scoreboard])

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

    const addCurrency = async () => {
        const currencyToAdd = 150 - (scoreboard.robotScore * 50)
        await updateRobotCurrency(robotId, currencyToAdd)
    }

    const robotAi = () => {
        const rdm = Math.floor(Math.random() * 3)
        return options[rdm]
    }
    
    const checkWinner = () => {
        const robotPick = robotAi()
        setSelectedChoice({ robotChoice: robotPick, userChoice: currentChoice })
        const updatedScoreboard = {...scoreboard}
        updatedScoreboard.games+= 1
        switch (currentChoice) {
            case 'Battery':
                if (robotPick === 'Battery') {
                    setScoreboard({ ...updatedScoreboard })
                    return 'Draw!'
                } else if (robotPick === 'Wires') {
                    updatedScoreboard.userScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Win!'
                } else {
                    updatedScoreboard.robotScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Lose!'
                }
            
            case 'Wires':
                if (robotPick === 'Wires') {
                    setScoreboard({ ...updatedScoreboard })
                    return 'Draw'
                } else if (robotPick === 'Motherboard') {
                    updatedScoreboard.userScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Win!'
                } else {
                    updatedScoreboard.robotScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Lose!'
                }

            case 'Motherboard':
                if (robotPick === 'Motherboard') {
                    setScoreboard({ ...updatedScoreboard })
                    return 'Draw!'
                } else if (robotPick === 'Battery') {
                    updatedScoreboard.userScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Win!'
                } else {
                    updatedScoreboard.robotScore += 1
                    setScoreboard({ ...updatedScoreboard })
                    return 'You Lose!'
                }
            
            default:
                return 'Invalid Choice'
        }
    }

    const handleDecision = () => {
        const result = checkWinner()
        setCurrentChoice('')
        setOutcome(result)
    }
    return (
        <div id='BWAM-game'>
            <div id='BWAM-header'>
                <BWAMRules />
                <div id='BWAM-title-container'>
                    <h2 id="BWAM-title">Battery, Wires and Motherboard</h2>
                </div>
                <BWAMScoreboard scoreboard={scoreboard} />
            </div>
            <BWAMResults outcome={outcome} selectedChoice={selectedChoice} relatedPic={relatedPic} currentChoice={currentChoice}/>
            {activeGame ? 
            <div id='BWAM-main-game'>
                <BWAMChoice 
                    setCurrentChoice={setCurrentChoice} 
                    relatedPic={relatedPic}
                    selectedChoice={selectedChoice}
                    setSelectedChoice={setSelectedChoice}
                />
                {currentChoice && 
                <div id='BWAM-confirm-decision-container'>
                    <button
                        id='BWAM-confirm-decision'
                        onClick={() => {
                        handleDecision()
                    }}
                    >Choose</button>
                </div>
                    }
            </div>:
            <button
            id='BWAM-return-to-landingpage'
            onClick={() => navigate('/landingpage')}
            >
                Back to Robot
            </button>
            }
        </div>
    )
}

export default BWAM