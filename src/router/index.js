import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/views/home'
import PhoneDetail from '@/views/phoneDetail'
import TextDetail from '@/views/textDetail'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/detail', component: PhoneDetail },
  { path: '/textocr', component: TextDetail },
]

const router = new Router({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
})

export default router
