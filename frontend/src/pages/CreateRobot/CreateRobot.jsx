import { useState } from 'react'
import { getPayloadFromToken } from '../../helpfulFunctions/helpfulFunctions'
import { createRobot } from '../../services/robot'
import { useNavigate } from 'react-router-dom'
import './CreateRobot.css'

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
        // clearEmptyLikesAndDislikes()
        const response = await createRobot({...formDetails, userId: userId}, token)
        console.log(response)
        navigate('/landingpage')
    }

    // const clearEmptyLikesAndDislikes = () => {
    //     const likes = likeInputs.filter(like => like)
    //     const dislikes = dislikeInputs.filter(dislike => dislike)
    //     console.log(likes, dislikes)
    //     setFormDetails((prevFormDetails) => {
    //         return {...prevFormDetails,likes: likes, dislikes: dislikes }
    //     })
    // }

    return (
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
                    <div 
                        id='create-robot-name-inner-container' 
                        className='name-container'
                    >
                        <input
                            type='text'
                            id='create-robot-name'
                            name='name'
                            className='name-input'
                            value={formDetails.name}
                            onChange={handleChanges}
                            required
                        />
                        <label className='name-label' id='create-robot-name-label'>Name</label>
                        <div className='name-topline' id='create-robot-name-topline'></div>
                        <div className='name-underline' id='create-robot-name-underline'></div>
                    </div>
                </div>
                <div id='create-robot-personality-btns'>
                    <button
                        type='button' 
                        id='create-robot-helpful' 
                        className={`personality-btns ${formDetails.personality === 'Helpful' ? 'selected-btn' : 'not-selected-btn'}`}
                        onClick={handleChanges} 
                        value='Helpful' 
                        name='personality'
                        >Helpful</button>
                    <button
                        type='button'  
                        id='create-robot-playful' 
                        className={`personality-btns ${formDetails.personality === 'Playful' ? 'selected-btn' : 'not-selected-btn'}`}
                        onClick={handleChanges} 
                        value='Playful' 
                        name='personality'
                    >Playful</button>
                    <button
                        type='button'  
                        id='create-robot-wise' 
                        className={`personality-btns ${formDetails.personality === 'Wise' ? 'selected-btn' : 'not-selected-btn'}`}
                        onClick={handleChanges} 
                        value='Wise' 
                        name='personality'
                    >Wise</button>
                    <button
                        type='button'  
                        id='create-robot-fiery' 
                        className={`personality-btns ${formDetails.personality === 'Fiery' ? 'selected-btn' : 'not-selected-btn'}`}
                        onClick={handleChanges} 
                        value='Fiery' 
                        name='personality'
                        >Fiery</button>
                </div>
                <div id='create-robot-likes-dislikes-container'>
                    <div id='create-robot-all-likes'>
                        {
                            likeInputs.length > 0 &&
                            likeInputs.map((like, index) => {
                                return (
                                    <div key={index + 1}  className='like-container'>
                                        <input
                                            type='text'
                                            className='like-input'
                                            name={index} 
                                            id={`create-robot-like-${index}`}
                                            value={like}
                                            onChange={(e) => likeDislikeChanges(e, index,likeInputs, setLikeInputs, 'likes')}
                                        />
                                        <label className='like-label' id={`like-label-${index + 1}`}>Like</label>
                                        <div className='like-topline' id={`like-topline-${index + 1}`}></div>
                                        <div className='like-underline' id={`like-underline-${index + 1}`}></div>
                                </div>
                                )
                            })
                        }
                        {
                            likeInputs.length === 0 ? 
                            <button
                                type='button'  
                                onClick={() => addLikeDislikeInputs(likeInputs, setLikeInputs, 'likes')}
                                id='create-robot-add-first-like'
                                className='add-like-btn'
                            >Add a Like (Max 5)</button> : 
                            <button
                                type='button'  
                                onClick={() => addLikeDislikeInputs(likeInputs, setLikeInputs, 'likes')}
                                id='create-robot-add-like'
                                className='add-like-btn'
                            >Add Another Like (Max 5)</button>
                        }
                    </div>
                    <div id='create-robot-all-dislikes'>
                        {
                            dislikeInputs.length > 0 &&
                            dislikeInputs.map((dislike, index) => {
                                return (
                                    <div key={index + 1} className='like-container'>
                                    
                                        <input
                                            type='text'
                                            className='like-input' 
                                            name={index}  
                                            id={`create-robot-dislike-${index}`}
                                            value={dislike}
                                            onChange={(e) => likeDislikeChanges(e, index,dislikeInputs, setDislikeInputs, 'dislikes')}
                                        />
                                        <label className='like-label' id={`dislike-label-${index + 1}`}>Dislike</label>
                                        <div className='like-topline' id={`dislike-topline-${index + 1}`}></div>
                                        <div className='like-underline' id={`like-underline-${index + 1}`}></div>
                                    </div>
                                )
                            })
                        }
                        {
                            dislikeInputs.length === 0 ?
                            <button
                                type='button'  
                                onClick={() => addLikeDislikeInputs(dislikeInputs, setDislikeInputs, 'dislikes')}
                                id='create-robot-add-first-dislike'
                                className='add-like-btn'
                            >Add a dislike (Max 5)</button> : 
                            <button
                                type='button' 
                                onClick={() => addLikeDislikeInputs(dislikeInputs, setDislikeInputs, 'dislikes')}
                                id='create-robot-add-dislike'
                                className='add-like-btn'  
                            >Add Another dislike (Max 5)</button>
                        }
                    </div>
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
    )
}

export default CreateRobot