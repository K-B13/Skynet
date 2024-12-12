const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getRobotByUserId(userId) {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${BACKEND_URL}/robot/${userId}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Failed to get robot");
    }

    const data = await response.json();
    return data;
}

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

export const updateRobotHardware = async (robotId, hardwareChange) => {

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({hardwareChange: hardwareChange})
    }

    const response = await fetch(`${BACKEND_URL}/robot/${robotId}/hardware`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to update robot hardware')
    }

    const data = await response.json()
    return data
}