<template>
  <div class="input-field">
    <select v-model="params.year">
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <button @click="fetchDayoffRemaining">조회</button>
  </div>
    <div class="button-container">
      <div v-if="firstButton && $route.path !== '/dayoff/'">
        <button class="btn btn-success mgb-1r mgr-1r" type="button" @click="updateEmployeeMode">수정</button>
        <button class="btn btn-danger mgb-1r mgr-1r" type="button" @click="back">뒤로가기</button>
      </div>
      <div v-if="secondButton">
        <button class="btn btn-success mgb-1r mgr-1r" type="button" @click="updateEmployee">수정</button>
      </div>
      <div v-if="buttonCancel">
        <button class="btn btn-danger mgb-1r mgr-1r" type="button" @click="deleteEmployee">삭제</button>
        <button class="btn btn-secondary mgb-1r mgr-1r" type="button" @click="updateCancel">취소</button>
      </div>
    </div>
  <div v-if="$route.params.employeeNo &&!editMode">
    <div class="dayoffTable">
      <SimpleInfoTitle :data="dayoffInfo"/>
      <div class="inner_wrap">
        <p class="title">계정 정보</p>
        <ColumTable :headers="authInfo" :tableData="authData"/>
      </div>
      <div class="inner_wrap">
        <p class="title">사원 정보</p>
        <ColumTable :headers="employeeImfo" :tableData="employeeData"/>
      </div>
      <div class="inner_wrap">
        <TableComponent :headers="tableHeaders" :tableData="employeeDayoffData"/>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- 등록  -->
    <div v-if="!editMode">
      <div class="button-container">
        <button class="btn btn-info mgb-1r" type="button" @click="insertEmployee">등록</button>
      </div>
    </div>
    <div class="dayoffTable">
      <div class="inner_wrap">
        <p class="title">계정 정보</p>
        <table class="common-table">
          <tr>
            <th class="common-th">권한</th>
            <td class="common-td">
              <select v-model="formData.rankNo">
                <option value="1">매니저</option>
              </select>
            </td>
          </tr>
          <tr>
            <th class="common-th">사번</th>
            <td class="common-td"><input v-model="formData.employeeNo"></td>
          </tr>
          <tr>
            <th class="common-th">wid</th>
            <td class="common-td"><input v-model="formData.wid"></td>
          </tr>
        </table>
      </div>
      <div class="inner_wrap">
        <p class="title">사원 정보</p>
        <table class="common-table">
          <tr>
            <th class="common-th">이름</th>
            <td class="common-td"><input v-model="formData.name"></td>
          </tr>
          <tr>
            <th class="common-th">입사년도</th>
            <td class="common-td"><input type="date" v-model="formData.joiningDt"></td>
          </tr>
          <tr>
            <th class="common-th">직급</th>
            <td class="common-td">
              <select v-model="formData.rankNo">
                <option value="1">매니저</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/table/table.vue'
import network from '@/network';
import SimpleInfoTitle from "@/components/Title/simpleInfotitle.vue";
import ColumTable from '@/components/table/columTable.vue';
import holidayWorkProtocol from "@/network/holidayWorkProtocol";
import axios from "axios";
import router from "@/router";

