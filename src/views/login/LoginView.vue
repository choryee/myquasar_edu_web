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
    <form>
      <label>아이디 : </label><input type="text" placeholder="아이디를 입력하세요"><br>
      <label>비밀번호 : </label><input type="password" placeholder="비밀번호를 입력하세요">
   <div class="login_btn_wrap"><button type="button"  @click="login">로그인</button><button>회원가입</button></div>
    </form>
  </div>
  </div>
  </div>
</template>
<script>
export default {
name: 'TestIndex',
  data() {
    return {
      loginOpacity: 0,
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
    },login() {
      this.$router.push(`/dash-board`);
    },
  },
};

</script>

<style>
@import "@/assets/css/login.css";
</style>