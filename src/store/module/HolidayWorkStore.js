import Protocol from "@/network/Protocol.js";

export const holidayWorkStore = {
  namespaced: true,
  state: () => {
    return {
      holidayWorkList: [],
      simpleEmployeeList: [],
    }
  },
  getters: {
    getHolidayWorkList(state) {
      return state.holidayWorkList;
    },
    getSimpleEmployeeList(state) {
      return state.simpleEmployeeList;
    }
  },
  mutations: {
    setHolidayWorkList(state, payload) {
      state.holidayWorkList = payload;
    },
    setSimpleEmployeeList(state, payload) {
      state.simpleEmployeeList = payload
    },
  },
  actions: {
    async getHolidayWorkList({commit}) {
      try {
        const response = await Protocol.GET('http://localhost:8080/holiday/work/list/test');
        commit('setHolidayWorkList', response.result);
      }catch (error) {
        commit('setHolidayWorkList', [])
      }
    },
    async insertHolidayWork({commit, dispatch}, {holidayWorkData}) {
      if(typeof holidayWorkData !== 'object') {
        console.log('저장 할 데이터가 object 형식이 아닙니다.')
      }
      await Protocol.POST('http://localhost:8080/holiday/work/save', holidayWorkData);
      dispatch('getHolidayWorkList');
    },
    async updateHolidayWork({commit, dispatch}, {holidayWorkId, holidayWorkData}) {
      if(typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
      }
      if(typeof holidayWorkData !== 'object') {
        console.log('업데이트 할 데이터가 object 형식이 아닙니다.')
      }
      await Protocol.PUT(`http://localhost:8080/holiday/work/modify/${holidayWorkId}`, holidayWorkData);
      dispatch('getHolidayWorkList');
    },
    async deleteHolidayWork({commit, dispatch}, {holidayWorkId}) {
      if(typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
      }
      await Protocol.DELETE(`http://localhost:8080/holiday/work/delete/${holidayWorkId}`);
      dispatch('getHolidayWorkList');
    },
    async initHolidayWorkLists({commit, dispatch}) {
      const response = await Protocol.GET(`http://localhost:8080/employee/simple-info`);
      commit('setSimpleEmployeeList', response.result);
      dispatch('getHolidayWorkList');
    }
  }
}
