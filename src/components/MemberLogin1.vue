<!--<template>-->
<!--  <div class="protected" v-if="loginSuccess">-->
<!--    <h1>-->
<!--      <b-badge variant="success">보안 사이트에 대한 액세스가 허용되었습니다</b-badge>-->
<!--    </h1>-->
<!--    <h5>로그인 성공!</h5>-->
<!--  </div>-->
<!--  <div class="unprotected" v-else-if="loginError">-->
<!--    <h1>-->
<!--      <b-badge variant="danger">이 페이지에 대한 접근 권한이 없습니다.</b-badge>-->
<!--    </h1>-->
<!--    <h5>로그인 실패!</h5>-->
<!--  </div>-->
<!--  <div class="unprotected" v-else>-->
<!--    <h1>-->
<!--      <b-badge variant="info">로그인해주세요</b-badge>-->
<!--    </h1>-->
<!--    <h5>로그인 하지 않았습니다. 로그인을 해주세요</h5>-->

<!--    <form @submit.prevent="login()">-->
<!--      <label>-->
<!--        <input type="text" placeholder="username" v-model="user">-->
<!--      </label>-->
<!--      <label>-->
<!--        <input type="password" placeholder="password" v-model="password">-->
<!--      </label>-->
<!--      <b-btn variant="success" type="submit">Login</b-btn>-->
<!--      <p v-if="error" class="error">Bad login information</p>-->
<!--    </form>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios'-->
<!--import { BBadge, BButton } from 'bootstrap-vue';-->

<!--export default {-->
<!--  name: 'MemberLogin',-->
<!--  components: {-->
<!--    BBadge,-->
<!--    BButton,-->
<!--    // ... other components you may need-->
<!--  },-->
<!--  data() {-->

<!--    return {-->
<!--      loginSuccess: false,-->
<!--      loginError: false,-->
<!--      user: '',-->
<!--      password: '',-->
<!--      error: false-->
<!--      //token: jwtToken-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async login() {-->
<!--      console.log(this.user, this.password);-->

<!--      await axios.post('http://localhost:8080', {-->
<!--        name: this.user,-->
<!--        password: this.password,-->
<!--      })-->
<!--      .then((res) => {-->
<!--        if (res.status === 200) {-->
<!--          let jwtToken = res.headers.get('Authorization');-->
<!--          localStorage.setItem('Authorization', jwtToken);-->

<!--          console.log('result.data >> ', res);-->
<!--          console.log('받은 토큰 jwtToken>> ', jwtToken);-->
<!--          this.loginSuccess = true;-->

<!--          // Call the users method here-->
<!--          this.users();-->
<!--        }-->
<!--      })-->
<!--      .catch((err) => {-->
<!--        this.loginError = true;-->
<!--        throw new Error(err);-->
<!--      });-->
<!--    }, // login()-->


<!--    async users() {-->
<!--      try {-->
<!--        const result = await axios.post(-->
<!--            'http://localhost:8080/api/v1/users/user',-->
<!--            {},-->
<!--            {-->
<!--              headers: {-->
<!--                Authorization: localStorage.getItem('Authorization'),-->
<!--              },-->
<!--            }-->
<!--        );-->
<!--        if (result.status === 200) {-->
<!--          console.log('성공>> ', result.data);-->
<!--          this.loginSuccess = true;-->
<!--        }-->
<!--      } catch (err) {-->
<!--        this.loginError = true;-->
<!--        throw new Error(err);-->
<!--      }-->
<!--    } // users()-->
<!--  } // methods:-->



<!--}-->

<!--</script>-->