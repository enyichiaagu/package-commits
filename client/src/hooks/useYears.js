import useSWRImmutable from 'swr';
import { getYear, generateYrsArr } from './utils/common';
import { headers } from './utils/requests';
import { CustomError } from './utils/errors';

const GITHUB_API = 'https://api.github.com/repos';

const currentYear = new Date().getFullYear();

async function fetcher(key) {
  try {
    const response = await fetch(`${GITHUB_API}/${key}`, { headers });
    if (!response.ok) throw new CustomError('GitHub Repo Not Found');
    const data = await response.json();

    return generateYrsArr(getYear(data.created_at), currentYear);
  } catch (err) {
    if (err instanceof CustomError) throw err;
    throw new CustomError();
  }
}

function useYears(pkgData) {
  const { data, error, isLoading } = useSWRImmutable(
    () => pkgData.owner && pkgData.repo && `${pkgData.owner}/${pkgData.repo}`,
    fetcher
  );

  return { years: data || [], isLoading, error };
}

export default useYears;
