import { Resume } from '../types/resumeTypes';
import Handlebars from 'handlebars';
import * as path from 'node:path'
import * as fs from 'node:fs'


export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const filePath = path.join(process.cwd(), 'templates', `${type}.hbs`)
    const templateSource = fs.promises.readFile(filePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}
