<template>
  <div align="center">
    <div>
      <h1>관리시스템 join</h1>
    </div>
    <br/>
    <div>
    </div>
  </div>
  <br/>

  <div class="unprotected" >

    <form @submit.prevent="join()">

      <div id="container">
        <div id="loginBox">
          <div id="loginBoxTitle">회원가입</div>
          <div id="inputBox">
            <div >
              <div class="input-form-box"><span>아이디 </span><input type="text" name="username" class="form-control" v-model="username"></div>

              <div class="input-form-box"><span>비밀번호
              </span><input type="password" name="password" id="pw" class="form-control" v-model="password">
                <br/>
              </div>
                <div>
                  <span>( 6글짜이상 12글짜이하, !@#$%을 반드시 포함 )</span>
                </div>
              <br/>
              <div class="input-form-box"><span>사원번호 </span><input type="text" name="employee_no" class="form-control" v-model="employee_no">

              </div>
              <div class="input-form-box"><span>사원이름 </span><input type="text" name="employee_name" class="form-control" v-model="employee_name"></div>
              <div class="button-login-box" >
                <button type="button" class="btn btn-warning btn-xs" style="width:100%" @click="join()">회원가입</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MemberJoin',

  data() {
    return {
      username: '',
      password: '',
      employee_no:'',
      employee_name : ''
    }
  },
  methods: {

     check_pw(){
        let pw = document.getElementById('pw').value;
        let SC = ["!", "@", "#", "$", "%"];
        let check_SC = 0;

        if (pw.length < 6 || pw.length > 12) {
          window.alert('비밀번호는 6글자 이상, 12글자 이하만 이용 가능합니다.');
          document.getElementById('pw').value = '';
          document.getElementById('pw').focus();
          return;
        }
        for (let i = 0; i < SC.length; i++) {
          if (pw.indexOf(SC[i]) != -1) {
            check_SC = 1;
          }
        }
        if (check_SC === 0) {
          window.alert('!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.')
          document.getElementById('pw').value = '';
          document.getElementById('pw').focus();
        }
    },

    async join() {
      this.check_pw();
      console.log(this.username, this.password);
      if (this.username !== '' && this.password !== '' && this.employee_no !== '' && this.employee_name !== '') {
        await axios.post('http://localhost:8080/api/v1/users/join', {
          name: this.username,
          password: this.password,
          employee_no: this.employee_no,
          employee_name: this.employee_name
        })
            .then((res) => {
              if (res.status === 200) {
                alert("회원가입이 완료됐습니다.")
                this.$router.push({name: 'home'});
              }
            })
            .catch((err) => {
              console.log('login error >>', err);
              this.loginError = true;
              throw new Error(err);
            });
      } // join()
    },

  } // methods:
}
</script>