export class SelectBoxChangeInfo {
  constructor({itemPropertyName, selectBoxItemPropertyName}) {
    this._itemPropertyName = itemPropertyName;
    this._selectBoxItemPropertyName = selectBoxItemPropertyName;
  }

  get itemPropertyName() {
    return this._itemPropertyName;
  }

  get selectBoxItemPropertyName() {
    return this._selectBoxItemPropertyName;
  }
}

export class SelectBoxListItem {
  /**
   *
   * @param key : string
   * @param value : object
   * @param view : string
   */

  constructor({key, value, view}) {
    this._key = key;
    this._value = value;
    this._view = view;
  }

  get key() {
    return this._key;
  }

  get view() {
    return this._view;
  }

  get value() {
    return this._value;
  }

  /**
   *
   * @param item : Object
   * @param changeInfoList : Array<SelectBoxChangeInfo>
   */
  change(item, changeInfoList) {
    if (!item) return;
    if (!changeInfoList) return;
    for (const changeInfo of changeInfoList) {
      item[changeInfo.itemPropertyName] = this._value[changeInfo.selectBoxItemPropertyName];
    }
  }
}

export class SelectBoxInfo {
  /**
   *
   * @param selectBoxListItems : Array<SelectBoxListItem>
   * @param changeInfos : Array<SelectBoxChangeInfo>
   */
  constructor({selectBoxListItems, changeInfos}) {
    this._selectBoxListItems = selectBoxListItems;
    this._changeInfos = changeInfos;
  }

  /**
   *
   * @returns {Array<SelectBoxListItem>}
   */
  get selectBoxListItems() {
    return this._selectBoxListItems;
  }

  get changeInfos () {
    return this._changeInfos;
  }
}

export class TableColumn {

  /**
   * 수정가능한 테이블 컬럼 속성
   * @param isId : boolean - id 컬럼인지
   * @param propertyOrder : number - 컬럼 순서
   * @param propertyName : string - 각 row object 의 프로퍼티명
   * @param columnName : string - 테이블에 표시될 컬럼 명
   * @param isVisible : boolean - 보여지는 컬럼인지
   * @param canModify : boolean - 수정가능한 컬럼인지
   * @param canInsert : boolean - 삽입가능한 컬럼인지
   * @param modifyType : string - 수정 가능했을때 수정되는 input type
   * @param selectBoxInfo : SelectBoxInfo - selectBox에 대한 변경 옵션들
   */
  constructor({
    isId,
    propertyOrder,
    propertyName,
    columnName,
    isVisible,
    canModify,
    canInsert,
    modifyType,
    selectBoxInfo
  }) {
    this._propertyOrder = propertyOrder ? propertyOrder : 999;
    this._isId = isId;
    this._propertyName = propertyName ? propertyName : "";
    this._columnName = columnName ? columnName : "";
    this._isVisible = isVisible || typeof isVisible === 'undefined';
    this._canModify = canModify || typeof canModify === 'undefined';
    this._canInsert = canInsert || typeof canInsert === 'undefined';
    this._modifyType = typeof modifyType === 'string' ? modifyType : "text";
    this._selectBoxInfo = selectBoxInfo ? selectBoxInfo : {}
  }

  get isId() {
    return this._isId;
  }

  get propertyName() {
    return this._propertyName;
  }

  get propertyOrder() {
    return this._propertyOrder;
  }

  get columnName() {
    return this._columnName;
  }

  get isVisible() {
    return this._isVisible;
  }

  get canModify() {
    return this._canModify;
  }

  get modifyType() {
    return this._modifyType;
  }

  get canInsert() {
    return this._canInsert;
  }

  get selectBoxInfo() {
    return this._selectBoxInfo;
  }
}