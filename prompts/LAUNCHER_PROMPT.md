# Antigravity Launcher Prompt

Read the workspace rules and the current requested task file. Do not ask me to paste the full project context.

Execution protocol:
1. Read `.agents/rules/00-core.md`, `.agents/rules/10-zero-cost.md`, `.agents/rules/20-premium-ui.md`, `.agents/rules/30-task-discipline.md`.
2. Read the exact task file I mention.
3. Read only the relevant project files needed to implement it.
4. Inspect before editing.
5. Implement one task only.
6. Run relevant verification.
7. Update `.ralph/progress.md`.
8. Do not mark `.ralph/prd.json` as passed unless acceptance criteria are verified.
9. Report changed files, checks, issues, and next task.

I will invoke you like:
`Implement prompts/03-design-tokens.md`
