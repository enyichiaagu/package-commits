import useSWRImmutable from 'swr';
import { headers } from './utils/requests';
import { CustomError, resolveRes } from './utils/errors';

const GITHUB_API = 'https://api.github.com/search';

async function fetcher(key) {
  try {
    const [openIssues, allIssues] = await Promise.all([
      fetch(`${GITHUB_API}/${key}+is:open&per_page=1`, { headers }).then(
        (response) => resolveRes(response)
      ),
      fetch(`${GITHUB_API}/${key}&per_page=1`, { headers }).then((response) =>
        resolveRes(response)
      ),
    ]);

    let result = (+openIssues.total_count * 100) / +allIssues.total_count;

    return Math.round((result + Number.EPSILON) * 100) / 100;
  } catch (err) {
    if (err instanceof CustomError) throw err;
    throw new CustomError();
  }
}

function useIssues(pkgData) {
  const { data, isLoading, error } = useSWRImmutable(
    () =>
      pkgData.owner &&
      `issues?q=repo:${pkgData.owner}/${pkgData.repo}+is:issue`,
    fetcher
  );

  return { data: data || 0, isLoading, error };
}

export default useIssues;
