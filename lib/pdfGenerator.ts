import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export async function generatePDF(htmlContent: string): Promise<Buffer> {
  let browser = null;

  try {
    // Launch the browser using the provided Chromium path
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Set the HTML content and wait for network idle
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF from the page content
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    return pdfBuffer;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
