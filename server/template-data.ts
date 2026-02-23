import { sync } from 'glob';
import { dirname } from 'node:path';

export const getTemplateData = (
  templatesPath = 'src/pages',
  base = '/'
) => sync(`${templatesPath}/**/index.html`).map((file) => {
  const page = file.replace(templatesPath, '');
  const dir = dirname(page);
  const path = dir === base ? dir : `${dir}/`;

  return {
    file,
    page,
    path
  };
});

export const templateData = getTemplateData();
