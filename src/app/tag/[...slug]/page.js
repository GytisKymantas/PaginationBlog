// import { getAllSlugs } from '@/lib/posts';
import { BLOG_POSTS } from '@/components/blogData';
import Link from 'next/link';
import { POSTS_PER_PAGE } from '@/lib/utils/constants';

export default async function ArchivePages({ params }) {
  const { slug = [] } = params;
  let currentPage = parseInt(slug[1]) === 1 ? 0 : slug[1];
  const query = decodeURIComponent(slug[0]).replace(/%20/g, ' ');
  const filteredArray = BLOG_POSTS.filter((obj) => obj.tags.includes(query));

  let totalPages = Math.ceil(filteredArray?.length / POSTS_PER_PAGE);
  let hasPrevPage = currentPage - 1 > 0;

  let lastPage = Number(currentPage) === totalPages;

  return (
    <div className='prose max-w-prose'>
      <div>
        <h1 className='bg-green-50 p-32 text-center font-mono text-xl leading-loose tracking-wide text-red-700'>
          /tag/{slug.join('/')}
          <br />
          <br />
          total found posts: {filteredArray?.length} that contain "{query}"
        </h1>
      </div>
      {filteredArray
        ?.slice(
          currentPage === 1 ? 0 : currentPage * 10,
          currentPage * 10 + POSTS_PER_PAGE
        )
        .map(({ title, slug }, index) => {
          return (
            <li key={index}>
              <span>{currentPage * POSTS_PER_PAGE + index + 1}.&nbsp;</span>
              <Link href={`/${slug}`}>{title}</Link>
            </li>
          );
        })}
      <div className='space-y-2 bg-green-200 p-8'>
        <nav className='flex justify-between'>
          {!hasPrevPage && (
            <button
              className='umami--click--prev-posts cursor-auto disabled:opacity-50'
              disabled={!hasPrevPage}
            >
              Previous
            </button>
          )}
          {hasPrevPage && (
            <Link
              href={
                currentPage - 1 === 1
                  ? `/tag/${query}/1`
                  : `/tag/${query}/${currentPage - 1}`
              }
            >
              <button>Previous</button>
            </Link>
          )}
          <span>
            {currentPage === 0 ? 1 : currentPage} of {totalPages}
          </span>
          <Link href={`/tag/${query}/${parseInt(slug[1]) + 1}`}>
            <button
              className={
                lastPage &&
                'umami--click--next-posts cursor-auto disabled:opacity-50'
              }
              disabled={lastPage}
            >
              Next
            </button>
          </Link>
          {/* )} */}
        </nav>
      </div>
    </div>
  );
}
