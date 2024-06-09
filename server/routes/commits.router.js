import express from 'express';
import { getDailyCommits } from '../controllers/commits.controller.js';

const commitsRouter = express.Router();

commitsRouter.get('/daily', getDailyCommits);

export default commitsRouter;
