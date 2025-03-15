import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { getDateRange } from './utils/common';
import { getWeeklyCommits } from './utils/commits';

const GITHUB_FETCH = 'https://api.github.com/repos';
const MAX_COMMITS_FETCH = 100;

const range = getDateRange();

async function fetcher(key, size) {
  let response = await fetch(`${GITHUB_FETCH}/${key}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
    },
  });
  let headerLink = response.headers.get('link') || null;
  let regexArr = headerLink ? headerLink.match(/next.*page=(\d*).*last/) : null;
  let pages = regexArr ? +regexArr[1] : headerLink ? size : 1;
  let result = await response.json();
  return { result, pages };
}

const getKey = (pkgData, index) => {
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

function useCommits(pkgData) {
  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    (index) => getKey(pkgData, index),
    (key) => fetcher(key, size),
    { parallel: true }
  );

  let totalPages = data?.[0].pages;
  let isLoadedAllPages = data && data?.length === totalPages;

  useEffect(() => {
    setSize(totalPages);
  }, [totalPages, setSize]);

  let fetchedCommits = isLoadedAllPages
    ? [].concat(...data.map((page) => page.result))
    : [];
  let commits = getWeeklyCommits(fetchedCommits, range);
  return {
    commits,
    isLoading,
    isError: error,
  };
}

export default useCommits;
