import { d as defineEventHandler, h as handleCors, a as assertMethod, r as readBody, c as createError } from './nitro/node-server.mjs';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import 'node:http';
import 'node:https';
import 'path';
import 'node:fs';
import 'node:url';

async function generatePDF(htmlContent) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
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

async function populateTemplate(data, type) {
  const templateSource = fs.readFileSync(process.cwd() + `/templates/${type}.hbs`, "utf8");
  const template = Handlebars.compile(templateSource);
  return template(data);
}

const resumeBuilder = defineEventHandler(async (event) => {
  try {
    if (event.method === "OPTIONS") {
      handleCors(event, {});
      return null;
    }
    assertMethod(event, ["POST"]);
    const body = await readBody(event);
    const parsedBody = JSON.parse(body);
    const htmlContent = await populateTemplate(parsedBody.data, parsedBody.type);
    const pdfBuffer = await generatePDF(htmlContent);
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"'
      }
    });
  } catch (error) {
    const stackTrace = new Error().stack;
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: error,
      stack: stackTrace
    });
  }
});

export { resumeBuilder as default };
//# sourceMappingURL=resume-builder.mjs.map
