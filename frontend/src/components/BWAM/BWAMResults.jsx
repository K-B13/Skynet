const BWAMResults = ({ outcome, selectedChoice, relatedPic, currentChoice }) => {
    return (
        <div>
            {outcome && selectedChoice.userChoice && <p>Result = {outcome}</p>}
            <p>{selectedChoice.userChoice && `You Chose: ${selectedChoice.userChoice}`}</p>
            {selectedChoice.userChoice && <img src={relatedPic[selectedChoice.userChoice]} width='60rem' height='60rem'/>}
            <p>{currentChoice && `Currently selecting ${currentChoice}`}</p>
            {currentChoice && <img src={relatedPic[currentChoice]} width='60rem' height='60rem'/>}
            <p>{selectedChoice.robotChoice && `Robot Chose: ${selectedChoice.robotChoice}`}</p>
            {selectedChoice.robotChoice && <img src={relatedPic[selectedChoice.robotChoice]} width='60rem' height='60rem'/>}
        </div>
    )
}

export default BWAMResults