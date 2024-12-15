import Tile from "./Tile"
import { useState, useEffect } from "react"
import washer from '/NAB/washer.png'
import screw from '/NAB/screw.png'
const Board = ({ winner, setWinner}) => {
    const [ currentIcon, setCurrentIcon ] = useState(screw)
    const [ userInfo, setUserInfo ] = useState({
        userMoves: [],
        userIcon: screw
    })
    const [ robotInfo, setRobotInfo ] = useState({
        robotMoves: [],
        robotIcon: washer
    })
    


    const winArray = [
        ["0", "1", "2"],
        ["0", "4", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["2", "4", "6"],
        ["3", "4", "5"],
        ["6", "7", "8"],
    ]

    const handleTileClick = (e, tileChange, disableBtn) => {
        tileChange(currentIcon)
        disableBtn(true)
        handleTurnChange(e.target.value)
    }

    const handleTurnChange = (tileNum) => {
        if(currentIcon === userInfo.userIcon) {
            handleUpdateMoves(tileNum, setUserInfo, 'userMoves')
            setCurrentIcon(robotInfo.robotIcon)
        }
        else {
            handleUpdateMoves(tileNum, setRobotInfo, 'robotMoves') 
            setCurrentIcon(userInfo.userIcon)
        }
    }

    const handleUpdateMoves = (tileNum, arrayToUpdate, whoseMove) => {
        arrayToUpdate(prevData => {
            return { ...prevData, [whoseMove]: [...prevData[whoseMove], tileNum]}
        })
    }

    const calculateWinner = (moveArray, player) => {
        if(moveArray.length > 2) {
            for(let i = 0; i < winArray.length; i++){
                const winCombo = winArray[i]
                const hasWon = winCombo.every(el => moveArray.includes(el))
                if(hasWon) {
                    setWinner(player)
                    return true
                } else if (
                    userInfo.userMoves.length === 5 &&
                    robotInfo.robotMoves.length === 4
                ) {
                    setWinner('Draw')
                }
            }
        }
        return false
    }

    useEffect(() => {
        if (calculateWinner(userInfo.userMoves, 'User')) {
            console.log('User has won')
        } 
    }, [userInfo.userMoves])

    useEffect(() => {
        if (calculateWinner(robotInfo.robotMoves, 'Robot')) {
            console.log('Robot has won')
        } else if (
            userInfo.userMoves.length === 5 &&
            robotInfo.robotMoves.length === 4
        ) {
            console.log('Its a Draw!')
            setWinner('Draw')
        }
    }, [robotInfo.robotMoves])

    return (
        <div>
            {currentIcon === userInfo.userIcon ? <h4>Your Move!</h4>: <h4>{"Robot's Move"}</h4>}
            <div>
                <Tile num='0' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='1' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='2' handleTileClick={handleTileClick} winner={winner}/>
            </div>
            <div>
                <Tile num='3' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='4' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='5' handleTileClick={handleTileClick} winner={winner}/>
            </div>
            <div>
                <Tile num='6' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='7' handleTileClick={handleTileClick} winner={winner}/>
                <Tile num='8' handleTileClick={handleTileClick} winner={winner}/>
            </div>
        </div>
    )
}

export default Board