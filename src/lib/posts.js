import { getFilePaths, markdownToHtml, postsDirectory } from '@/lib/paths';
import { dateSortDesc } from '@/lib/utils/date';
import fs from 'fs';
import matter from 'gray-matter';
import { cache } from './cache';

function getPostByFilePath(filePath, includeContent = false) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const { date, slug } = data;
  return {
    ...data,
    filePath,
    content: includeContent ? content : undefined,
    date: new Date(date).toISOString(),
    slug: slug.split('/').filter(Boolean).join('/'),
  };
}

export function getAllPosts() {
  return getFilePaths(postsDirectory)
    .map((filePath) => getPostByFilePath(filePath, false))
    .sort((a, b) => dateSortDesc(a.date, b.date))
    .slice(0, 100);
}

export async function getAllSlugs() {
  const slugs = {};
  getAllPosts().forEach(({ slug, filePath }) => {
    slugs[slug] = filePath;
  });
  await cache.set('slugs', slugs);
  return Object.keys(slugs).map((slug) => slug.split('/').filter(Boolean));
}

export async function getPostDataBySlug(slug) {
  const slugs = await cache.get('slugs');
  const filePath = slugs[slug];
  if (!filePath) {
    throw new Error('File not found');
  }
  const { content, ...postProps } = getPostByFilePath(filePath, true);
  const contentHtml = await markdownToHtml(content);
  return {
    ...postProps,
    contentHtml,
  };
}
