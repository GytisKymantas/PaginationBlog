import Cache from 'file-system-cache';

export const cache = Cache({
  basePath: './.cache', // Optional. Path where cache files are stored (default).
  ns: 'mdx', // Optional. A grouping namespace for items.
});