export default {
  name: 'DayoffView',
  components: {
    SimpleInfoTitle,
    TableComponent,
    ColumTable
  },
  data() {
    return {
      authInfo: ['권한', '사번', 'wid'],
      employeeImfo: ['이름', '입사년도', '직급'],
      tableHeaders: ['연차종류', '시작날짜', '종료날짜', '기한'],
      authData: [],
      employeeData: [],
      employeeDayoffData: [],
      selectedEmployee: '',
      infos: [],
      dayoffInfo: {},
      params: {
        employeeNo: '',
        year: new Date().getFullYear(),
      },
      formData: {
        rankNo: '',
        employeeNo: '',
        wid: '',
        password: '1234',
        name: '',
        joiningDt: '',
        departmentNo: '1',
        creatorId: 'system'
      },
      editMode: false,
      buttonCancel: false,
      firstButton: true,
      secondButton: false,
    };

  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const array = [];
      for (let i = 2021; i <= currentYear; i++) {
        array.push(i);
      }
      return array;
    },
  },
  mounted() {
    this.fetchDayoffRemaining();
    console.log('editMode:', this.editMode);
    console.log('$route.path:', this.$route.path);
    console.log('Condition:', !this.editMode || this.$route.path !== '/dayoff/');
  },
  methods: {
    async fetchDayoffRemaining() {
      this.params.employeeNo = this.selectedEmployee;

      const headers = {};
      const currentPath = window.location.pathname;

      const parts = currentPath.split('/');
      const employeeNo = parts[parts.length - 1];
      this.params.employeeNo = employeeNo;
      try {
        const response = await network.dayoff.dayoffUse(employeeNo, this.params, headers);

        const {result} = response;
        this.dayoffInfo = {
          name: result.name,
          totalDayoff: result.totalDayoffCount,
          usedDayoff: result.usedDayoffCount,
          leftDayOff: result.remainingDayoffCount,
          employeeNo : result.employeeNo,
          year : this.params.year,
        };

        this.authData = [
          {
            권한: result.rankName,
            사번: result.employeeNo,
            wid: result.wid,
          },
        ];
        this.employeeData = [
          {
            이름: result.name,
            입사년도: result.joiningDt,
            직급: result.rankName,
          },
        ];
        this.employeeDayoffData = result.dayoffDetailList.map(item => ({
          연차종류: item.codeName,
          시작날짜: item.startDayoffDt,
          종료날짜: item.endDayoffDt,
          기한: item.usedDayoff,
        }));

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },
    insertEmployee() {
      if(confirm("사원 정보를 저장하시겠습니까?")) {
        console.log('전송할 데이터', this.formData);
        axios.post('http://localhost:8080/employee/insert', this.formData)
            .then(response => {
              console.log('서버 응답', response.data);
              alert('등록 성공');
              router.go(0);
            })
            .catch(error => {
              console.log('데이터 전송 실패', error);
            })
      }
    },
    async deleteEmployee() {
      if (confirm(this.$route.params.employeeNo + " 이 사원 정보를 삭제하시겠습니까?")) {
        const employeeNo = this.$route.params.employeeNo;
        const url = `http://localhost:8080/employee/delete/${employeeNo}`;
        const headers = {};
        try {
          await axios.get(url, {headers});
          alert('삭제 성공');
          router.go(0);
        } catch (error) {
          console.error('사원 삭제 실패', error);
        }
      }
    },
    async updateEmployeeMode() {
      const employeeNo = this.$route.params.employeeNo;
      console.log("employeeNo", employeeNo);
      if (confirm(this.$route.params.employeeNo + "이 사원 정보를 수정하시겠습니까?")) {
        const params = {employee: this.$route.params.employeeNo};
        console.log("employeeNo : ", employeeNo);
        const url = `http://localhost:8080/employee/list/${employeeNo}`;
        const headers = {};
        this.editMode = true;
        this.buttonCancel = true;
        this.firstButton = false;
        this.secondButton = true;

        try {
          const response = await axios.get(url, {params, headers});

          // response.data를 확인하고 결과가 존재하는지 확인
          const responseData = response.data;
          console.log("responseData---", responseData);


          const employeeInfo = responseData;
          console.error("Employee Info : ", employeeInfo);

          console.error("Employee Info : ", employeeInfo);

          this.formData = {
            rankNo: employeeInfo.result.rankNo,
            employeeNo: employeeInfo.result.employeeNo,
            wid: employeeInfo.result.wid,
            password: '1234',
            name: employeeInfo.result.name,
            joiningDt: employeeInfo.result.joiningDt,
            departmentNo: '1',
            creatorId: 'system'
          };
        } catch (error) {
          console.error('사원 정보 불러오기 실패:', error);
        }
      }
    },
    async updateEmployee() {
      if (confirm(this.$route.params.employeeNo + "이 사원 정보를 수정하시겠습니까?")) {
        const employeeNo = this.$route.params.employeeNo;
        const url = `http://localhost:8080/employee/modify/${employeeNo}`;
        console.log('전송할 데이터', this.formData);
        axios.post(url, this.formData)
            .then(response => {
              console.log('서버 응답', response.data);
              alert('수정 성공');
              router.go(0);
            })
            .catch(error => {
              console.log('데이터 전송 실패', error);
            })
      }
    },
    updateCancel() {
      this.editMode = false;
      this.buttonCancel = false;
      this.secondButton = false;
      this.firstButton = true;
    },
    back() {
      router.back();
    }

  }

};

</script>

<style>
@import "@/assets/css/table.css";

.inner_wrap {
  width: 90%;
  margin: 20px auto;
}

.input-field {
  display: flex;
  justify-content: space-around;
  padding: 30px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 5px;
  border-left: 1px solid black;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 70px;
}

</style>
