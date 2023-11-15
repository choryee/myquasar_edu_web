<template>
  <editor-content :editor="editor" v-model:content="editorContent" />
  <button @click="saveContent">Save</button>
</template>

<script setup>
import { ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios';

const editorContent = ref('bb');

const editor = useEditor({
  content: '',
  extensions: [StarterKit],
});

const saveContent=

    async ()=>{
      //const contentToSave = editor.getHTML();
      //const contentToSave = 'to seek a better life..';
      console.log('contentToSave>> ', contentToSave);
      await axios.post('/api/v1/users/user/content', {content:contentToSave},
          {
            headers : localStorage.getItem("Authorization")
          })
          .then(res=>{
            console.log('content res>> ', res);

          })
          .catch(err=>{
            console.log('err', err);
          })
    };
</script>


<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  }
}
</style>