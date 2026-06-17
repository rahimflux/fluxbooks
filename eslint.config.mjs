// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Vue
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
    'vue/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'error',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
})
