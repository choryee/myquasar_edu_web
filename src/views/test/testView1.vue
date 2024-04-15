<template>
  <button @click="makingWords">Button</button>
  <input type="text" v-model="givingData.message"/><br/>
  Below is a childComponent.<br/>
  <test-child1 :childData="givingData"></test-child1>
</template>

<script>
import TestChild1 from "@/views/test/TestChild1.vue";

export default {
  components:{
    TestChild1
  },
  data(){
    return{
      givingData : {
        message:'',
        name: 'Jon'
      }
    }
  },
  mounted() {
  },
  methods:{
    makingWords(){
     this.givingData.message+='haha';
    }
  }//methods
}
</script>