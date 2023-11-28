    <template>
      <div>
        <div id="content" class="pwChange">
          <div id="" class="inner">
            <h2 class="blind">비밀번호 변경</h2>
            <table class="table">
              <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <label class="inp_normal">
                    <span>현재 비밀번호</span>
                  </label>
                </td>
                <td>
                  <label class="inp_normal">
                    <input type="text" id="current_pwd" name="current_pwd" placeholder="현재 비밀번호"
                           v-model="current_pwd" ref="current_pwd">
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                    <span>새 비밀번호</span>
                </td>
                    <td>
                    <input type="text" id="new_pwd" name="new_pwd" placeholder="새 비밀번호"
                           v-model="new_pwd" ref="new_pwd">
                    </td>
              </tr>
              <tr>
                <td>
                    <span>새 비밀번호 확인</span>
                </td>
                  <td>
                    <input type="text" id="confirm_pwd" name="confirm_pwd" placeholder="새 비밀번호 확인"
                           v-model="confirm_pwd" ref="confirm_pwd">
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

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
    name: 'pw-change',
    data: () => ({
      current_pwd :'',
      new_pwd:'',
      confirm_pwd:'',
      user_name : ''
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
        if(this.current_pwd === this.new_pwd){
          alert('현재 비밀번호와 동일합니다.');
          return;
        }
        if(this.new_pwd !== this.confirm_pwd){
          alert('새로 입력한 비밀번호가 일치하지 않습니다.');
          return;
        }

      await axios.post('http://localhost:8080/api/v1/users/user/update',
          {
            name: this.user_name,
            password: this.new_pwd,
            token : localStorage.getItem('Authorization')
               },
          {
            headers: {
              Authorization: localStorage.getItem('Authorization')
            }
          })
          .then((res) => {
              console.log('update res.data >> ', res);
            if (res.data.success === 200) {
                alert('비밀번호가 변경되었습니다.');
                this.$router.push({name : 'adminInfo'});
            }
          })
          .catch((err) => {
            this.loginError = true;
            throw new Error(err);
          });
    },
    },
}
</script>