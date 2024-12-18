import { Link } from "react-router-dom"
import LogoutButton from '../../components/LogoutButton'
const NavBar = ({ robotId }) => {
    return (
        <nav id='navbar'>
            <Link to='/landingpage' state={{robotId: robotId}}>Landing Page</Link>
            <Link to='/gameselection' state={{robotId: robotId}}>Games</Link>
            <LogoutButton />
        </nav>
    )
}

export default NavBar