import express from 'express';
import todosController from '../controllers/todosControllers.js';

const router = express.Router();

router.get('/', todosController.getTodos);
router.post('/', todosController.createTodo);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

export default router;
