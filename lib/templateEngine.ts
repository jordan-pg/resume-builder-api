import { Resume } from '../types/resumeTypes';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path'

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const pathResolve = await path.resolve(process.cwd(), `/public/${type}.hbs`)
    const templateSource = await fs.readFileSync(pathResolve, 'utf8');
    const template = await Handlebars.compile(templateSource);
    return template(data);
}
