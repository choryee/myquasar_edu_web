<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group mgb-1r">
        <select @change="changeYear" :value="year" class="select-input">
          <option :value="year" v-for="year in years">{{year}}</option>
        </select>
        <select @change="changeMonth" class="month-input">
          <option>월</option>
          <option :value="month" v-for="month in months">{{month}}</option>
        </select>
        <input type="text" class="form-control" @input="changeQuery" @keydown.enter="searchQuery">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="searchQuery">검색</button>
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
    <EditableTable
        :use-index="false"
        :header-infos="headerInfos"
        :table-data="holidayWorkList"
        :empty-item="emptyItem"
        @insert-item="insertItem"
        @update-item="updateItem"
        @delete-item="deleteItem"
    />
  </div>
</template>

<script>
import holidayWorkProtocol from "@/network/holidayWorkProtocol";
import EditableTable from "@/components/table/EditableTable.vue";
import {getHolidayTableWorksColumns} from "@/utils/TableColumnInfos/HolidayWorkTableColumns";

export default {
  name: 'HolidayWorkTableContainer',
  components: {EditableTable},
  data: () => {
    return {
      year: new Date().getFullYear(),
      pageNum:0,
      pageSize:10,
      month: null,
      query: "",
      emptyItem: new holidayWorkProtocol.HolidayWork({}),
      headerInfos: [],
      holidayWorkList: [],
      hasNextPage: false,
      hasPreviousPage: false
    }
  },
  computed:{
    years() {
      const currentYear = new Date().getFullYear();
      const array = [];
      for (let i = 2020; i <= currentYear; i++) {
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
    },
  },
  methods: {
    changeYear(e) {
      this.year = e.target.value;
      this.searchQuery();
    },
    changeMonth(e) {
      if (e.target.value === '월') {
        this.month = null;
        this.searchQuery();
        return;
      }
      this.month = e.target.value;
      this.searchQuery();
    },
    changeQuery(e) {
      this.query = e.target.value;
    },
    async searchQuery() {
      const holidayWorkListPageInfo = await holidayWorkProtocol.getHolidayWorkList(
          {pageSize: this.pageSize,
            pageNum: this.pageNum,
            query:this.query, month:this.month, year:this.year});

      this.hasNextPage = holidayWorkListPageInfo.hasNextPage;
      this.hasPreviousPage = holidayWorkListPageInfo.hasPreviousPage;
      const holidayWorks = this.convertObjects2HolidayWorks(holidayWorkListPageInfo.content);

      if (Array.isArray(holidayWorks)) {
        this.holidayWorkList = this.orderedData(this.headerInfos, holidayWorks);
        console.log(this.holidayWorkList);
      } else {
        this.holidayWorkList = [];
      }
      this.emptyItem = new holidayWorkProtocol.HolidayWork({});
    },
    convertObjects2HolidayWorks(objects) {
      if (Array.isArray(objects)) {
        const result = objects.map((item) => new holidayWorkProtocol.HolidayWork(item));
        console.log(result);
        return result;
      }

      return [];
    },
    doNextPage() {
      this.pageNum++;
      this.searchQuery();

    },
    doPreviousPage() {
      this.pageNum--;
      if (this.pageNum <= 0) {
        this.hasPreviousPage = false;
      }
      this.searchQuery();
    },
    orderedHeadersInfo(headerInfos) {
      return headerInfos
      .sort((first, second) => first.propertyOrder - second.propertyOrder);
    },
    orderedData(headerInfos, tableData) {
      const orderedHeadersInfo = this.orderedHeadersInfo(headerInfos);
      const array = tableData.map((item) => {
        const object = {};
        orderedHeadersInfo.forEach(info => {
          const propertyName = info.propertyName;
          if (item.hasOwnProperty(propertyName)) {
            object[propertyName] = item[propertyName];
          }
        })
        return object;
      });
      return array;
    },
    async initSimpleEmployeeList() {
      const simpleEmployeeList = await holidayWorkProtocol.getSimpleEmployeeList();
      this.headerInfos = this.orderedHeadersInfo(getHolidayTableWorksColumns(simpleEmployeeList));
    },

    async insertItem(holidayWorkData) {
      if (!holidayWorkData) alert("업데이트 할 데이터가 없습니다.")
      const result = await holidayWorkProtocol.insertHolidayWork(holidayWorkData);
      if (result) {
        await this.searchQuery();
      }
    },
    async updateItem(holidayWorkId, holidayWorkData) {
      if (!holidayWorkId) alert("workId가 없습니다.")
      if (!holidayWorkData) alert("업데이트 할 데이터가 없습니다.")
      const result = await holidayWorkProtocol.updateHolidayWork(holidayWorkId, holidayWorkData);
      if (result) {
        await this.searchQuery();
      }
    },
    async deleteItem(holidayWorkId) {
      if (!holidayWorkId) alert("workId가 없습니다.")
      const result = await holidayWorkProtocol.deleteHolidayWork(holidayWorkId);
      if (result) {
        await this.searchQuery();
      }
    }
  },
  mounted() {
    this.pageNum = 0;
    this.query = "";
    this.searchQuery();
    this.initSimpleEmployeeList();
  },
}
</script>