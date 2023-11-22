<template>
  <div>
    <button @click="test">테스트</button>
  </div>
</template>

<script>
import axios, {post} from "axios";


export default {

  methods: {
    async test() {
      await axios.post('http://localhost:8080/test',
          {
            name: 'aa',
            password: '5698'
          },
          {
            headers: {
              Authorization: localStorage.getItem('Authorization')
            }
          })
          .then((res) => {
            console.log('test res.data >> ', res);
            if (res.data === 'ok') {
              console.log('test 성공함...');
            }
          })
          .catch((err) => {
            alert('요청 권한이 없습니다');
            this.$router.push({ name: 'home' });

          })
    }
  }
}
</script>
