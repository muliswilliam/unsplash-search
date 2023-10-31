import { createApi } from 'unsplash-js';

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

if (accessKey === undefined) {
  throw new Error('Missing UNSPLASH_ACCESS_KEY env variable');
}

export const unsplash = createApi({
  accessKey,
});
