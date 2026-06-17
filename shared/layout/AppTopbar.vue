<script setup lang="ts">
import { useAuthStore } from "@/domains/auth/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

function handleLogout(): void {
  authStore.logout();
  router.push("/login");
}
</script>

<template>
  <header
    class="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between shrink-0"
  >
    <div>
      <h2 class="font-semibold text-white text-sm">
        FluxBooks Operating Center
      </h2>

      <p class="text-slate-400 text-xs mt-0.5">
        Welcome back, {{ authStore.userName }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white"
      >
        {{ authStore.userInitials }}
      </div>

      <button
        type="button"
        class="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-lg text-sm text-white transition-colors duration-150"
        @click="handleLogout"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        Logout
      </button>
    </div>
  </header>
</template>
