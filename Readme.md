# Intuition App

Expo React Native app delivering intuition training mini-games backed by Firebase, Superwall, and analytics scaffolding.

## Repository Layout
- `app/` – Expo project (TypeScript) containing source, config, and assets.
- `implementation.md` – milestone-level implementation plan.
- `PRD.md`, `User Stories.md` – product specification references.

## Prerequisites
- **Node.js 20.19+** (Expo SDK 54 + React Native 0.81 require Node 20; use `nvm install 20 && nvm use 20`).
- npm 10+ (bundled with Node 20) or pnpm/yarn if preferred.
- Git, Watchman (macOS) and Xcode command line tools for iOS simulator builds.

## Initial Setup
```bash
# Install dependencies
cd app
npm install

# Optional: enable git hooks (run once per clone)
git config core.hooksPath .husky
```

Create a `.env` inside `app/` using `.env.example` as a template. Populate Firebase web config values and the Superwall API key provided by product.

## Useful Scripts (run from `app/`)
- `npm start` – launch Expo bundler.
- `npm run ios` / `npm run android` / `npm run web` – platform-specific entry.
- `npm run lint` – ESLint over `src/`.
- `npm run typecheck` – TypeScript no-emit check.
- `npm run format` – Prettier formatting.
- `npm run lint-staged` – invoked by pre-commit hook.

## Branch Workflow
1. Create a task branch (e.g., `git checkout -b task-project-setup`).
2. Make focused commits; keep Jira IDs in commit messages (ask product owner for wording).
3. Run lint + typecheck before committing.
4. Push branch and open PR when ready.

## Environment Keys
| Key | Purpose |
| --- | --- |
| `FIREBASE_API_KEY` et al. | Firebase Web SDK configuration. |
| `SUPERWALL_API_KEY` | Superwall public API key for paywall campaigns. |
| `APP_ENV` | `development` \| `staging` \| `production` (controls runtime toggles later). |

## Notes
- Current Firebase & Superwall integrations are stubbed; real keys enable runtime initialization.
- Husky runs `lint-staged` from `.husky/pre-commit`. Ensure hooks path is configured locally after cloning.
- Upgrade path: when Expo SDK updates require new Node versions, update `.nvmrc` (to be added later) and CI runners accordingly.
