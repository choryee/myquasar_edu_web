<template>
  <div class="home">
    <MemberLogin/>
    <hr/>


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MemberLogin from "@/components/MemberLogin.vue";
// import Header from "@/components/layout/Header.vue";
// import Left from "@/components/layout/Left.vue";
import pwChangeView from "@/views/login/pwChangeView.vue";

export default {
  name: 'HomeView',
  components: {
    MemberLogin,
    pwChangeView,
    // Header,
    // Left
  }
}
</script>
