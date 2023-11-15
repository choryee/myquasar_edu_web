import Protocol from "@/network/Protocol";

export default {
  DashBoardInfo : class {
    constructor({muchHolidayWorkerName, muchHolidayWorkerWorkDateCount,
      totalHolidayWorkCount, mostRemainingDayoffCount,
      mostRemainingDayoffName, recentUseDayoff,
      totalRemainingDayoffCount, totalUseDayoffCount,
    }) {
      this.muchHolidayWorkerName = muchHolidayWorkerName ? muchHolidayWorkerName : "없음";
      this.muchHolidayWorkerWorkDateCount = muchHolidayWorkerWorkDateCount ? muchHolidayWorkerWorkDateCount : 0;
      this.totalHolidayWorkCount = totalHolidayWorkCount ? totalUseDayoffCount : 0;
      this.mostRemainingDayoffCount = mostRemainingDayoffCount ? mostRemainingDayoffCount : 0;
      this.mostRemainingDayoffName = mostRemainingDayoffName ? mostRemainingDayoffName : "없음";
      this.recentUseDayoff = recentUseDayoff ? recentUseDayoff : {};
      this.totalRemainingDayoffCount = totalRemainingDayoffCount? totalRemainingDayoffCount : 0;
      this.totalUseDayoffCount = totalUseDayoffCount ? totalUseDayoffCount : 0;
    }
  },
  async getDashBoardInfo({year}) {
    try {
      let url = `http://localhost:8080/dashboard/info`;
      if (year) url = url + `?year=${year}`;
      const response = await Protocol.GET(url);
      if (response.result) {
        return new response.result;
      }
      return {};
    } catch (error) {
      return {};
    }
  }
}