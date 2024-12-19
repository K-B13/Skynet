import { useState, useEffect } from 'react'
import { getPayloadFromToken } from '../../helpfulFunctions/helpfulFunctions'
import { createRobot } from '../../services/robot'
import { useNavigate, useLocation } from 'react-router-dom'
import './CreateRobot.css'
import AddFavourites from '../../components/CreateRobot/addFavourites'
import PersonalityBtns from '../../components/CreateRobot/PersonalityBtns'

const CreateRobot = () => {
    const [ formDetails, setFormDetails ] = useState({
        name: '',
        personality: 'Helpful',
        likes: [],
        dislikes: []
    })
    const [ likeInputs, setLikeInputs] = useState([])
    const [ dislikeInputs, setDislikeInputs] = useState([])

    const navigate = useNavigate()
    const location = useLocation()

    const { allowAccess } = location.state || ''

    useEffect(() => {
        if (!allowAccess) {
            navigate('/landingpage')
        }
    }, [])
    
    const handleChanges = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }
    
    const addLikeDislikeInputs = (currentInput, changeInput, descriptor) => {
        if (currentInput.length < 5) {
            const newArray = [...currentInput, '']
            changeInput([...newArray])
            setFormDetails({ ...formDetails, [descriptor]: [...newArray]})
        }
    }
    const likeDislikeChanges = (e, position, currentInput, changeInput, descriptor) => {
        const newArray = [...currentInput]
        newArray[position] = e.target.value
        changeInput([...newArray])
        setFormDetails({ ...formDetails, [descriptor]: [...newArray] })
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token')
        const userId = getPayloadFromToken(token).userId
        const updatedDetails = clearEmptyLikesAndDislikes()
        const response = await createRobot({...updatedDetails, userId: userId}, token)
        console.log(response)
        navigate('/landingpage', { replace: true })
    }

    const clearEmptyLikesAndDislikes =  () => {
        const filteredLikes = likeInputs.filter(like => like)
        const filteredDislikes = dislikeInputs.filter(dislike => dislike)
        return {...formDetails, likes: [...filteredLikes], dislikes: [...filteredDislikes]}

    }

    return (
        <div id="create-robot-background">
        <div id='create-robot-page'>
            <h2 id='create-robot-heading'>Create Robot</h2>
            <form id='create-robot-form'
                type='submit'
                // Including this to prevent enter key working on form
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <div id='create-robot-name-outer-container'>
                    <div id='create-robot-name-inner-container' >
                        <div 
                            id='create-robot-name-container' 
                            className='name-container'
                        >
                            <input
                                type='text'
                                id='create-robot-name'
                                name='name'
                                className='name-input'
                                maxLength='40'
                                value={formDetails.name}
                                onChange={handleChanges}
                                required
                            />
                            <label htmlFor='create-robot-name' className='name-label' id='create-robot-name-label'>Name</label>
                            <div className='name-topline' id='create-robot-name-topline'></div>
                            <div className='name-underline' id='create-robot-name-underline'></div>
                        </div>
                    </div>
                </div>
                <div id='create-robot-personality-btns'>
                    <PersonalityBtns personality='Helpful' formDetails={formDetails} handleChanges={handleChanges}/>
                    <PersonalityBtns personality='Playful' formDetails={formDetails} handleChanges={handleChanges}/>
                    <PersonalityBtns personality='Wise' formDetails={formDetails} handleChanges={handleChanges}/>
                    <PersonalityBtns personality='Fiery' formDetails={formDetails} handleChanges={handleChanges}/>
                </div>
                <div id='create-robot-likes-dislikes-container'>
                
                <AddFavourites input={likeInputs} changeInput={setLikeInputs} descriptor='like' placeholder='Like' onChangeFunction={likeDislikeChanges} onClickFunction={addLikeDislikeInputs} />
                <AddFavourites input={dislikeInputs} changeInput={setDislikeInputs} descriptor='dislike' placeholder='Dislike' onChangeFunction={likeDislikeChanges} onClickFunction={addLikeDislikeInputs} />
                </div>
                <div id='create-robot-submit-btn-container'>
                    <button
                        type='submit'
                        id='create-robot-submit'
                        className='create-robot-submit'
                    >Submit</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateRobot