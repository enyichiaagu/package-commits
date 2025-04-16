import useSWRImmutable from 'swr';

const GITHUB_API = 'https://api.github.com/search';

async function fetcher(key) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
  };

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
