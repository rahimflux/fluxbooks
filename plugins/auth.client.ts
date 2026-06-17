import { useAuthStore } from '@/domains/auth/stores/authStore'

/**
 * Auth Boot Plugin
 *
 * Runs on client-side app start. Reads the session cookie and hydrates
 * the Pinia auth store so the user stays logged in across page refreshes.
 *
 * Nuxt Plugin Skeleton role:
 *   - Plugins in /plugins run BEFORE the first page renders
 *   - .client.ts suffix = browser-only (not SSR)
 *   - defineNuxtPlugin ensures Pinia is already initialized when this runs
 */
export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.init()
})
