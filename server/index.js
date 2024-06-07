import express from 'express';
import 'dotenv/config';
import { Octokit } from 'octokit';

import packagesRouter from './routes/packages.router'

const app = express();

const { PORT } = process.env;

app.use('/api/v1', packagesRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
