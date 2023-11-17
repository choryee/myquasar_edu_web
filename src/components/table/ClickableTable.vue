<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in tableData" :key="index" class="clickable" @click="clickEvent(clickAbleEventKeys[index])">
        <td v-for="(value, key) in row" :key="key">{{ value }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ClickableRowTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    isClickable: {
      type: Boolean,
    },
    clickAbleEventKeys:{
      type: Array,
    }
  },
  methods:{
    clickEvent(key) {
      console.log(this.clickAbleEventKeys);
      this.$emit("clickRow", key);
    }
  }
};
</script>


