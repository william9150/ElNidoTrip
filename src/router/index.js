import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ItineraryView from '@/views/ItineraryView.vue'
import DiveShopView from '@/views/DiveShopView.vue'
import FlightView from '@/views/FlightView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import InfoView from '@/views/InfoView.vue'
import BudgetView from '@/views/BudgetView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '2026 El Nido',
    },
  },
  {
    path: '/itinerary',
    name: 'itinerary',
    component: ItineraryView,
    meta: {
      title: '行程表 | 2026 El Nido',
    },
  },
  {
    path: '/dive',
    name: 'dive-shop',
    component: DiveShopView,
    meta: {
      title: 'Dive shop | 2026 El Nido',
    },
  },
  {
    path: '/flight',
    name: 'flight',
    component: FlightView,
    meta: {
      title: 'Flight | 2026 El Nido',
    },
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantView,
    meta: {
      title: '餐廳推薦 | 2026 El Nido',
    },
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView,
    meta: {
      title: '旅遊資訊 | 2026 El Nido',
    },
  },
  {
    path: '/budget',
    name: 'budget',
    component: BudgetView,
    meta: {
      title: '預算規劃 | 2026 El Nido',
    },
  },
  {
    // Redirect old index.html to /dive (old dive shop page)
    path: '/index.html',
    redirect: '/dive',
  },
  {
    // Redirect old /airline to /flight
    path: '/airline',
    redirect: '/flight',
  },
  {
    // Redirect old airline.html to /flight
    path: '/airline.html',
    redirect: '/flight',
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
