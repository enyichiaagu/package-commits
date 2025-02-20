import useSWR from 'swr';

const GITHUB_API = 'https://api.github.com/repos';

function getYear(dateStr) {
  const date = new Date(dateStr);
  return date.getFullYear();
}

async function fetcher(repoLocation) {
  const response = await fetch(`${GITHUB_API}/${repoLocation}`);
  const data = await response.json();

  return getYear(data.created_at);
}

function usePkgCreatedYear(pkgData) {
  const { data, error, isLoading } = useSWR(
    () => `${pkgData.owner}/${pkgData.repo}`,
    fetcher
  );
  return { year: data, isLoading, isError: error };
}

export default usePkgCreatedYear;
