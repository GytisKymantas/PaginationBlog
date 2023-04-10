import Topics from '@/components/Topics';
import { getAllTags } from '@/lib/tags';

export function getStaticPaths() {
  const topics = getAllTags();
  return {
    paths: Object.keys(topics).map((topic) => ({
      params: { slug: [topics[topic].slug] },
    })),
    fallback: false,
  };
}

export default function TopicPage({ params }) {
  const { slug = [] } = params;
  const [topic = null, , pageNumber = 0] = slug;
  if (topic === null) {
    return <Topics />;
  }
  return (
    <div className='prose m-auto w-full max-w-4xl bg-green-50'>
      <h2 className='p-8 text-center font-mono text-2xl uppercase tracking-wider text-green-700'>
        Topic {topic} (Page {pageNumber + 1})
      </h2>
    </div>
  );
}
