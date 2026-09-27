# Build Runbook

## What to do once

1. Open the actual repository root in Antigravity.
2. Copy this package's `.agents/`, `docs/`, `.ralph/`, and `prompts/` folders into the repository root.
3. Make sure these files exist:
   - `.agents/rules/00-core.md`
   - `.agents/rules/10-zero-cost.md`
   - `.agents/rules/20-premium-ui.md`
   - `.agents/rules/30-task-discipline.md`
   - `.agents/skills/ui-polish/SKILL.md`
   - `.agents/skills/qa-check/SKILL.md`
   - `docs/FINAL_ZERO_COST_MASTER_DECISION.md`
   - `docs/PREMIUM_UI_REDESIGN_V3.md`
   - `.ralph/prd.json`
   - `.ralph/progress.md`
4. If the project already has newer versions of these files, reconcile rather than blindly overwrite.
5. Run `prompts/00-bootstrap.md` once.

## Normal daily operation

Choose exactly one task prompt.

Paste only that prompt into Antigravity Agent.

Example:

`prompts/03-design-tokens.md`

Do not paste the whole project history.

## When to stop and ask the user

Only stop when:
- credentials or secrets are required
- a paid service would be required
- the task contradicts the final decision document
- there are multiple materially different architecture choices
- a destructive migration is required

Otherwise make a best-effort implementation and record uncertainty.

## When to use Ralph

Ralph should operate on small tasks with explicit acceptance criteria. A task should normally be small enough for one fresh agent context. The Ralph prompt should tell the agent to inspect the repo, choose the next unpassed task, implement only that task, verify, and update the pass state. This mirrors common Ralph implementations where PRD state and progress are persistent across iterations.
