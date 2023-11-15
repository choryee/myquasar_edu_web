<template>
  <div class="content-header">
    <h1>
      대시보드
    </h1>
  </div>
  <table>
    <tr>
      <td><div id="totalDayoffGage"></div></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
  </table>
</template>

<script>
import bb, {gauge} from "billboard.js"
import DashBoardProtocol from "@/network/dashBoardProtocol";
export default {
  name: 'DashBoardView',
  data () {
    return {
      dashBoardInfo: new DashBoardProtocol.DashBoardInfo({})
    }
  },
  methods: {
    async getDashBoardInfo(){
      this.dashBoardInfo = await DashBoardProtocol.getDashBoardInfo({})
      const gauge1 = this.createTotalDayoffCountGauge();
      gauge1.load({});
    },
    createTotalDayoffCountGauge() {
      return bb.generate({
        data: {
          columns: [
            ["사용한 총 연차", 30],
            ["남은 총 연차", 20],
          ],
          type:gauge(),
        },
        gauge: {
          max:50,
          min:0
        },
        size: {
          height: 180
        },
        bindto: "#totalDayoffGage"
      });
    }
  },
  mounted() {
    this.getDashBoardInfo();
  },
};
</script>