<template>
  <div class="input-field">
    <select v-model="params.year">
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <div>
    <label for="employeeNo">사원번호 테스트 조회</label>
    <select id="employeeSelect" v-model="selectedEmployee">
      <option v-for="info in infos" :key="info.employeeNo" :value="info.employeeNo">
        {{ `${info.employeeNo}/${info.name}` }}
      </option>
    </select>
    <button @click="fetchDayoffRemaining">조회</button>
    </div>
  </div>
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
      <TableComponent :headers="tableHeaders" :tableData="employeeDayoffData" />
    </div>
   </div>
</template>

<script>
import TableComponent from '@/components/table/table.vue'
import network from '@/network';
import SimpleInfoTitle from "@/components/Title/simpleInfotitle.vue";
import ColumTable from '@/components/table/columTable.vue';
import holidayWorkProtocol from "@/network/holidayWorkProtocol";
import {getHolidayTableWorksColumns} from "@/utils/TableColumnInfos/HolidayWorkTableColumns";
export default {
  name: 'DayoffView',
  components: {
    SimpleInfoTitle,
    TableComponent,
    ColumTable
  },
  data() {
    return {
      authInfo : ['권한','사번','wid'],
      employeeImfo:['이름','입사년도','직급'],
      tableHeaders: ['연차종류', '시작날짜', '종료날짜', '기한'],
      authData:[ ],
      employeeData:[],
      employeeDayoffData: [],
      selectedEmployee: '',
      infos: [],
      dayoffInfo: {},
      params: {
        employeeNo: '',
        year: new Date().getFullYear(),
      },
    };

  },
  computed:{
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
    this.initSimpleEmployeeList();
  },
  methods: {
    async fetchDayoffRemaining() {
      this.params.employeeNo = this.selectedEmployee;

      const headers = {};

      try {
        const response = await network.dayoff.dayoffRemaining(this.params, headers);
        const employeRes = await network.dayoff.dayoffUse(this.params,headers);

        this.dayoffInfo =
          {
            name: employeRes.result.name,
            totalDayoff : employeRes.result.totalDayoff,
            usedDayoff : employeRes.result.usedDayoff,
            leftDayOff : employeRes.result.leftDayOff
          }
        ;
        this.authData = [
          {
            권한: response.result[0].rankName,
            사번: response.result[0].employeeNo,
            wid: response.result[0].wid,
          }
        ];
          this.employeeData = [
          {
            이름: response.result[0].name,
            입사년도: response.result[0].joiningDt,
            직급: response.result[0].rankName,
          }
        ];
        this.employeeDayoffData = response.result.map(item => ({
              연차종류: item.codeName,
              시작날짜: item.startDayoffDt,
              종료날짜: item.endDayoffDt,
              기한: item.usedDayoff,
            }));
            
      
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }

    },
    async initSimpleEmployeeList(){

      try {
        const response = await holidayWorkProtocol.getSimpleEmployeeList();
          this.infos = response.map(employee => ({
            employeeNo: employee.employeeNo,
            name: employee.name,
          }));
      } catch (error) {
        console.error(error);
      }
    },
}

};

</script>

<style>
@import "@/assets/css/table.css";
.inner_wrap{
  width: 90%;
  margin: 20px auto;
}
.input-field{
  display: flex;
  justify-content: space-around;
  padding: 30px;
}
.title{
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 5px;
  border-left: 1px solid black;
}
</style>
