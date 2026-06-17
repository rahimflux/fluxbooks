import { useAuthStore } from '@/domains/auth/stores/authStore'

/**
 * Global Auth Middleware
 *
 * Nuxt runs this before every route navigation (file-based routing).
 * Guards protected routes by checking Pinia auth state.
 *
 * Flow:
 *   /login  → if already authenticated, redirect to /
 *   any     → if NOT authenticated, redirect to /login
 *
 * Server-side: skipped (auth is client-side cookie-based)
 */
export default defineNuxtRouteMiddleware((to) => {
  // Skip on SSR — cookies are read client-side in the plugin
  if (import.meta.server) return

  const authStore = useAuthStore()

  // If navigating to /login while already authenticated → go to dashboard
  if (to.path === '/login') {
    if (authStore.isAuthenticated) {
      return navigateTo('/')
    }
    return
  }

  // All other routes require authentication
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
