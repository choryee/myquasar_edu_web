
    <!--    <div id="content" class="pwChange" style="display: none">-->
    <template>
      <div>
        <div id="content" class="pwChange">
          <div id="" class="inner">
            <h2 class="blind">계정정보</h2>

            <!-- 부트스트랩 테이블 적용 -->
            <table class="table">
              <tbody>

              <tr>
                <td>
                  <span>권한</span>
                </td>
                <td>
                  <span id="user_role" name="user_role" ref="userRole"> {{ user_role }} </span>
                </td>
              </tr>

              <tr>
                <td>
                  <label class="inp_normal">
                    <span>이름</span>

                    <span id="user_name" name="user_name" ref="userName"> {{ user_name }} </span>
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label class="inp_normal">
                    <span>비밀번호</span>
                    <button type="submit" id="pwd_search_btn" name="pwd_search_btn" class="btn btn-info"
                            @click="navigateToPwChange">비밀번호 변경
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
        //popupDefaultOpt: new DialogOption(),
        user_name: '',         // 사용자 ID
        userTelno: '',      // SMS 인증번호 요청 전화번호
        authNo: '',         // SMS 인증번호
        pwd_number: '',         // ID, PWD 구분 식별자
        user_role:'',
       // chaptchaYn: 'N',    // Captcha 인증 여부
	      isSuccess: false,   // 비밀번호 초기화 성공 여부
    }),

  created() {
      axios.get('http://localhost:8080/api/v1/users/user/getUser',
          {
            headers: {
              Authorization: localStorage.getItem('Authorization')
            }
          })
          .then((res) => {
            console.log('created() res.data >> ', res);
            if (res.status === 200 ) {
              this.user_name = res.data.name;
              this.user_role = res.data.roles;

              console.log('성공함...');

            }
          })
          .catch((err) => {
            this.loginError = true;
            throw new Error(err);
          });

  },

  methods: {

    navigateToPwChange() {
      this.$router.push({ name: 'pw-change' });
    },

      /* 비밀번호 버튼 클릭 이벤트 */
      async pwChange() {
        console.log(' pwd-number>>', this.pwd_number);

        await axios.post('http://localhost:8080/api/v1/users/user/update',{
              name: this.user_name,
              password: this.pwd_number,
            },
            {
              headers: {
                Authorization: localStorage.getItem('Authorization')
              }
            })
            .then((res) => {
                console.log('result.data >> ', res);
              if (res.data === 'ok') {
                console.log('성공함...');


                //this.loginSuccess = true;

                // Call the users method here
                //this.users();
              }
            })
            .catch((err) => {
              this.loginError = true;
              throw new Error(err);
            });
      }, // login()

        // show() {
        //     $(".pwChange").css('display', 'block');
        //
        //     this.$nextTick(() => {
        //         this.$refs.userId.focus();
        //     });
        //
        //     // 초기화
        //     this.init();
        // },
        //
        // hide() {
        //     $(".pwChange").css('display', 'none');
        // },

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