import { getAllTags } from '@/lib/tags';
import Link from 'next/link';
import Tag from './Tag';

export default function Topics() {
  const tags = getAllTags();
  return (
    <>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl'>
            Tags ({Object.keys(tags).length})
          </h1>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(tags)
            .sort()
            .map((t) => {
              return (
                <div key={t} className='mb-2 mr-5 mt-2'>
                  <Tag text={t} />
                  <Link
                    href={`/topic/${tags[t].slug}`}
                    className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                  >
                    {` (${tags[t].count})`}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
