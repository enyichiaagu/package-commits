import {
  dateRange,
  findWeek,
  dayIndex,
  numRange,
  commitsMap,
} from './utils.js';

// Define Constants
const NPM_REGISTRY = 'https://registry.npmjs.org',
  GITHUB_API = 'https://api.github.com/repos',
  GITHUB_COMMITS_MAX = 30,
  NPM_SEARCH = 'https://api.npms.io/v2',
  NPM_SEARCH_MAX = 20;

// Load Search Options
async function httpSearchPackages(query) {
  const response = await fetch(
    `${NPM_SEARCH}/packages/search?q=${query}&size=${NPM_SEARCH_MAX}`
  );
  return await response.json();
}

// Fetch Commits from a particular page
async function httpGetDailyCommits(
  githubRepo,
  start,
  end,
  path = '',
  page = 1
) {
  const response = await fetch(
    `${GITHUB_API}/${githubRepo}/commits?path=${path}&since=${start}&until=${end}&per_page=${GITHUB_COMMITS_MAX}&page=${page}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  const payload = await response.json();

  const headerLink = response.headers.get('link');

  if (headerLink && page === 1) {
    const totalPages = /next.*&page=(\d*).*last/.exec(headerLink)[1];
    return { totalPages: Number(totalPages), payload };
  }

  return payload;
}

// Fetch Daily Commits, remove the year parameter if you want the current year
async function httpGetAllCommits(githubRepo, year, path) {
  const { startTime, endTime } = dateRange(year);
  const result = await httpGetDailyCommits(
    githubRepo,
    startTime,
    endTime,
    path
  );

  const commitData = commitsMap(startTime, endTime);
  let total = [result];

  if (result.totalPages) {
    const pages = numRange(2, result.totalPages);
    const remCommits = await Promise.all(
      pages.map((page) =>
        httpGetDailyCommits(githubRepo, startTime, endTime, path, page)
      )
    );
    total = [result.payload, ...remCommits];
  }

  total.flat().forEach(({ commit, author }) => {
    let mapWeek = commitData.get(findWeek(commit.author.date));
    if (mapWeek) {
      mapWeek.total++;
      mapWeek.days[dayIndex(commit.author.date)]++;
    }
  });

  return commitData;
}

export { httpSearchPackages, httpGetAllCommits };
