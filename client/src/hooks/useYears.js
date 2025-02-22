import useSWRImmutable from 'swr';
import { getYear, generateYrsArr } from './utils/common';

const GITHUB_API = 'https://api.github.com/repos';

const currentYear = new Date().getFullYear();

async function fetcher(key) {
  const response = await fetch(`${GITHUB_API}/${key}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
    },
  });
  const data = await response.json();

  return generateYrsArr(getYear(data.created_at), currentYear);
}

function useYears(pkgData) {
  const { data, error, isLoading } = useSWRImmutable(
    () => pkgData.owner && pkgData.repo && `${pkgData.owner}/${pkgData.repo}`,
    fetcher
  );

  return { years: data, isLoading, isError: error };
}

export default useYears;
