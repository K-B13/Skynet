import './RobotScreen.css'
const RobotScreen = (props) => {
    return (
        <>
            <div id='robot-screen'>
                <div id='robot-screen-upper'>
                    <div id='currency-container'>
                    <p id='currency'>${props.currency}</p>
                    </div>
                    <div id='robot-image-container'>
                        <img id='robot-image' src={props.image} style={{width:100, height:100}}/> 
                    </div>
                    <div id='robot-stats'>
                        <p id='name'>Name: {props.name} </p>
                        <p id='battery-life'> Battery: {props.batteryLife}%</p>
                        <p id='memory-capacity'>Memory: {props.memoryCapacity}GB</p>
                        <p id='intelligence'>Intelligence: {props.intelligence}</p>
                        <p id='hardware'>Hardware {props.hardware}%</p>
                        <p id='mood'>Mood: {props.mood}</p>
                    </div>

                </div>
                {props.robotSpeach !== '' && <p
                id='robot-speach'
                >{props.robotSpeach}</p>}

            </div>
        </>
    )
}

export default RobotScreen