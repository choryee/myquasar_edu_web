
*** escape-day-server의 readme.txt를 보라.

10강. Vue이벤트 5부, 01'02
SPA는 index.html에서 DOM형식으로 변환만 주고 있지, 화면페이지가 정말 넘어가지 않는다. 그 화면이 가진 모든 정보는
JS에 저장되어 있고, 화면이 새로고침이 되면, 그 정보($store에 저장한 것등.)가 모두 날라감.

MemberLogin.vue
this.$store.commit('setEmployeeNumber', this.user.employee_no);// store는 화면이 새로고침, 초기화 되버림.
그래서, 브라우저의 sessionStorage를 이용함.
sessionStorage.setItem('setUser', JSON.stringify(this.user));
--> 위 강의 뒤 부분보면, app.vue에 아예 sessionStorage걸어 논 것 보야.

JSON.stringify(this.user)는 this.user객체를 JSON(문자열)으로 바꾸는 것.
JSON.parse(객체) : JSON(문자열) - > (꺼내 쓸수 있는)객체로.


//import axios from 'axios': Axios를 가져옵니다. Axios는 HTTP 요청을 수행하는 JavaScript 라이브러리입니다.
const defaultApiInstance = axios.create({ ... }): Axios의 create 메서드를 사용하여 기본 API 인스턴스를 생성합니다.
이 인스턴스는, 애플리케이션의 기본 API 설정을 가지고 있습니다. baseURL은 API의 기본 URL을 설정하고,
headers는, 기본적으로 빈 문자열로 설정된, Authorization 헤더를 가지고 있습니다.

defaultApiInstance.interceptors.request.use(...):
Axios의 인터셉터를 사용하여, 모든 요청 전에 실행될 코드를 정의합니다.
이 경우, localStorage에서 'Authorization' 키로 저장된 액세스 토큰을 가져와서, 요청 헤더의 'Authorization'에 추가하고 있습니다.
이로써 각 API 요청에 대해 인증이 수행됩니다.

export default defaultApiInstance:
생성된 API 인스턴스를 내보냅니다. 이렇게 하면 이 파일을 가져온 곳에서 해당 API 인스턴스를 사용하여 HTTP 요청을 수행할 수 있습니다.
즉, 이 코드는 Axios를 사용하여 API에 대한 기본 설정 및 인증을 처리하는 Vue.js 애플리케이션에서 자주 사용되는 구성 파일입니다.

