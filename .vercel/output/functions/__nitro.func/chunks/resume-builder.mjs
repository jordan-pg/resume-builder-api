import { u as useStorage, d as defineEventHandler, h as handleCors, a as assertMethod, r as readBody, c as createError } from './nitro/vercel.mjs';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';

async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });
  await browser.close();
  return pdfBuffer;
}

async function populateTemplate(data, type) {
  const templatePath = await useStorage().getItem(`templates/${type}.hbs`);
  const template = Handlebars.compile(templatePath);
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
