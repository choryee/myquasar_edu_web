
<template>
  <div>
    <editor-content :editor="editor" v-model:content="generatedText" class="custom-editor" />
  </div>
  <br/>
  <div>
    <button @click="saveContent">Save</button>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive, toRefs} from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import axios from "axios";
import async from "async";

const state = reactive({
  generatedText: '',
  getMemo: '', // 초기화
});

const generatedText = ref('')
// const getMemo={
//   memo : ''
// }
//const getMemo = ref({ memo : '' });
const getMemo = ref(  'bb');
let serverData;


console.log('serverData>>', serverData)
console.log('getMemo>>', getMemo);
console.log(typeof generatedText); //object
console.log(typeof getMemo); //object
console.log(typeof getMemo.value); //string


console.log('state.getMemo>>', state.getMemo);



/* editor */
const editor = useEditor({
  //content: getMemo1.memo === '' ? generatedText.value : generatedText.value,
  content: generatedText.value,
  //content: getMemo.value,
  extensions: [
    StarterKit,
  ],

  onUpdate: ({editor}) => {
    generatedText.value = editor.getHTML();
    console.log('editor에서 getMemo.memo>> ',getMemo.memo);
    console.log('generatedText onUpdate>> ', generatedText.value);

  }
})

const props = defineProps(['username']);

onMounted(async () => {
  await axios
      .get('http://localhost:8080/api/v1/users/user/getUserMemo', {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(' res.data.memo >> ', res.data.memo);
          console.log('before assignment:', generatedText.value);
          state.getMemo = reactive({ value: res.data.memo }).value; // 변경 후
          serverData = res.data.memo;
          generatedText.value = res.data.memo;
          getMemo.value = res.data.memo;
          generatedText.value = serverData;

          console.log('After assignment:', generatedText.value);

          console.log('getMemo.value.memo >>', getMemo.value);
          console.log('getMemo 성공함...', getMemo.value);
        }
      })
      .catch((err) => {
        // loginError.value = true;
        console.error(err);
      });
}); //onMount()


// const saveContent = async () => {
//   //const contentToSave = editor.getHTML();
//   const contentToSave = generatedText.value;
//   console.log('generatedText>> ', generatedText.value);
//   console.log('props.username>>', props.username);
//   await axios
//       .post(
//           'http://localhost:8080/api/v1/users/user/memo',
//           {
//             name: props.username,
//             memo: contentToSave,
//           },
//           {
//             headers: {
//               Authorization: localStorage.getItem('Authorization'),
//             },
//           }
//       )
//       .then((res) => {
//         console.log('save memo res>> ', res);
//       })
//       .catch((err) => {
//         console.log('err>> ', err);
//       });
// };

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

.custom-editor {
  /* Adjust the height and width as needed */
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
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
    background-color: #e9ecef;
    color: #495057;
  }
}
</style>
