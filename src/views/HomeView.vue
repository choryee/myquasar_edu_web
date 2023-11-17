<template>
  <div class="home">
    <MemberLogin/>
    <hr/>
  </div>
</template>

<script>
// @ is an alias to /src
import MemberLogin from "@/components/MemberLogin.vue";
import pwChangeView from "@/views/login/pwChangeView.vue";

export default {
  name: 'HomeView',
  components: {
    MemberLogin,
    pwChangeView,
   }
}
</script>
