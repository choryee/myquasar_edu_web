import Protocol from "@/network/Protocol";



export default {
  async getDashBoardInfo({year}) {
    try {
      let url = `http://localhost:8080/dashboard/info`;
      if (year) url = url + `?year=${year}`;
      const response = await Protocol.GET(url);
      if (response.result) {
        return response.result;
      }
      return {};
    } catch (error) {
      return {};
    }
  }
}