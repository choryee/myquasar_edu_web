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

export default {
  name: 'HomeView',
  components: {
    MemberLogin,
    HelloWorld
  }
}
</script>
