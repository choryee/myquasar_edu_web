<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group mgb-1r">
        <select @change="changeYear" :value="year" class="year-input">
          <option :value="year" v-for="year in years">{{year}}</option>
        </select>
        <input type="text" class="form-control" @input="changeQuery" @keydown.enter="getEmployeeDayoffInfo">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="getEmployeeDayoffInfo">검색</button>
        </div>
      </div>
      <div class="paging-button-container">
        <button type="button" class="btn btn-success mgb-1r mgr-1r" @click="goNewEmployee">사원 입력</button>
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
        <button type="button" class="btn btn-success mgb-1r mgr-1r" @click="excelDownload">엑셀 다운로드</button>
      </div>
    </div>
    <ClickableRowTable :table-data="tableInfo" :headers="columns"
                       :column-properties="columnsProperty"
                       :is-clickable="true"
                       :allow-sort="columnsSort"
                       :click-able-event-keys="tableKeys"
                       @click-row="clickEvent"
                       @change-sort="changeSort"
    />
  </div>
</template>

<script>
import employeeDayoffProtocol from "@/network/employeeDayoffProtocol";
import ClickableRowTable from "@/components/table/ClickableTable.vue";

export default {
  name: 'DayoffListTable',
  components: {ClickableRowTable},
  mounted() {
    this.getEmployeeDayoffInfo();
  },
  data() {
    return {
      year: new Date().getFullYear(),
      pageNum:0,
      pageSize:10,
      info:[],
      query: "",
      sort:null,
      hasNextPage: false,
      hasPreviousPage: false,
      columns:['사번','이름','직급','입사일','총연차','사용연차','남은연차'],
      columnsProperty:['employeeNo','name','rankName','joiningDt','totalDayoffCount','usedDayoffCount','remainingDayoffCount'],
      columnsSort:[true, false, false, true, true, true, true ]
    }
  },
  methods: {
    changeQuery(event) {
      this.query = event.target.value;
    },
    changeYear(e) {
      this.year = e.target.value;
      this.getEmployeeDayoffInfo();
    },
    changeSort(sort) {
      this.sort = sort;
      this.getEmployeeDayoffInfo();
    },
    goNewEmployee() {
      this.$router.push(`/dayoff/`);
    },
    async getEmployeeDayoffInfo() {
      const result = await employeeDayoffProtocol.getEmployeeDayoffInfo({
        year:this.year,
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        month:this.month,
        sort:this.sort,
        query:this.query});
      if (!result) {
        return;
      }
      if (typeof result.hasNextPage === 'boolean') {
        this.hasNextPage = result.hasNextPage;
      }
      if (typeof result.hasPreviousPage === 'boolean') {
        this.hasPreviousPage = result.hasPreviousPage;
      }
      if (result.content) {
        this.info = result.content;
      }
    },
    doNextPage() {
      this.pageNum++;
      this.getEmployeeDayoffInfo();
    },
    doPreviousPage() {
      if (this.pageNum === 0) return;
      this.pageNum--;
      this.getEmployeeDayoffInfo();
    },
    clickEvent(key) {
      this.$router.push(`/dayoff/${key}`);
    }
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const array = [];
      for (let i = 2020; i <= currentYear; i++) {
        array.push(i);
      }
      return array;
    },
    tableInfo() {
      if (this.info != null) {
        return this.info.map((item) => {
          const properties = [];
          this.columnsProperty.forEach((propertyName) => properties.push(item[propertyName]));
          return properties;
        })
      }
      return [];
    },
    tableKeys() {
      return this.info.map((item) => item.employeeNo);
    }
  },
}
</script>