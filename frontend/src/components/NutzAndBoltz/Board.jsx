import Tile from "./Tile"
import { useState, useEffect } from "react"
import washer from '/NAB/washer.png'
import screw from '/NAB/screw.png'
const Board = ({ winner, setWinner}) => {
    const [ currentIcon, setCurrentIcon ] = useState(screw)
    const [ disableUserClick, setDisableUserClick ] = useState(false)
    const [ boardState, setBoardState ] = useState(Array(9).fill(null))
    const [ userInfo, setUserInfo ] = useState({
        userMoves: [],
        userIcon: screw
    })
    const [ robotInfo, setRobotInfo ] = useState({
        robotMoves: [],
        robotIcon: washer
    })
    
    const [ allMoves, setAllMoves ] = useState([])
    let end = false

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

    const getAvailableTiles = () => {
        const allTiles = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        return allTiles.filter((tile) => !allMoves.includes(tile))
    }
        

     // Robot's AI to make a move
    const robotMakeMove = () => {
        if (winner) return;

        const availableTiles = getAvailableTiles()

         // Check if the robot can win
        for (let tile of availableTiles) {
            const testMoves = [...robotInfo.robotMoves, tile];
            if (calculateWinner(testMoves, 'Robot')) {
                handleUpdateMoves(tile, setRobotInfo, 'robotMoves')
                setAllMoves(prev => [...prev, tile])
                setBoardState(((prevState) => {
                    const newState = [...prevState]
                    newState[parseInt(tile)] = currentIcon
                    return newState
                }))
                setCurrentIcon(userInfo.userIcon)
                setDisableUserClick(false)
                return
            }
        }

         // Lets check if the User can win and block it
        for (let tile of availableTiles) {
            const testMoves = [...userInfo.userMoves, tile]
            if (calculateWinner(testMoves, 'User')){
                handleUpdateMoves(tile, setRobotInfo, 'robotMoves')
                setAllMoves(prev => [...prev, tile])
                setBoardState(((prevState) => {
                    const newState = [...prevState]
                    newState[parseInt(tile)] = currentIcon
                    return newState
                }))
                setCurrentIcon(userInfo.userIcon)
                setDisableUserClick(false)
                return
            }
        }

         // If neither the above possible make random move
        const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)]
        handleUpdateMoves(randomTile, setRobotInfo, 'robotMoves')
        setAllMoves(prev => [...prev, randomTile])
        setBoardState(((prevState) => {
            const newState = [...prevState]
            newState[parseInt(randomTile)] = currentIcon
            return newState
        }))
        setCurrentIcon(userInfo.userIcon)
        setDisableUserClick(false)
    }

    const handleTileClick = (e) => {
        handleTurnChange(e.target.value)
        setAllMoves([...allMoves, e.target.value])
        setBoardState((prevState) => {
            const newState = [...prevState]
            newState[parseInt(e.target.value)] = currentIcon
            return newState
        })
        setDisableUserClick(true)
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

    const calculateWinner = (moveArray) => {
        if(moveArray.length > 2) {
            for(let i = 0; i < winArray.length; i++){
                const winCombo = winArray[i]
                const hasWon = winCombo.every(el => moveArray.includes(el))
                if(hasWon) {
                    return true
                }
            }
        }
        return false
    }

    useEffect(() => {
        if (calculateWinner(userInfo.userMoves, 'User')) {
            setWinner('User')
            console.log('User has won')
        } 
    }, [userInfo.userMoves])

    useEffect(() => {
        if (calculateWinner(robotInfo.robotMoves, 'Robot')) {
            setWinner('Robot')
            console.log('Robot has won')
        } else if (
            userInfo.userMoves.length === 5 &&
            robotInfo.robotMoves.length === 4
        ) {
            console.log('Its a Draw!')
            setWinner('Draw')
        } else if (currentIcon === robotInfo.robotIcon) {
            setTimeout(robotMakeMove, 500)
        }
    }, [robotInfo.robotMoves, currentIcon, winner])

    return (
        <div>
            {currentIcon === userInfo.userIcon ? <h4>Your Move!</h4>: <h4>{"Robot's Move"}</h4>}
            <div>
                <Tile num='0' icon={boardState[0]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='1' icon={boardState[1]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='2' icon={boardState[2]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
            </div>
            <div>
                <Tile num='3' icon={boardState[3]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='4' icon={boardState[4]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='5' icon={boardState[5]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
            </div>
            <div>
                <Tile num='6' icon={boardState[6]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='7' icon={boardState[7]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                <Tile num='8' icon={boardState[8]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
            </div>
        </div>
    )
}

export default Board