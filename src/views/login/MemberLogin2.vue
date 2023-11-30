<template>
  <br/>
  <div align="center">
    <div>
      <h1>연차관리시스템</h1>
      <span><img src="../../assets/images/emgramLogo.png" alt=""></span>
    </div>
    <br/>
    <div class="unprotected" v-if="loginError">
      <h1>
        <p variant="danger">이 페이지에 대한 접근 권한이 없습니다.</p>
      </h1>
      <h5>로그인 실패!</h5>
    </div>
    <div class="unprotected" v-else>
      <div id="container">
        <div id="loginBox">
          <div id="loginBoxTitle"></div>
          <div id="inputBox">

            <form @submit.prevent="login">
              <div class="input-form-box"><span>아이디 </span><input type="text" name="username" class="form-control" v-model="username"></div>
              <div class="input-form-box"><span>비밀번호 </span><input type="password" name="password" class="form-control" v-model="password"></div>
              <div class="button-login-box">
                <button type="submit" class="btn btn-primary btn-xs" style="width:100%">로그인</button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MemberLogin',

  data() {
    return {
      loginError: false,
      username: '',
      password: '',
      error: false,
      employee_no: ''
    }
  },
  methods: {
    async login() {
      console.log(this.username, this.password);
      await axios.post('http://localhost:8080/login', { // 8080/login은 아예 컨트럴러 안 탐.<-이것은 탐.
        name: this.username,
        password: this.password
      })
          .then((res) => {
            if (res.status === 200) {
              let jwtToken = res.headers.get('Authorization');
              localStorage.setItem('Authorization', jwtToken);
              this.$router.push({name: 'adminInfo'});
            }
          })
          .catch((err) => {
            console.log('login error >>', err);
            this.loginError = true;
            throw new Error(err);
          });
    }, // login()

  }
}
</script>
<style>
#container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#loginBox {
  width: 300px;
  text-align: center;
  background-color: #ffffff;
}
.input-form-box {
  border: 0px solid #ff0000;
  display: flex;
  margin-bottom: 5px;
}
.input-form-box > span {
  display: block;
  text-align: left;
  padding-top: 5px;
  min-width: 65px;
}
.button-login-box {
  margin: 10px 0;
}
#loginBoxTitle {
  color:#000000;
  font-weight: bold;
  font-size: 32px;
  text-transform: uppercase;
  padding: 5px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #270a09, #8ca6ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#inputBox {
  margin: 10px;
}

#inputBox button {
  padding: 3px 5px;
}
</style>