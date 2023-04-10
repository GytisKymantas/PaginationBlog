import Pagination from '@/components/Pagination';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import Tag from './Tag';

export default function ListLayout({
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl'>
            {title}
          </h1>
        </div>
        <ul>
          {initialDisplayPosts.map((frontMatter) => {
            const { slug, date, title, description, tags } = frontMatter;
            return (
              <li key={slug} className='py-4'>
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className='space-y-3 xl:col-span-3'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-gray-900 dark:text-gray-100'
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'>
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                      {description}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
