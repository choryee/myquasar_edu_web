<template>
  <div class="card border-dark mb-3" style="max-width: 18rem;">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
      <p v-for="content in lineChangedContents" class="card-text">
        {{content}}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommonInfoCard',
  props: ['title','content'],
  computed: {
    lineChangedContents (){
      return this.content.split("\n");
    }
  }
};
</script>