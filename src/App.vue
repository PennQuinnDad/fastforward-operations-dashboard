<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, Bell, ChevronDown, CircleHelp, Clock3, Download, ExternalLink, Filter, LayoutDashboard, Map, PackageCheck, Search, Settings2, Truck } from 'lucide-vue-next'
import ShipmentsPage from './pages/ShipmentsPage.vue'
import ShipmentDetailPage from './pages/ShipmentDetailPage.vue'

const route = useRoute()
const router = useRouter()
const activeNav = computed(() => route.name === 'shipments' || route.name === 'shipment-detail' ? 'Shipments' : 'Overview')
const selectedWindow = ref('Last 30 days')
const searchQuery = ref('')
const showAll = ref(false)
const navItems = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'Shipments', icon: Truck },
  { label: 'Performance', icon: BarChart3 }, { label: 'Exceptions', icon: AlertTriangle, count: 12 },
]
const kpis = [
  { label: 'Shipments in motion', value: '8,492', change: '8.2%', context: 'vs. previous period', icon: Truck, tone: 'blue', direction: 'up' },
  { label: 'On-time delivery', value: '94.8%', change: '1.6%', context: 'vs. previous period', icon: PackageCheck, tone: 'green', direction: 'up' },
  { label: 'Avg. transit time', value: '2.4 days', change: '0.3d', context: 'faster than target', icon: Clock3, tone: 'amber', direction: 'down' },
  { label: 'Open exceptions', value: '12', change: '4', context: 'since last Monday', icon: AlertTriangle, tone: 'red', direction: 'down' },
]
const regions = [
  { name: 'West', short: 'W', shipments: '2,840', onTime: '96.4%', delta: '+2.1%', width: '96%', tone: 'green' },
  { name: 'Central', short: 'C', shipments: '2,114', onTime: '95.1%', delta: '+0.8%', width: '88%', tone: 'green' },
  { name: 'Northeast', short: 'NE', shipments: '1,973', onTime: '93.7%', delta: '-0.4%', width: '74%', tone: 'amber' },
  { name: 'Southeast', short: 'SE', shipments: '1,565', onTime: '92.6%', delta: '-1.2%', width: '63%', tone: 'red' },
]
const exceptions = [
  { id: 'FF-48291', issue: 'Missed delivery window', lane: 'Chicago, IL -> Dallas, TX', owner: 'M. Chen', age: '2h ago', priority: 'High', tone: 'red' },
  { id: 'FF-48176', issue: 'Customs documentation', lane: 'Rotterdam -> Newark, NJ', owner: 'A. Patel', age: '5h ago', priority: 'Medium', tone: 'amber' },
  { id: 'FF-48043', issue: 'Temperature variance', lane: 'Fresno, CA -> Denver, CO', owner: 'J. Lewis', age: 'Yesterday', priority: 'High', tone: 'red' },
  { id: 'FF-47988', issue: 'Address verification', lane: 'Atlanta, GA -> Miami, FL', owner: 'Unassigned', age: 'Yesterday', priority: 'Low', tone: 'blue' },
]
const visibleExceptions = computed(() => (showAll.value ? exceptions : exceptions.slice(0, 3)).filter((item) => {
  const query = searchQuery.value.trim().toLowerCase()
  return !query || Object.values(item).some((value) => String(value).toLowerCase().includes(query))
}))

