import useSWRImmutable from 'swr';
import { headers } from './utils/requests';

const GITHUB_API = 'https://api.github.com/search';

async function fetcher(key) {
  const [openIssues, allIssues] = await Promise.all([
    fetch(`${GITHUB_API}/${key}+is:open&per_page=1`, {
      headers,
    }).then((response) => response.json()),
    fetch(`${GITHUB_API}/${key}&per_page=1`, {
      headers,
    }).then((response) => response.json()),
  ]);

  let result = (+openIssues.total_count * 100) / +allIssues.total_count;

  return Math.round((result + Number.EPSILON) * 100) / 100;
}

function useIssues(pkgData) {
  const { data, isLoading, error } = useSWRImmutable(
    () =>
      pkgData.owner &&
      `issues?q=repo:${pkgData.owner}/${pkgData.repo}+is:issue`,
    fetcher
  );

  return { data: data || 0, isLoading, isError: error };
}

export default useIssues;
