<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <h2 class="font-semibold text-white mb-4">Quick Actions</h2>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        class="flex flex-col items-start gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-lg transition-colors duration-150 text-left"
        @click="action.handler"
      >
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="action.iconBg">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="action.iconPath" />
          </svg>
        </div>
        <span class="text-sm font-medium text-slate-200">{{ action.label }}</span>
        <span class="text-xs text-slate-500">{{ action.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface QuickAction {
  label: string
  description: string
  iconBg: string
  iconPath: string
  handler: () => void
}

const actions: QuickAction[] = [
  {
    label: 'Upload Documents',
    description: 'Import new files for processing',
    iconBg: 'bg-blue-600',
    iconPath: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    handler: (): void => { /* stub: wire to Collection module */ },
  },
  {
    label: 'Review Queue',
    description: 'Check pending approvals',
    iconBg: 'bg-amber-600',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    handler: (): void => { /* stub: wire to Review module */ },
  },
  {
    label: 'Audit Trail',
    description: 'View system activity log',
    iconBg: 'bg-violet-600',
    iconPath: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    handler: (): void => { /* stub: wire to Audit module */ },
  },
  {
    label: 'Notifications',
    description: 'View recent alerts',
    iconBg: 'bg-emerald-600',
    iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    handler: (): void => { /* stub: wire to Notifications module */ },
  },
]
</script>
