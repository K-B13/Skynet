import { Link, useNavigate } from "react-router-dom"
import LogoutButton from '../../components/LogoutButton'
import { deleteUser } from "../../services/user"
import { getPayloadFromToken } from "../../helpfulFunctions/helpfulFunctions"
import './NavBar.css'
import skynet from '/skynet.png'
const NavBar = ({ robotId }) => {
    const navigate = useNavigate()
    const eraseUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        
        if (!confirmDelete){
            return
        }
        const token = localStorage.getItem('token')
        const userId = getPayloadFromToken(token).userId
        try {
            await deleteUser(userId, token)
            navigate('/')
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("There was an error deleting your account. Please try again.");
        }
    }

    return (
        <nav id='navbar-container'>
            <div id='navbar'>
                <div id='navbar-left'>
                    <Link to='/landingpage' state={{robotId: robotId}}>
                        <img 
                            id='navbar-logo'
                            src={skynet} 
                        />
                    </Link>
                </div>
                <div id='navbar-right'>
                    <div id='navbar-games-container'>
                        <Link to='/gameselection' state={{robotId: robotId}}>Games</Link>
                    </div>
                    <button
                        id='delete-account'
                        onClick={eraseUser}
                    >Delete Account</button>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    )
}

export default NavBar