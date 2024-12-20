import { useState, useEffect } from "react";

const SpeakButton = ({ constructSpeach, isAlive, isLoading }) => {
    
    const [disableButton, setdisableButton] = useState(false);
    
        useEffect(() => {
            const checkAlive = async() => {
                try {
                    
                    if(isAlive === false){
                        setdisableButton(true);
                    } else if(isAlive === true){
                        setdisableButton(false);
                    }
    
                } catch (err) {
                    console.error("error fetching user robot", err);
                }
            }
            checkAlive();
        }, [isAlive]);

    const dealWithOpinions = (opinions, stance) => {
        if (opinions.length === 0) return ''
        if (opinions.length === 1) return `I ${stance} ${opinions[0]}.`
        let speach = ''
        opinions.forEach((opinion, index) => {
            if (index === 0) {
                speach += `I ${stance} ${opinion}`
            } else if (index + 1 === opinions.length) {
                speach += ` and I ${stance} ${opinion}. `
            } else {
                speach += `, I also ${stance} ${opinion}`
            }
        })
        return speach
    }

    return (
        <div id='speak-button-container'>
            <button id='speak-button'
                onClick={() => constructSpeach(dealWithOpinions)}
                disabled={disableButton || isLoading}
            >Speak</button>
        </div>
    )
}

export default SpeakButton