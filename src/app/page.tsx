'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { ColorId, SearchOrderBy } from 'unsplash-js';
import { unsplash } from '@/lib/unsplash-api';
import { Search } from '@/components/search';
import { Pagination } from '@/components/pagination';
import { PhotosList } from '@/components/photos-list';
import SelectFilter from '@/components/select-filter';
import {
  QueryParamKey,
  filterByQueryParamKey,
  pageQueryParamKey,
  searchQueryParamKey,
  sortByQueryParamKey,
} from '@/lib/types';
import { createQueryString, updateQuery } from '@/lib/routing';

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [isSearching, setIsSearching] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    photos: Basic[];
    totalPages: number;
    totalResults: number;
    errors: string[];
  }>({
    photos: [],
    totalPages: 0,
    totalResults: 0,
    errors: [],
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchTerm = searchParams.get(searchQueryParamKey) || '';
  const currentPage = parseInt(searchParams.get(pageQueryParamKey) || '1', 10);
  const sortBy = searchParams.get(sortByQueryParamKey) || 'relevance';
  const filterBy = searchParams.get(filterByQueryParamKey) || 'all';

  const updateQueryParam = useCallback(
    (key: QueryParamKey, value: string) => {
      const urlParams = new URLSearchParams(searchParams);

      // reset page query param to 1 if filter or sort by changes
      if (key !== pageQueryParamKey) urlParams.set(pageQueryParamKey, '1');

      updateQuery(router, pathname, urlParams, key, value);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsSearching(true);
        const { response, errors } = await unsplash.search.getPhotos({
          query: searchTerm,
          perPage: ITEMS_PER_PAGE,
          page: currentPage,
          orderBy: sortBy as SearchOrderBy,
          color: filterBy === 'all' ? undefined : (filterBy as ColorId),
        });

        if (errors) {
          setSearchResults({
            photos: [],
            totalPages: 0,
            totalResults: 0,
            errors,
          });
        } else if (response) {
          setSearchResults({
            photos: response.results,
            totalPages: response.total_pages,
            totalResults: response.total,
            errors: [],
          });
        }
        setIsSearching(false);
      } catch (error: any) {
        setSearchResults({
          photos: [],
          totalPages: 0,
          totalResults: 0,
          errors: [
            'An error occurred while searching for photos. Please try again.',
            error.message,
          ],
        });
        setIsSearching(false);
      }
    };

    setSearchValue(searchTerm);

    fetchPhotos();
  }, [searchTerm, currentPage, sortBy, filterBy]);

  return (
    <main className='flex w-full min-h-screen justify-start'>
      <div className='flex flex-col w-full max-w-6xl mx-auto rounded-md shadow-lg space-y-4 pb-4 md:pb-7 my-2 px-4 md:px-7'>
        <div className='pt-4 mt:p-7'>
          <Search
            value={searchValue}
            onChange={setSearchValue}
            onSearch={() => updateQueryParam(searchQueryParamKey, searchValue)}
          />
        </div>
        <div className='w-full border-b' />

        <SelectFilter
          filterBy={filterBy}
          sortBy={sortBy}
          onFilterChange={(value) =>
            updateQueryParam(filterByQueryParamKey, value)
          }
          onSortChange={(value) => updateQueryParam(sortByQueryParamKey, value)}
        />

        <PhotosList
          isLoading={isSearching}
          photos={searchResults.photos}
          errors={searchResults.errors}
          searchTerm={searchTerm}
        />

        {searchResults.totalResults > ITEMS_PER_PAGE ? (
          <>
            <div className='border-b' />
            <div className='w-full'>
              <Pagination
                currentPage={currentPage}
                totalResults={searchResults.totalResults}
                itemsPerPage={ITEMS_PER_PAGE}
                createNewPageUrl={(page) =>
                  `${pathname}?${createQueryString(
                    searchParams,
                    pageQueryParamKey,
                    page.toString()
                  )}`
                }
              />
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
