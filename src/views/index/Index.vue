<template>
  <div class="main_wrap">
  <div class="dobby_wrap">

    <div class="circle">
      <!-- wave -->
      <div class="wave-one"></div>
      <div class="wave-two"></div>
      <div class="wave-three"></div>
      <div class="wave-four"></div>

      <!-- moon -->
      <i class="fas fa-moon"></i>
      <i class="fas fa-moon blur"></i>


      <!-- star -->
      <div class="star">
        <i class="fas fa-asterisk star1"></i>
        <i class="fas fa-asterisk star2"></i>
        <i class="fas fa-asterisk star3"></i>
        <i class="fas fa-asterisk star4"></i>
        <i class="fas fa-asterisk star5"></i>
      </div>
    </div>
    <img src="../../assets/images/Logo.png" alt="도비">
  </div>
  </div>
</template>

<script>
export default {
    name: 'TestIndex',
    mounted() {
      this.addBlurEffect();
      setTimeout(() => {
        this.removeBlurEffect();
      }, 100);
    },
    methods: {
      addBlurEffect() {
        const wrap = document.querySelector('.dobby_wrap');
        wrap.style.filter = 'blur(3px)';
      },
      removeBlurEffect() {
        const wrap = document.querySelector('.dobby_wrap');
        wrap.style.filter = 'blur(0px)';
        setTimeout(() => {
          this.addBlurEffect();
          this.$router.push('/login');
        }, 2000);
      },
    },
  };
</script>

<style>
@import "@/assets/css/index.css";

</style>
