<template>
  <div class="content-header">
    <h1>
      사원별 잔여 연차 조회
    </h1>
  </div>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group mgb-1r">
        <select v-model="year" class="year-input">
          <option :value="year" v-for="year in years">{{year}}</option>
        </select>
        <select v-model="month" class="month-input">
          <option :value="null">월</option>
          <option :value="month" v-for="month in months">{{month}}</option>
        </select>
        <input type="text" class="form-control" v-model="query">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="">검색</button>
        </div>
      </div>
      <div class="paging-button-container">
        <template v-if="hasPreviousPage">
          <button type="button" class="btn btn-info mgb-1r mgr-1r" @click="doPreviousPage">이전</button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-secondary mgb-1r mgr-1r">이전</button>
        </template>
        <template v-if="hasNextPage">
          <button type="button" class="btn btn-info mgb-1r" @click="doNextPage">다음</button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-secondary mgb-1r">다음</button>
        </template>
      </div>
    </div>
    <TableComponent :table-data="[['M006','홍길동','매니저','2015-12-32','15','12','3']]" :headers="columns"/>
  </div>

</template>

<script>
import TableComponent from "@/components/table/table.vue";

export default {
  name: 'DayoffListView',
  components: {TableComponent},
  data() {
    return {
      year: new Date().getFullYear(),
      pageNum:0,
      pageSize:10,
      month: null,
      query: "",
      hasNextPage: false,
      hasPreviousPage: false,
      columns:['사번','이름','직급','입사일','총연차','사용연차','남은연차'],
    }
  },
  methods: {
    doNextPage() {
      this.pageNum++;

    },
    doPreviousPage() {
      this.pageNum--;
      if (this.pageNum <= 0) {
        this.hasPreviousPage = false;
      }
    },
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const array = [];
      for (let i = 2015; i <= currentYear; i++) {
        array.push(i);
      }
      return array;
    },
    months() {
      const array = [];
      for (let i = 1; i <= 12; i++) {
        array.push(i);
      }
      return array;
    }
  }
}
</script>

<style>
@import "@/assets/css/task.css";
@import "@/assets/css/table.css";
</style>