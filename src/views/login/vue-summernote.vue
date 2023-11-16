<!-- VueSummernote.vue -->

<template>
  <div>
    <textarea ref="summernote"></textarea>
  </div>
</template>

<script>
// import 'summernote/dist/summernote-bs4.css';
// import 'summernote/dist/summernote-bs4.js';

export default {
  data() {
    return {
      editor: null,
    };
  },
  props: ['value'],
  watch: {
    value: function(newValue) {
      if (this.editor) {
        this.editor.summernote('code', newValue);
      }
    },
  },
  mounted() {
    this.initializeEditor();
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.summernote('destroy');
    }
  },
  methods: {
    initializeEditor() {
      this.editor = this.$refs.summernote;

      this.editor.summernote({
        height: 300,
        callbacks: {
          onChange: this.updateValue,
        },
      });
    },
    updateValue() {
      this.$emit('input', this.editor.summernote('code'));
    },
  },
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
