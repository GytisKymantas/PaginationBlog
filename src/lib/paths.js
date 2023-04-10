import fs from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export const postsDirectory = join(process.cwd(), 'content');

export const getFilePaths = (dir) =>
  fs
    .readdirSync(dir)
    .reduce((files, file) => {
      const name = join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getFilePaths(name)] : [...files, name];
    }, [])
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
