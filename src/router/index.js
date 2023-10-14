import Vue from 'vue'
import VueRouter from 'vue-router'
import HotelLandingPage from '../views/HomeView.vue'
import AllRooms from '@/components/AllRooms.vue'
import About from '@/components/About.vue'
import RoomDetail from '@/components/RoomDetail'
import SignInPage from '@/components/SignInPage'
import SignupPage from '@/components/SignupPage'
import ReserveRoom from '@/components/ReserveRoom'
import contactUs from '@/components/contactUs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HotelLandingPage
  },
  {
    path: '/rooms',
    name: 'AllRooms',
    component: AllRooms
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/rooms/:room_id',
    name: 'RoomDetail',
    component: RoomDetail
  },
  {
    path: '/signin',
    name: 'SignInPage',
    component: SignInPage
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/ReserveRoom',
    name: 'ReserveRoom',
    component: ReserveRoom
  },
  {
    path: '/contact',
    name: 'contactUs',
    component: contactUs
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/components/ProfilePage.vue') // Load the ProfilePage component
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
