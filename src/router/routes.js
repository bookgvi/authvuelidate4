const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home') },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') }
]

export default routes
