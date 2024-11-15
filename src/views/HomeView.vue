<template>
  <div className="home">
<!--    <TestIndex/>-->

    <MemberLogin/>
    <hr/>
  </div>
</template>

<script>

import TestIndex from "@/views/index/Index.vue";

// @ is an alias to /src
import MemberLogin from "@/views/login/MemberLogin.vue";


export default {
  name: 'HomeView',
  components: {
    MemberLogin,
    //TestIndex
  },
  data(){
    return {
      token:localStorage.getItem('Authorization')
    }
  }
}
</script>
