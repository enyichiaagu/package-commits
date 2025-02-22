import useSWR from 'swr';
import { getYear, generateYrsArr } from './utils';

const GITHUB_API = 'https://api.github.com/repos';

const currentYear = new Date().getFullYear();

async function fetcher(key) {
  const response = await fetch(`${GITHUB_API}/${key}`);
  const data = await response.json();

  return generateYrsArr(getYear(data.created_at), currentYear);
}

function useYears(pkgData) {
  const { data, error, isLoading } = useSWR(
    () => pkgData.owner && pkgData.repo && `${pkgData.owner}/${pkgData.repo}`,
    fetcher
  );

  return { years: data, isLoading, isError: error };
}

export default useYears;
