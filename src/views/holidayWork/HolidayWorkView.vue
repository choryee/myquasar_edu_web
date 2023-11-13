<template>
  <div class="content-header">
    <h1>
      휴일 출근 관리
    </h1>
  </div>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group">
        <input type="text" class="form-control"
               aria-label="Text input with segmented dropdown button">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary">검색</button>
          <button type="button"
                  class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
        </div>
      </div>
    </div>
    <HolidayWorkTableContainer/>
  </div>
</template>

<script>
import HolidayWorkTableContainer from "@/views/holidayWork/HolidayWorkTableContainer.vue";

export default {
  name: 'holidayWorkView',
  components: {HolidayWorkTableContainer},
  created() {
    this.loadScripts();
  },
  methods: {
    loadScripts() {
      const scripts = [
        "https://code.jquery.com/jquery-3.2.1.slim.min.js",
        "https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      ];
      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
      });
    },
  },
}
</script>

<style>
@import "@/assets/css/bootstrap-style.css";

.content-header {
  margin: 2rem;
}

.content-container {
  margin: 3rem;
}

.search-input-container {
  text-align: right;
}
</style>