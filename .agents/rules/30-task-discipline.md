# Task Discipline

Every task follows this sequence:

1. Read the task prompt.
2. Read only the referenced project files needed for the task.
3. Inspect current implementation before assuming anything is missing.
4. Make the smallest coherent change that satisfies the acceptance criteria.
5. Run formatting/lint/typecheck/tests relevant to the change.
6. Visually inspect frontend work at mobile first and desktop second.
7. Fix regressions caused by the task.
8. Update `.ralph/prd.json` only for the task's pass state.
9. Append a concise entry to `.ralph/progress.md`.
10. If a major architectural decision changed, append it to `docs/DECISIONS.md`.
11. Report changed files, checks, remaining risks, and next task.

Do not:

- perform a broad cleanup while implementing a small task
- rewrite dependencies for style preference
- create duplicate components instead of reusing existing primitives
- claim a feature is real if it still uses fake data
- mark a task done if its acceptance criteria are not verified
