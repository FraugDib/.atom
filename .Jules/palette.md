## 2025-05-23 - Two-Step Inline Confirmation
**Learning:** Destructive actions in constrained spaces benefit significantly from a "Click -> Confirm -> Click" pattern instead of modal dialogs. This reduces friction while preventing accidental clicks. The "reset on blur" behavior is critical for this pattern to feel natural; otherwise, the user gets stuck in a "confirming" state.
**Action:** Apply this pattern to all "Danger Zone" items that are single-click actions. Ensure `onBlur` handles the reset to avoid stale states.
