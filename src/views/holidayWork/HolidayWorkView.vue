<template>
  <div class="content-header">
    <h1>
      휴일 출근 관리
    </h1>
  </div>

  <HolidayWorkTableContainer/>
</template>

<script>
import HolidayWorkTableContainer from "@/views/holidayWork/HolidayWorkTableContainer.vue";

export default {
  name: 'holidayWorkView',
  components: {HolidayWorkTableContainer},

  methods: {

  },
}
</script>
<style scoped>
@import "@/assets/css/task.css";

</style>