function navigate(label) {
  if (label === 'Overview') router.push('/')
  if (label === 'Shipments') router.push('/shipments')
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-lockup"><div class="brand-mark"><Activity :size="19" /></div><div><strong>FASTFORWARD</strong><span>LOGISTICS</span></div></div>
      <div class="workspace-switcher"><span class="eyebrow">WORKSPACE</span><button class="workspace-button">Operations HQ <ChevronDown :size="15" /></button></div>
      <nav class="main-nav" aria-label="Main navigation"><span class="nav-label">COMMAND CENTER</span><button v-for="item in navItems" :key="item.label" :class="['nav-item', { active: activeNav === item.label }]" @click="navigate(item.label)"><component :is="item.icon" :size="18" /><span>{{ item.label }}</span><span v-if="item.count" class="nav-count">{{ item.count }}</span></button></nav>
      <div class="sidebar-bottom"><button class="nav-item"><Map :size="18" /><span>Network map</span></button><button class="nav-item"><Settings2 :size="18" /><span>Settings</span></button><div class="user-profile"><div class="avatar">SO</div><div><strong>Sarah Olsen</strong><span>VP, Operations</span></div><ChevronDown :size="15" class="profile-chevron" /></div></div>
    </aside>

    <main class="main-content">
      <header class="topbar"><div class="breadcrumb"><span>Operations</span><span class="slash">/</span><strong>{{ activeNav }}</strong></div><div class="topbar-actions"><span class="status-dot"><i></i> Data refreshed 4 min ago</span><button class="icon-button" aria-label="Notifications"><Bell :size="18" /><span class="notification-dot"></span></button><button class="icon-button" aria-label="Help"><CircleHelp :size="18" /></button></div></header>
      <div v-if="route.name === 'overview'" class="content-wrap">
        <section class="page-heading"><div><p class="kicker">THURSDAY, SEPTEMBER 4, 2026</p><h1>Good morning, Sarah.</h1><p class="subheading">Here is how the network is moving today.</p></div><div class="heading-actions"><label class="select-control"><span class="sr-only">Date range</span><select v-model="selectedWindow"><option>Last 30 days</option><option>Last 7 days</option><option>Quarter to date</option></select><ChevronDown :size="15" /></label><button class="secondary-button"><Download :size="16" /> Export report</button></div></section>
        <section class="kpi-grid"><article v-for="kpi in kpis" :key="kpi.label" class="kpi-card"><div class="kpi-topline"><span>{{ kpi.label }}</span><div :class="['kpi-icon', kpi.tone]"><component :is="kpi.icon" :size="17" /></div></div><div class="kpi-value">{{ kpi.value }}</div><div class="kpi-foot"><span :class="['change', kpi.tone === 'red' ? 'negative' : 'positive']"><ArrowUpRight v-if="kpi.direction === 'up'" :size="14" /><ArrowDownRight v-else :size="14" />{{ kpi.change }}</span><span>{{ kpi.context }}</span></div></article></section>
        <section class="main-grid">
          <article class="panel trend-panel"><div class="panel-header"><div><span class="panel-kicker">NETWORK ACTIVITY</span><h2>Shipment volume</h2></div><button class="more-button">View details <ExternalLink :size="14" /></button></div><div class="chart-summary"><strong>18,734</strong><span class="summary-label">total shipments</span><span class="summary-change"><ArrowUpRight :size="14" /> 8.2%</span></div><div class="chart-wrap"><div class="y-axis"><span>1.2k</span><span>900</span><span>600</span><span>300</span><span>0</span></div><div class="chart-area"><div class="grid-line line-1"></div><div class="grid-line line-2"></div><div class="grid-line line-3"></div><div class="grid-line line-4"></div><div class="grid-line line-5"></div><svg class="line-chart" viewBox="0 0 720 196" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e7a75" stop-opacity=".2" /><stop offset="100%" stop-color="#0e7a75" stop-opacity="0" /></linearGradient></defs><path class="area-path" d="M0 150 C30 140 48 144 72 123 S110 133 135 106 S174 111 198 118 S236 87 270 96 S308 74 338 87 S370 68 404 76 S443 63 472 78 S510 48 542 61 S576 40 604 49 S650 29 720 36 L720 196 L0 196 Z" /><path class="line-path" d="M0 150 C30 140 48 144 72 123 S110 133 135 106 S174 111 198 118 S236 87 270 96 S308 74 338 87 S370 68 404 76 S443 63 472 78 S510 48 542 61 S576 40 604 49 S650 29 720 36" /><circle cx="604" cy="49" r="4" class="chart-dot" /><circle cx="720" cy="36" r="4" class="chart-dot" /></svg><div class="x-axis"><span>Aug 06</span><span>Aug 12</span><span>Aug 18</span><span>Aug 24</span><span>Aug 30</span><span>Sep 04</span></div></div></div><div class="chart-legend"><span><i class="legend-line"></i> Actual shipments</span><span><i class="legend-dash"></i> Target</span></div></article>
          <article class="panel region-panel"><div class="panel-header"><div><span class="panel-kicker">BY REGION</span><h2>Service performance</h2></div><button class="filter-button"><Filter :size="15" /> Filter</button></div><div class="region-list"><div v-for="region in regions" :key="region.name" class="region-row"><div class="region-name"><span :class="['region-avatar', region.tone]">{{ region.short }}</span><div><strong>{{ region.name }}</strong><span>{{ region.shipments }} shipments</span></div></div><div class="region-metric"><strong>{{ region.onTime }}</strong><span :class="region.tone === 'red' ? 'negative' : 'positive'">{{ region.delta }}</span></div><div class="progress-track"><div :class="['progress-value', region.tone]" :style="{ width: region.width }"></div></div></div></div><button class="panel-footer-link">Open regional scorecard <ArrowUpRight :size="15" /></button></article>
        </section>
        <section class="panel exceptions-panel"><div class="panel-header exceptions-header"><div><span class="panel-kicker">NEEDS ATTENTION</span><h2>Open exceptions <span class="inline-count">12</span></h2></div><div class="exception-actions"><label class="search-control"><Search :size="15" /><input v-model="searchQuery" placeholder="Search exceptions" /></label><button class="more-button" @click="showAll = !showAll">{{ showAll ? 'Show less' : 'View all exceptions' }} <ArrowUpRight :size="14" /></button></div></div><div class="table-head"><span>SHIPMENT</span><span>ISSUE</span><span>LANE</span><span>OWNER</span><span>AGE</span><span>PRIORITY</span></div><div v-for="item in visibleExceptions" :key="item.id" class="exception-row"><strong class="shipment-id">{{ item.id }}</strong><span>{{ item.issue }}</span><span class="lane">{{ item.lane }}</span><span>{{ item.owner }}</span><span class="muted">{{ item.age }}</span><span :class="['priority', item.tone]">{{ item.priority }}</span></div><div v-if="visibleExceptions.length === 0" class="empty-state">No exceptions match that search.</div></section>
        <p class="footer-note"><span class="pulse"></span> All systems operational <span class="footer-divider">|</span> Last synced from TMS at 8:42 AM CT</p>
      </div>
      <ShipmentsPage v-else-if="route.name === 'shipments'" />
      <ShipmentDetailPage v-else-if="route.name === 'shipment-detail'" />
    </main>
  </div>
</template>