# BOOTSTRAP — Run Once

You are initializing the Pet Shop O2O project in Antigravity.

Read:
- docs/FINAL_ZERO_COST_MASTER_DECISION.md
- docs/PREMIUM_UI_REDESIGN_V3.md if present
- .agents/rules/00-core.md
- .agents/rules/10-zero-cost.md
- .agents/rules/20-premium-ui.md
- .agents/rules/30-task-discipline.md
- .ralph/prd.json
- .ralph/progress.md

Tasks:
1. Inspect the repository and existing package manager.
2. Detect whether an app already exists. Do not recreate an existing app.
3. Map the current repository structure against the target architecture.
4. Identify contradictions or stale code from earlier architecture decisions.
5. Create/update `docs/REPO_BASELINE.md` with:
   - current stack
   - current routes
   - current components
   - current dependencies
   - missing foundation pieces
   - risky/stale pieces
6. Create/update `.env.example` only if environment variables are needed.
7. Do NOT implement the website yet.
8. Do NOT install optional animation or infrastructure libraries yet.
9. Do NOT rewrite existing code just for style.
10. Run the project's existing lint/typecheck/build commands if available.
11. Append a bootstrap entry to `.ralph/progress.md`.

Return:
- repository baseline
- exact blockers
- next task recommendation
- checks run
