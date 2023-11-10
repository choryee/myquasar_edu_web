<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
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
    }
  },
};
</script>

<style>
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid #ddd;
}
th, td {
  padding: 8px;
  text-align: left;
}
thead {
  background-color: #f4f4f4;
}
</style>
