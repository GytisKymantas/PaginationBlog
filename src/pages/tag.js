import React from 'react';
import { Pagination } from '@/components/Pagination';
import { POSTS_PER_PAGE } from '@/lib/utils/constants';
import Link from 'next/link';
import { BLOG_POSTS } from '@/components/blogData';

const Tag = ({ page = 0 }) => {
  let currentPage = page;

  return (
    <div>
      <h2>This is the Tag page</h2>
      <ul>
        {BLOG_POSTS?.slice(
          currentPage === 0 ? 0 : currentPage * 10,
          currentPage * 10 + POSTS_PER_PAGE
        ).map((post, index) => {
          return (
            <li key={post.slug}>
              <span>{currentPage * POSTS_PER_PAGE + index + 1}.&nbsp;</span>
              <Link href={post.slug}>{post.tags.join(', ')}</Link>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={Number(currentPage)}
        totalPages={Math.ceil(BLOG_POSTS?.length / POSTS_PER_PAGE)}
        tag='tag'
      />
    </div>
  );
};

export default Tag;
