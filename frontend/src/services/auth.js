import api from "./api";

export async function LoginUser(username, navigate) {
    try {
        const response = await api.post('/login/', {
            username: username,
        })

        localStorage.setItem('userId', response.data.id)
        localStorage.setItem('userName', response.data.user)
        navigate('/lobby')
        console.log(response.data)
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.detail)
        }

        console.log(error)
    }
}