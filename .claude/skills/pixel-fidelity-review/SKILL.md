---
name: pixel-fidelity-review
description: Use when asked to match, clone, or pixel-check a UI against a live reference URL or reference screenshots. Provides a repeatable capture-diff-fix loop for reproducing an existing interface exactly.
---

# Pixel Fidelity Review

A repeatable loop for cloning an existing web page exactly, rather than
designing something new.

## Step 1 — Capture ground truth
- Screenshot the reference at the target viewport (this task: desktop,
  1280px+ width) for every distinct state: default, hover, focus, each
  modal/overlay open.
- Where possible, capture the reference's rendered HTML/computed CSS
  (DevTools → Copy element / Computed tab) rather than relying on visual
  guesswork for spacing, color, and font values.
- Save everything under /reference with one file per state.

## Step 2 — Build the structural skeleton first
- Match DOM structure and layout (grid/flex, container widths, breakpoints)
  before polishing colors or type. Structure mismatches cause every later
  pixel comparison to drift.

## Step 3 — Diff, don't guess
- For each reference screenshot, render the current build at the same
  viewport and compare side by side.
- Record concrete deltas: "gap is 8px, reference is 12px", "title is
  text-2xl, reference computed font-size is 26px", etc. Avoid vague notes
  like "spacing feels off."

## Step 4 — Motion and interaction parity
- Reproduce hover/focus transitions with matching duration and easing
  (check the reference's computed `transition` value if available).
- Reproduce keyboard behavior exactly: which keys act, what they do, where
  focus goes on open/close.

## Step 5 — Regression pass
- After each fix, re-check the other captured states — a spacing fix in a
  shared component can shift another view.

## Output discipline
- Every fix should cite the specific expected-vs-actual value it corrects.
- Flag anything that could not be verified against captured ground truth
  instead of silently approximating it.
