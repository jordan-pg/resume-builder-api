import chromium from 'chrome-aws-lambda';

export async function generatePDF(htmlContent: string): Promise<Buffer> {
    let browser = null;
    try {
        // Launch the browser using chrome-aws-lambda
        browser = await chromium.puppeteer.launch({
            args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
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
