
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const createRobot = async (robotInformation, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(robotInformation)
    }

    const response = await fetch(`${BACKEND_URL}/robot`, requestOptions)

    if (response.status !== 201) {
        throw new Error('Unable to create robot')
    }

    const data = await response.json()

    return data
}