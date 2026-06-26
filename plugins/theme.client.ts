import { useThemeStore } from "@/shared/stores/themeStore";

export default defineNuxtPlugin(() => {
  const store = useThemeStore();
  store.initializeTheme();
});

