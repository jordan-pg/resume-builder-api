import { Resume } from '../types/resumeTypes';
import Handlebars from 'handlebars';

export async function populateTemplate(data: Resume, type: string): Promise<string> {
    const templatePath = await useStorage().getItem(`templates/${type}.hbs`)
    const template = Handlebars.compile(templatePath);
    return template(data);
}
