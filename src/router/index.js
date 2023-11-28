import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import pwChangeView from "@/views/login/pwChangeView.vue";
import AdminInfoView from "@/views/login/AdminInfoView.vue";
import Logout from "@/views/login/Test.vue";
import MemberJoin from "@/components/MemberJoin.vue";
import MemberLogin from "@/components/MemberLogin.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ex/network',
    name: 'NetworkEx',
    component: () => import('@/views/initEx/NetworkEx')
  },
  {
    path: '/ex/utils',
    name: 'UtilsEx',
    component: ()=>import('@/views/initEx/UtilsEx.vue')
  },

  {
    path: '/holiday-work',
    name: "holidayWork",
    component: () => import('@/views/holidayWork/HolidayWorkView.vue')
  },
  {
    path: '/dayoffs',
    name: 'DayoffListView',
    component: () => import('@/views/dayoff/DayoffListView.vue')
  },
  {
    path: '/dash-board',
    name: 'dashboard',
    component: () => import('@/views/dashBoard/DashBoardView.vue')
  },
  {
    path: '/dayoff/',
    name: `insertDayoff`,
    component: ()=>import('@/views/dayoff/DayoffView.vue')
  },
  {
    path: '/dayoff/:employeeNo',
    name: `dayoff`,
    component: ()=>import('@/views/dayoff/DayoffView.vue')
  },
  {
    path: '/dayoff-setting',
    name: `dayOffDefaultSetting`,
    component: ()=>import('@/views/dayoff/DayOffSettingView.vue')
  },
  { path: '/loginForm',
    name: 'MemberLogin',
    component: MemberLogin
  },
  { path: '/adminInfo',
    name: 'adminInfo',
    component: AdminInfoView
  },
  {
    path: '/pw-change',
    name: 'pw-change',
    component: pwChangeView
  },

  {
    path: '/join',
    name: 'join',
    component: MemberJoin
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
