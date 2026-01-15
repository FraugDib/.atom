## 2024-05-22 - Two-Step Inline Confirmation
**Learning:** For destructive actions in constrained spaces (like toolbars or list items), a two-step inline confirmation (Click -> "Confirm?" -> Click) is less intrusive than a modal and reduces cognitive load by keeping the user's context. Resetting on blur is crucial to prevent "stuck" states.
**Action:** Prefer this pattern for non-critical or easily reversible destructive actions over full modals. Use `onBlur` to reset state. Ensure ARIA labels update to reflect the "Confirm" state.
