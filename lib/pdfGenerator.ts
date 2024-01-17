import { chromium } from 'playwright';

export async function generatePDF(htmlContent: string): Promise<Buffer> {
    let browser = null;
    try {
        // Launch the browser using Playwright
        browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Set the HTML content and generate the PDF
        await page.setContent(htmlContent, { waitUntil: 'networkidle' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        return pdfBuffer;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        // Close the browser safely
        if (browser !== null) {
            await browser.close();
        }
    }
}
