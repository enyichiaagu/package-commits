import express from 'express';
import 'dotenv/config';
import { Octokit } from 'octokit';

const app = express();

const PORT = 3000;
const { GITHUB_TEST_TOKEN } = process.env;

const octokit = new Octokit({
	auth: GITHUB_TEST_TOKEN,
});

// const repoInfo = await octokit.rest.repos.get({
// 	owner: 'enyichiaagu',
// 	repo: 'express-project',
// });

app.get('/api/:packageName', async (req, res) => {
	const { packageName } = req.params;
	res.send(repoInfo);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
