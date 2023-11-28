<template>
  <div class="home">
    <MemberLogin/>
    <hr/>
  </div>
</template>

<script>
// @ is an alias to /src
import MemberLogin from "@/components/MemberLogin.vue";


export default {
  name: 'HomeView',
  components: {
    MemberLogin
   }
}
</script>
