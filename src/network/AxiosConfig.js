import axios from 'axios'

const defaultApiInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        Authorization: ''
    }
})
defaultApiInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('Authorization');
    console.log('accessToken>>', accessToken);
    if (accessToken)
        config.headers['Authorization'] = accessToken
    return config
})

export default defaultApiInstance