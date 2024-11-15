    <template>
      <div>
        <div align="center">
        </div>
        <div id="container" >
          <div id="loginBox" >
            <div id="loginBoxTitle">비밀번호 변경</div>
            <div id="inputBox" >
              <div >
                <div class="input-form-box" ><span >현재 비밀번호 </span><input type="password" name="current_pwd" class="form-control" v-model="current_pwd"></div>

                <div class="input-form-box"><span>새 비밀번호
              </span><input type="password" name="new_pwd" id="pw" class="form-control" v-model="new_pwd">
                  <br/>
                </div>
                <div>
                  <span>( 6글짜이상 12글짜이하, !@#$%을 반드시 포함 )</span>
                </div>
                <br/>

                <div class="input-form-box"><span>새 비밀번호 확인 </span><input type="password" name="confirm_pwd" class="form-control" v-model="confirm_pwd">

                </div>
                <div class="button-login-box" >
                  <button type="submit" class="btn btn-warning btn-xs" style="width:100%" @click="pwChange">비밀변호 변경</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
import LoginAdminProtocol from "@/network/LoginAdminProtocol";

export default {
  name: 'pw-change',
  data: () => ({
    current_pwd: '',
    new_pwd: '',
    confirm_pwd: '',
    user_name: ''
  }),

  created() {
    this.user_name = this.$store.state.userName;
    console.log('this.$store.state.userName>>', this.$store.state.userName)
  },

  computed: {
    ...mapState(['setUserName']), // 'user_name'은 Vuex 스토어에 저장된 상태의 이름
  },

  methods: {
    async pwChange() {
      if (this.current_pwd === this.new_pwd) {
        alert('현재 비밀번호와 동일합니다.');
        return;
      }
      if (this.new_pwd !== this.confirm_pwd) {
        alert('새로 입력한 비밀번호가 일치하지 않습니다.');
        return;
      }
      try {
        const response = await  LoginAdminProtocol.adminChangePwd({
          name: this.user_name,
          password: this.new_pwd
        });
        if (response && response.result === 'success') {
          alert('비밀번호가 변경되었습니다.');
        }
      } catch (error) {
        console.error('Error during password change:', error);
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }


      //   await axios.post('http://localhost:8080/api/v1/users/user/update',
      //       {
      //         name: this.user_name,
      //         password: this.new_pwd,
      //         token : localStorage.getItem('Authorization')
      //            },
      //       {
      //         headers: {
      //           Authorization: localStorage.getItem('Authorization')
      //         }
      //       })
      //       .then((res) => {
      //           console.log('update res.data >> ', res);
      //         if (res.data.success === 200) {
      //             alert('비밀번호가 변경되었습니다.');
      //             this.$router.push({name : 'adminInfo'});
      //         }
      //       })
      //       .catch((err) => {
      //         this.loginError = true;
      //         throw new Error(err);
      //       });
      // },
    },
  }
}
</script>