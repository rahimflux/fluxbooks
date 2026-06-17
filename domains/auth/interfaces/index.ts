export interface User {
  email: string
  name: string
  initials: string
  role: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResult {
  success: boolean
  message?: string
}

export interface SessionCookie {
  user: User
  expiresAt: string
}
