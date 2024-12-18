import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Board from "../../components/NutzAndBoltz/Board"
import { updateRobotCurrency } from "../../services/robot"
import './NutzAndBoltz.css'
import NavBar from "../NavBar/NavBar"

const NutzAndBoltz = () => {
    const [ winner, setWinner ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';

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
        <div id='NAB-game'>
            <NavBar robotId={robotId}/>
            <h2 id='NAB-title'>Nutz and Boltz</h2>
            {winner && 
            <h3 id='NAB-results'>
                {winner === 'Draw' ? 'Its a Draw!': `${winner} Wins!`}
            </h3>}
            <Board winner={winner} setWinner={setWinner}/>
            <div id='NAB-return-container'>
                {
                    winner && 
                    <button
                        id='NAB-return'
                        onClick={() => navigate('/landingpage')}
                    >Back to Robot</button>
                }
            </div>
        </div>
    )
}

export default NutzAndBoltz