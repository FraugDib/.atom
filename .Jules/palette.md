## 2024-05-24 - Inline Delete Confirmation
**Learning:** Destructive actions in constrained UI spaces benefit from a two-step inline confirmation (Click -> Confirm -> Action) to prevent accidental data loss without the interruption of a modal.
**Action:** When implementing delete buttons, especially in "danger zones", wrap the action in a state that requires a second click to confirm, changing the button text/icon to indicate the need for confirmation.
