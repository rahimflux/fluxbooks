<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
    <div class="flex items-start justify-between">
      <div class="space-y-1">
        <p class="text-sm text-slate-400">{{ title }}</p>
        <p class="text-3xl font-bold text-white">{{ value }}</p>
      </div>
      <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-600/20 border border-emerald-600/30">
        <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    </div>
    <p class="text-xs text-emerald-400 mt-3 font-medium">↑ {{ trend }} this month</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  trend?: string
}

withDefaults(defineProps<Props>(), {
  trend: '+2.4%',
})
</script>
