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