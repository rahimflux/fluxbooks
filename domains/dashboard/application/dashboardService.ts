
import { kpiData } from '../infrastructure/data/mockDashboard'
export const dashboardService = {
  async getDashboard() {
    return { kpiData }
  }
}
