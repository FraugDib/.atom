## 2024-05-23 - Two-Step Inline Confirmation
**Learning:** For destructive actions in constrained spaces, a two-step inline confirmation (Click -> Confirm -> Click) provides a safer user experience without the cognitive load of a modal dialog.
**Action:** Use the `isConfirming` state pattern for other single-click destructive buttons (like remove item, unsubscribe) to prevent accidental data loss.
