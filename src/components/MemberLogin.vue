<template>
  <br/>
  <div align="center">
    <div>
      <h1>연차관리시스템</h1>
      <span><img src="../assets/images/emgramLogo.png" alt=""></span>
    </div>
    <br/>


    <div class="unprotected" v-if="loginError">
      <h1>
        <p variant="danger">이 페이지에 대한 접근 권한이 없습니다.</p>
      </h1>
      <h5>로그인 실패!</h5>
    </div>

    <div class="unprotected" v-else>
      <h5>로그인 하지 않았습니다. 로그인을 해주세요</h5>
      <br/>

      <form @submit.prevent="login()">
        아이디 :  <input type="text" placeholder="username" v-model="username">
        <br/>
        <label>
          비밀번호 : <input type="password" placeholder="password" v-model="password">
        </label>
        <br/>
        <button variant="success" type="submit">Login</button>
        <p v-if="error" class="error">Bad login information</p>
      </form>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import NotePad from "@/views/login/NotePad.vue";
import headers from "core-js/internals/queue";


export default {
  name: 'MemberLogin',
  components: {
    NotePad
  },


  data() {
    return {
      loginError: false,
      username: '',
      password: '',
      error: false,
      employee_no: ''
    }
  },
  methods: {

    async login() {
      console.log(this.username, this.password);
      await axios.post('http://localhost:8080/login', { // 8080/login은 아예 컨트럴러 안 탐.<-이것은 탐.
        name: this.username,
        password: this.password
      })
          .then((res) => {
            if (res.status === 200) {
              let jwtToken = res.headers.get('Authorization');
              localStorage.setItem('Authorization', jwtToken);

              console.log('result.data >> ', res);
              console.log('받은 토큰 join jwtToken>> ', jwtToken);
              //this.loginSuccess = true;

              // Call the users method here
              //this.users();
              this.$router.push({name: 'adminInfo'});
            }
          })
          .catch((err) => {
            console.log('login error >>', err);
            this.loginError = true;
            throw new Error(err);
          });
    }, // login()


    async users() {
      console.log('username>>', this.username);

      try {
        const result = await axios.post(
            'http://localhost:8080/api/v1/users/user',
            {
              name: this.username,
              password: this.password,
              //token : localStorage.getItem('Authorization')
            },
            {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
              }
            }
        );
        if (result.status === 200) {
          console.log('성공>> ', result.data);
          this.loginSuccess = true;
        }
      } catch (err) {
        this.loginError = true;
        throw new Error(err);

      } // users()
    } // methods:
  }
}
</script>