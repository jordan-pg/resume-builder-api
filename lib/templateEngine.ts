import { Resume } from '../types/resumeTypes';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const templateSource = await fs.readFile(process.cwd() + `/public/templates/${type}.hbs`, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
