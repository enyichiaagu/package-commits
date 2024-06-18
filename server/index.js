import express from 'express';

import commitsRouter from './routes/commits.router.js';
import 'dotenv/config';

const app = express();

const { PORT } = process.env;

function getParams(req, res, next) {
  req.commitParams = req.params;
  next();
}

app.use('/api/v1/:owner/:repo/commits', getParams, commitsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
