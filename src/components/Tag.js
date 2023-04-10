import { kebabCase } from '@/lib/utils/kebab';
import Link from 'next/link';

const Tag = ({ text }) => {
  return (
    <Link
      href={`/topic/${kebabCase(text)}`}
      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase'
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
