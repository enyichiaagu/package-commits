import useSWR from 'swr';
import { getYear, generateYrsArr } from './utils/common';
import { resolveRes, finalCatch } from './utils/errors';
import useHeaders from './useHeaders';
import type { PackageData } from './usePackage';

const GITHUB_API = 'https://api.github.com/repos';

const currentYear = new Date().getFullYear();

interface GitHubResponse {
  created_at: string;
}

async function fetcher(key: string, headers: ReturnType<typeof useHeaders>) {
  try {
    const response = await fetch(`${GITHUB_API}/${key}`, {
      headers: headers.get(),
    });
    const data = await resolveRes<GitHubResponse>(response);
    return generateYrsArr(getYear(data.created_at), currentYear);
  } catch (err) {
    finalCatch(err);
  }
}

function useYears(pkgData?: PackageData) {
  const headers = useHeaders();
  const { data, error, isLoading, mutate } = useSWR(
    () => pkgData?.owner && pkgData.repo && `${pkgData.owner}/${pkgData.repo}`,
    (key) => fetcher(key, headers)
  );
  return { years: data || [], isLoading, error, mutate };
}

export default useYears;
