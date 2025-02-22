import useSWR from 'swr';

const GITHUB_FETCH = 'https://api.github.com/repos';

async function fetcher(key) {
  const response = await fetch(`${GITHUB_FETCH}/${key}`);
  const data = await response.json();
  return data;
}

function useCommits(pkgData) {
  const { data, error, isLoading } = useSWR(
    () =>
      pkgData.repo &&
      pkgData.owner &&
      `${pkgData.owner}/${pkgData.repo}/commits`,
    fetcher
  );

  return {
    commits: data,
    isLoading,
    isError: error,
  };
}

export default useCommits;
