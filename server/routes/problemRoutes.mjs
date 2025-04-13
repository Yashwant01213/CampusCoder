import express from 'express';
import { getAllProblems, getProblemById, addProblem } from '../controllers/problemController.mjs';

const problemRouter = express.Router();

problemRouter.get('/', getAllProblems);
problemRouter.get('/:id', getProblemById);
problemRouter.post('/', addProblem);

export default problemRouter;
