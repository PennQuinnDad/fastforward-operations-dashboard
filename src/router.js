import { createRouter, createWebHistory } from 'vue-router'
import ShipmentsPage from './pages/ShipmentsPage.vue'
import ShipmentDetailPage from './pages/ShipmentDetailPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'overview' },
    { path: '/shipments', name: 'shipments', component: ShipmentsPage },
    { path: '/shipments/:shipmentId', name: 'shipment-detail', component: ShipmentDetailPage },
  ],
})