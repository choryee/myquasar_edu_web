<template>
  <div class="content-header">
    <h1>
      캘린더 패턴 관리
    </h1>
  </div>

  <calendar-pattern-table-container/>
</template>
<script>
import CalendarPatternTableContainer from "@/views/calendarPattern/CalendarPatternTableContainer.vue";

export default {
  name: 'CalendarPatternView',
  components: {
    CalendarPatternTableContainer
  }
}
</script>
<style scoped>
@import "@/assets/css/task.css";

</style>

