import axios from 'axios';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token');
    return axios.create({
        baseURL: 'http://the-adventure-game.herokuapp.com/api/',
        headers: {
            Authorization: `Token ${token}`

        }
    })
}