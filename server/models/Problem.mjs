import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
});

const problemSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  tags: [String],
  solvedCount: Number,
  timeLimit: String,
  memoryLimit: String,
  solved: Boolean,
  description: String,
  constraints: String,
  examples: [exampleSchema]
});

export default mongoose.model('Problem', problemSchema);
