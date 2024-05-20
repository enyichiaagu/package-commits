import express from 'express';
import packagesRouter from './packages.router.js';

const apiRouter = express.Router();

apiRouter.use('/packages', packagesRouter);

export default apiRouter;
