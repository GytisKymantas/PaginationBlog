import Link from 'next/link';

export function Pagination({ totalPages, currentPage, tag = 'page' }) {
  let hasPrevPage = currentPage - 1 > 0;
  let hasNextPage = currentPage + 1 <= totalPages;

  return (
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
            href={currentPage - 1 === 1 ? `/` : `/${tag}/${currentPage - 1}`}
          >
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!hasNextPage && (
          <button
            className='umami--click--next-posts cursor-auto disabled:opacity-50'
            disabled={!hasNextPage}
          >
            Next
          </button>
        )}
        {hasNextPage && (
          <Link href={`/${tag}/${currentPage + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  );
}
