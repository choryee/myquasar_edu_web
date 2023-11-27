import {SelectBoxListItem, TableColumn, SelectBoxChangeInfo, SelectBoxInfo} from "@/utils/EditableTableColumnUtil";

/**
 * @typedef employee
 * @property {string} employeeNo - 사번
 * @property {string} name - 사원 이름
 * @property {string} rankName - 직위
 */

/**
 * @typedef workType
 * @property {number} workTypeId  - 휴일출근 타입 Id
 * @property {string} workTypeName - 휴일출근 타입 이름
 * @property {string} isCustom - 커스텀 타입 유무
 */

/**
 *
 * @param employeeList : Array<employee> -
 * @param defaultWorkTypeList : Array<workType> -
 */
export function getHolidayTableWorksColumns(employeeList, defaultWorkTypeList) {
  if (!employeeList) {
    return [];
  }

  if (!defaultWorkTypeList) {
    return [];
  }

  const workTypeList = defaultWorkTypeList.map((item) => {
    return {
      workTypeId:item.workTypeId,
      workTypeName:item.workTypeName,
      isCustomType:item.isCustom
    }
  });

  const workTypeNameChangeInfo = [
      new SelectBoxChangeInfo({
        itemPropertyName: "workTypeId",
        selectBoxItemPropertyName: "workTypeId"}),
    new SelectBoxChangeInfo({
        itemPropertyName: "isCustomType",
        selectBoxItemPropertyName: "isCustomType"}),
    new SelectBoxChangeInfo({
      itemPropertyName: "workTypeName",
      selectBoxItemPropertyName: "workTypeName"})
  ];

  const workTypeNameSelectBoxList = workTypeList.map((item) => {
    return new SelectBoxListItem({key:item.workTypeName, value:item, view: item.workTypeName});
  });

  const workTypeSelectBoxInfo = new SelectBoxInfo(
      {
        selectBoxListItems:workTypeNameSelectBoxList,
        changeInfos: workTypeNameChangeInfo,
        onCustomHandler : function (item) {
          item.workTypeId = 999999;
          item.workTypeName = "";
          item.isCustomType = true;
        },
        offCustomHandler : function (item) {
          if (Array.isArray(this.selectBoxListItems) && this.selectBoxListItems.length > 0) {
            this.selectBoxListItems[0].doChange(item, this.changeInfos);
          }
          item.isCustomType = false;
        },
      }
  );

  const employeeNoChangeInfoList = [
      new SelectBoxChangeInfo({itemPropertyName: "employeeNo",
        selectBoxItemPropertyName: "employeeNo"}),
      new SelectBoxChangeInfo({itemPropertyName: "name",
        selectBoxItemPropertyName: "name"}),
      new SelectBoxChangeInfo({itemPropertyName: "rankName",
        selectBoxItemPropertyName: "rankName"}),
  ];

  const employeeNoSelectBoxList = employeeList.map((item) => {
    return new SelectBoxListItem({key:item.employeeNo, value: item, view:`${item.employeeNo}/${item.name}`});
  });

  const employeeNoSelectBoxInfo = new SelectBoxInfo(
      {
        selectBoxListItems: employeeNoSelectBoxList,
        changeInfos: employeeNoChangeInfoList
      });

  return [
    new TableColumn({
      propertyOrder: 1,
      propertyName: 'employeeNo',
      columnName: '사번',
      modifyType: 'selectBox',
      canModify: false,
      selectBoxInfo: employeeNoSelectBoxInfo
    }),
    new TableColumn({
      propertyOrder: 2,
      propertyName: 'name',
      columnName: '이름',
      canModify: false,
      canInsert: false,
      isNonVisibleUpdate: true
    }),
    new TableColumn({
      propertyOrder: 3,
      propertyName: 'rankName',
      columnName: '직위',
      canModify: false,
      canInsert: false,
      isNonVisibleUpdate: true
    }),
    new TableColumn({
      propertyOrder: 4,
      propertyName: 'workDate',
      columnName: '출근일',
      modifyType: "date"
    }),
    new TableColumn({
      propertyOrder: 5,
      propertyName: 'workTypeName',
      columnName: '타입',
      modifyType: 'selectBox',
      selectBoxInfo: workTypeSelectBoxInfo,
      canCustom: true
    }),
    new TableColumn({
      propertyOrder:997,
      propertyName:'workTypeId',
      columnName: 'workTypeId',
      isVisible: false,
    }),
    new TableColumn({
      propertyOrder:998,
      propertyName:'isCustomType',
      columnName: 'isCustomType',
      isVisible: false,
    }),
    new TableColumn({
      propertyOrder: 999,
      propertyName: 'holidayWorkId',
      isVisible: false,
      isId:true
    })
  ]
}