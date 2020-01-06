import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import { isExpired } from '@/helper/Auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt')
  const isExpiredStatus = isExpired()
  if (to.path !== '/login' && (!token || isExpiredStatus)) {
    next('/login')
  } else {
    next()
  }
})

export default router
