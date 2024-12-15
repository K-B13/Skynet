import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Board from "../../components/NutzAndBoltz/Board"
import { updateRobotCurrency } from "../../services/robot"
const NutzAndBoltz = () => {
    const [ winner, setWinner ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';

    useEffect(() => {
        addCurrency()
    }, [winner])

    const addCurrency = async () => {
        let additionalCurrency = 0
        if (winner === 'User') additionalCurrency = 100
        else if (winner === 'Draw') additionalCurrency = 50
        await updateRobotCurrency(robotId, additionalCurrency)
    }
    return (
        <>
        <h2>Nutz and Boltz</h2>
        {winner && <h3>{winner === 'Draw' ? 'Its a Draw!': `${winner} Wins!`}</h3>}
        <Board winner={winner} setWinner={setWinner}/>
        {
            winner && 
            <button
                onClick={() => navigate('/landingpage')}
            >Back to Robot</button>
        }
        </>
    )
}

export default NutzAndBoltz