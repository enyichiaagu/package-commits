import useSWRImmutable from 'swr/immutable';
import { getDateRange } from './utils/common';
import { getWeeklyCommits } from './utils/commits';

const GITHUB_FETCH = 'https://api.github.com/repos';
const MAX_COMMITS_FETCH = 30;

const range = getDateRange();

async function pagesFetcher(key) {
  let response = await fetch(`${GITHUB_FETCH}/${key}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
    },
  });
  let headerLink = response.headers.get('link') || null;

  let pages = headerLink ? +headerLink.match(/page=(\d*).*last/)[1] : 1;
  let result = await response.json();
  return { result, pages };
}

function useCommits(pkgData) {
  const firstPageKey = () =>
    pkgData.repo &&
    pkgData.owner &&
    `${pkgData.owner}/${pkgData.repo}/commits?since=${range.start}&until=${
      range.end
    }&per_page=${MAX_COMMITS_FETCH}${
      pkgData.path ? `&path=${pkgData.path}` : ''
    }`;

  const { data, error, isLoading } = useSWRImmutable(
    firstPageKey,
    pagesFetcher
  );

  let commits = data ? getWeeklyCommits(data.result, range) : [];

  return {
    commits,
    isLoading,
    isError: error,
  };
}

export default useCommits;
