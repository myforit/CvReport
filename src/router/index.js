import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/views/home'
import Detail from '@/views/detail'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/detail', component: Detail },
]

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
})

export default router
