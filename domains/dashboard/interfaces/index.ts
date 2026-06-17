export interface KpiCardData {
  title: string
  value: string | number
  trend?: string
}

export interface PortfolioEntry {
  id: string
  name: string
  industry: string
  progress: number
  status: 'READY' | 'SYNCED' | 'UNDER_REVIEW'
}

export interface TimelineEvent {
  id: string
  message: string
  time: string
  dotColor: string
}

export interface MatrixClient {
  id: string
  name: string
  industry: string
  status: 'UNDER_REVIEW' | 'READY' | 'SYNCED'
  documents: number
  healthScore: number
}
