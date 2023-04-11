import React from 'react';
import { POSTS_PER_PAGE } from '@/lib/utils/constants';
import Link from 'next/link';
import { BLOG_POSTS } from '@/components/blogData';

const Tag = ({ page = 0 }) => {
  let currentPage = page;

  const tagsArray = [];

  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i];

    for (let j = 0; j < post.tags.length; j++) {
      const tag = post.tags[j];

      tagsArray.push(tag);
    }
  }

  const tagCounts = tagsArray.reduce((acc, tag) => {
    acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
    return acc;
  }, {});

  const uniqueTags = Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <div>
      <h2>These are the unique tags available</h2>
      <ul>
        {uniqueTags.map(({ tag, count }, index) => {
          return (
            <li key={index}>
              <span>{currentPage * POSTS_PER_PAGE + index + 1}.&nbsp;</span>
              <Link href={`/tag/${tag}/1`}>{tag}</Link> there are {count} in
              total
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tag;
