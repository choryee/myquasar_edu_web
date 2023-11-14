<template>
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
      dayoffInfo: {},
    };

  },
created() {
    this.fetchDayoffRemaining();
  },
  methods: {
    async fetchDayoffRemaining() {
      const params = {
        employeeNo: 'M045',
        year: 2023
      };
      const headers = {};

      try {
        const response = await network.dayoff.dayoffRemaining(params, headers);
        const employeRes = await network.dayoff.dayoffUse(params,headers);

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
    }
}
};

</script>

<style>
@import "@/assets/css/table.css";
.inner_wrap{
  width: 90%;
  margin: 20px auto;
}
.title{
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 5px;
  border-left: 1px solid black;
}
</style>
