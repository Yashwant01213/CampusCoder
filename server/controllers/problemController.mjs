import Problem from '../models/Problem.mjs';

export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.status(200).json(problem);
  } catch (err) {
    res.status(404).json({ error: 'Problem not found' });
  }
};

export const addProblem = async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
