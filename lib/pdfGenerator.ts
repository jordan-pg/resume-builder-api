import puppeteer from "puppeteer";
// import mock from "./mock.json";

export async function generatePDF(htmlContent: string): Promise<Buffer> {
	const browser = await puppeteer.launch({
		defaultViewport: null,
		executablePath:
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		headless: "new",
	});
	const page = await browser.newPage();
	await page.setContent(htmlContent, { waitUntil: "networkidle0" });
	const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });
	await browser.close();
	return pdfBuffer;
}
