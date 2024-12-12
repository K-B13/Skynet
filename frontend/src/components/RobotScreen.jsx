const RobotScreen = (props) => {
    return (
        <>
            <div id='robot-screen'>
                <p id='currency'>100</p>
                <div id='robot-stats'>
                    <p id='name'>Name: {props.name} </p>
                    <p id='battery-life'> Battery: 100%</p>
                    <p id='memory-capacity'>Memory: {props.memoryCapacity}GB</p>
                    <p id='intelligence'>Intelligence: {props.intelligence}</p>
                    <p id='hardware'>Hardware {props.hardware}%</p>
                    <p id='mood'>Mood: {props.mood}</p>
                </div>
                <img id='robot-image' src='/neutralMood.png' style={{width:100, height:100}}/> 
            </div>
        </>
    )
}

export default RobotScreen