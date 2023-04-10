import BlogList from '@/components/BlogList';

export default function HomePage() {
  return (
    <div className='prose m-auto w-full max-w-4xl bg-green-50'>
      <h2 className='p-8 text-center font-mono text-2xl uppercase tracking-wider text-green-700'>
        This is the home page
      </h2>
      <BlogList />
    </div>
  );
}
