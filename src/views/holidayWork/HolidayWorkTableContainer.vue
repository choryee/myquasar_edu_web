<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group">
        <select v-model="year" class="year-input">
          <option :value="year" v-for="year in years">{{year}}</option>
        </select>
        <select v-model="month" class="month-input">
          <option :value="null">월</option>
          <option :value="month" v-for="month in months">{{month}}</option>
        </select>
        <input type="text" class="form-control" v-model="query">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="searchQuery">검색</button>
        </div>
      </div>
    </div>
    <EditableTable
        :use-index="false"
        :header-infos="headerInfos"
        :table-data="holidayWorkList"
        :empty-item="getEmptyItem()"
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
      month: null,
      query: "",
      headerInfos: [],
      holidayWorkList: [],
    }
  },
  computed:{
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
  },
  methods: {
    async searchQuery() {
      const holidayWorkList = await holidayWorkProtocol.getHolidayWorkList(
          {query:this.query, month:this.month, year:this.year});
      if (Array.isArray(holidayWorkList)) {
        this.holidayWorkList = this.orderedData(this.headerInfos, holidayWorkList);
      } else {
        this.holidayWorkList = [];
      }
    },
    getEmptyItem() {
      return new holidayWorkProtocol.HolidayWork({});
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
    async initHolidayWork() {
      const simpleEmployeeList = await holidayWorkProtocol.getSimpleEmployeeList();
      this.headerInfos = this.orderedHeadersInfo(getHolidayTableWorksColumns(simpleEmployeeList));
      const holidayWorkList = await holidayWorkProtocol.getHolidayWorkList({});
      if (Array.isArray(holidayWorkList)) {
        this.holidayWorkList = this.orderedData(this.headerInfos, holidayWorkList);
      } else {
        this.holidayWorkList = [];
      }
    },

    async insertItem(holidayWorkData) {
      if (!holidayWorkData) alert("업데이트 할 데이터가 없습니다.")
      const result = await holidayWorkProtocol.insertHolidayWork(holidayWorkData);
      if (result) {
        await this.initHolidayWork();
      }
    },
    async updateItem(holidayWorkId, holidayWorkData) {
      if (!holidayWorkId) alert("workId가 없습니다.")
      if (!holidayWorkData) alert("업데이트 할 데이터가 없습니다.")
      const result = await holidayWorkProtocol.updateHolidayWork(holidayWorkId, holidayWorkData);
      if (result) {
        await this.initHolidayWork();
      }
    },
    async deleteItem(holidayWorkId) {
      if (!holidayWorkId) alert("workId가 없습니다.")
      const result = await holidayWorkProtocol.deleteHolidayWork(holidayWorkId);
      if (result) {
        await this.initHolidayWork();
      }
    }
  },
  mounted() {
    this.initHolidayWork();
  },
}
</script>

<style>

.select-box-td {
  width: 8rem;
}

.month-input {
  width: 5rem;
  margin-right: 1rem;
}

.year-input {
  width: 4rem;
  margin-right: 1rem;
}

</style>