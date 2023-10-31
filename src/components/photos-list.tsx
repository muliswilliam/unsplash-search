import React from 'react';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import Image from 'next/image';
import { PhotoSkeleton } from '@/components/photo-skeleton';

interface PhotosListProps {
  isLoading: boolean;
  photos: Basic[];
  errors: string[];
  searchTerm: string;
}

export function PhotosList({
  isLoading,
  photos,
  errors,
  searchTerm,
}: PhotosListProps) {
  // loading state
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {Array.from({ length: 9 }).map((_, index) => (
          <PhotoSkeleton key={index} />
        ))}
      </div>
    );
  }

  // error state
  if (errors.length > 0) {
    return (
      <div className='flex flex-col self-center justify-start'>
        {errors.map((error, index) => (
          <p key={index} className='text-red-500'>
            {error}
          </p>
        ))}
      </div>
    );
  }

  // empty state
  if (searchTerm.length > 0 && photos.length === 0) {
    return (
      <div className='flex flex-col justify-start pt-2 border-t'>
        <p className='text-center my-2'>
          No results found for{' '}
          <span className='italic capitalize'>{searchTerm}</span>.
        </p>
        <p className='text-center'>
          Please verify your search criteria and filters and attempt the search
          again.
        </p>
      </div>
    );
  }

  // photos list
  return (
    <div className='flex flex-col items-start justify-start'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[1096px]'>
        {photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.urls?.small}
            alt={photo.alt_description || ''}
            width={photo.width}
            height={photo.height}
            loading='lazy'
            className='w-full aspect-square object-cover cursor-pointer rounded-lg'
          />
        ))}
      </div>
    </div>
  );
}
