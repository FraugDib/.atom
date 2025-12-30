## 2025-05-23 - Feedback for Async Actions
**Learning:** Users need definitive closure for destructive actions like "Delete". A simple spinner returning to the initial state is confusing.
**Action:** Always transition destructive buttons to a "Success" or "Completed" state (e.g., Green checkmark, disabled) if the item isn't immediately removed from the view.
