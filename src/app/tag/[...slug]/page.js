// import { getAllSlugs } from '@/lib/posts';

import Tag from '@/pages/tag';

export default async function ArchivePages({ params }) {
  const { slug = [] } = params;

  return (
    <div className='prose max-w-prose'>
      <h1 className='bg-green-50 p-32 text-center font-mono text-xl leading-loose tracking-wide text-red-700'>
        /tag/{slug.join('/')}
        <Tag page={slug.join('/')} />
      </h1>
    </div>
  );
}
