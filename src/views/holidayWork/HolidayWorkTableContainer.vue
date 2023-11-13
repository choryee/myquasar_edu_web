<template>
  <EditableTable
      :use-index="true"
      :header-infos="headerInfos"
      :table-data="holidayWorkList"
      @update-item="updateItem"
      @delete-item="deleteItem"
  />
</template>

<script>
import {useStore} from 'vuex'
import holidayWorkProtocol from "@/network/holidayWorkProtocol";
import EditableTable from "@/components/table/EditableTable.vue";
import {getHolidayTableWorksColumns} from "@/utils/TableColumnInfos/HolidayWorkTableColumns";

export default {
  name: 'HolidayWorkTableContainer',
  components: {EditableTable},
  data: () => {
    return {
      headerInfos: [],
      holidayWorkList: [],
    }
  },
  methods: {
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

      const holidayWorkList = await holidayWorkProtocol.getHolidayWorkList();
      if (Array.isArray(holidayWorkList)) {
        this.holidayWorkList = this.orderedData(this.headerInfos, holidayWorkList);
      } else {
        this.holidayWorkList = [];
      }
    },
    updateItem(holidayWorkId, holidayWorkData) {
      if (holidayWorkId) Error("workId가 없습니다.")
      if (holidayWorkData) Error("업데이트 할 데이터가 없습니다.")
      console.log("ASDASDASDASDASD");
      console.log(holidayWorkId);
      console.log(holidayWorkData);
      holidayWorkProtocol.updateHolidayWork(holidayWorkId, holidayWorkData);
    },
    deleteItem(holidayWorkId) {
      if (holidayWorkId) holidayWorkProtocol.deleteHolidayWork(holidayWorkId);
    }
  },
  computed:{
    store(){
      return useStore();
    }
  },
  mounted() {
    this.initHolidayWork();
  },
}
</script>

<style>
.text-input {
  max-width: 5rem;
}

.date-input {
  max-width: 8rem;
}
</style>