<template>
  <div class="table-container bd-solid pd-lr-1r">
    <table class="table" id="holiday-work-table">
      <EditableTableHeader :header-infos="headerInfos" :use-index="useIndex"/>
      <tbody>
      <template v-for="(item, index) in tableData">
        <EditableTableRow
            :use-index="useIndex"
            :init-is-update="false"
            :is-insert="false"
            :item="item"
            :header-infos="headerInfos"
            :index="index + 1"
            @update-item="updateItem"
            @delete-item="deleteItem"
        />
      </template>
      <template v-if="isInsert">
        <EditableTableRow
            :use-index="useIndex"
            :init-is-update="true"
            :init-is-insert="true"
            :item="emptyItem"
            :header-infos="headerInfos"
            :index="0"
            @insert-item="insertItem"
            @update-item="updateItem"
            @delete-item="deleteItem"
        />
      </template>
      <template v-else>
        <tr>
          <td :colspan="columnLength" class="ta-c clickable" @click="useInsert">+</td>
        </tr>
      </template>
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
    emptyItem: Object,
    useIndex: Boolean,
  },
  data: function () {
    return {
      isInsert: false,
    }
  },
  methods: {
    useInsert() {
      this.isInsert = true;
    },
    cancelInsert() {
      this.isInsert = false;
    },
    insertItem(item) {
      this.$emit('insertItem', item);
      this.isInsert = false;
    },
    updateItem(id, item) {
      this.$emit('updateItem', id, item);
    },
    deleteItem(id) {
      this.$emit('deleteItem', id);
    }
  },
  computed: {
    columnLength() {
      let num = this.useIndex ? 3 : 2;
      num += this.headerInfos.length;
      return num;
    }
  },
}
</script>