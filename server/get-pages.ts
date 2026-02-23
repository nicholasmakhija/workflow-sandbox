/* eslint-disable @typescript-eslint/naming-convention */
import { readFileSync } from 'node:fs';
import minifier from 'html-minifier';

import { getTemplateData } from './template-data';

import type { Section, Page } from '../src/components/App';

const getMatched = (
  str: string,
  regex: RegExp
) => {
  const matchedArray = str.match(regex);
  const cleaned = matchedArray || [];

  return cleaned.length ? cleaned[1] : '';
};

const getSectionData = (heading: string): Section => ({
  id: getMatched(heading, /id="(.*?)"/),
  text: getMatched(heading, />(.*?)<\//)
});

export const getPages = (): Record<string, Page> => getTemplateData()
  .map(({ file, path }) => {
    const raw = readFileSync(file, 'utf8');
    const order = +getMatched(raw, /<!--order:([^$]+?)-->/);
    const title = getMatched(raw, /<h1>([^$]+?)<\/h1>/);

    // for all h2 and h3 use /<h[2-3] id="(.*?)">([^$]+?)<\/h[2-3]>/g
    const headings = raw.match(/<h2 id="(.*?)">([^$]+?)<\/h2>/g) || [];
    const sections = headings.map(getSectionData);
    const content = minifier.minify(raw, {
      collapseWhitespace: true,
      removeComments: true
    });

    return {
      order: order,
      page: {
        [path]: {
          content,
          path,
          title,
          sections
        }
      }
    };
  })
  .sort((a, b) => a.order - b.order)
  .reduce((acc, { page }) => ({ ...acc, ...page }), {});
