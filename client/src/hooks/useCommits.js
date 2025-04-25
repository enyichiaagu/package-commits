import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { getDateRange } from './utils/common';
import { getCommitsOrContributors } from './utils/commits';
import useHeaders from './useHeaders';
import { finalCatch, resolveRes } from './utils/errors';

const GITHUB_FETCH = 'https://api.github.com/repos';
const MAX_COMMITS_FETCH = 100;

const currentRange = getDateRange();

// async function fetcher(key, size, reqHeaders) {
async function fetcher(key, headers) {
  try {
    let response = await fetch(`${GITHUB_FETCH}/${key}`, { headers });
    let result = await resolveRes(response);

    // If first index
    if (key.endsWith(1)) {
      let headerLink = response.headers.get('link') || null;
      let regexArr = headerLink
        ? headerLink.match(/next.*page=(\d*).*last/)
        : null;
      let pages = regexArr ? +regexArr[1] : 1;
      return { result, pages };
    }
    return { result };
  } catch (err) {
    finalCatch(err);
  }
}

const getKey = (pkgData, range, index) => {
  return (
    pkgData.repo &&
    pkgData.owner &&
    `${pkgData.owner}/${pkgData.repo}/commits?since=${range.start}&until=${
      range.end
    }&per_page=${MAX_COMMITS_FETCH}${
      pkgData.path ? `&path=${pkgData.path}` : ''
    }&page=${index + 1}`
  );
};

function useCommits(pkgData, period) {
  const headers = useHeaders();
  const range =
    !period || period === 'Current' ? currentRange : getDateRange(period);

  const { data, error, isLoading, setSize, mutate } = useSWRInfinite(
    (index) => getKey(pkgData, range, index),
    (key) => fetcher(key, headers.get()),
    { parallel: true }
  );

  let totalPages = data?.[0].pages;
  let isLoadedAllPages =
    (data && data?.length === totalPages) || Boolean(error);

  useEffect(() => {
    if (data?.length === 1 && totalPages > 1) {
      setSize(totalPages);
    }
  }, [data, totalPages, setSize]);

  let commitsArr =
    isLoadedAllPages && !error
      ? [].concat(...data.map((page) => page.result))
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
