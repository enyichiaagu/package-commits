import express from 'express';

import commitsRouter from './routes/commits.router.js';
import 'dotenv/config';

const app = express();

const { PORT } = process.env;

app.use('/api/v1/:packageName([@a-zA-Z/_-]+)/commits', commitsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
