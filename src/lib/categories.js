import { slugify } from '@/lib/utils/kebab';
import { getAllPosts } from './posts';

export function getCategorySlugs() {
  const categories = {};
  getAllPosts().forEach(({ category }) => {
    categories[category] = categories[category] || 0;
    categories[category]++;
  });
  return Object.keys(categories)
    .sort()
    .filter((category) => categories[category] > 0)
    .map(slugify)
    .map((category) => [category]);
}

export function getCategoryPosts(category) {
  return getAllPosts().filter((post) => slugify(post.category) === category);
}
