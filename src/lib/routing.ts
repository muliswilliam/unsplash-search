import { QueryParamKey } from '@/lib/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function createQueryString(
  searchParams: URLSearchParams,
  name: QueryParamKey,
  value: string
): string {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
}

export function updateQuery(
  router: AppRouterInstance,
  pathname: string,
  searchParams: URLSearchParams,
  name: QueryParamKey,
  value: string
): void {
  const params = createQueryString(searchParams, name, value);
  router.push(pathname + '?' + params);
}
