<template>
  <tr>
    <td v-if="useIndex">{{ index }}</td>
    <template v-for="columnInfo in headerInfos">
      <template v-if="columnInfo.isVisible">
        <template v-if="columnInfo.isModify && isUpdate">
          <td v-if="columnInfo.modifyType === 'text'" class="editable-td">
            <input class="text-input" type="text" v-model="item[columnInfo.propertyName]">
          </td>
          <td v-else-if="columnInfo.modifyType === 'selectBox'" class="editable-td">
            <select @change="selectBoxChangeEvent($event, columnInfo)">
              <option disabled>선택해주세요</option>
              <option v-for="selectBoxItem in columnInfo.selectBoxInfo.selectBoxListItems" :key="selectBoxItem.key"
                      :value="selectBoxItem.key">{{ selectBoxItem.view }}
              </option>
            </select>
          </td>
          <td v-else-if="columnInfo.modifyType === 'date'" class="editable-td">
            <input class="date-input" type="date" v-model="item[columnInfo.propertyName]">
          </td>
          <td v-else class="editable-td">
            {{ item[columnInfo.propertyName] }}
          </td>
        </template>
        <template v-else>
          <td v-if="columnInfo.modifyType === 'text'" class="editable-td">
            {{ item[columnInfo.propertyName] }}
          </td>
          <td v-else-if="columnInfo.modifyType === 'selectBox'" class="editable-td">
            {{ item[columnInfo.propertyName] }}
          </td>
          <td v-else-if="columnInfo.modifyType === 'date'" class="editable-td">
            {{ item[columnInfo.propertyName] }}
          </td>
          <td v-else class="editable-td">
            {{ item[columnInfo.propertyName] }}
          </td>
        </template>
      </template>
    </template>
    <td class="editable-button">
      <template v-if="isUpdate && !isInsert">
        <button type="button" @click="updateButtonClickEvent">확인</button>
      </template>
      <template v-else-if="isUpdate && isInsert">
        <button type="button" @click="insertButtonClickEvent">등록</button>
      </template>
      <template v-else-if="!isUpdate">
        <button type="button" @click="updateButtonClickEvent">수정</button>
      </template>
    </td>
    <td class="editable-button">
      <template v-if="isInsert">
        <button type="button" @click="cancelButtonClickEvent">취소</button>
      </template>
      <template v-else>
        <button type="button" @click="deleteButtonClickEvent">삭제</button>
      </template>
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
    item: {
      type: Object,
    },
    initIsInsert: {
      type: Boolean,
    }
  },
  data: function () {
    return {
      isUpdate: this.initIsUpdate,
      isInsert: this.initIsInsert
    }
  },
  methods: {
    cancelButtonClickEvent() {
      this.$emit('cancelInsert');
    },
    selectBoxChangeEvent(e, columnInfo) {
      const selectBoxInfo = columnInfo.selectBoxInfo;
      const changeInfos = selectBoxInfo.changeInfos;
      const selectItemList = selectBoxInfo.selectBoxListItems;
      const selectItem = selectItemList.find((item) => item.key === e.target.value);
      if (selectItem) {
        selectItem.change(this.item, changeInfos);
      }
    },
    insertButtonClickEvent() {
      this.$emit('insertItem', this.item);
      this.isInsert = false;
      this.isUpdate = false;
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