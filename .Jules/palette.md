## 2026-01-28 - Inline Confirmation for Destructive Actions
**Learning:** For destructive actions in constrained spaces (like toolbars or list items), modal dialogs can be intrusive. A two-step inline confirmation (Click -> "Confirm?" -> Click) provides safety without breaking flow.
**Action:** Use the `isConfirming` state pattern for icon-only delete buttons, ensuring `onBlur` resets the state to prevent stale confirmations.
