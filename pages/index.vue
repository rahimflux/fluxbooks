<script setup lang="ts">
import KpiCard from '@/domains/dashboard/components/KpiCard.vue'
import PortfolioProgress from '@/domains/dashboard/components/PortfolioProgress.vue'
import ClientProcessingMatrix from '@/domains/dashboard/components/ClientProcessingMatrix.vue'
import ActivityTimeline from '@/domains/dashboard/components/ActivityTimeline.vue'
import QuickActions from '@/domains/dashboard/components/QuickActions.vue'

import { kpiData } from '@/domains/dashboard/infrastructure/data/mockDashboard'
</script>

<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p class="text-slate-400 text-sm mt-1">FluxBooks Operating Center — real-time overview</p>
    </div>

    <!-- KPI Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        v-for="kpi in kpiData"
        :key="kpi.title"
        :title="kpi.title"
        :value="kpi.value"
        :trend="kpi.trend"
      />
    </div>

    <!-- Portfolio + Timeline -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PortfolioProgress />
      <ActivityTimeline />
    </div>

    <!-- Client Matrix -->
    <ClientProcessingMatrix />

    <!-- Quick Actions -->
    <QuickActions />
  </div>
</template>
