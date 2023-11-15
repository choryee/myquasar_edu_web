import Protocol from "@/network/Protocol";

export default {
  HolidayWork: class {
    constructor({holidayWorkId, employeeNo, name, workDate, memo, rankName}) {
      this.holidayWorkId = holidayWorkId ? holidayWorkId : 99999999999;
      this.employeeNo = employeeNo ? employeeNo : "";
      this.name = name ? name : "";
      this.workDate = workDate ? workDate : "";
      this.memo = memo ? memo : "";
      this.rankName = rankName ? rankName : "";
    }
  },
  async getHolidayWorkList({query = "", pageNum = 0, pageSize = 10, year, month}) {
    try {
      let url = `http://localhost:8080/holiday/work/list?pageNum=${pageNum}&pageSize=${pageSize}`;
      if (query) url = url + `&query=${query}`;
      if (year) url = url + `&year=${year}`;
      if (month) url = url + `&month=${month}`;
      const response = await Protocol.GET(url);

      if (response.result) {
        return response.result.map((item) => new this.HolidayWork(item));
      }
      return [];
    } catch (error) {
      return [];
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

    const object = {
      employeeNo: holidayWorkData.employeeNo,
      workDate: holidayWorkData.workDate,
      memo:holidayWorkData.memo
    }
    await Protocol.POST('http://localhost:8080/holiday/work/save',
        object);

    return true;
  },
  async updateHolidayWork(holidayWorkId, holidayWorkData) {
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

    await Protocol.PUT(
        `http://localhost:8080/holiday/work/modify/${holidayWorkId}`,
        holidayWorkData);

    return true;
  },
  async deleteHolidayWork(holidayWorkId) {
    if (typeof holidayWorkId !== 'number') {
      console.log('holidayWorkId가 number형식이 아닙니다.')
      return false;
    }
    await Protocol.DELETE(
        `http://localhost:8080/holiday/work/delete/${holidayWorkId}`);

    return true;

  },
  async getSimpleEmployeeList() {
    try {
      const response = await Protocol.GET(
          `http://localhost:8080/employee/simple-info`);
      return response.result;
    } catch (error) {
      return [];
    }
  }
}