<template>
  <thead>
  <tr>
    <th class="ta-c" v-if="useIndex" scope="col">순번</th>
    <th class="ta-c" scope="col" v-for="item of orderedHeaders">
      {{ item }}
    </th>
    <th class="ta-c" scope="col">수정</th>
    <th class="ta-c" scope="col">삭제</th>
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