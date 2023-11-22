import Protocol from "@/network/Protocol";

export default {
  async getEmployeeDayoffInfo(searchParams) {
    try {
      let url = `http://localhost:8080/employee/dayoff/list?`;
      const searchParamUrl = new URLSearchParams("");

      for (const param of Object.keys(searchParams)) {
        if (searchParams[param]) {
          searchParamUrl.append(param, searchParams[param]);
        }
      }
      const response = await Protocol.GET(`${url}${searchParamUrl}`);
      if (response.result) {
        return response.result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}