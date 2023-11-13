import Protocol from "@/network/Protocol";

export default {
  async getHolidayWorkList() {
    try {
      const response = await Protocol.GET(
          'http://localhost:8080/holiday/work/list/test');
      return response.result;
    } catch (error) {
      return [];
    }
  },
  async insertHolidayWork(holidayWorkData) {
    if (typeof holidayWorkData !== 'object') {
      console.log('저장 할 데이터가 object 형식이 아닙니다.')
    }
    await Protocol.POST('http://localhost:8080/holiday/work/save',
        holidayWorkData);
  },
  async updateHolidayWork(holidayWorkId, holidayWorkData) {
    if (typeof holidayWorkId !== 'number') {
      console.log('holidayWorkId가 number형식이 아닙니다.')
    }
    if (typeof holidayWorkData !== 'object') {
      console.log('업데이트 할 데이터가 object 형식이 아닙니다.')
    }
    await Protocol.PUT(
        `http://localhost:8080/holiday/work/modify/${holidayWorkId}`,
        holidayWorkData);
  },
  async deleteHolidayWork(holidayWorkId) {
    if (typeof holidayWorkId !== 'number') {
      console.log('holidayWorkId가 number형식이 아닙니다.')
    }
    await Protocol.DELETE(
        `http://localhost:8080/holiday/work/delete/${holidayWorkId}`);
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