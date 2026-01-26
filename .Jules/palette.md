# Palette's Journal

## 2025-02-17 - Inline Delete Confirmation
**Learning:** The two-step inline confirmation (Click -> Confirm -> Click) with `onBlur` reset is highly effective for avoiding modal fatigue in this app's simple UI.
**Action:** Prefer this pattern over `window.confirm` or modal dialogs for single-item deletion.
