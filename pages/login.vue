<script setup lang="ts">
import { useAuthStore } from '@/domains/auth/stores/authStore'
import { isValidEmail, isValidPassword } from '@/domains/auth/services/authService'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()


definePageMeta({
  layout: 'auth',
})

// ── Reactive state ────────────────────────────────────────────────────────────
const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const error = ref<string>('')
const isLoading = ref<boolean>(false)

// ── Dependencies ──────────────────────────────────────────────────────────────
const authStore = useAuthStore()
const router = useRouter()

// ── Computed ──────────────────────────────────────────────────────────────────
const passwordInputType = computed<string>(() =>
  showPassword.value ? 'text' : 'password'
)

const isFormValid = computed<boolean>(
  () => isValidEmail(email.value) && isValidPassword(password.value)
)

// ── Actions ───────────────────────────────────────────────────────────────────
function togglePasswordVisibility(): void {
  showPassword.value = !showPassword.value
}

async function handleLogin(): Promise<void> {
  error.value = ''

  if (!isValidEmail(email.value)) {
    error.value = t('auth.errorInvalidEmail') as string
    return
  }

  if (!isValidPassword(password.value)) {
    error.value = t('auth.errorInvalidPassword') as string
    return
  }

  isLoading.value = true

  // Simulate async auth (replace with real API call in production)
  await new Promise<void>((resolve) => setTimeout(resolve, 600))

  const result = authStore.login(email.value, password.value)

  isLoading.value = false

  if (result.success) {
    router.push('/')
  } else {
    error.value = result.message ?? 'Login failed. Please try again.'
  }
}

function handleGoogleLogin(): void {
  // TODO: Integrate Google OAuth — wire up your OAuth provider here
  error.value = 'Google login integration coming soon.'
}

function handleMicrosoftLogin(): void {
  // TODO: Integrate Microsoft MSAL — wire up your Azure AD tenant here
  error.value = 'Microsoft login integration coming soon.'
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 px-4">
    <div class="w-full max-w-sm">
      <!-- Logo / Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 mb-4">
          <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white">{{ t('auth.title') }}</h1>
        <p class="text-slate-400 text-sm mt-1">{{ t('auth.subtitle') }}</p>
      </div>

      <!-- Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">

        <!-- Social Login Buttons -->
        <div class="space-y-3 mb-6">
          <!-- Google -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors duration-150"
            @click="handleGoogleLogin"
          >
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {{ $t('auth.googleComingSoon') }}
          </button>

          <!-- Microsoft -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors duration-150"
            @click="handleMicrosoftLogin"
          >
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 23 23">
              <path fill="#f25022" d="M0 0h11v11H0z"/>
              <path fill="#00a4ef" d="M12 0h11v11H12z"/>
              <path fill="#7fba00" d="M0 12h11v11H0z"/>
              <path fill="#ffb900" d="M12 12h11v11H12z"/>
            </svg>
            {{ $t('auth.microsoftComingSoon') }}
          </button>
        </div>

        <!-- Divider -->
        <div class="relative flex items-center mb-6">
          <div class="flex-1 border-t border-slate-700" />
          <span class="mx-3 text-xs text-slate-500 uppercase tracking-wider">{{ $t('common.or') }}</span>
          <div class="flex-1 border-t border-slate-700" />
        </div>


        <!-- Email / Password Form -->
        <form class="space-y-4" @submit.prevent="handleLogin">
          <!-- Email field -->
          <div>
            <label class="block text-sm text-slate-300 mb-1.5" for="email">
              {{ $t('auth.emailLabel') }}
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          <!-- Password field with eye icon -->
          <div>
            <label class="block text-sm text-slate-300 mb-1.5" for="password">
              {{ $t('auth.passwordLabel') }}
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="passwordInputType"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-11 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              <!-- Eye toggle button -->
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-colors"
:aria-label="showPassword ? $t('auth.hidePassword') : $t('auth.showPassword')"
                @click="togglePasswordVisibility"
              >
                <!-- Eye open icon -->
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.75"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <!-- Eye closed icon -->
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.75"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <p v-if="error" role="alert" class="text-red-400 text-sm flex items-center gap-1.5">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {{ error }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150 flex items-center justify-center gap-2"
          >
            <svg
              v-if="isLoading"
              class="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ isLoading ? $t('auth.signingIn') : $t('auth.signIn') }}
          </button>
        </form>

        <!-- Demo credentials hint -->
        <div class="mt-5 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p class="text-slate-400 text-xs text-center leading-relaxed">
            <span class="text-slate-300 font-medium">{{ $t('auth.demoCredentialsTitle') }}</span><br />
            {{ $t('auth.demoCredentialsHint') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
