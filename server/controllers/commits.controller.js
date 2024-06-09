import { Octokit } from 'octokit';
import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.GITHUB_TEST_TOKEN });

async function getDailyCommits(req, res) {
  const commits = await octokit.rest.repos.getCommitActivityStats({
    owner: 'facebook',
    repo: 'react'
  });
  res.send({ data: commits.data.length });
}

export { getDailyCommits };
