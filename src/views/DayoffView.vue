<template>
  <div class="home">
   <div class="dayoffTable">
      <TableComponent :headers="tableHeaders" :tableData="employeeData" />
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/table/table.vue'
import network from '@/network';
import {onMounted, ref} from "vue";
export default {
  name: 'DayoffView',
  components: {
    TableComponent
  },
  data() {
    return {
      tableHeaders: ['사번', '이름', '직급', '총 연차', '사용 연차', '남은연차'],
      employeeData: [],
    };

  },
created() {
    this.fetchDayoffRemaining();
  },
  methods: {
    fetchDayoffRemaining() {
       const params = {
        employeeNo: 'M045', 
        year: 2023 
      };
      const headers = {
      };
        network.dayoff.dayoffRemaining(params, headers)
        .then(response => {
          console.log("어디갔니...");
            const employeeInfo = {
              사번: 'M045', // 예시 데이터, 실제 데이터로 대체 필요
              이름: '홍길동', // 예시 데이터, 실제 데이터로 대체 필요
              직급: '대리', // 예시 데이터, 실제 데이터로 대체 필요
              총연차: response.totalDayoff,
              사용연차: response.usedDayoff,
              남은연차: response.leftDayOff
            };
            this.employeeData.push(employeeInfo);         
            })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
  }
};
</script>