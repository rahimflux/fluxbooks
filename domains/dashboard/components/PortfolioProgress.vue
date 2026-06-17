<template>
  <section class="bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
    <header class="px-6 py-4 border-b border-slate-800">
      <h3 class="font-semibold text-white text-sm">
        Portfolio Progress
      </h3>
      <p class="text-slate-400 text-xs mt-0.5">
        Client processing status overview
      </p>
    </header>

    <div class="p-6">
      <div class="space-y-5">
        <div v-for="entry in portfolioData" :key="entry.id">
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-sm text-slate-300">{{ entry.name }}</span>
            <span class="text-sm font-medium text-slate-200">{{ entry.progress }}%</span>
          </div>
          <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="progressBarColor(entry.progress)"
              :style="{ width: `${entry.progress}%` }"
            />
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs text-slate-500">{{ entry.industry }}</span>
            <span class="text-xs font-medium" :class="statusTextColor(entry.status)">
              {{ entry.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PortfolioEntry {
  id: string
  name: string
  industry: string
  progress: number
  status: string
}

// Static mock data — replaces deleted clientStore dependency
const portfolioData: PortfolioEntry[] = [
  { id: '1', name: 'Sunrise Restaurant Group', industry: 'Restaurant', progress: 75, status: 'READY' },
  { id: '2', name: 'Metro Healthcare LLC', industry: 'Healthcare', progress: 100, status: 'SYNCED' },
  { id: '3', name: 'Apex Retail Co.', industry: 'Retail', progress: 50, status: 'UNDER_REVIEW' },
  { id: '4', name: 'SkyLaunch SaaS', industry: 'SaaS', progress: 100, status: 'SYNCED' },
  { id: '5', name: 'Harmon Legal Partners', industry: 'Legal', progress: 25, status: 'UNDER_REVIEW' },
]

function progressBarColor(progress: number): string {
  if (progress >= 100) return 'bg-emerald-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 30) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusTextColor(status: string): string {
  switch (status) {
    case 'SYNCED': return 'text-emerald-400'
    case 'READY': return 'text-blue-400'
    case 'UNDER_REVIEW': return 'text-amber-400'
    default: return 'text-slate-400'
  }
}
</script>
