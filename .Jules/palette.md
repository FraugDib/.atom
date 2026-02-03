## 2026-02-03 - Inline Confirmation Accessibility
**Learning:** When using the two-step inline confirmation pattern (Click -> Confirm -> Click), simply changing the visible text to "Confirm?" is insufficient for screen readers. The `aria-label` must also dynamically update (e.g., from "Delete project" to "Confirm delete") to provide context for the new state.
**Action:** Always couple visual state changes in interactive elements with corresponding `aria-label` or `aria-describedby` updates.
