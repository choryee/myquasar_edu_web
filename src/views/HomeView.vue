<template>
  <div class="home">
    <TestIndex/>
    <hr/>
  </div>
</template>

<script>
import TestIndex from "@/views/index/Index.vue";

export default {
  name: 'HomeView',
  components: {
    TestIndex,
   }
}
</script>
