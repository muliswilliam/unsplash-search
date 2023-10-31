export const searchQueryParamKey = 'search';
export const pageQueryParamKey = 'page';
export const sortByQueryParamKey = 'sort_by';
export const filterByQueryParamKey = 'filter_by';

export type QueryParamKey =
  | typeof searchQueryParamKey
  | typeof pageQueryParamKey
  | typeof sortByQueryParamKey
  | typeof filterByQueryParamKey;
