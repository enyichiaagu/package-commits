import express from 'express';
import { getPackage } from '../controllers/packages.controller.js';

const packagesRouter = express.Router();

packagesRouter.get('/:packageName', getPackage);

export default packagesRouter;
