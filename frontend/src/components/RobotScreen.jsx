const RobotScreen = (props) => {
    console.log(props)
    return (
        <>
            <div id='robot-screen'>
                <p id='currency'>100</p>
                <div id='robot-stats'>
                    <p id='name'>{props.name}</p>
                    <p id='battery-life'>10</p>
                    <p id='memory-capacity'>16</p>
                    <p id='intelligence'>1</p>
                    <p id='hardware'>100</p>
                    <p id='mood'>Happy</p>
                </div>
                <img id='robot-image' src='/neutralMood.png'/> 
            </div>
        </>
    )
}

export default RobotScreen