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

  // Keep SSR true for dev server to work properly
  ssr: true,

  css: ["~/style.css", "primeicons/primeicons.css"],

modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxt/eslint"],

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    langDir: "locales/",
    locales: [
      { code: "en", file: "en.json" },
      { code: "fr", file: "fr.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "fluxbooks-i18n",
      fallbackLocale: "en",
    },
  },

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
  components: [{ path: "~/domains/dashboard/components", pathPrefix: false }],

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
   */
  runtimeConfig: {
    public: {
      appThemeDefault: "dark",
    },
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
    prerender: {
      crawlLinks: false,
      routes: [],
    },

    // Workaround: Nitro’s internal rollup-plugin-inject is trying to parse .vue SFCs.
    // Excluding .vue from this pass prevents the inject plugin from touching SFC sources.
    // Nitro exposes rollupConfig; we use it to prevent inject from touching SFC sources.
    // Note: keep this minimal to avoid TS/ESLint issues.
    rollupConfig: {
      external: (id: string) => id.endsWith(".vue"),
    },
  },

});

