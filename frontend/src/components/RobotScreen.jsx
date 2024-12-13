import '/src/components/RobotScreen.css';
const RobotScreen = (props) => {
    console.log(props);
    return (
        <div id='robot-screen'>
            <div id='robot-details-border'>
            <p id='currency'>${props.currency}</p>
            <div id='robot-stats'>
                <p id='name'>Name: {props.name}</p>
                <p id='battery-life'>Battery: {props.batteryLife}%</p>
                <p id='memory-capacity'>Memory: {props.memoryCapacity}GB</p>
                <p id='intelligence'>Intelligence: {props.intelligence}</p>
                <p id='hardware'>Hardware: {props.hardware}%</p>
                <p id='mood'>Mood: {props.mood}</p>
            </div>
            
            <img id='robot-image' src={props.img || '/neutralMood.png'} alt='Robot' style={{ width: 100, height: 100 }} />
            </div>
            <div id='buttons-container'>
                
                <div id='horizontal-buttons'>
                    {props.children.filter((child, index) => index !== props.children.length - 1)}
                </div>
                
                <div id='speak-button-container'>
                    {props.children[props.children.length - 1]}
                </div>
            </div>
        </div>
    );
};

export default RobotScreen;
