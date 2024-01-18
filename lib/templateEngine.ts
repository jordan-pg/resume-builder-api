import { Resume } from '../types/resumeTypes';
const fs = require("fs");
const Handlebars = require("handlebars");

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const templateSource = fs.readFileSync(process.cwd() +`/templates/${type}.hbs`, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
