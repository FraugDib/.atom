## 2024-05-23 - Two-step Destructive Actions
**Learning:** Users often click "Danger" buttons accidentally. Implementing a two-step confirmation (Click -> "Confirm?" -> Click) inline prevents accidents without the friction of a full modal dialog.
**Action:** Use the `confirmDelete` state pattern for destructive actions in constrained UI spaces.
