<template>
  <div class="table-container">
    <table class="common-table">
      <tbody>
      <tr v-for="(header, index) in headers" :key="index">
        <th class="common-th">{{ header }}</th>
        <td class="common-td" v-for="row in tableData" :key="row[header]">{{ row[header] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ColumTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }
};
</script>

