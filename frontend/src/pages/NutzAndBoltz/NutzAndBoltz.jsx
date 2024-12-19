import { useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Board from "../../components/NutzAndBoltz/Board"
import { updateRobotCurrency } from "../../services/robot"
import './NutzAndBoltz.css'
import NavBar from "../NavBar/NavBar"
import NABRules from "../../components/NutzAndBoltz/NABRules"

const NutzAndBoltz = () => {
    const [ winner, setWinner ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';
    const [ viewInstructions, setViewInstructions ] = useState(false)

    useEffect(() => {
        if (winner) addCurrency()
    }, [winner])

    const addCurrency = async () => {
        let additionalCurrency = 0
        if (winner === 'User') additionalCurrency = 100
        else if (winner === 'Draw') additionalCurrency = 50
        await updateRobotCurrency(robotId, additionalCurrency)
    }
    return (
        <div id="NAB-page">
        <div id='NAB-game'>
            <NavBar robotId={robotId}/>
            <h2 id='NAB-title'>Nutz and Boltz</h2>
            {winner && 
            <div id='NAB-results-container'>
                <h3 
                    id='NAB-results'>
                    {winner === 'Draw' ? 'Its a Draw!': `${winner} Wins!`}
                </h3>
                <p
                    id='NAB-currency-won'
                >
                    {winner === 'Draw' ? 'You have won 50 coins': (winner === 'User' ? 'You have won 100 coins': 'You have won 0 coins')}
                </p>
            </div>
            }
            <Board winner={winner} setWinner={setWinner}/>
            <div id='NAB-rules-container'>
            <button
                onClick={() => setViewInstructions(true)}
                id='NAB-view-rules-button'
            >Rules</button>
            {viewInstructions && <NABRules setViewInstruction={setViewInstructions}/>}
            </div>
            <div id='NAB-return-container'>
                {
                    winner &&
                    <div id='NAB-return-container'>
                        <button
                            id='NAB-return-to-games'
                            onClick={() => navigate('/gameselection', {state: {robotId: robotId}})}
                        >
                            Back to Games
                        </button>
                        <button
                            id='NAB-return-to-landingpage'
                            onClick={() => navigate('/landingpage')}
                        >
                            Back to Robot
                        </button>
                    </div>
                }
            </div>
        </div>
        </div>
    )
}

export default NutzAndBoltz