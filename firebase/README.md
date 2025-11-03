# Firebase Backend Stubs

Milestone 2 will introduce validated score submission and leaderboard aggregation. The current files are placeholders to keep project structure aligned with the PRD while front-end scaffolding is underway.

- `functions/src/index.ts`
  - Define callable `submitRun` once scoring payload schema is finalized.
  - Add scheduled aggregation jobs for daily/weekly leaderboards.
  - Configure function-specific linting + tests when logic arrives.
- `firestore.rules`
  - Replace with least-privilege rules once the Firestore data model is implemented.

Deployment scripts and CI hooks will be added alongside the first real backend implementation.
