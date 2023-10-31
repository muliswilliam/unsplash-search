import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchProps {
  /**
   * The value of the search input
   */
  value: string;

  /**
   * The function called when the search input changes
   * @param value The value of the search input
   * @returns
   */
  onChange: (value: string) => void;

  /**
   * The function called when the search button is clicked
   * @returns
   */
  onSearch: () => void;
}

export function Search({ value, onChange, onSearch }: SearchProps) {
  return (
    <div className='flex w-full items-center justify-center space-x-4'>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Type keywords and press enter...'
        className='max-w-[500px] rounded-full'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      />
    </div>
  );
}
