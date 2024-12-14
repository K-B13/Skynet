const BWAMChoice = ({ setUserChoice, relatedPic }) => {
    return (
        <div>
            <button
            onClick = {() => setUserChoice('Battery')}
            ><img src={relatedPic['Battery']} width='60rem' height='60rem'/></button>
            <button
            onClick = {() => setUserChoice('Wires')}
            ><img src={relatedPic['Wires']} width='60rem' height='60rem'/></button>
            <button
            onClick = {() => setUserChoice('Motherboard')}
            ><img src={relatedPic['Motherboard']} width='60rem' height='60rem'/></button>
        </div>
    )
}

export default BWAMChoice