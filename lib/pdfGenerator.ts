import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export async function generatePDF(htmlContent: string): Promise<Buffer> {
    let browser = null;
    try {
        // Launch the browser using chrome-aws-lambda
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        // Generate the PDF
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
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
