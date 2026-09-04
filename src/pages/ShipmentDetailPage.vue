<script setup>
import { computed } from 'vue'
import { ArrowLeft, Check, Circle, MapPin, PackageCheck, Truck } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { getShipment } from '../data/shipments'

const route = useRoute()
const router = useRouter()
const shipment = computed(() => getShipment(route.params.shipmentId))
const timeline = ['Booked', 'Picked up', 'In transit', 'Out for delivery', 'Delivered']
const timelineIndex = computed(() => shipment.value?.status === 'Delivered' ? 4 : shipment.value?.status === 'Delayed' || shipment.value?.status === 'Exception' ? 2 : 2)
</script>

<template>
  <div v-if="shipment" class="content-wrap shipment-detail-page">
    <button class="back-link" @click="router.push('/shipments')"><ArrowLeft :size="16" /> Back to shipments</button>
    <section class="detail-heading"><div><p class="kicker">SHIPMENT DETAIL</p><div class="detail-title"><h1>{{ shipment.id }}</h1><span :class="['status-pill', shipment.tone]">{{ shipment.status }}</span><span :class="['priority', shipment.tone]">{{ shipment.priority }} priority</span></div><p class="subheading">Last updated {{ shipment.lastUpdate }} by the network operations team.</p></div><button class="secondary-button"><PackageCheck :size="16" /> Update shipment</button></section>
    <section class="route-banner panel"><div class="route-point"><span class="route-icon"><MapPin :size="18" /></span><div><span>ORIGIN</span><strong>{{ shipment.origin }}</strong></div></div><div class="route-line"><Truck :size="18" /><i></i><i></i><i></i><i></i></div><div class="route-point destination"><span class="route-icon"><MapPin :size="18" /></span><div><span>DESTINATION</span><strong>{{ shipment.destination }}</strong></div></div><div class="eta-block"><span>ESTIMATED DELIVERY</span><strong>{{ shipment.eta }}</strong><small>{{ shipment.progress }}% complete</small></div></section>
    <section class="detail-grid"><article class="panel timeline-panel"><div class="panel-header"><div><span class="panel-kicker">MOVEMENT HISTORY</span><h2>Shipment timeline</h2></div><span class="muted">{{ shipment.location }}</span></div><div class="timeline"><div v-for="(step, index) in timeline" :key="step" :class="['timeline-step', { complete: index <= timelineIndex, current: index === timelineIndex }]" ><span class="timeline-marker"><Check v-if="index < timelineIndex || shipment.status === 'Delivered' && index === timelineIndex" :size="13" /><Circle v-else :size="10" /></span><div><strong>{{ step }}</strong><span>{{ index <= timelineIndex ? (index === timelineIndex ? shipment.location : 'Completed') : 'Upcoming' }}</span></div></div></div></article><article class="panel metadata-panel"><div class="panel-header"><div><span class="panel-kicker">SHIPMENT PROFILE</span><h2>Load details</h2></div></div><dl class="metadata-list"><div><dt>Customer</dt><dd>{{ shipment.customer }}</dd></div><div><dt>Carrier</dt><dd>{{ shipment.carrier }}</dd></div><div><dt>Service</dt><dd>{{ shipment.service }}</dd></div><div><dt>Weight</dt><dd>{{ shipment.weight }}</dd></div><div><dt>Pieces</dt><dd>{{ shipment.pieces }}</dd></div><div><dt>Booked</dt><dd>{{ shipment.booked }}</dd></div></dl></article></section>
    <section v-if="shipment.issue" class="panel detail-exception"><div class="exception-callout"><span class="exception-symbol">!</span><div><span class="panel-kicker">ACTIVE EXCEPTION</span><h2>{{ shipment.issue }}</h2><p>{{ shipment.owner }} owns the next action for this shipment.</p></div><button class="more-button">Open exception <ArrowLeft :size="14" /></button></div></section>
  </div>
  <div v-else class="content-wrap"><section class="panel shipment-empty route-empty"><h1>Shipment not found</h1><p>The shipment ID does not exist in the current prototype data.</p><button class="secondary-button" @click="router.push('/shipments')">Back to shipments</button></section></div>
</template>