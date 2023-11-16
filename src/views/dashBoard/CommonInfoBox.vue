<template>
  <div class="card" style="max-width: 540px;">
    <div class="card-container">
        <div class="card-body">
          <p>
            <template v-for="(changedContent, index) in lineChangedContents">
              {{changedContent}}
              <template v-if="index !== lineChangedContents.length - 1"><br></template>
            </template>
          </p>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'CommonInfoBox',
  props: ['content'],
  computed: {
    lineChangedContents (){
      return this.content.split("\n");
    }
  }
};
</script>
