import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalResults: number;
  createNewPageUrl: (page: number) => string;
}

export function Pagination({
  currentPage,
  itemsPerPage,
  totalResults,
  createNewPageUrl,
}: PaginationProps) {
  // calculate start and end index
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <nav className='flex justify-between items-center'>
      <p className='font-light text-md '>
        Showing <span className='font-normal'>{startIndex}</span> to{' '}
        <span className='font-normal'>{endIndex}</span> of{' '}
        <span className='font-normal'>{totalResults}</span> results
      </p>
      <div className='flex space-x-4'>
        {currentPage > 1 ? (
          <Link href={createNewPageUrl(currentPage - 1)}>
            <Button variant='outline'>Previous</Button>
          </Link>
        ) : null}

        {currentPage * itemsPerPage < totalResults ? (
          <Link href={createNewPageUrl(currentPage + 1)}>
            <Button variant='outline'>Next</Button>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
