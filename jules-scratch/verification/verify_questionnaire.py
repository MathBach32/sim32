import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.path.abspath('.')

        # 1. Navigate to tarifs.html
        tarifs_url = f'file://{os.path.join(base_path, "tarifs.html")}'
        page.goto(tarifs_url)

        # 2. Click the "Demander un Devis" button
        devis_button = page.get_by_role("link", name="Demander un Devis")
        devis_button.click()

        # 3. Verify navigation to questionnaire.html
        expect(page).to_have_title("Questionnaire Projet Web - SIM32")

        # 4. Interact with conditional fields

        # Q7 - Branding: Check "Non" to reveal help options
        branding_no_radio = page.locator('input[name="has_branding"][value="Non"]')
        branding_no_radio.check()
        branding_help_container = page.locator('#branding_help_container')
        expect(branding_help_container).to_be_visible()

        # Q9 - Domain: Check "Oui" to reveal domain name input
        domain_yes_radio = page.locator('input[name="has_domain"][value="Oui"]')
        domain_yes_radio.check()
        domain_name_container = page.locator('#domain_name_container')
        expect(domain_name_container).to_be_visible()

        # 5. Take a screenshot
        screenshot_path = 'jules-scratch/verification/verification.png'
        page.screenshot(path=screenshot_path)

        browser.close()
        print(f"Screenshot saved to {screenshot_path}")

if __name__ == "__main__":
    run_verification()