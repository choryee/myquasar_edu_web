<template>
  <thead>
  <tr>
    <th v-if="useIndex" scope="col">순번</th>
    <th scope="col" v-for="item of orderedHeaders">
      {{ item }}
    </th>
    <th scope="col">수정</th>
    <th scope="col">삭제</th>
  </tr>
  </thead>
</template>

<script>

export default {
  name: 'EditableTableHeader',
  props: {
    useIndex: Boolean,
    headerInfos: Array,
  },
  computed: {
    orderedHeaders() {
      return this.headerInfos
      .sort((a, b) => a.propertyOrder - b.propertyOrder)
      .filter((item) => item.isVisible)
      .map((item) => item.columnName);
    }
  }
}
</script>