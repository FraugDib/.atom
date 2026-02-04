## 2025-02-18 - Inline Confirmation Pattern
**Learning:** Destructive actions in constrained spaces feel safer with a two-step inline confirmation (Click -> Confirm -> Action) that resets on blur, rather than a heavy modal or accidental immediate trigger.
**Action:** Apply `onBlur` reset pattern to all inline confirmation buttons to prevent "stuck" confirmation states.
