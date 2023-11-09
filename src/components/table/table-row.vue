<template>
  <tr>
    <td>{{index}}</td>
    <td v-for="propertyItem in itemProperties">
      <template v-if="isUpdate">
        <template v-if="propertyItem.modifyType.inputType === 'text'">
          <input type="text" v-model="propertyItem.content">
        </template>
        <template v-else-if="propertyItem.modifyType.inputType  === 'selectBox'">
          <select v-model="propertyItem.content">
            <option v-for="item in propertyItem.modifyType.selectBoxList" :key="item.key" :value="item.value">{{item.view}}</option>
          </select>
        </template>
        <template v-else-if="propertyItem.modifyType.inputType  === 'date'">
          <input type="date" v-model="propertyItem.content">
        </template>
        <template v-else>
          {{propertyItem.content}}
        </template>
      </template>
      <template v-else>
        {{propertyItem.content}}
      </template>
    </td>
    <td v-if="isStateButton"><button type="button" @click="updateButtonClickEvent">수정</button></td>
    <td v-if="isStateButton"><button type="button" @click="deleteButtonClickEvent">삭제</button></td>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: ['index', 'holidayWorkId' ,'propItem','isUpdateProp','isStateButton', 'propertyOrder'],
  data: function () {
    return {
      item: this.propItem,
      isUpdate:this.isUpdate ? this.isUpdate : false,
      selectBoxList: []
    }
  },
  methods: {
    updateButtonClickEvent() {
      if (!this.isUpdate) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
        this.$emit('update', this.holidayWorkId, this.content);
      }
    },
    deleteButtonClickEvent() {
      this.$emit('delete', this.holidayWorkId);
    }
  },
  computed: {
    itemProperties() {
      return Object.values(this.item);
    }
  }
}
</script>