import express from 'express';
import { getPackage } from '../controllers/packages.controller.js';

const packagesRouter = express.Router();

packagesRouter.get('/:owner/:repo', getPackage);

export default packagesRouter;
