<template>
  <div class="table-container">
    <table class="common-table">
      <tbody>
      <tr v-for="(header, index) in headers" :key="index">
        <th class="common-th"> {{ header }} </th>
        <td class="common-td" v-for="row in tableData" :key="row[header]"> {{ row[header] }} </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// authInfo: ['권한', '사번', '네이버웍스ID'], :headers="authInfo"
// authData: [], :tableData="authData"
// <ColumTable :headers="authInfo" :tableData="authData"/>
// ===>> authData['권한']


export default {
  name: 'ColumTable',
  props: { // 부모에서 받은 것
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }//props
};
</script>

