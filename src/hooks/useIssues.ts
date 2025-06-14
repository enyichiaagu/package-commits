import useSWRImmutable from 'swr';
import useHeaders, { type CustomHeaderType } from './useHeaders';
import { resolveRes, finalCatch } from './utils/errors';
import type { PackageData } from './usePackage';

const GITHUB_API = 'https://api.github.com/search';

interface Issues {
  total_count: `${number}`;
}

// rewrite this to map
async function fetcher(key: string, headers: CustomHeaderType) {
  try {
    const [openIssues, allIssues] = await Promise.all([
      fetch(`${GITHUB_API}/${key}+is:open&per_page=1`, {
        headers: headers.get(),
      }).then(resolveRes<Issues>),
      fetch(`${GITHUB_API}/${key}&per_page=1`, { headers: headers.get() }).then(
        resolveRes<Issues>
      ),
    ]);

    let result = (+openIssues.total_count * 100) / +allIssues.total_count;

    return Math.round((result + Number.EPSILON) * 100) / 100;
  } catch (err) {
    return finalCatch(err);
  }
}

function useIssues(pkgData?: PackageData) {
  const headers = useHeaders();

  const { data, isLoading, error } = useSWRImmutable(
    () =>
      pkgData?.owner &&
      `issues?q=repo:${pkgData.owner}/${pkgData.repo}+is:issue`,
    (key) => fetcher(key, headers)
  );

  return { data: data || 0, isLoading, error };
}

export default useIssues;
