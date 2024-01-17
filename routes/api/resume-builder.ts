import { populateTemplate } from "../../lib/templateEngine";

export default defineEventHandler(async (event) => {
  try {
	if (event.method === "OPTIONS") {
	  // set your options here
	  handleCors(event, {});
	  return null;
	}

	assertMethod(event, ["POST"]);
	const body = await readBody(event);
	const parsedBody = JSON.parse(body);
	const htmlContent = await populateTemplate(parsedBody.data, parsedBody.type);

	return new Response(htmlContent, {
	  headers: {
		"Content-Type": "application/html",
		"Content-Disposition": 'attachment; filename="resume.pdf"',
	  },
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
