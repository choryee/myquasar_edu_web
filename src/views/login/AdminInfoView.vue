    <template>
      <div id="content">
        <div id="content" class="pwChange">
          <div id="" class="inner">
            <h2 class="blind">[관리자 계정정보]</h2>

            <table class="table">
              <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
              </thead>

<!--              <tbody v-for="(user, index) in [filteredUsers]" :key="index">-->
<!--              <tr>-->
<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span>사원번호</span>-->
<!--                  </label>-->
<!--                </td>-->

<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span id="employee_no" name="employee_no" > {{ user.employee_no }} </span>-->
<!--                  </label>-->
<!--                </td>-->
<!--              </tr>-->

<!--              <tr>-->
<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                  <span>권한</span>-->
<!--                  </label>-->
<!--                </td>-->

<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span id="user_role" name="user_role" > {{  user.roles }} </span>-->
<!--                  </label>-->
<!--                </td>-->
<!--              </tr>-->

<!--              <tr>-->
<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span>이름</span>-->
<!--                  </label>-->
<!--                </td>-->

<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span id="user_name" name="user_name" > {{  user.employee_name }} </span>-->
<!--                  </label>-->
<!--                </td>-->
<!--              </tr>-->

<!--              <tr>-->
<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <span>비밀번호</span>-->
<!--                  </label>-->
<!--                </td>-->

<!--                <td>-->
<!--                  <label class="inp_normal">-->
<!--                    <button type="submit" id="pwd_search_btn" name="pwd_search_btn" class="btn btn-info"-->
<!--                            @click="navigateToPwChange">비밀번호 변경-->
<!--                    </button>-->
<!--                  </label>-->
<!--                </td>-->
<!--              </tr>-->
<!--              </tbody>-->
            </table>
            <br/>
            <hr/>
            <div>
              <span>연차사용내역조회 예시 페이지(메모장과 엑셀 테스트를 위해)</span><br/>
              <button @click="excelDownload" >엑셀 다운로드</button>
            </div>
            <br/>
            <table class="table"></table>
            <TableComponent :tableData="filteredAdminData" :headers="tableHeaders"/>
<!--            TableComponent -> table.vue임-->
          </div>
        </div>
      </div>
    </template>


<script>
import axios from "axios";
import LoginAdminProtocol from "@/network/LoginAdminProtocol";
import TableComponent from '@/components/table/table.vue'
import network from "@/network";
import async from "async";
import ColumTable from '@/components/table/columTable.vue';


export default {
  name: 'adminInfo',
  components: {
    TableComponent,
    LoginAdminProtocol
  },

  // data: () => ({
  //     user_name : '',
  //     user_adminName : '',
  //     pwd_number: '',
  //     user_role:'',
  //     employee_name : '',
  //     isUserNameVisible: false,
  //     isSuccess: false,
  //     employee_no : '',
  //     user_memo:'',
  //     users: [],
  // }),
  data() {
    return {
      tableHeaders: ['사원번호', '이름', '메모'],
      //adminData: [{employee_no: '', employee_name: '', memo: ''}],
      adminData: [],
      user_name: '',
      user_adminName: '',
      pwd_number: '',
      user_role: '',
      employee_name: '',
      isUserNameVisible: false,
      isSuccess: false,
      employee_no: '',
      user_memo: '',
      users: [],
    }
  },

  created() {
    //this.updateUserName();
    const fetchData = async () => {
      try {
        const response = await network.adminExcel.adminAllInfo();
        //this.users = response;

        if (response) {
          this.adminData = response.result;
          //   [{
          // employee_no : response.result.employee_no,
          // employee_name: response.result.employee_name,
          // memo: response.result.memo}]
          // this.adminData.employee_no = response.result.employee_no;
          // this.adminData.employee_name = response.result.employee_name;
          // this.adminData.memo = response.result.memo;
        }
        console.log('response>>', response);
        console.log('adminData>>', this.adminData);
      } catch (err) {
        console.error(err);
      }
    };

    // 함수 호출
    fetchData();


    // axios.get('http://localhost:8080/api/v1/users/user/getAllUsers',
    //     {
    //       headers: {
    //         Authorization: localStorage.getItem('Authorization')
    //       }
    //     })
    //     .then((res) => {
    //       if (res) {
    //       console.log('created() res.data >> ', res);
    //       this.users = res.data.users;
    //
    //       console.log('this.data>>', this.data);
    //       console.log('성공함...');
    //
    //         let adminUser = this.users.filter(user => user.roles.includes('ROLE_ADMIN'));
    //         console.log('adminUser>>> ', adminUser);
    //
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('err>>', err);
    //       alert('요청 권한이 없습니다');
    //       this.$router.push({ name: 'home' });
    //     });
  },

  computed: {
    //   filteredUsers() {
    //     // ROLE_ADMIN에 해당하는 사용자 필터링
    //     let adminUser = this.users.filter(user => user.roles.includes('ROLE_ADMIN'));
    //     console.log('adminUser.name>>> ', adminUser.name);
    //
    //     // adminUser를 일반 객체로 변환
    //     const adminUserObject = { ...adminUser[0] }; // 첫 번째 객체만 고려 (filter 결과가 배열이므로)
    //
    //     console.log('adminUserObject>>>', adminUserObject);
    //     this.$store.commit('setUserName', adminUserObject.name);
    //     return adminUserObject;
    //   }

      filteredAdminData() {
             // adminData에서 필요한 열만 추출하여 반환
        return this.adminData.map(item => ({
          employee_no : item.employee_no,
          employee_name : item.employee_name,
          memo : item.memo,
        }));
      }
    },


    methods: {
      excelDownload() {
        axios.get('http://localhost:8080/api/v1/users/excel/download',
            {responseType: 'arraybuffer'},
            {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
              },
            })
            .then(result => {
              console.log(result)
              const url = window.URL.createObjectURL(new Blob([result.data], {type: result.headers["content-type"]}))
              const link = document.createElement("a")
              link.href = url
              link.download = "example.xlsx"
              link.click()
              window.URL.revokeObjectURL(url)
            })
            .catch((err) => {
              // loginError.value = true;
              console.error(err);
            });
      },

      handleUserClick(user) {
        const employeeNo = user.employee_no;
        console.log(`Span with employee_no ${employeeNo} is clicked!`);

        axios.post('http://localhost:8080/api/v1/users/user/showNotePad',
            {
              employee_no: user.employee_no
            },
            {
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

      navigateToPwChange() {
        this.$router.push({name: 'pw-change'});
      },

      // await axios.post('http://localhost:8080/api/v1/users/user/update',{
      //       name: this.user_name,
      //       password: this.pwd_number,
      //     },
      //     {
      //       headers: {
      //         Authorization: localStorage.getItem('Authorization')
      //       }
      //     })
      //     .then((res) => {
      //         console.log('result.data >> ', res);
      //       if (res.data === 'ok') {
      //         console.log('성공함...');
      //
      //         // Call the users method here
      //         //this.users();
      //       }
      //     })
      //     .catch((err) => {
      //       this.loginError = true;
      //       throw new Error(err);
      //     });
    },
}


</script>
<style>
#content {
  width: 80%; /* Adjust the width as needed */
  margin: auto;
  margin: 2% auto 0;
}

</style>