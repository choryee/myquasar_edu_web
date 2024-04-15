import axios from 'axios'

//import axios from 'axios': Axios를 가져옵니다. Axios는 HTTP 요청을 수행하는 JavaScript 라이브러리입니다.
//
// const defaultApiInstance = axios.create({ ... }): Axios의 create 메서드를 사용하여 기본 API 인스턴스를 생성합니다. 이 인스턴스는 애플리케이션의 기본 API 설정을 가지고 있습니다. baseURL은 API의 기본 URL을 설정하고, headers는 기본적으로 빈 문자열로 설정된 Authorization 헤더를 가지고 있습니다.
//
// defaultApiInstance.interceptors.request.use(...): Axios의 인터셉터를 사용하여 모든 요청 전에 실행될 코드를 정의합니다. 이 경우, localStorage에서 'Authorization' 키로 저장된 액세스 토큰을 가져와서 요청 헤더의 'Authorization'에 추가하고 있습니다. 이로써 각 API 요청에 대해 인증이 수행됩니다.
//
// export default defaultApiInstance: 생성된 API 인스턴스를 내보냅니다. 이렇게 하면 이 파일을 가져온 곳에서 해당 API 인스턴스를 사용하여 HTTP 요청을 수행할 수 있습니다.
//
// 즉, 이 코드는 Axios를 사용하여 API에 대한 기본 설정 및 인증을 처리하는 Vue.js 애플리케이션에서 자주 사용되는 구성 파일입니다.

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