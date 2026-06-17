
import { isValidEmail, isValidPassword } from '../../services/authService'
import { useAuthStore } from '../../stores/authStore'

export function useLoginForm(): { email: Ref<string>; password: Ref<string>; error: Ref<string>; loading: Ref<boolean>; submit: () => Promise<boolean> } {
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  const authStore = useAuthStore()

  async function submit(): Promise<boolean> {
    error.value = ''
    if (!isValidEmail(email.value)) {
      error.value = 'Please enter a valid email address'
      return false
    }
    if (!isValidPassword(password.value)) {
      error.value = 'Password must be at least 6 characters'
      return false
    }
    loading.value = true
    const result = authStore.login(email.value, password.value)
    loading.value = false
    return result.success
  }

  return { email, password, error, loading, submit }
}
