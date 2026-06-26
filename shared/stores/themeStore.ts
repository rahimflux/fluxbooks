import { defineStore } from "pinia";

export type ThemePalette = "dark" | "light" | "ocean";

interface ThemeState {
  palette: ThemePalette;
}

function getInitialPalette(): ThemePalette {
  if (import.meta.client) {
    const saved = localStorage.getItem("fluxbooks-theme") as ThemePalette | null
    if (saved === "dark" || saved === "light" || saved === "ocean") return saved
  }
  return "dark"
}

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    palette: getInitialPalette(),
  }),
  actions: {
    initializeTheme(): void {
      const palette = this.palette
      if (import.meta.client) {
        localStorage.setItem("fluxbooks-theme", palette)
      }


      // Apply palette as attribute for global styling hooks
      document.documentElement.setAttribute("data-theme", palette)

      // Maintain Tailwind 'dark' behavior for convenience
      document.documentElement.classList.toggle("dark", palette !== "light")
    },

    setTheme(palette: ThemePalette): void {
      this.palette = palette
      if (import.meta.client) localStorage.setItem("fluxbooks-theme", palette)

      this.initializeTheme()
    },
  },
});

