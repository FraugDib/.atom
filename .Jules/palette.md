## 2024-03-24 - Inline Delete Confirmation
**Learning:** For constrained UI spaces (like settings cards), replacing modal dialogs with two-step inline confirmation (Click -> 'Confirm?' -> Click) creates a smoother, less interruptive flow while maintaining safety.
**Action:** Use the `onBlur` event to automatically reset the confirmation state if the user clicks away, preventing the button from getting "stuck" in a dangerous state.
