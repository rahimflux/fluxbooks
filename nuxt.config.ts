/**
 * nuxt.config.ts — FluxBooks POC
 *
 * Nuxt acts as the project skeleton:
 *  - File-based routing via pages/         → automatic route generation
 *  - Auto-imports via imports.dirs          → no manual import statements in .vue files
 *  - Global middleware via middleware/      → runs before every route
 *  - Plugins via plugins/                  → boot sequence (auth hydration)
 *  - Layouts via layouts/                  → auth vs default (sidebar+topbar)
 *  - runtimeConfig                         → environment variable management (SSR-safe)
 *  - @pinia/nuxt module                    → Pinia store auto-registration
 *  - @nuxtjs/tailwindcss module            → Tailwind JIT, no manual postcss setup needed
 */
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },

  // SSR disabled due to .vue file resolution issue in production build
  ssr: false,

  css: ["~/style.css", "primeicons/primeicons.css"],

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/eslint"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /**
   * Component auto-registration
   * Nuxt scans these directories and registers components globally —
   * no import needed in .vue files.
   */
  components: [
    { path: "~/domains/dashboard/components", pathPrefix: false },
    { path: "~/shared/layout", pathPrefix: false },
  ],

  /**
   * Auto-imports for composables, services, and Pinia stores.
   * Any file exported from these dirs is auto-imported everywhere.
   */
  imports: {
    dirs: [
      "shared/composables",
      "domains/*/stores",
      "domains/*/application",
      "domains/*/composables",
    ],
  },

  /**
   * runtimeConfig — environment-specific configuration.
   * public.*  → exposed to client + server
   * (no public key here since we removed Turnstile)
   */
  runtimeConfig: {
    public: {},
  },

  app: {
    head: {
      title: "FluxBooks — Operating Center",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "FluxBooks AI-powered bookkeeping operating center",
        },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ["primevue/usetoast"],
    },
  },

  nitro: {
    rollupConfig: {
      plugins: [
        {
          name: 'vue-resolver',
          resolveId(id) {
            if (id.endsWith('.vue')) {
              return { id, external: true };
            }
          },
        },
      ],
    },
  },
});
