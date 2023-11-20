import {SelectBoxListItem, TableColumn, SelectBoxChangeInfo, SelectBoxInfo} from "@/utils/EditableTableColumnUtil";

/**
 * @typedef employeeList
 * @property {string} employeeNo - 사번
 * @property {string} name - 사원 이름
 * @property {string} rankName - 직위
 */

/**
 *
 * @param employeeList : Array<employeeList> -
 */
export function getHolidayTableWorksColumns(employeeList) {
  if (!employeeList) {
    return [];
  }

  const changeInfoList = [
      new SelectBoxChangeInfo({itemPropertyName: "employeeNo",
        selectBoxItemPropertyName: "employeeNo"}),
      new SelectBoxChangeInfo({itemPropertyName: "name",
        selectBoxItemPropertyName: "name"}),
      new SelectBoxChangeInfo({itemPropertyName: "rankName",
        selectBoxItemPropertyName: "rankName"}),
  ];

  const selectBoxList = employeeList.map((item) => {
    return new SelectBoxListItem({key:item.employeeNo, value: item, view:`${item.employeeNo}/${item.name}`});
  })

  const selectBoxInfo = new SelectBoxInfo(
      {
        selectBoxListItems: selectBoxList,
        changeInfos: changeInfoList
      });

  return [
    new TableColumn({
      propertyOrder: 1,
      propertyName: 'employeeNo',
      columnName: '사번',
      modifyType: 'selectBox',
      canModify: false,
      selectBoxInfo: selectBoxInfo
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
      propertyName: 'memo',
      columnName: '메모',
      modifyType: "text"
    }),
    new TableColumn({
      propertyOrder: 999,
      propertyName: 'holidayWorkId',
      isVisible: false,
      isId:true
    })
  ]
}