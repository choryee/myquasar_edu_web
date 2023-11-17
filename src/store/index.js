import { createStore } from 'vuex'
import {holidayWorkStore} from "@/store/module/HolidayWorkStore";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
      setUserName(state, userName) {
      state.userName = userName;
    },
  },
  actions: {
  },
  modules: {
    holidayWorkStore: holidayWorkStore
  }
});
