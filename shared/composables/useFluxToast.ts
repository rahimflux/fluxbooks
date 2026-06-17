import { useToast } from 'primevue/usetoast'

export interface FluxToast {
  success: (summary: string, detail?: string) => void
  info: (summary: string, detail?: string) => void
  warn: (summary: string, detail?: string) => void
  error: (summary: string, detail?: string) => void
}

export function useFluxToast(): FluxToast {
  const toast = useToast()

  function success(summary: string, detail?: string): void {
    toast.add({ severity: 'success', summary, detail, life: 4000 })
  }

  function info(summary: string, detail?: string): void {
    toast.add({ severity: 'info', summary, detail, life: 4000 })
  }

  function warn(summary: string, detail?: string): void {
    toast.add({ severity: 'warn', summary, detail, life: 4000 })
  }

  function error(summary: string, detail?: string): void {
    toast.add({ severity: 'error', summary, detail, life: 4000 })
  }

  return { success, info, warn, error }
}
