import { createRouter, createWebHistory } from 'vue-router'
import DiveShopView from '@/views/DiveShopView.vue'
import FlightView from '@/views/FlightView.vue'

const routes = [
  {
    path: '/',
    name: 'dive-shop',
    component: DiveShopView,
    meta: {
      title: 'Dive shop | 2026 El Nido',
    },
  },
  {
    path: '/airline',
    name: 'flight',
    component: FlightView,
    meta: {
      title: 'Flight | 2026 El Nido',
    },
  },
  {
    // Redirect old index.html to /
    path: '/index.html',
    redirect: '/',
  },
  {
    // Redirect old airline.html to /airline
    path: '/airline.html',
    redirect: '/airline',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Set page title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '2026 El Nido'
  next()
})

export default router
