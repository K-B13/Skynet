const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteUser = async (userId, token) => {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await fetch(`${BACKEND_URL}/users/${userId}`, requestOptions);

    if(!response.ok){
        throw new Error('Failed to delete user');
    }

    const data = await response.json();
    return data;
}