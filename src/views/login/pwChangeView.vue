
    <!--    <div id="content" class="pwChange" style="display: none">-->
    <template>
      <div>
        <div id="content" class="pwChange">
          <div id="" class="inner">
            <h2 class="blind">비밀번호 변경</h2>

            <!-- 부트스트랩 테이블 적용 -->
            <table class="table">
              <tbody>

              <tr>
                <td>
                  <label class="inp_normal">
                    <span>현재 비밀번호</span>
                    <input type="text" id="current_pwd" name="current_pwd" placeholder="현재 비밀번호"
                           v-model="current_pwd" ref="current_pwd">
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label class="inp_normal">
                    <span>새 비밀번호</span>
                    <input type="text" id="new_pwd" name="new_pwd" placeholder="새 비밀번호"
                           v-model="new_pwd" ref="new_pwd">
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label class="inp_normal">
                    <span>새 비밀번호 확인</span>
                    <input type="text" id="confirm_pwd" name="confirm_pwd" placeholder="새 비밀번호 확인"
                           v-model="confirm_pwd" ref="confirm_pwd">
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label class="inp_normal">
                    <button type="submit" id="pwd_search_btn" name="pwd_search_btn" class="btn btn-info"
                            @click="pwChange">비밀번호 변경
                    </button>
                    <span></span>
                  </label>
                </td>
              </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>


  <!--        <popup-alert-->
<!--            ref="popupDefault"-->
<!--            :opt="popupDefaultOpt"-->
<!--            @confirmCallback="alertConfirm"-->
<!--        />-->

<script>

import header from "@/components/layout/Header.vue";
import left from "@/components/layout/Left.vue";
import axios from "axios";


export default {
    name: 'pw-change',
    components: {
        // header,
        // left
    },
    data: () => ({
      current_pwd :'',
      new_pwd:'',
      confirm_pwd:'',
      user_name:'jjj'

    }),

  created() {
    // 세션에서 사용자 정보를 가져와 user_name에 할당
    //this.user_name = sessionStorage.getItem('user_name');
  },

  methods: {

      /* 비밀번호 버튼 클릭 이벤트 */
      async pwChange() {
        if(this.current_pwd === this.new_pwd){
          alert('현재 비밀번호와 동일합니다.');
          return;
        }
        if(this.new_pwd !== this.confirm_pwd){
          alert('새로 입력한 비밀번호가 일치하지 않습니다.');
          return;
        }

        await axios.post('http://localhost:8080/api/v1/users/user/update',{
              name: this.user_name,
              password: this.new_pwd
            },
            {
              headers: {
                Authorization: localStorage.getItem('Authorization')
              }
            })
            .then((res) => {
                console.log('update res.data >> ', res);
              if (res.data.success === 200) {
                let jwtToken = res.data.user.token;
                localStorage.setItem('Authorization', jwtToken);

                //this.getNewToken(); //update후 새 토큰 받아야 한다 해서.

                console.log('성공함...');

              }
            })
            .catch((err) => {
              this.loginError = true;
              throw new Error(err);
            });
      }, // login()

        async getNewToken(){
                localStorage.removeItem('Authorization');

          await axios.post('http://localhost:8080/login', {
            name: this.user_name,
            password: this.new_pwd
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
        },

        init() {
            //this.userId = '';
            this.userTelno = '';
            this.authNo = '';
            this.chaptchaYn = 'N';
        },

        phoneNum(event) {
            this.userTelno = event.target.value;
        },

        confirmNum(event) {
            this.authNo = event.target.value;
        },

        showAlert(msg) {
            this.popupDefaultOpt = new DialogOption({
                message: msg
            });
            this.$refs.popupDefault.show();
        },


        // alertConfirm() {
        //     if (this.userId === '') {
        //         this.$refs.userId.focus();
        //     } else if (this.userTelno === '') {
        //         this.$refs.userTelno.focus();
        //     } else if (this.authNo === '') {
        //         this.$refs.authNo.focus();
        //     }
        //
	      //   if(this.isSuccess === true) {
		    //     this.$router.push('/user/login');
	      //   }
        // },
    },

    watch: {
        userTelno: function (val) {
            this.userTelno = val.replace(/[^0-9]/g, '');
          // CommonUtils.btnActive(val, "#pwd_sms_auth_btn");
        },
        authNo: function (val) {
           // CommonUtils.btnActive(val, "#pwd_search_btn");
        }
    }
}
</script>