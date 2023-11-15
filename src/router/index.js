import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


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
    component: () => import('@/views/initEx/UtilsEx')
  },
  {
    path: '/holiday-work',
    name: "holidayWork",
    component: () => import('@/views/holidayWork/HolidayWorkView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/calendar/calendar.vue')
  },
  {
    path: '/dash-board',
    name: 'dashboard',
    component: () => import('@/views/dashBoard/DashBoardView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
