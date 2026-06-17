
import { defineStore } from 'pinia'
import { dashboardService } from '../application/dashboardService'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({ kpiData: [] as any[] }),
  actions: {
    async load() {
      const data = await dashboardService.getDashboard()
      this.kpiData = data.kpiData
    }
  }
})
