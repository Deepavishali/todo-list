import Todo from '../models/Todo.js';

const todosController = {};

todosController.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

todosController.createTodo = async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    isCompleted: req.body.isCompleted
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
  if (req.body.isCompleted) {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(newTodo._id, { isCompleted: true }, { new: true });
      console.log(updatedTodo);
    } catch (err) {
      console.error(err);
    }
  }
};




todosController.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    console.log("Todo before update:", todo);

    if (!todo) throw Error('Todo not found');

    todo.isCompleted = req.body.isCompleted;
    todo.task = req.body.task;

    const updatedTodo = await todo.save();
    console.log("Updated todo:", updatedTodo);

    res.json({
      message:"Updated successfully",
      updatedTodo
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).json({ message: err.message });
  }
};



todosController.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (!todo) throw Error('Todo not found');

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default todosController;
