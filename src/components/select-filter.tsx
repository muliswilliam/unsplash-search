import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colorOptions } from '@/options/colors';

interface SelectFilterProps {
  filterBy: string;
  sortBy: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function SelectFilter({
  filterBy,
  sortBy,
  onFilterChange,
  onSortChange,
}: SelectFilterProps) {
  return (
    <div className='flex justify-end items-center gap-4'>
      <Select value={filterBy} onValueChange={onFilterChange}>
        <SelectTrigger className='w-[250px]' title='Filter by'>
          <SelectValue placeholder='Filtered by color'>
            {filterBy !== 'all'
              ? `Filtered by ${
                  colorOptions.find((c) => c.value === filterBy)?.label
                }`
              : 'Filter by'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All</SelectItem>
          {colorOptions.map((color) => (
            <SelectItem key={color.value} value={color.value}>
              {color.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className='w-[200px]'>
          <SelectValue placeholder='Sort by'>
            {sortBy ? `Sorted by ${sortBy}` : 'Sort by'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='relevance'>Relevance</SelectItem>
          <SelectItem value='latest'>Latest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectFilter;
