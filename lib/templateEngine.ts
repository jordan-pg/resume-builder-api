import { Resume } from '../types/resumeTypes';
import * as fs from 'fs';
import Handlebars from 'handlebars';

export function populateTemplate(data: Resume, type: string): string {
    const templateSource = fs.readFileSync(`templates/${type}.hbs`, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
