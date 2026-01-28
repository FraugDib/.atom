from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        page.goto("http://localhost:3000")

        # 1. Initial State
        print("Taking initial screenshot")
        page.screenshot(path="verification_1_initial.png")

        # 2. Click once -> Confirmation
        print("Clicking delete button")
        page.get_by_role("button", name="Delete project").click()
        # Wait for confirmation text
        print("Waiting for confirmation")
        page.get_by_text("Confirm?").wait_for()
        page.screenshot(path="verification_2_confirm.png")

        # 3. Click again -> Deleting
        print("Clicking confirm")
        page.get_by_role("button", name="Confirm delete project").click()
        # Wait for loading state (role status)
        print("Waiting for deleting status")
        page.get_by_role("status", name="Deleting").wait_for()
        page.screenshot(path="verification_3_deleting.png")
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification_error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
