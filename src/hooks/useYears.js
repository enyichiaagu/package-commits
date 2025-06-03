import useSWR from 'swr';
import { getYear, generateYrsArr } from './utils/common';
import { resolveRes, finalCatch } from './utils/errors';
import useHeaders from './useHeaders';

const GITHUB_API = 'https://api.github.com/repos';

const currentYear = new Date().getFullYear();

async function fetcher(key, headers) {
  try {
    const response = await fetch(`${GITHUB_API}/${key}`, {
      headers: headers.get(),
    });
    const data = await resolveRes(response);
    return generateYrsArr(getYear(data.created_at), currentYear);
  } catch (err) {
    finalCatch(err);
  }
}

function useYears(pkgData) {
  const headers = useHeaders();
  const { data, error, isLoading, mutate } = useSWR(
    () => pkgData.owner && pkgData.repo && `${pkgData.owner}/${pkgData.repo}`,
    (key) => fetcher(key, headers)
  );
  return { years: data || [], isLoading, error, mutate };
}

export default useYears;
