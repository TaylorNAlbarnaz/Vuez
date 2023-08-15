import { createRouter, createWebHashHistory } from 'vue-router'
import SalesView from '../views/SalesView.vue'

const routes = [
  {
    path: '/',
    name: 'sales',
    component: SalesView
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('../views/SellView.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/ClientsView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
