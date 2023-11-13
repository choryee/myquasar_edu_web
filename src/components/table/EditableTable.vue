<template>
  <div class="table-container bd-solid mg-t-3 pd-lr-1r">
    <table class="table">
      <EditableTableHeader :header-infos="headerInfos" :use-index="useIndex"/>
      <tbody>
      <template v-for="(item, index) in tableData">
        <EditableTableRow
            :use-index="useIndex"
            :init-item="item"
            :init-is-update="false"
            :header-infos="headerInfos"
            :index="index + 1"
            @update-item="updateItem"
            @delete-item="deleteItem"
        />
      </template>
      <tr>
        <td :colspan="columnLength" class="ta-c clickable" @click="">+</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {TableColumn} from "@/utils/EditableTableColumnUtil";
import EditableTableHeader from "@/components/table/EditableTableHeader.vue";
import EditableTableRow from "@/components/table/EditableTableRow.vue";

export default {
  name: 'EditableTable',
  components: {EditableTableRow, EditableTableHeader},
  props: {
    headerInfos: {
      type: Array,
      validate(array) {
        return array.every((item) => item instanceof TableColumn);
      }
    },
    tableData: Array,
    useIndex: Boolean,
  },
  methods: {
    updateItem(id, item) {
      this.$emit('updateItem', id, item);
    },
    deleteItem(id) {
      this.$emit('deleteItem', id);
    }
  },
  computed: {
    columnLength() {
      console.log(this.tableData)
      let num = this.useIndex ? 3 : 2;
      num += this.headerInfos.length;
      return num;
    }
  },
}
</script>

<style>
.pd-lr-1r {
  padding: 0 1rem;
}

.ta-c {
  text-align: center;
}


.clickable:hover {
  cursor: pointer;
}

.mg-t-3 {
  margin-top: 3rem;
}

.bd-solid {
  border-style: solid;
  border-width: 1px;
}
</style>