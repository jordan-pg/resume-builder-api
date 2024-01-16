import { Resume } from '../types/resumeTypes';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const templatePath = path.join(__dirname, 'templates', `${type}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
