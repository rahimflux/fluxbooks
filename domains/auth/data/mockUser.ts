import type { User } from '../interfaces'

export const MOCK_USER = {
  email: 'demo@fluxbooks.com',
  password: 'demo1234',
  name: 'Demo User',
  initials: 'DU',
  role: 'Admin',
} as const

export const SESSION_COOKIE_KEY = 'fluxbooks_session' as const

export function getMockPublicUser(): User {
  return {
    email: MOCK_USER.email,
    name: MOCK_USER.name,
    initials: MOCK_USER.initials,
    role: MOCK_USER.role,
  }
}
