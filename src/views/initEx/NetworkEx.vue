<template>
  <pre>
    {{responseData}}
  </pre>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Network from "@/network";

const responseData = ref('')

onMounted(()=>{
  Network.auth.login()
    .then(res=>{
      responseData.value = res
    })
    .catch(err=>{
      responseData.value = err
    })
})

</script>

<style scoped>
pre{
  text-align: left;
}
</style>