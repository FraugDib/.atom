from playwright.sync_api import sync_playwright, expect
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming default port 5173)
        page.goto("http://localhost:5173")

        # 1. Verify Email Placeholder
        email_input = page.get_by_label("Email *")
        expect(email_input).to_have_attribute("placeholder", "user@example.com")
        print("Email placeholder verified.")

        # 2. Verify Delete Flow
        delete_btn = page.get_by_role("button", name="Delete project")

        # Click delete
        delete_btn.click()

        # Verify loading state
        expect(page.get_by_label("Deleting")).to_be_visible()
        print("Loading state verified.")

        # Wait for success state (timeout is 2s in app, wait a bit more)
        time.sleep(2.5)

        # Verify success state
        success_btn = page.get_by_role("button", name="Project deleted")
        expect(success_btn).to_be_visible()
        expect(success_btn).to_be_disabled()

        # Take screenshot
        page.screenshot(path="verification/success_state.png")
        print("Success state verified and screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
