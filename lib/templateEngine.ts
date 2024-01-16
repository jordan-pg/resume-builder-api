import { Resume } from '../types/resumeTypes';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

export function populateTemplate(data: Resume, type: string): string {
    const templateDirectory = path.join(process.cwd(), 'public', `${type}.hbs`);
    const templateSource = fs.readFileSync(templateDirectory, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
