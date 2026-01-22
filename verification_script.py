
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the app
    page.goto("http://localhost:5173")

    # Find the initial delete button
    delete_button = page.get_by_role("button", name="Delete project")
    expect(delete_button).to_be_visible()

    # Click once - should show confirmation
    delete_button.click()

    # The accessible name changes to "Confirm deletion", so we need to find it again
    # This verifies the ARIA label update as well
    confirm_button = page.get_by_role("button", name="Confirm deletion")
    expect(confirm_button).to_be_visible()
    expect(confirm_button).to_have_text("Confirm?")

    # Take screenshot of confirmation state
    page.screenshot(path="/home/jules/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
