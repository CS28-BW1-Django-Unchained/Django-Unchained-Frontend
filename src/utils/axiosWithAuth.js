import axios from 'axios';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token');
    return axios.create({
        baseURL: 'https://my-django-app-54.herokuapp.com/api/',
        headers: {
            Authorization: `Token ${token}`

        }
    })
}