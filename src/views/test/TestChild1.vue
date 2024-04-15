<template>
  <input v-model="childData.message"/>
</template>
<script>
export default {
  components:{

  },
  props:{
    childData:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      getData:{
        // childData:{
        //
        // }
      }
    }
  }
}
</script>