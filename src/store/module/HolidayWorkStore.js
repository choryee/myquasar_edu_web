import { createStore } from 'vuex'
import axios from "@/network/AxiosConfig";
createStore( {
  state: {
    holidayWorkList:[],
  },
  mutations: {
    setHolidayWorkList(state, payload) {
      state.holidayWorkList = payload;
    }
  },
  actions: {
    async getHolidayWorkList({commit}) {
      const response = await axios.get('http://localhost:8080/holiday/work/list');
      commit('setHolidayWorkList', response);
    },
    async insertHolidayWork({commit, dispatch}, {holidayWorkData}) {
      if(typeof holidayWorkData !== 'object') {
        console.log('저장 할 데이터가 object 형식이 아닙니다.')
      }
      await axios.post('http://localhost:8080/holiday/work/save', holidayWorkData);
      dispatch('getHolidayWorkList');
    },
    async updateHolidayWork({commit, dispatch}, {holidayWorkId, holidayWorkData}) {
      if(typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
      }
      if(typeof holidayWorkData !== 'object') {
        console.log('업데이트 할 데이터가 object 형식이 아닙니다.')
      }
      await axios.put(`http://localhost:8080/holiday/work/modify/${holidayWorkId}`, holidayWorkData);
      dispatch('getHolidayWorkList');
    },
    async deleteHolidayWork({commit, dispatch}, {holidayWorkId}) {
      if(typeof holidayWorkId !== 'number') {
        console.log('holidayWorkId가 number형식이 아닙니다.')
      }
      await axios.delete(`http://localhost:8080/holiday/work/delete/${holidayWorkId}`);
      dispatch('getHolidayWorkList');
    },
  }
})


export default holidayWorkStore;
