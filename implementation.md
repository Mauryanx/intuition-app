# Implementation Plan – Milestones 1 & 2

## Scope & Principles
- Focus on Expo + React Native foundations, onboarding experience, and four intuition mini-games.
- Integrate Firebase and Superwall SDKs with environment-safe configuration; backend logic stays stubbed.
- Ensure all UX flows are testable with mock data and analytics hooks, enabling later backend hardening.

---

## Milestone 1 – Foundations (Weeks 1–2)

### 1. Project Setup & Tooling
- Initialize Expo (TypeScript) project with EAS profiles, bundle identifiers, and `.env` support.
- Install core libraries: React Navigation, Zustand/Recoil (state), React Query/Firebase SDK, UI kit (Tam/spruce), Expo config plugins.
- Configure linting/formatting (ESLint, Prettier, TypeScript strict) and commit hooks via Husky.
- Set up Firebase config via `app.config.ts` plugin, import `GoogleService-Info.plist`, and create `.env.example`.
- Add Superwall dependency, configure API key placeholders, and register global paywall handler.
- Create placeholder Firebase Cloud Function and Firestore rules files inside `/firebase/` with comments describing future logic.
- Establish basic CI (GitHub Actions) for lint + TypeScript check + Expo preview build.

### 2. Shared Systems & UI Foundations
- Define theming tokens (colors, spacing, typography), haptics helper, and responsive layout utilities.
- Build reusable primitives: `Screen`, `Card`, `Button`, `ProgressDots`, `SafeArea` wrapper with accessibility defaults.
- Implement global app shell with navigation stack (`Auth`, `Onboarding`, `Main`, `Paywall`).
- Set up localization scaffolding (string files + `t()` helper) and analytics event helper (no backend dispatch yet).

### 3. Onboarding Funnel Scaffold
- Design navigation flow: Welcome → Science primer → Reflection prompts → 6-question quiz → Persona plan → Paywall trigger.
- Implement screen templates with dummy content, progress indicator, and form validation.
- Create persona calculation stub that maps quiz answers to personas and stores result in local state.
- Hook Firebase Auth UI (Apple, Email/Password) with mocked responses until backend ready; ensure error states + loading.
- Wire Superwall `end_of_funnel` trigger to show placeholder paywall.

### 4. Game Framework & Prototype Game
- Architect game engine interface: `GameConfig`, `RoundState`, hooks for timers, scoring, difficulty buckets.
- Build shared HUD components (timer, score ticker, streak, feedback toasts) and end-of-round summary modal.
- Implement Game 1 prototype (Pattern Completion) with deterministic mock data, tutorial screen, and one difficulty level.
- Capture game session events locally and prepare payload schema for future submission (stored locally for now).
- Write unit tests for game loop utilities (timer, result calculation) and onboarding form validation.

### 5. Deliverables & Exit Criteria
- Expo app runs on iOS simulator with onboarding flow and one playable game.
- Firebase + Superwall initialized with placeholder credentials and no runtime errors.
- CI pipeline green; lint/tests pass; documentation updated (`README`, onboarding copy guide).
- `implementation.md` kept current with updates made during Milestone deliverables.

---

## Milestone 2 – Games & Data (Weeks 3–4)

### 1. Expand Game Catalog
- Implement remaining games: Signal-vs-Noise, Word Association, Anomaly Spotter using shared engine patterns.
- Create per-game tutorial screens with reusable template and accessible narration text.
- Set up content configuration files for each game (mock datasets, difficulty tiers, target response windows).
- Add quick-rotate “Daily Set” selector that sequences three games per session.

### 2. Staircase Difficulty System
- Finalize difficulty buckets (1–10), target accuracy thresholds, and response time goals.
- Implement staircase logic helper (increase/decrease based on performance) and persist last bucket per game locally.
- Visualize difficulty progression in end-of-round summary and session recap.
- Add tests covering threshold transitions, clamping, and persistence.

### 3. Scoring & Intuition Index
- Define scoring formulas per game: accuracy weighting, streak multipliers, time decay.
- Build shared scorer service returning raw score, normalized score (0–1000), and difficulty adjustments.
- Calculate Intuition Index (composite of z-scored game results) and surface in session recap + profile header.
- Store session history locally with mock data; prepare interfaces for Firestore writes without executing them.
- Unit-test scoring utilities against representative scenarios to prevent regressions.

### 4. Data Plumbing & Backend Stubs
- Expand Firebase integration to initialize Firestore, Auth listener, and Remote Config (mocked fetch).
- Create Cloud Function placeholder `submitRun` with comments outlining validation steps (no logic implemented).
- Draft Firestore rules scaffold covering `users`, `gameRuns`, and `leaderboards` with TODOs for constraints.
- Add TypeScript interfaces mirroring planned Firestore documents (`UserProfile`, `GameRun`, `LeaderboardEntry`).
- Implement optimistic leaderboard UI using mock provider until backend aggregation is ready.

### 5. QA, Telemetry & Documentation
- Instrument analytics event calls (no backend) for onboarding milestones, game start/end, persona assignment.
- Introduce debug dashboard for internal testers: recent sessions, Intuition Index history, difficulty buckets.
- Update testing checklist (unit + manual scenarios) and document mock data strategies for user research demos.
- Capture open questions/risks for backend (e.g., anti-cheat strategy, Cloud Scheduler for leaderboards) in `README`.

### 6. Deliverables & Exit Criteria
- All four games operate with staircase difficulty, scoring, and Intuition Index calculations locally.
- Firebase, Superwall, and analytics scaffolding work without network dependence (mocked or stubbed).
- Placeholder Cloud Function and Firestore rules exist with clearly marked TODOs; no deployable backend code yet.
- Documentation details assumptions, mock data limits, and transition plan for Milestone 3 backend work.

---

## Execution Roadmap & Branch Strategy

| Order | Branch Name | Objective | Key Outputs |
| --- | --- | --- | --- |
| 1 | `task-project-setup` | Initialize Expo (TS) app, configure linting/testing, wire Firebase & Superwall placeholders, seed CI scripts. | Expo project skeleton, base navigation, config files, mocked SDK setup. |
| 2 | `task-design-system-shell` | Implement theming, UI primitives, navigation shell, localization/analytics scaffolds. | Theme tokens, shared components, root navigator, utility hooks. |
| 3 | `task-onboarding-funnel` | Build complete onboarding flow with quiz logic, persona stubs, and paywall trigger integration. | Screens, form handling, persona service, Superwall trigger wiring. |
| 4 | `task-game-engine-foundations` | Create reusable game loop infrastructure, HUD components, timers, and event tracking. | Engine interfaces, shared HUD, tutorial/result templates, test coverage. |
| 5 | `task-game-content` | Implement four games using engine, author mock data sets, and tutorials. | Pattern Completion, Signal-vs-Noise, Word Association, Anomaly Spotter modules. |
| 6 | `task-difficulty-scoring` | Add staircase difficulty logic and scoring models culminating in Intuition Index calculations. | Difficulty service, scoring utilities, persistence helpers, UI surfacing. |
| 7 | `task-data-scaffolding` | Flesh out Firebase integration stubs, Firestore models, Cloud Function placeholder, leaderboard mock. | TypeScript models, Firestore rules skeleton, function stub, mock services. |
| 8 | `task-qa-polish` | Instrument analytics hooks, add debug dashboards, write docs and test checklists. | Debug screen, analytics helper usage, documentation updates, test reports. |

> Before each branch’s commit, pause for Jira-aligned message from product owner.
