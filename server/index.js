import express from 'express';
import 'dotenv/config';
import { Octokit } from 'octokit';

import apiRouter from './routes/api.router.js';

const app = express();

const { PORT } = process.env;

// const octokit = new Octokit({
// 	auth: GITHUB_TEST_TOKEN,
// });

// const repoInfo = await octokit.rest.repos.get({
// 	owner: 'enyichiaagu',
// 	repo: 'express-project',
// });

// app.get('/api/:packageName', async (req, res) => {
// 	const { packageName } = req.params;
// 	res.send(repoInfo);
// });

app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
