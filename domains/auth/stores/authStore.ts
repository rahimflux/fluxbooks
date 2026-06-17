import { defineStore } from 'pinia'
import type { AuthState, LoginResult, User } from '../interfaces'
import {
  validateCredentials,
  createSessionUser,
} from '../services/authService'
import { SESSION_COOKIE_KEY } from '../data/mockUser'

/**
 * Auth Store — single source of truth for authentication state.
 *
 * Session persistence is handled via Nuxt's useCookie() (SSR-safe).
 * No localStorage is used — cookies survive page refresh automatically.
 *
 * Cross-module access pattern (DDD):
 *   import { useAuthStore } from '@/domains/auth/stores/authStore'
 *   const authStore = useAuthStore()
 *   authStore.user  // → User | null
 */
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    /**
     * Returns the logged-in user's display name, or empty string.
     */
    userName: (state): string => state.user?.name ?? '',

    /**
     * Returns the logged-in user's initials for the avatar, or '?'.
     */
    userInitials: (state): string => state.user?.initials ?? '?',

    /**
     * Returns the logged-in user's role.
     */
    userRole: (state): string => state.user?.role ?? '',
  },

  actions: {
    /**
     * Boot action — called in the auth plugin on app start.
     * Reads the session cookie and hydrates the store if a valid session exists.
     */
    init(): void {
      // useCookie is auto-imported by Nuxt — SSR-safe, no window check needed
      const sessionCookie = useCookie<User | null>(SESSION_COOKIE_KEY)
      if (sessionCookie.value) {
        this.user = sessionCookie.value
        this.isAuthenticated = true
      }
    },

    /**
     * Validates credentials, creates a session user, persists via cookie.
     */
    login(email: string, password: string): LoginResult {
      const result = validateCredentials({ email, password })

      if (result.success) {
        const user = createSessionUser()
        this.user = user
        this.isAuthenticated = true

        // Persist session in cookie (7-day expiry, SSR-safe)
        const sessionCookie = useCookie<User | null>(SESSION_COOKIE_KEY, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          sameSite: 'lax',
        })
        sessionCookie.value = user
      }

      return result
    },

    /**
     * Clears in-memory state and removes the session cookie.
     */
    logout(): void {
      this.user = null
      this.isAuthenticated = false

      const sessionCookie = useCookie<User | null>(SESSION_COOKIE_KEY)
      sessionCookie.value = null
    },
  },
})
