import { d as defineEventHandler, h as handleCors, a as assertMethod, r as readBody, c as createError } from './nitro/node-server.mjs';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import * as path from 'node:path';
import * as fs from 'node:fs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:url';

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
  const filePath = path.join(process.cwd(), "templates", `${type}.hbs`);
  const templateSource = fs.promises.readFile(filePath, "utf8");
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
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: error
    });
  }
});

export { resumeBuilder as default };
//# sourceMappingURL=resume-builder.mjs.map
