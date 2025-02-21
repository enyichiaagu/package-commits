import useSWR from 'swr';
import { getYear } from './utils';

const GITHUB_API = 'https://api.github.com/repos';

async function fetcher(repoLocation) {
  const response = await fetch(`${GITHUB_API}/${repoLocation}`);
  const data = await response.json();

  return getYear(data.created_at);
}

function usePkgCreatedYear(pkgData) {
  const { data, error, isLoading } = useSWR(
    () =>
      pkgData.owner && pkgData.repo ? `${pkgData.owner}/${pkgData.repo}` : null,
    fetcher
  );

  return { year: data, isLoading, isError: error };
}

export default usePkgCreatedYear;
