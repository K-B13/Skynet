import { useState, useEffect, useRef } from "react"
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
import NavBar from "../NavBar/NavBar"

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
    const audioRef = useRef(null);

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
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
            audioRef.current.play();
        }
    }
    return (
        <div id="BWAM-page">
        <div id='BWAM-game'>
            <NavBar robotId={robotId}/>
            <div id='BWAM-header'>
                <BWAMRules />
                <div id='BWAM-title-container'>
                    <h2 id="BWAM-title">Battery, Wires and Motherboard</h2>
                </div>
                <BWAMScoreboard scoreboard={scoreboard} />
            </div>
            {
                !activeGame && 
                <p id='BWAM-currency-won'>
                    {scoreboard.robotScore === 3 ? 'You did not win any money' : `You have won $${150 - (scoreboard.robotScore * 50)}`}
                </p>
            }
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
            <div id='BWAM-return-buttons'>
                <button
                    id='BWAM-return-to-games'
                    onClick={() => navigate('/gameselection', {state: {robotId: robotId}})}
                >
                    Back to Games
                </button>
                <button
                    id='BWAM-return-to-landingpage'
                    onClick={() => navigate('/landingpage')}
                >
                    Back to Robot
                </button>
            </div>
            }
        </div>
            <audio ref={audioRef} loop>
                <source src="/bwmMusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default BWAM