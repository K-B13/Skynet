import { getPayloadFromToken } from "../helpfulFunctions/helpfulFunctions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const isTokenValid = (token) => {
    if (!token) return false
    try {
        const { exp } = getPayloadFromToken(token);
        const currentTime = Date.now() / 1000;
        return exp > currentTime
    } catch (error) {
        return false
    }
};

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!isTokenValid(token)) {
            return navigate('/')
        }
    }, [token, navigate])

    return isTokenValid(token) ? children: null
}

export default ProtectedRoute