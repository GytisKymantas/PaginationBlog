import { POSTS_PER_PAGE } from '@/lib/utils/constants';
import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Pagination } from './Pagination';

export default function BlogList({ page = 0 }) {
  let currentPage = page;
  const BLOG_POSTS = getAllPosts();

  return (
    <>
      <ul className='list-none bg-green-100 p-4'>
        {BLOG_POSTS?.slice(
          currentPage === 0 ? 0 : currentPage * 10,
          currentPage * 10 + POSTS_PER_PAGE
        ).map((post, index) => {
          return (
            <li
              key={post.slug}
              className='text-md m-4 rounded-lg bg-green-50 p-4 font-light'
            >
              <span className='font-mono text-xl font-extrabold text-green-900'>
                {currentPage * POSTS_PER_PAGE + index + 1}.&nbsp;
              </span>
              <Link href={post.slug}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={Number(currentPage)}
        totalPages={Math.ceil(BLOG_POSTS?.length / POSTS_PER_PAGE)}
      />
    </>
  );
}
