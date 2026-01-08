from playwright.sync_api import sync_playwright

def verify_delete_confirmation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (default Vite port)
        page.goto("http://localhost:5173")

        # Wait for the delete button to be visible
        delete_button = page.get_by_role("button", name="Delete project")
        delete_button.wait_for()

        # Take initial screenshot
        page.screenshot(path="verification/1_initial.png")
        print("Initial state screenshot taken")

        # Click the delete button - should trigger confirmation
        delete_button.click()

        # Check for confirmation text
        confirm_button = page.get_by_role("button", name="Confirm delete")
        confirm_button.wait_for()

        # Take confirmation screenshot
        page.screenshot(path="verification/2_confirmation.png")
        print("Confirmation state screenshot taken")

        browser.close()

if __name__ == "__main__":
    verify_delete_confirmation()
