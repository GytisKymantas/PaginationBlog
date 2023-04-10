import { POSTS_PER_PAGE } from '@/lib/utils/constants';
import Link from 'next/link';
import { Pagination } from './Pagination';

export default function BlogList({ posts, currentPage = 0 }) {
  console.log(posts, 'this is posts');
  return (
    <>
      <ul className='list-none bg-green-100 p-4'>
        {posts
          ?.slice(
            currentPage === 0 ? 0 : currentPage * POSTS_PER_PAGE + 1,
            POSTS_PER_PAGE
          )
          .map((post, index) => {
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
        currentPage={currentPage}
        totalPages={Math.ceil(posts?.length / POSTS_PER_PAGE)}
      />
    </>
  );
}
