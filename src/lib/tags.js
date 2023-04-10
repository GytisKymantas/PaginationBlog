import { getAllPosts } from './posts';
import { kebabCase } from './utils/kebab';

export function getAllTags() {
  const tags = {};
  getAllPosts().forEach(({ tags: postTags }) => {
    postTags.forEach((tag) => {
      tags[tag] = tags[tag] || { count: 0, slug: kebabCase(tag) };
      tags[tag].count++;
    });
  });
  return tags;
}
