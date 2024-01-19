import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      redirect: '/1-1',
      component: () => import('../views/AboutView.vue'),
      children: [
        {
          path: '/1-1',
          name: '1-1',
          component: () => import('../views/1-1.vue')
        },
        {
          path: '/2-2',
          name: '2-2',
          component: () => import('../views/2-2.vue')
        }
      ]
    }
  ]
})

export default router
