<script setup lang="ts">
import { useAuthStore } from "@/domains/auth/stores/authStore";

interface MenuItem {
  label: string;
  path: string;
}

const authStore = useAuthStore();
const route = useRoute();

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
  },
];
</script>

<template>
  <aside class="w-64 flex flex-col" style="background: var(--flux-surface); border-right: 1px solid var(--flux-border)">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
      <div class="flex items-center gap-2.5">
        <div
          class="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        <h1 class="font-bold text-lg text-white">FluxBooks</h1>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <p
        class="text-xs font-semibold uppercase tracking-widest text-slate-500 px-3 mb-3"
      >
        Main Menu
      </p>

      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 mb-1"
        :class="
          route.path === item.path
            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
        "
      >
        <svg
          class="shrink-0 w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        {{ item.label }}
      </RouterLink>
    </nav>

    <!-- User -->
    <div class="p-4 border-t border-slate-800">
      <div class="flex items-center gap-3 px-2 py-2">
        <div
          class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0"
        >
          {{ authStore.userInitials }}
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">
            {{ authStore.userName }}
          </p>

          <p class="text-xs text-slate-400 truncate">
            {{ authStore.userRole }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
