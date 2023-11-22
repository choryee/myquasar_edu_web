<template>
  <div>
    <h1>연차관리시스템</h1>
  </div>
  <br/>
  <div>
    <h3>회원가입</h3>
  </div>
  <br/>

  <div class="unprotected" >
    <form @submit.prevent="join()">
       아이디 :  <input type="text" placeholder="username" v-model="username">
      <br/>
      <label>
        비밀번호 : <input type="password" placeholder="password" v-model="password">
      </label>
      <br/>
      <label>
        사원번호 : <input type="employee_no" placeholder="employee_no" v-model="employee_no">
      </label>
      <br/>
      <label>
        사원이름 : <input type="employee_name" placeholder="employee_name" v-model="employee_name">
      </label>
      <br/>
      <button variant="success" type="submit">Login</button>

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
    async join() {
      console.log(this.username, this.password);
      await axios.post('http://localhost:8080/api/v1/users/join', {
        name: this.username,
        password: this.password,
        employee_no:this.employee_no,
        employee_name : this.employee_name
      })
          .then((res) => {
            if (res.status === 200) {
              alert("회원가입이 완료됐습니다.")
              this.$router.push({ name: 'home' });
            }
          })
          .catch((err) => {
            console.log('login error >>', err);
            this.loginError = true;
            throw new Error(err);
          });
    }, // login()
  } // methods:
}
</script>