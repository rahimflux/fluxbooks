<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <h2 class="font-semibold text-white mb-4">Activity Timeline</h2>
    <div class="space-y-4">
      <div
        v-for="event in defaultEvents"
        :key="event.id"
        class="flex gap-4"
      >
        <!-- Timeline dot + line -->
        <div class="flex flex-col items-center shrink-0">
          <div class="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" :class="event.dotColor" />
          <div class="w-px flex-1 bg-slate-800 mt-1" />
        </div>

        <!-- Content -->
        <div class="pb-4 flex-1 min-w-0">
          <p class="text-sm text-slate-200">{{ event.message }}</p>
          <p class="text-xs text-slate-500 mt-0.5">{{ event.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineEvent {
  id: string
  message: string
  time: string
  dotColor: string
}

const defaultEvents: TimelineEvent[] = [
  { id: '1', message: 'Metro Healthcare LLC synced successfully to QuickBooks', time: '2 minutes ago', dotColor: 'bg-emerald-500' },
  { id: '2', message: 'Apex Retail Co. flagged 3 anomalies for review', time: '15 minutes ago', dotColor: 'bg-amber-500' },
  { id: '3', message: 'Sunrise Restaurant Group uploaded 12 new documents', time: '1 hour ago', dotColor: 'bg-blue-500' },
  { id: '4', message: 'SkyLaunch SaaS approval completed — all clear', time: '2 hours ago', dotColor: 'bg-emerald-500' },
  { id: '5', message: 'BuildRight Construction review queue assigned to team', time: '3 hours ago', dotColor: 'bg-slate-400' },
]
</script>
