import { getAllSlugs } from '@/lib/posts';

export default async function ArchivePages({ params }) {
  const { slug = [] } = params;
  return (
    <div className='prose max-w-prose'>
      <h1 className='bg-green-50 p-32 text-center font-mono text-xl leading-loose tracking-wide text-red-700'>
        {slug.join('/')}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
