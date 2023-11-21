<template>
  <div class="content-header">
    <h1>
      사원별 잔여 연차 조회
    </h1>
    <div id="calendar-change-button-container">
      <div class="calendar-change-button button-active">

      </div>
      <div class="calendar-change-button">

      </div>
    </div>
  </div>
  <DayoffListTable/>
</template>

<script>
import ClickableRowTable from "@/components/table/ClickableTable.vue";
import DayoffListTable from "@/views/dayoff/DayoffListTable.vue";
export default {
  name: 'DayoffListView',
  components: {DayoffListTable, ClickableRowTable},

}
</script>

<style>
@import "@/assets/css/task.css";
@import "@/assets/css/table.css";
</style>