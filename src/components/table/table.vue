<template>
  <div class="table-container">
    <table class="common-table">
      <thead class="common-thead">
        <tr>
          <th class="common-th" v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="common-td" v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  props: {
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
  },
};
</script>


