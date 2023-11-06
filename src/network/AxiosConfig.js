import axios from 'axios'
import store from '@/store/index';

const defaultApiInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'Authorization': ''
    }
})
defaultApiInstance.interceptors.request.use(config => {
    const accessToken = store.getters['account/getAccessToken']
    if (accessToken)
        config.headers['Authorization'] = accessToken
    return config
})

export default defaultApiInstance