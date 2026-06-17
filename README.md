# FluxBooks POC

A proof-of-concept for the FluxBooks AI-powered bookkeeping operating center, built with **Nuxt 3**, **Vue 3**, **Pinia**, and **Tailwind CSS** following **Domain-Driven Design (DDD)** principles.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Demo credentials:** `demo@fluxbooks.com` / `demo1234`

---

## Architecture Overview

### Domain-Driven Design (DDD)

The project is organized around bounded contexts — each domain owns its interfaces, stores, services, and components:

```
domains/
├── auth/                     ← Authentication bounded context
│   ├── interfaces/index.ts   ← User, AuthState, LoginCredentials, LoginResult
│   ├── stores/authStore.ts   ← Pinia store (single source of truth)
│   ├── services/authService.ts ← Credential validation, session user creation
│   └── data/mockUser.ts      ← Mock credentials + cookie key constant
│
└── dashboard/                ← Dashboard bounded context (the only active page)
    ├── interfaces/index.ts   ← KpiCardData, PortfolioEntry, MatrixClient, TimelineEvent
    └── components/           ← KpiCard, PortfolioProgress, ClientProcessingMatrix, ActivityTimeline, QuickActions

shared/
└── composables/
    └── useFluxToast.ts       ← Toast notification composable

pages/
├── login.vue                 ← Login page (layout: auth)
└── index.vue                 ← Dashboard page (layout: default)

layouts/
├── default.vue               ← Authenticated app shell with sidebar + topbar
└── auth.vue                  ← Bare dark background (login page)

middleware/
└── auth.global.ts            ← Route guard — runs before every navigation

plugins/
├── auth.client.ts            ← Hydrates Pinia authStore from cookie on app boot
└── primevue.ts               ← Registers PrimeVue + ToastService
```

---

## How Nuxt JS Acts as the Project Skeleton

Nuxt provides the infrastructure so you write features, not plumbing:

| Concern | Nuxt Feature | How it's used |
|---|---|---|
| **Routing** | `pages/` directory | `login.vue` → `/login`, `index.vue` → `/` — zero config |
| **Layouts** | `layouts/` directory | `layout: 'auth'` in `definePageMeta` → uses `auth.vue`; default → `default.vue` |
| **Route Guards** | `middleware/` directory | `auth.global.ts` runs before every route — redirects unauthenticated users |
| **App Startup** | `plugins/` directory | `auth.client.ts` runs on boot, reads cookie, hydrates store before first render |
| **Auto-Imports** | `nuxt.config imports.dirs` | Pinia stores, composables, services — no `import` needed in `.vue` files |
| **Components** | `nuxt.config components` | Dashboard components registered globally — no import needed |
| **State Management** | `@pinia/nuxt` module | Stores auto-registered, SSR-compatible |
| **Styling** | `@nuxtjs/tailwindcss` module | JIT compilation, scans all domain + shared files |
| **Linting** | `@nuxt/eslint` module | Generates `.nuxt/eslint.config.mjs`, base for `eslint.config.mjs` |
| **Env Config** | `runtimeConfig` | `useRuntimeConfig()` for environment variables — SSR-safe |
| **Cookie API** | `useCookie()` composable | SSR-safe cookie read/write — no `window` check needed |

---

## Pinia Cross-Store Access (Cross-Module Pattern)

Any domain can access the auth store (or any other store) — this is the Pinia cross-module pattern:

```ts
// In any .vue file or composable — authStore is auto-imported via Nuxt's imports.dirs
const authStore = useAuthStore()
console.log(authStore.user)       // User | null
console.log(authStore.userName)   // computed getter
console.log(authStore.isAuthenticated)
```

**default layout** uses this to show the user avatar and trigger logout.
**Middleware** uses this to check `isAuthenticated` before every route.
**Plugin** uses this to call `authStore.init()` on app boot.

---

## Session Management (Cookie-Based, No localStorage)

Session persistence works via Nuxt's built-in `useCookie()` composable:

```
Login flow:
  User submits credentials
    → authService.validateCredentials()
    → authStore.login() → sets Pinia state + writes cookie (7-day expiry)
    → router.push('/')

Page refresh:
  plugins/auth.client.ts runs
    → authStore.init() → reads cookie → hydrates Pinia state
    → middleware sees isAuthenticated = true → allows navigation

Logout flow:
  default layout logout button
    → authStore.logout() → clears Pinia state + sets cookie to null
    → router.push('/login')
```

**Why cookies over localStorage:**
- Work on SSR (server can read them; `localStorage` is client-only)
- Survive page refresh without flicker
- Can be `httpOnly` in production for XSS protection
- Nuxt's `useCookie()` is SSR-safe — no `if (typeof window !== 'undefined')` guards needed

---

## Login Page Features

- **Google login button** — OAuth stub (wire up your Google provider)
- **Microsoft login button** — MSAL stub (wire up Azure AD)
- **Email field** — with HTML5 email validation
- **Password field** — with animated eye icon (show/hide toggle)
- **Client-side validation** — email format + minimum length before submit
- **Loading state** — spinner + disabled button during async auth
- **Error messages** — inline error with warning icon
- **Demo credentials hint** — visible in the card footer

---

## ESLint + Pre-Commit Hook

### Running ESLint manually

```bash
# Check for errors
npm run lint

# Auto-fix where possible
npm run lint:fix
```

### Pre-commit (Husky + lint-staged)

Every `git commit` automatically runs ESLint on staged files. If lint fails, the commit is blocked.

```bash
# The hook is at .husky/pre-commit
# lint-staged config is in package.json → "lint-staged"
```

On first clone, run `npm install` — it runs `husky` via the `prepare` script, which installs the git hook automatically.

---

## TypeScript

All files use `<script setup lang="ts">`. Every function has explicit parameter and return types. All interfaces live in `interfaces/index.ts` per domain. `any` is banned (`@typescript-eslint/no-explicit-any: error`).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Nuxt dev server with HMR |
| `npm run build` | Production build (outputs to `.output/`) |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Static site generation |
| `npm run lint` | Run ESLint on all `.vue` / `.ts` files |
| `npm run lint:fix` | Auto-fix ESLint errors |

---

## Environment Variables

No `.env` file is required for the POC. The `runtimeConfig.public` section in `nuxt.config.ts` is the place to add environment variables. Example for a real OAuth integration:

```ts
// nuxt.config.ts
runtimeConfig: {
  public: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    msalClientId: process.env.MSAL_CLIENT_ID,
  }
}
```

---

## Removed (compared to initial scaffold)

The following were removed per POC scope:

- Pages: `collection.vue`, `review.vue`, `audit.vue`, `notifications.vue`
- Domains: `clients/`, `collection/`, `review/`, `notifications/`
- Plugins: `persistence.client.ts` (localStorage sync)
- Services: `localStorageService.ts`
- Composables: `usePersistence.ts`
- Components: `Turnstile.vue`, `NotificationBell.vue`
- Sidebar menu items: Collection Center, Review Portal, Audit Trail, Notifications

These bounded contexts exist as stubs ready to be re-added — the DDD structure is in place.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (SSR) |
| UI Library | Vue 3 (Composition API + `<script setup>`) |
| State | Pinia (cross-module store access) |
| Styling | Tailwind CSS v3 |
| Component Library | PrimeVue 4 (Aura theme) |
| TypeScript | Strict mode, all files |
| Linting | ESLint 9 + @nuxt/eslint + @typescript-eslint |
| Pre-commit | Husky + lint-staged |
| Session | Nuxt `useCookie()` — SSR-safe, no localStorage |
