<template>
  <section class="bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
    <header class="px-6 py-4 border-b border-slate-800">
      <h3 class="font-semibold text-white text-sm">
        Client Processing Matrix
      </h3>
      <p class="text-slate-400 text-xs mt-0.5">
        Real-time processing status for all clients
      </p>
    </header>

    <div class="p-6">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-700">
              <th
                v-for="col in columns"
                :key="col.field"
                class="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                {{ col.header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client.id"
              class="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
            >
              <td class="py-3 px-3 text-slate-200 font-medium">{{ client.name }}</td>
              <td class="py-3 px-3 text-slate-400">{{ client.industry }}</td>
              <td class="py-3 px-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
                  :class="badgeClass(client.status)"
                >
                  {{ client.status }}
                </span>
              </td>
              <td class="py-3 px-3 text-slate-300">{{ client.documents }}</td>
              <td class="py-3 px-3">
                <span class="font-semibold" :class="client.healthScore >= 90 ? 'text-emerald-400' : 'text-amber-400'">
                  {{ client.healthScore }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MatrixClient {
  id: string
  name: string
  industry: string
  status: 'UNDER_REVIEW' | 'READY' | 'SYNCED'
  documents: number
  healthScore: number
}

interface TableColumn {
  field: keyof MatrixClient
  header: string
}

const columns: TableColumn[] = [
  { field: 'name', header: 'Client' },
  { field: 'industry', header: 'Industry' },
  { field: 'status', header: 'Status' },
  { field: 'documents', header: 'Docs' },
  { field: 'healthScore', header: 'Health' },
]

// Static mock data — replaces deleted clientStore dependency
const clients: MatrixClient[] = [
  { id: 'CL-001', name: 'Sunrise Restaurant Group', industry: 'Restaurant', status: 'READY', documents: 12, healthScore: 94 },
  { id: 'CL-002', name: 'Metro Healthcare LLC', industry: 'Healthcare', status: 'SYNCED', documents: 27, healthScore: 98 },
  { id: 'CL-003', name: 'Apex Retail Co.', industry: 'Retail', status: 'UNDER_REVIEW', documents: 8, healthScore: 82 },
  { id: 'CL-004', name: 'SkyLaunch SaaS', industry: 'SaaS', status: 'SYNCED', documents: 15, healthScore: 97 },
  { id: 'CL-005', name: 'Harmon Legal Partners', industry: 'Legal', status: 'UNDER_REVIEW', documents: 5, healthScore: 86 },
  { id: 'CL-006', name: 'BuildRight Construction', industry: 'Construction', status: 'READY', documents: 31, healthScore: 91 },
]

function badgeClass(status: MatrixClient['status']): string {
  switch (status) {
    case 'SYNCED': return 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
    case 'READY': return 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
    case 'UNDER_REVIEW': return 'bg-amber-600/20 text-amber-400 border border-amber-600/30'
    default: return 'bg-slate-700 text-slate-400'
  }
}
</script>
