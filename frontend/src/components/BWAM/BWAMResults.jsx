const BWAMResults = ({ outcome, userChoice, robotChoice, relatedPic }) => {
    return (
        <div>
            {outcome && <p>Result = {outcome}</p>}
            <p>{userChoice && `You Chose: ${userChoice}`}</p>
            <img src={relatedPic[userChoice]} width='60rem' height='60rem'/>
            
            <p>{robotChoice && `Robot Chose: ${robotChoice}`}</p>
            <img src={relatedPic[robotChoice]} width='60rem' height='60rem'/>
        </div>
    )
}

export default BWAMResults