<template>
  <div class="main_wrap">
  <div class="login_wrap" :style="{ opacity: loginOpacity }">
  <div class="left">
  <img src="../../assets/images/emgramLogo.png" alt="emgram">
  </div>
  <div class="login_form_wrap">
    <h1>연차 관리 시스템</h1>
    <img src="../../assets/images/Logo.png" alt="Dobby">
    <h2>Sign In</h2>
    <form  @submit.prevent="login()">
      <label>아이디 : </label><input type="text" v-model="username" placeholder="아이디를 입력하세요"><br>
      <label>비밀번호 : </label><input type="password"  v-model="password" placeholder="비밀번호를 입력하세요">
   <div class="login_btn_wrap"><button type="button"  @click="login">로그인</button><button>회원가입</button></div>
    </form>
  </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
name: 'TestIndex',
  data() {
    return {
      loginOpacity: 0,
      loginError: false,
      username: '',
      password: '',
      error: false,
      employee_no: ''
    };
  },
  mounted() {
    this.fadeInLoginPage();
  },
  methods: {
    fadeInLoginPage() {
      const fadeDuration = 500;
      const steps = 60;
      const stepDuration = fadeDuration / steps;

      let currentOpacity = 0;
      let step = 0;

      const fadeInInterval = setInterval(() => {
        currentOpacity += 1 / steps;
        this.loginOpacity = currentOpacity;

        step++;

        if (step >= steps) {
          clearInterval(fadeInInterval);
        }
      }, stepDuration);
    },
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
  }
}
}


</script>

<style>
@import "@/assets/css/login.css";
</style>