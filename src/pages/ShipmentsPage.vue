<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, ChevronDown, Filter, Search, Truck } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { shipments } from '../data/shipments'

const router = useRouter()
const search = ref('')
const status = ref('All statuses')
const visibleShipments = computed(() => shipments.filter((shipment) => {
  const query = search.value.trim().toLowerCase()
  const matchesQuery = !query || Object.values(shipment).some((value) => String(value).toLowerCase().includes(query))
  const matchesStatus = status.value === 'All statuses' || shipment.status === status.value
  return matchesQuery && matchesStatus
}))
</script>

<template>
  <div class="content-wrap shipments-page">
    <section class="page-heading"><div><p class="kicker">NETWORK OPERATIONS</p><h1>Shipments</h1><p class="subheading">Track every load from booking to delivery.</p></div><button class="secondary-button"><Truck :size="16" /> Create shipment</button></section>
    <section class="kpi-grid shipment-kpis"><article class="kpi-card"><span class="kpi-label">TOTAL SHIPMENTS</span><div class="kpi-value">8,492</div><span class="kpi-context">Across the active network</span></article><article class="kpi-card"><span class="kpi-label">IN TRANSIT</span><div class="kpi-value">6,318</div><span class="kpi-context">74.4% of active loads</span></article><article class="kpi-card"><span class="kpi-label">DELIVERED TODAY</span><div class="kpi-value">1,842</div><span class="kpi-context positive">+6.8% vs. yesterday</span></article><article class="kpi-card"><span class="kpi-label">DELAYED</span><div class="kpi-value negative">332</div><span class="kpi-context negative">3.9% of active loads</span></article></section>
    <section class="panel shipment-list-panel"><div class="shipment-toolbar"><div><span class="panel-kicker">ACTIVE NETWORK</span><h2>All shipments <span class="inline-count shipment-count">{{ visibleShipments.length }}</span></h2></div><div class="shipment-filters"><label class="search-control"><Search :size="15" /><input v-model="search" placeholder="Search shipments" /></label><label class="select-control compact-select"><select v-model="status"><option>All statuses</option><option>In transit</option><option>Delayed</option><option>Exception</option><option>Delivered</option></select><ChevronDown :size="15" /></label><button class="filter-button"><Filter :size="15" /> More filters</button></div></div><div class="shipment-table-head"><span>SHIPMENT</span><span>STATUS</span><span>ROUTE</span><span>LOCATION</span><span>ETA</span><span>CARRIER</span></div><button v-for="shipment in visibleShipments" :key="shipment.id" class="shipment-table-row" @click="router.push({ name: 'shipment-detail', params: { shipmentId: shipment.id } })"><span><strong class="shipment-id">{{ shipment.id }}</strong><small>{{ shipment.customer }}</small></span><span><b :class="['status-pill', shipment.tone]">{{ shipment.status }}</b></span><span class="route-cell"><strong>{{ shipment.origin }}</strong><small>to {{ shipment.destination }}</small></span><span>{{ shipment.location }}</span><span>{{ shipment.eta }}</span><span>{{ shipment.carrier }} <ArrowUpRight :size="14" /></span></button><div v-if="visibleShipments.length === 0" class="shipment-empty"><Search :size="20" /><strong>No shipments found</strong><span>Try a different search or status filter.</span></div></section>
  </div>
</template>