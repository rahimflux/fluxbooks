<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useThemeStore, type ThemePalette } from '@/shared/stores/themeStore'

const { locale, locales, setLocale } = useI18n()
const themeStore = useThemeStore()

const themeOptions: ThemePalette[] = ['dark', 'light', 'ocean']

const selectedLocale = computed(() => locale.value)

function handleLocaleChange(next: string): void {
  // Narrow to supported locales configured in nuxt.config.ts
  if (next === 'en' || next === 'fr') setLocale(next)
}


function handleThemeChange(next: ThemePalette): void {
  themeStore.setTheme(next)
}
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Language -->
    <div class="flex items-center gap-2">
      <label class="text-xs text-slate-300">Lang</label>
      <select
        class="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-2.5 py-2 text-sm"
        :value="selectedLocale"
        @change="handleLocaleChange(($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="l in locales"
          :key="l.code"
          :value="l.code"
        >
          {{ l.code.toUpperCase() }}
        </option>
      </select>
    </div>

    <!-- Theme -->
    <div class="flex items-center gap-2">
      <label class="text-xs text-slate-300">Theme</label>
      <select
        class="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-2.5 py-2 text-sm"
        :value="themeStore.palette"
        @change="handleThemeChange(($event.target as HTMLSelectElement).value as ThemePalette)"
      >
        <option
          v-for="t in themeOptions"
          :key="t"
          :value="t"
        >
          {{ t.charAt(0).toUpperCase() + t.slice(1) }}
        </option>
      </select>
    </div>
  </div>
</template>

