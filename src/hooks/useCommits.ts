import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useHeaders, { type CustomHeaderType } from './useHeaders';
import type { PackageData } from './usePackage';
import { getDateRange } from './utils/common';
import { getCommitsOrContributors, type FetchedCommit } from './utils/commits';
import { CustomError, finalCatch, resolveRes } from './utils/errors';

const GITHUB_FETCH = 'https://api.github.com/repos';
const MAX_COMMITS_FETCH = 100;

const currentRange = getDateRange();

interface ReturnedCommitsData {
  result: FetchedCommit[];
  pages?: number;
}
// async function fetcher(key, size, reqHeaders) {
async function fetcher(key: string, headers: CustomHeaderType) {
  try {
    let response = await fetch(`${GITHUB_FETCH}/${key}`, {
      headers: headers.get(),
    });
    let result = await resolveRes<FetchedCommit[]>(response);

    // If first index
    if (key.endsWith('1')) {
      let headerLink = response.headers.get('link') || null;
      let regexArr = headerLink
        ? headerLink.match(/next.*page=(\d*).*last/)
        : null;
      let pages = regexArr ? +regexArr[1] : 1;
      return { result, pages };
    }
    return { result };
  } catch (err) {
    return finalCatch(err);
  }
}

interface Range {
  start: string;
  end: string;
}

const getKey = (index: number, range: Range, pkgData?: PackageData) => {
  return (
    pkgData?.repo &&
    pkgData.owner &&
    `${pkgData.owner}/${pkgData.repo}/commits?since=${range.start}&until=${
      range.end
    }&per_page=${MAX_COMMITS_FETCH}${
      pkgData.path ? `&path=${pkgData.path}` : ''
    }&page=${index + 1}`
  );
};

export type Period = 'Current' | number | null;

function useCommits(pkgData?: PackageData, period?: Period) {
  let isFetchable = pkgData ? Boolean(pkgData.name && pkgData.owner) : true;

  const range =
    !period || period === 'Current' ? currentRange : getDateRange(period);

  const { data, error, isLoading, setSize, mutate } = useSWRInfinite<
    ReturnedCommitsData,
    CustomError
  >(
    (index) => getKey(index, range, pkgData),
    (key) => fetcher(key, headers),
    { parallel: true }
  );
  const headers = useHeaders();

  let totalPages = data?.[0].pages || 0;
  let isLoadedAllPages =
    !isFetchable || (data && data?.length === totalPages) || Boolean(error);

  useEffect(() => {
    if (data?.length === 1 && totalPages > 1) {
      setSize(totalPages);
    }
  }, [data, totalPages, setSize]);

  let commitsArr: FetchedCommit[] =
    isLoadedAllPages && !error && data
      ? data.map((page) => page.result).flat()
      : [];
  let { commits, contributors } = getCommitsOrContributors(commitsArr, range);

  return {
    commits,
    contributors,
    isLoading: isLoading || !isLoadedAllPages,
    error,
    mutate,
  };
}

export default useCommits;
