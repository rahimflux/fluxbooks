export default defineNuxtPlugin(() => {
  // nuxt/i18n module installs vue-i18n with app.use internally.
  // This plugin intentionally does nothing to avoid early useI18n() calls.
})


