// Define Constants
const NPM_REGISTRY = 'https://registry.npmjs.org',
  GITHUB_API = 'https://api.github.com/repos',
  NPM_SEARCH = 'https://api.npms.io/v2',
  NPM_SEARCH_MAX = 20;

// Load Search Options
async function httpSearchPackages(query) {
  const response = await fetch(
    `${NPM_SEARCH}/packages/search?q=${query}&size=${NPM_SEARCH_MAX}`
  );
  return await response.json();
}

// Fetch Daily Commits
async function httpGetDailyCommits(githubRepo, year = 'current', path = '') {
  const response = await fetch(
    `${GITHUB_API}/${githubRepo}/commits?path=${path}&since=2024-06-01T00:00:00.000Z`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );
  const commits = response.json();
}
