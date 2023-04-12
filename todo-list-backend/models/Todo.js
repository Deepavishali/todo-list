import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
  task: {
    type: String,
    required:true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
