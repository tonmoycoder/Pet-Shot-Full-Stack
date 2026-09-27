---
name: qa-check
description: Verify one implementation task with functional, responsive, accessibility, and visual checks.
---

# QA Check Skill

## Required checks

- lint
- typecheck
- targeted tests
- production build when the task affects build/runtime architecture

## Frontend checks

Verify:
- no horizontal overflow at 360px
- tap targets remain usable
- keyboard focus is visible
- reduced motion works
- primary CTA remains prominent
- loading/error/empty states are not broken
- images/video have stable dimensions

## Output

Return:
- checks run
- pass/fail result
- unresolved issues
- screenshots or visual evidence path if available
