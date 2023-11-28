<template>
  <tr class="hover-blue">
    <!--순번 사용 여부-->
    <td class="ta-c" v-if="useIndex">{{ index }}</td>

    <!-- 헤더 정보에 따라 반복 -->
    <template v-for="columnInfo in headerInfos">
      <!-- 보이지않는 헤더는 필터링 -->
      <template v-if="columnInfo.isVisible">
        <!-- 삽입 상태 일때 보여지게 될 창-->
        <template v-if="isInsert && !isUpdate">
          <!-- 삽입 상태라도 insert 가능한 컬럼 에따라 분리-->
          <template v-if="columnInfo.canInsert">
            <!--인풋 타입 별 분리 : text-->
            <td v-if="columnInfo.modifyType === 'text'" class="editable-td ta-c">
              <input class="form-control" type="text" v-model="item[columnInfo.propertyName]">
            </td>
            <!--인풋 타입 별 분리 : selectBox-->
            <td v-else-if="columnInfo.modifyType === 'selectBox'" class="editable-td ta-c">
              <template v-if="isCustomProperties.get(columnInfo.propertyName)">
                <div class="return-box-container">
                  <input class="form-control" type="text" :value="item[columnInfo.propertyName]" @change="changeCustomValue($event, columnInfo)">
                  <img class="icon-button clickable" src="@/assets/images/return-icon.png" @click="returningCustom(columnInfo)">
                </div>
              </template>
              <template v-else>
                <select class="form-select" :value="item[columnInfo.propertyName]" @change="selectBoxChangeEvent($event, columnInfo)">
                  <option>선택</option>
                  <option v-for="selectBoxItem in columnInfo.selectBoxInfo.selectBoxListItems" :key="selectBoxItem.key"
                          :value="selectBoxItem.key">{{ selectBoxItem.view }}
                  </option>
                  <option v-if="columnInfo.canCustom" value="'직접입력'">직접입력</option>
                </select>
              </template>
             </td>
            <!--인풋 타입 별 분리 : date-->
            <td v-else-if="columnInfo.modifyType === 'date'" class="editable-td ta-c">
              <input class="form-control" type="date" v-model="item[columnInfo.propertyName]">
            </td>
            <!--인풋 타입 별 분리 : 나머지 수정 불가능 한 것들-->
            <td v-else class="editable-td ta-c">
              {{ item[columnInfo.propertyName] }}
            </td>
          </template>
          <!--삽입이 불가능 한 컬럼 -->
          <template v-else>
            <td class="editable-td ta-c">
              {{ item[columnInfo.propertyName] }}
            </td>
          </template>
        </template>
        <!--update 상태일때 보여지게 될 컬럼 -->
        <template v-if="!isInsert && isUpdate">
          <!--update 상태일때 라도 수정 불가능한 컬럼 필터링-->
          <template v-if="columnInfo.canModify">
            <!--인풋 타입 별 분리 : text-->
            <td v-if="columnInfo.modifyType === 'text'" class="editable-td ta-c">
              <input class="form-control" type="text" v-model="item[columnInfo.propertyName]">
            </td>
            <!--인풋 타입 별 분리 : selectbox-->
            <td v-else-if="columnInfo.modifyType === 'selectBox'" class="editable-td ta-c">
              <template v-if="isCustomProperties.get(columnInfo.propertyName)">
                <div class="return-box-container">
                  <input class="form-control" type="text" :value="item[columnInfo.propertyName]" @change="changeCustomValue($event, columnInfo)">
                  <img class="icon-button clickable" src="@/assets/images/return-icon.png" @click="returningCustom(columnInfo)">
                </div>
              </template>
              <template v-else>
                <select class="form-select" :value="item[columnInfo.propertyName]" @change="selectBoxChangeEvent($event, columnInfo)">
                  <option v-for="selectBoxItem in columnInfo.selectBoxInfo.selectBoxListItems" :key="selectBoxItem.key"
                          :value="selectBoxItem.key">{{ selectBoxItem.key }}
                  </option>
                  <option v-if="columnInfo.canCustom">직접입력</option>
                </select>
              </template>
            </td>
            <!--인풋 타입 별 분리 : date-->
            <td v-else-if="columnInfo.modifyType === 'date'" class="editable-td ta-c">
              <input class="form-control" type="date" v-model="item[columnInfo.propertyName]">
            </td>
            <!--인풋 타입 별 분리 : 나머지-->
            <td v-else class="editable-td ta-c">
              {{ item[columnInfo.propertyName] }}
            </td>
          </template>
          <!--수정 상태가 아닐때 보여지게 될 컬럼-->
          <template v-else>
            <td class="editable-td ta-c">
              {{ item[columnInfo.propertyName] }}
            </td>
          </template>
        </template>
        <!--입력, 수정 상태가 아닐때 보여지게 될 컬럼-->
        <template v-if="!isInsert && !isUpdate">
          <td class="editable-td ta-c">
            {{ item[columnInfo.propertyName] }}
          </td>
        </template>
      </template>
    </template>
    <td class="editable-button ta-c">
      <template v-if="isUpdate && !isInsert">
        <button type="button" class="btn btn-info" @click="updateButtonClickEvent">확인</button>
      </template>
      <template v-else-if="!isUpdate && isInsert">
        <button type="button" class="btn btn-info" @click="insertButtonClickEvent">등록</button>
      </template>
      <template v-else-if="!isUpdate && !isInsert">
        <button type="button" class="btn btn-warning" @click="updateButtonClickEvent">수정</button>
      </template>
    </td>
    <td class="editable-button ta-c">
      <template v-if="isInsert && !isUpdate">
        <button type="button" class="btn btn-dark" @click="cancelInsertButtonClickEvent">취소</button>
      </template>
      <template v-else-if="!isInsert && isUpdate">
        <button type="button" class="btn btn-dark" @click="cancelUpdateButtonClickEvent">취소</button>
      </template>
      <template v-else>
        <button type="button" class="btn btn-danger" @click="deleteButtonClickEvent">삭제</button>
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
    },
    isCustomProperties: {
      type: Map,
      default: new Map()
    },
  },
  data: function () {
    return {
      isUpdate: false,
      isInsert: this.initIsInsert,
    }
  },
  methods: {
    returningCustom(columnInfo) {
      this.isCustomProperties.set(columnInfo.propertyName, false);
      columnInfo.selectBoxInfo.offCustomHandler(this.item);
      this.$forceUpdate();
    },
    changeCustomValue (event, columnInfo) {
      const value = event.target.value;
      this.item[columnInfo.propertyName] = value;
    },
    cancelInsertButtonClickEvent() {
      this.$emit('cancelInsert');
    },
    cancelUpdateButtonClickEvent() {
      this.$emit('cancelUpdate');
      this.isUpdate = false;
    },
    selectBoxChangeEvent(e, columnInfo) {
      //값이 없으면 취소
      if (typeof e.target.value === "undefined") return;
      let value = e.target.value;
      const selectBoxInfo = columnInfo.selectBoxInfo;
      const changeInfos = selectBoxInfo.changeInfos;
      //값이 선택이면 데이터 지우기

      if (value === '직접입력') {
        //값이 직접입력이면 값을 다 지우고 인풋박스 토글
        this.isCustomProperties.set(columnInfo.propertyName, true);
        columnInfo.selectBoxInfo.onCustomHandler(this.item);
        this.$forceUpdate();
        return;
      }

      const selectItemList = selectBoxInfo.selectBoxListItems;
      const selectItem = selectItemList.find((item) => item.key === value);

      //정해진 item에 맞게 데이터 변경
      if (selectItem) {
        selectItem.doChange(this.item, changeInfos);
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
  },

}
</script>