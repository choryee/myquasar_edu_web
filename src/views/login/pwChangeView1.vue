<template>
    <div id="content" class="pwChange" style="display: none">
        <div id="" class="inner">
            <h2 class="blind">비밀번호 초기화</h2>
            <div class="box">
                <p>모든 입력항목은 필수 입력 항목입니다.</p>
                <ul>
                    <li>
                        <label class="inp_normal">
                            <input type="text" id="user_id" name="user_id" placeholder="아이디" v-model="userId"
                                   ref="userId">
                            <span></span>
                        </label>
                    </li>
                    <li>
                        <label class="inp_normal">
                            <input type="text" id="pwd_number" name="pwd_number" placeholder="핸드폰번호" @input="phoneNum"
                                   :value="userTelno" ref="userTelno">
                            <span></span>
                        </label>
                    </li>

                    <li class="btn_wrap">
                        <input type="submit" id="pwd_search_btn" name="pwd_search_btn" class="btn btn_mint"
                               value="비밀번호 초기화"
                               @click="pwChange" style="background: #b6e7e7; color: #e2f5f5;" disabled>
                    </li>
                </ul>
            </div>
        </div>

<!--        <popup-alert-->
<!--            ref="popupDefault"-->
<!--            :opt="popupDefaultOpt"-->
<!--            @confirmCallback="alertConfirm"-->
<!--        />-->

    </div>
</template>

<script>

import header from "@/components/layout/Header.vue";
import left from "@/components/layout/Left.vue";


export default {
    name: 'pw-change',
    components: {
        // header,
        // left
    },
    data: () => ({
        //popupDefaultOpt: new DialogOption(),
        userId: '',         // 사용자 ID
        userTelno: '',      // SMS 인증번호 요청 전화번호
        authNo: '',         // SMS 인증번호
        id_pwd: '',         // ID, PWD 구분 식별자
        chaptchaYn: 'N',    // Captcha 인증 여부
	      isSuccess: false,   // 비밀번호 초기화 성공 여부
    }),

    methods: {
        show() {
            $(".pwChange").css('display', 'block');

            this.$nextTick(() => {
                this.$refs.userId.focus();
            });

            // 초기화
            this.init();
        },

        hide() {
            $(".pwChange").css('display', 'none');
        },

        init() {
            this.userId = '';
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

        /* 인증번호 발송 */
        sendConfirmNum() {
            if (this.userId === '') {
                this.showAlert("아이디를 입력해주세요.");
                return;
            } else if (this.userTelno === '') {
                this.showAlert("번호를 정확히 입력해주세요.");
                return;
            }

            this.id_pwd = "pwd";

            this.reqUserCheck();
        },

        /* SMS 인증번호 요청 전 본인확인 및 발송 */
        async reqUserCheck() {
            const parameter = new Object();

            parameter.id_pwd = this.id_pwd;			  // ID, PWD 구분 식별자
            parameter.userTelno = this.userTelno;	// 핸드폰 번호
            parameter.userId = this.userId;       // 사용자 아이디
            // parameter.req = "captcha";			      // 캡차 인증 여부 확인위해

            const data = await call.reqUserCheck(parameter);

            this.resUserCheck(data);
        },

        /* SMS 인증번호 발송 결과 처리 */
        resUserCheck(data) {
            this.chaptchaYn = 'Y';

            // 결과 코드 처리
            if (data.resCd === '200') {
                // SMS 인증번호 정상 요청
                this.showAlert("입력한 번호로 인증번호가 발송되었습니다.");
            } else if (data.resCd == "000") {
                // 본인확인 실패
                this.showAlert("입력한 번호로 인증번호가 발송되었습니다.");
            } else {
                // SMS 인증번호 요청 실패
                this.showAlert("인증번호 요청에 실패했습니다.");
            }
        },

        /* 비밀번호 초기화 버튼 클릭 이벤트 */
        pwChange() {
            if (this.authNo === '') {
                this.showAlert("인증번호를 입력해주세요.");
                return;
            }

            this.id_pwd = "pwd";

            // SMS 인증번호 확인요청
            this.reqAuthSmsConfirm();
        },

        /* SMS 인증번호 확인요청 */
        async reqAuthSmsConfirm() {
            const parameter = new Object();
            const apiParameter = new Object();

            apiParameter.userTelno = this.userTelno;	//사용자 전화번호
            apiParameter.authNo = this.authNo;			//인증번호
            apiParameter.userId = this.userId;			//사용자 이름

            parameter.type = this.id_pwd;
            parameter.params = apiParameter;
	        parameter.selectId = this.userId;
            parameter.callUrl = CallUrl.smsConfirm.url;
	        parameter.req = "login";

            const data = await call.reqAuthSmsConfirm(parameter);

            this.resAuthSmsConfirm(data);
        },

        /* SMS 인증번호 확인요청 결과 처리 */
        resAuthSmsConfirm(data) {

            // 결과 코드 처리
            if (data.resCd === '200') {
                // 비밀번호 찾기 요청
                this.showAlert("고객님의 비밀번호가 초기화되었습니다.<br>임시 비밀번호는 " + data.initp + " 입니다. 로그인 후 비밀번호를 변경하세요.");
                this.init();
	            this.isSuccess = true;
                return;
            } else if(data.resCd === '99999') {
	            this.showAlert("비밀번호 초기화에 실패하였습니다.");
	            return;
            } else {
                this.showAlert(data.rMsg);
                return;
            }
        },

        alertConfirm() {
            if (this.userId === '') {
                this.$refs.userId.focus();
            } else if (this.userTelno === '') {
                this.$refs.userTelno.focus();
            } else if (this.authNo === '') {
                this.$refs.authNo.focus();
            }

	        if(this.isSuccess === true) {
		        this.$router.push('/user/login');
	        }
        },
    },

    watch: {
        userTelno: function (val) {
            this.userTelno = val.replace(/[^0-9]/g, '');
            CommonUtils.btnActive(val, "#pwd_sms_auth_btn");
        },
        authNo: function (val) {
            CommonUtils.btnActive(val, "#pwd_search_btn");
        }
    }
}
</script>