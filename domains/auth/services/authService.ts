import type { LoginCredentials, LoginResult, User } from '../interfaces'
import { MOCK_USER, getMockPublicUser } from '../data/mockUser'

/**
 * Validates login credentials against the mock user store.
 * In production, replace this with a real API call.
 */
export function validateCredentials(credentials: LoginCredentials): LoginResult {
  if (
    credentials.email === MOCK_USER.email &&
    credentials.password === MOCK_USER.password
  ) {
    return { success: true }
  }
  return { success: false, message: 'Invalid email or password' }
}

/**
 * Creates a public user object (no sensitive fields).
 */
export function createSessionUser(): User {
  return getMockPublicUser()
}

/**
 * Validates that an email address is well-formed.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validates that a password meets minimum requirements.
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6
}
