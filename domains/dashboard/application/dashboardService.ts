
import { kpiData } from '../infrastructure/data/mockDashboard'
export const dashboardService = {
  async getDashboard(): Promise<{ kpiData: Array<{ title: string; value: string; trend: string }> }> {
    return { kpiData }
  }
}
