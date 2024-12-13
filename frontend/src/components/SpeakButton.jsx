import { useState } from "react"
const SpeakButton = ({ robotData}) => {
    const [ robotSpeach, setRobotSpeach ] = useState('')

    const constructSpeach = () => {
        const initialGreetings = `Hello, I am ${robotData.name}. `
        const likes = dealWithOpinions(robotData.likes, 'like')
        const dislikes = dealWithOpinions(robotData.dislikes, 'dislike')
        setRobotSpeach(`${initialGreetings} ${likes} ${dislikes}`)
    }

    const dealWithOpinions = (opinions, stance) => {
        if (opinions.length === 0) return ''
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
        <>
            {robotSpeach !== '' && <p>{robotSpeach}</p>}
            <button id='speak-button'
            onClick={constructSpeach}
            >speak</button>
        </>
    )
}

export default SpeakButton