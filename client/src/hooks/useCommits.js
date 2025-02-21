import useSWR from 'swr';

const GITHUB_FETCH = 'https://api.github.com/repos';

async function fetcher(repoLocation) {
  console.log(`${GITHUB_FETCH}/${repoLocation}/commits`);
  const response = await fetch(`${GITHUB_FETCH}/${repoLocation}/commits`);
  const data = await response.json();
  console.log(data);
  return data;
}

function useCommits(pkgData) {
  const { data, error, isLoading } = useSWR(
    pkgData && pkgData.owner && pkgData.repo
      ? `${pkgData.owner}/${pkgData.repo}`
      : null,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useCommits;
