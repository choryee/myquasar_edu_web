<template>
  <div class="content-header">
    <h1 class="title">
      대시보드
    </h1>
  </div>
  <div class="dashboard-content-container">
    <div class="dashboard-content-group">
      <div class="dashboard-content">
        <div id="totalDayoffGage"/>
      </div>
      <div class="dashboard-content">
        <CommonInfoCard :title="'최근 사용 연차 정보'"
                       :content="`이름: ${dashBoardInfo.recentUseDayoffName}\n사용일: ${dashBoardInfo.recentUseDayoffDate}\n등록일: ${dashBoardInfo.recentUseDayoffCreateDt}`"/>
      </div>
    </div>
<!--    <div class="dashboard-content-group">-->
<!--      <div class="dashboard-content">-->
<!--        <CommonInfoCard :title="'가장 많은 연차 보유자'"-->
<!--                        :content="`이름: ${dashBoardInfo.mostRemainingDayoffName}\n 남은 일수: ${dashBoardInfo.mostRemainingDayoffCount}`"></CommonInfoCard>-->
<!--      </div>-->
<!--      <div class="dashboard-content">-->
<!--        <CommonInfoCard :title="'가장 많은 휴일 근무자'"-->
<!--                        :content="`이름: ${dashBoardInfo.muchHolidayWorkerName}\n 출근 일수: ${dashBoardInfo.muchHolidayWorkerWorkDateCount}`"></CommonInfoCard>-->
<!--      </div>-->
<!--    </div>-->
  </div>

</template>

<script>
import bb, {gauge} from "billboard.js"
import DashBoardProtocol from "@/network/dashBoardProtocol";
import CommonInfoBox from "@/views/dashBoard/CommonInfoBox.vue";
import CommonInfoCard from "@/views/dashBoard/CommonCard.vue";
export default {
  name: 'DashBoardView',
  components: {CommonInfoCard, CommonInfoBox},
  data () {
    return {
      year: new Date().getFullYear(),
      dashBoardInfo: new DashBoardProtocol.DashBoardInfo({}),
      contentHeight: this.contentHeight,
      contentWidth: this.contentWidth
    }
  },
  methods: {
    async getDashBoardInfo(){
      this.dashBoardInfo = await DashBoardProtocol.getDashBoardInfo({year:this.year});

      const totalDayoffCountGauge = this.createTotalDayoffCountGauge();
      totalDayoffCountGauge.load({});
    },
    createTotalDayoffCountGauge() {
      return bb.generate({
        data: {
          columns: [
            ["사용한 총 연차", this.dashBoardInfo.totalUseDayoffCount],
            ["남은 총 연차", this.dashBoardInfo.totalRemainingDayoffCount],
          ],
          type:gauge(),
        },
        gauge: {
          label:{
            format(value) {
              return value;
            }
          },
          title:"전사원 합계 연차 정보",
          max:this.dashBoardInfo.totalRemainingDayoffCount + this.dashBoardInfo.totalUseDayoffCount,
          min:0
        },
        size: {
          width: 260,
          height: 180
        },
        bindto: "#totalDayoffGage"
      });
    },
  },
  mounted() {
    this.getDashBoardInfo();
  },
};
</script>

<style scoped>
@import "@/assets/css/task.css";
</style>