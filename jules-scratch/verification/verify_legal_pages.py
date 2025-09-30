from playwright.sync_api import sync_playwright, TimeoutError
import os

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        base_path = os.path.abspath('.')

        # Navigate to index.html
        page.goto(f"file://{base_path}/index.html")

        try:
            # Wait for the footer to be loaded by the script
            footer_selector = "footer.site-footer"
            page.wait_for_selector(footer_selector, timeout=5000) # 5-second timeout

            # Now take the screenshot of the footer
            footer = page.locator(footer_selector)
            footer.screenshot(path="jules-scratch/verification/01_index_footer.png")
            print("Successfully captured footer screenshot.")

        except TimeoutError:
            print("Error: Timed out waiting for the footer to appear. The JavaScript might not be loading the footer correctly.")
            # Take a full page screenshot for debugging
            page.screenshot(path="jules-scratch/verification/01_index_full_page_error.png")

        finally:
            # Take screenshots of the other legal pages
            page.goto(f"file://{base_path}/mentions-legales.html")
            page.screenshot(path="jules-scratch/verification/02_mentions-legales.png")

            page.goto(f"file://{base_path}/confidentialite.html")
            page.screenshot(path="jules-scratch/verification/03_confidentialite.png")

            page.goto(f"file://{base_path}/cgv.html")
            page.screenshot(path="jules-scratch/verification/04_cgv.png")

            page.goto(f"file://{base_path}/cgu.html")
            page.screenshot(path="jules-scratch/verification/05_cgu.png")

            browser.close()

if __name__ == "__main__":
    main()