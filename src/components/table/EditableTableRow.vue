<template>
  <tr>
    <td v-if="useIndex">{{ index }}</td>
    <td v-for="columnInfo in headerInfos">
      <template v-if="columnInfo.isVisible">
        <template v-if="columnInfo.isModify && isUpdate">
          <template v-if="columnInfo.modifyType === 'text'">
            <input class="text-input" type="text" v-model="item[columnInfo.propertyName]">
          </template>
          <template v-else-if="columnInfo.modifyType === 'selectBox'">
            <select @change="selectBoxChangeEvent($event, columnInfo)">
              <option v-for="selectBoxItem in columnInfo.selectBoxInfo.selectBoxListItems" :key="selectBoxItem.key"
                      :value="selectBoxItem.key">{{ selectBoxItem.view }}
              </option>
            </select>
          </template>
          <template v-else-if="columnInfo.modifyType === 'date'">
            <input class="date-input" type="date" v-model="item[columnInfo.propertyName]">
          </template>
          <template v-else>
            {{ item[columnInfo.propertyName] }}
          </template>
        </template>
        <template v-else>
          {{ item[columnInfo.propertyName] }}
        </template>
      </template>
    </td>
    <td>
      <template v-if="isUpdate">
        <button type="button" @click="updateButtonClickEvent">확인</button>
      </template>
      <template v-else>
        <button type="button" @click="updateButtonClickEvent">수정</button>
      </template>
    </td>
    <td>
      <button type="button" @click="deleteButtonClickEvent">삭제</button>
    </td>
  </tr>
</template>

<script>

import {TableColumn} from "@/utils/EditableTableColumnUtil";

export default {
  name: 'EditableTableRow',
  props: {
    useIndex: Boolean,
    index: Number | undefined,
    initIsUpdate: Boolean,
    headerInfos: {
      type: Array,
      validate(array) {
        return array.every((item) => item instanceof TableColumn);
      }
    },
    initItem: {
      type: Object,
    },
  },
  data: function () {
    return {
      isUpdate: this.initIsUpdate,
      item: this.initItem,
    }
  },
  methods: {
    selectBoxChangeEvent(e, columnInfo) {
      const selectBoxInfo = columnInfo.selectBoxInfo;
      const changeInfos = selectBoxInfo.changeInfos;
      const selectItemList = selectBoxInfo.selectBoxListItems;
      const selectItem = selectItemList.find((item) => item.key === e.target.value);
      selectItem.change(this.item, changeInfos);
    },
    updateButtonClickEvent() {
      if (this.isUpdate) {
        this.$emit('updateItem', this.id, this.item);
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
      }
    },
    deleteButtonClickEvent() {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.$emit('deleteItem', this.id);
      }
    }
  },
  computed: {
    id() {
      const info = this.headerInfos.find((info) => info.isId);
      return this.item[info.propertyName]
    },
  }

}
</script>