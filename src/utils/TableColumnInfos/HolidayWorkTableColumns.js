import {SelectBoxListItem, TableColumn, SelectBoxChangeInfo, SelectBoxInfo} from "@/utils/EditableTableColumnUtil";

export class HolidayWork {
  constructor(holidayWorkId, employeeNo, name, workDate, memo, rankName) {
    this._holidayWorkId = holidayWorkId ? holidayWorkId : 99999999999;
    this._employeeNo = employeeNo ? employeeNo : "없음";
    this._name = name ? name : "없음";
    this._workDate = workDate ? workDate : "2999-12-31";
    this._memo = memo ? memo : "없음";
    this._rankName = rankName ? rankName : "없음";
  }

  get holidayWorkId() {
    return this._holidayWorkId;
  }

  get employeeNo() {
    return this._employeeNo;
  }

  get name() {
    return this._name;
  }

  get workDate() {
    return this._workDate;
  }

  get memo() {
    return this._memo;
  }

  get rankName() {
    return this._rankName;
  }
}

export function convertHolidayWork({
  holidayWorkId,
  employeeNo,
  name,
  workDate,
  memo,
  rankName
}) {
  return new HolidayWork(holidayWorkId, employeeNo, name, workDate, memo,
      rankName);
}

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
      selectBoxInfo: selectBoxInfo
    }),
    new TableColumn({
      propertyOrder: 2,
      propertyName: 'name',
      columnName: '이름',
      isModify: false,
      isNonVisibleUpdate: true
    }),
    new TableColumn({
      propertyOrder: 3,
      propertyName: 'rankName',
      columnName: '직위',
      isModify: false,
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