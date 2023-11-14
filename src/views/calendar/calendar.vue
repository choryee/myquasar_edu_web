<template>
  <div class="container-fluid px-4">
    <h1 class="mt-4">캘린더</h1>
    <FullCalendar :options="calendarOptions"/>


  </div>
</template>
<script>
import axios from 'axios'
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'ko',
        events: [],
      },

    }
  },
  created() {

  },
  mounted() {
    this.calendarList();
  },
  methods: {
    calendarList() {
      axios.get('http://localhost:8080/calendar')
          .then(res => {
            this.calendarOptions.events = res.data.map(event => ({
              title: event.eventName,
              start: event.startDt,
              end: event.endDt,
            }));
          }).catch(err => {
        console.error(err);
      });
    },
  },
}
</script>
<style>
.custom-calendar {
  height: 600px;
}
</style>