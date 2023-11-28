<template>
  <div class="input-field">
    <select v-model="params.year">
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <button @click="fetchDayoffRemaining">조회</button>
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
      },headers: {
        Authorization: localStorage.getItem('Authorization')
      }
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
    this.fetchDayoffRemaining();
  },
  methods: {
    async fetchDayoffRemaining() {
      this.params.employeeNo = this.selectedEmployee;

      const currentPath = window.location.pathname;

      const parts = currentPath.split('/');
      const employeeNo = parts[parts.length - 1];
      try {
        const response = await network.dayoff.dayoffUse(employeeNo,this.params, this.headers);

        const { result } = response;
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
