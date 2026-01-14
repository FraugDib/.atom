## 2024-03-21 - Inline Delete Confirmation
**Learning:** For constrained UI spaces (like settings cards), replacing modal dialogs with two-step inline confirmation (Click -> 'Confirm?' -> Click) feels much faster and less intrusive.
**Action:** Use this pattern for destructive actions in dense UIs, but ensuring the 'Confirm?' state resets on blur is critical to prevent accidental deletions later.
