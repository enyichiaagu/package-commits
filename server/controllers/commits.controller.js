import 'dotenv/config';

async function getDailyCommits(req, res) {
  const { owner, repo } = req.commitParams;

  const fetchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=30`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TEST_TOKEN}`
      }
    }
  );
  const commits = await fetchResponse.json();
}

export { getDailyCommits };
