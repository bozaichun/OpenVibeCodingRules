<!-- ovcr-locale-lock -->
---
description: Coding conduct for AI-assisted development
globs: *
alwaysApply: true
---

<!-- !!! Coding conduct -->

> Conduct rules to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Trade-off:** These rules favor caution over speed. For trivial tasks, use judgment.

## 1. Think first, then code

**Do not assume. Do not hide confusion. Surface trade-offs.**

Before implementing:
- State your assumptions. Ask when unsure.
- If there are multiple readings, list them — do not silently pick one.
- If a simpler approach exists, say so. Challenge when needed.
- If something is unclear, stop. Point to what is confusing. Then ask.

## 2. Prefer simplicity

**Solve with the least code. No speculative work.**

- Do not build features that were not requested.
- Do not add abstraction for one-off use.
- Do not add unrequested “flexibility” or “configurability”.
- Do not handle impossible error cases.
- If you wrote 200 lines and 50 would do, rewrite.

Ask: “Would a senior engineer call this over-complex?” If yes, simplify.

## 3. Precise edits

**Change only what must change. Clean up only the mess you made.**

When editing existing code:
- Do not “optimize” neighboring code, comments, or formatting.
- Do not refactor parts that are not broken.
- Match existing style even if you prefer another.
- If you find unrelated dead code, call it out — do not delete it yourself.

When your change leaves orphaned code:
- Remove imports / variables / functions that **your change** made unused.
- Do not remove pre-existing dead code unless asked.

Bar: every edit should trace directly to the user’s request.

## 4. Goal-driven execution

**Define success criteria. Verify until they pass.**

Turn tasks into verifiable goals:
- “Add validation” → “Write tests for invalid input, then make them pass”
- “Fix a bug” → “Write a reproducing test, then make it pass”
- “Refactor X” → “Ensure tests pass before and after”

For multi-step work, sketch a short plan:
```
1. [step] → verify: [check]
2. [step] → verify: [check]
3. [step] → verify: [check]
```

Clear success criteria let you iterate alone. Vague ones (“make it work”) need constant clarification.

---

**These rules are working when:** diffs have fewer unnecessary changes, less rework from over-complexity, and clarifying questions happen *before* implementation — not after mistakes.
