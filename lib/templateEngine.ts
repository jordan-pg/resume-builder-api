import { Resume } from '../types/resumeTypes';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
import * as path from 'path';

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const newPath = path.resolve(`resume-builder-api/templates/${type}.hbs`);

    const templateSource = await fs.readFile(newPath, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
