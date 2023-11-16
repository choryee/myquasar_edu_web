<template>
  <div>
    <h1>연차관리시스템</h1>
  </div>

  <div class="protected" v-if="loginSuccess">
    <h1>
      <p variant="success">보안 사이트에 대한 액세스가 허용되었습니다</p>
    </h1>
    <label >
<!--      <h5 @click="showPopup">로그인 성공!</h5>-->

      <h5 @click="openWindow">로그인 성공!</h5>
<!--        <NotePad :username="username"/>-->
<!--      <div v-if="isPopupVisible" class="popup">-->
<!--      </div>-->
    </label>
  </div>

  <div class="unprotected" v-else-if="loginError">
    <h1>
      <p variant="danger">이 페이지에 대한 접근 권한이 없습니다.</p>
    </h1>
    <h5>로그인 실패!</h5>
  </div>

  <div class="unprotected" v-else>
    <h1>
      <p variant="info">로그인해주세요</p>
    </h1>
    <h5>로그인 하지 않았습니다. 로그인을 해주세요</h5>

    <form @submit.prevent="login()">
       아이디 :  <input type="text" placeholder="username" v-model="username">


<!--      <div v-if="isPopupVisible" class="popup">-->
<!--        <textarea class="form-control summernote" rows="5" id="content"/>-->
<!--      </div>-->

      <br/>
      <label>
        비밀번호 : <input type="password" placeholder="password" v-model="password">
      </label>
      <br/>
      <button variant="success" type="submit">Login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import Tiptap from "@/views/login/Tiptap.vue";
import NotePad from "@/views/login/NotePad.vue";
import {reactive} from "vue";



export default {
  name: 'MemberLogin',
  components: {
    NotePad
    // ... other components you may need
  },


  data() {
    return {
      loginSuccess: false,
      loginError: false,
      username: '',
      password: '',
      error: false,
      isPopupVisible:false,
      summernoteContent: ''
      //token: jwtToken
    }
  },
  methods: {
    showPopup(){
      console.log('popup click...')
      this.isPopupVisible=true;
    },

    openWindow() {
      // const newin = window.open('', 'width=200', 'height=300');
      // newin.document.write('<head><title>View Image111</title></head><body onclick="self.close()">');
        axios.post('http://localhost:8080/api/v1/users/user/showNotePad',
            {
              name: this.username
            },
            { // 8080/login은 아예 컨트럴러 안 탐.
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          },
        })
            .then((res) => {
              if (res.status === 200) {
                console.log(' res.data.memo >> ', res.data.memo);

              }
            })
            .catch((err) => {
              // loginError.value = true;
              console.error(err);
            });

    },

    async login() {
      console.log(this.username, this.password);

      await axios.post('http://localhost:8080/login', { // 8080/login은 아예 컨트럴러 안 탐.
      //await axios.post('http://localhost:8080/api/v1/users/join', {
        name: this.username,
        password: this.password,
      })
      .then((res) => {
        if (res.status === 200) {
          let jwtToken = res.headers.get('Authorization');
          localStorage.setItem('Authorization', jwtToken);

          console.log('result.data >> ', res);
          console.log('받은 토큰 jwtToken>> ', jwtToken);
          this.loginSuccess = true;

          // Call the users method here
          this.users();
        }
      })
      .catch((err) => {
        console.log('login error >>', err);
        this.loginError = true;
        throw new Error(err);
      });
    }, // login()


    async users() {
      console.log('username>>',this.username);

      try {
        const result = await axios.post(
            'http://localhost:8080/api/v1/users/user',
            {
              name: this.username,
              password: this.password,
              //token : localStorage.getItem('Authorization')
            },
            {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
              }
            }
        );
        if (result.status === 200) {
          console.log('성공>> ', result.data);
          this.loginSuccess = true;
        }
      } catch (err) {
        this.loginError = true;
        throw new Error(err);
      }
    } // users()
  } // methods:
}

</script>
<style>
/* 팝업 스타일링은 필요에 따라 추가하십시오 */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>