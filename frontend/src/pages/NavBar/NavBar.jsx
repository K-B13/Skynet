import { Link, useNavigate } from "react-router-dom"
import LogoutButton from '../../components/LogoutButton'
import { deleteUser } from "../../services/user"
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions"
const NavBar = ({ robotId }) => {
    const navigate = useNavigate()
    const eraseUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        
        if (!confirmDelete){
            return
        }
        const token = localStorage.getItem('token')
        console.log(token)
        const userId = getPayloadFromToken(token).userId
        console.log(userId)
        try {
            await deleteUser(userId, token)
            navigate('/')
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("There was an error deleting your account. Please try again.");
        }
    }

    return (
        <nav id='navbar'>
            <Link to='/landingpage' state={{robotId: robotId}}>Landing Page</Link>
            <Link to='/gameselection' state={{robotId: robotId}}>Games</Link>
            <button
                onClick={eraseUser}
            >Delete Account</button>
            <LogoutButton />
        </nav>
    )
}

export default NavBar