import Protocol from "@/network/Protocol";

export default {
  HolidayWork: class {
    constructor({holidayWorkId, employeeNo, name, workDate, workTypeId, isCustomType, workTypeName, rankName}) {
      this.holidayWorkId = holidayWorkId ? holidayWorkId : 99999999999;
      this.employeeNo = employeeNo ? employeeNo : "";
      this.name = name ? name : "";
      this.workDate = workDate ? workDate : "";
      this.workTypeId = workTypeId? workTypeId : 99999999999;
      this.workTypeName = workTypeName ? workTypeName : ""
      this.isCustomType = !!isCustomType;
      this.rankName = rankName ? rankName : "";
    }
  },
  HolidayWorkRequest: class {
    constructor({holidayWorkId, employeeNo, workDate, workTypeId, workTypeName, isCustomType}) {
      this.holidayWorkId = holidayWorkId ? Number(holidayWorkId) : 99999999999;
      this.employeeNo = employeeNo ? employeeNo : "";
      this.workDate = workDate ? workDate : "";
      this.workTypeId = workTypeId? workTypeId : 9999999;
      this.workTypeName = workTypeName ? workTypeName : ""
      this.isCustomType = (isCustomType !== false);
    }
  },
  async getHolidayWorkList({query = "", pageNum = 0, pageSize = 10, year, month}) {
    try {
      let url = `http://localhost:8080/holiday/work/list?pageNum=${pageNum}&pageSize=${pageSize}`;
      if (query) url = url + `&query=${query}`;
      if (year) url = url + `&year=${year}`;
      if (month) url = url + `&month=${month}`;
      console.log('asdasd')
      const response = await Protocol.GET(url);
      return response.result;
    } catch (error) {
      error.processingError();
    }
  },
  async insertHolidayWork(holidayWorkData) {
    if (!holidayWorkData instanceof this.HolidayWork) {
      console.log('저장 할 데이터가 HolidayWork 형식이 아닙니다.');
    }

    if (!holidayWorkData.employeeNo) {
      alert("사번이 선택되지 않았습니다.");
      return false;
    }

    if (!holidayWorkData.workDate) {
      alert("날짜가 선택되지 않았습니다.");
      return false;
    }

    try{
      const object = new this.HolidayWorkRequest(holidayWorkData);
      await Protocol.POST('http://localhost:8080/holiday/work/save',
          object);

    }catch (error) {
      error.processingError();
    }

    return true;
  },
  async updateHolidayWork(holidayWorkId, holidayWorkData) {
    try{
      if (typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
        return false;
      }
      if (!holidayWorkData instanceof this.HolidayWork) {
        console.log('수정 할 데이터가 HolidayWork 형식이 아닙니다.');
        return false;
      }

      if (!holidayWorkData.employeeNo) {
        alert("사번이 선택되지 않았습니다.");
        return false;
      }

      if (!holidayWorkData.workDate) {
        alert("날짜가 선택되지 않았습니다.");
        return false;
      }
      const object = new this.HolidayWorkRequest(holidayWorkData);
      await Protocol.PUT(
          `http://localhost:8080/holiday/work/modify/${holidayWorkId}`,
          object);

      return true;
    }catch (error) {
      error.processingError();
    }
  },
  async deleteHolidayWork(holidayWorkId) {
    try {
      if (typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
        return false;
      }
      await Protocol.DELETE(
          `http://localhost:8080/holiday/work/delete/${holidayWorkId}`);

      return true;
    } catch (error) {
      error.processingError();
    }

  },
  async getSimpleEmployeeList() {
    try {
      const response = await Protocol.GET(
          `http://localhost:8080/employee/simple-info`);
      return response.result;
    } catch (error) {
      error.processingError();
    }
  },
  async getDefaultWorkTypes() {
    try {
      const response = await Protocol.GET(
          `http://localhost:8080/holiday/work/type`);

      return response.result;
    } catch (error) {
      error.processingError();
    }
  }
}