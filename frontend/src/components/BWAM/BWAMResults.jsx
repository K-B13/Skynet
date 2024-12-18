const BWAMResults = ({ outcome, selectedChoice, relatedPic, currentChoice }) => {
    return (
        <div id='BWAM-result-container'>  
                <p
                    id='BWAM-result-announcement'
                >{outcome && selectedChoice.userChoice && `Result = ${outcome}`}</p>
            <div id='BWAM-choices'>
                <div id='BWAM-user-choice-container'>
                    <p id='BWAM-user-choice'>{selectedChoice.userChoice && `You Chose: ${selectedChoice.userChoice}`}</p>
                    {selectedChoice.userChoice && 
                    <img 
                        src={relatedPic[selectedChoice.userChoice]} 
                        id='BWAM-user-choice-pic'
                        width='80rem' 
                        height='80rem'/>
                    }
                </div>
                <div id='BWAM-current-choice-container'>
                    <p id='BWAM-current-choice'>{currentChoice && `Currently selecting ${currentChoice}`}</p>
                    {currentChoice && 
                    <img 
                        src={relatedPic[currentChoice]} 
                        id='BWAM-current-choice-pic'
                        width='80rem' 
                        height='80rem'/>
                    }
                </div>
                <div id='BWAM-robot-choice-container'>
                    <p id='BWAM-robot-choice'>{selectedChoice.robotChoice && `Robot Chose: ${selectedChoice.robotChoice}`}</p>
                    {selectedChoice.robotChoice && 
                    <img 
                        src={relatedPic[selectedChoice.robotChoice]} 
                        id='BWAM-robot-choice-pic'
                        width='80rem' 
                        height='80rem'/>
                    }
                </div>
            </div>
        </div>
    )
}

export default BWAMResults