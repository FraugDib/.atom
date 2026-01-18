## 2025-02-18 - Inline Two-Step Confirmation
**Learning:** Modal dialogs for simple destructive actions can be disruptive. A two-step inline confirmation (Click -> 'Confirm?' -> Click) that resets on blur maintains flow while preventing accidents.
**Action:** Use the `isConfirming` state pattern with `onBlur` reset for destructive actions in constrained UI spaces.
