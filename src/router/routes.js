import { isAuth } from '@/helper/Auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: isAuth,
    component: () => import('../views/Login')
  },
  {
    path: '/',
    component: () => import('../views/Main'),
    children: [
      { path: '', component: () => import('../views/Home') },
      { path: '/home', name: 'home', component: () => import('../views/Home') },
      { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') }
    ]
  }
]

export default routes
