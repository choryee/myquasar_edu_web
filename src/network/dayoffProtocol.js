import Protocol from "@/network/Protocol";

export default {
  async refreshDayoff() {
    try {
      let url = `http://localhost:8080/dayoff/refresh`;
      await Protocol.POST(url);
    } catch (error) {

    }
  }
}