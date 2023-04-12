import { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Checkbox,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';



function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const toast = useToast();

  const handleNewTodo = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    const data = { task: newTodo, completed: false };
    axios.post("https://todo-list-git-master-deepavishali.vercel.app/todos", data)
      .then(response => {
        setTodos([...todos, response.data.task]);
        setNewTodo('');
        toast({
          title: 'Todo added.',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      })
      .catch(error => {
        console.log(error);
        toast({
          title: 'An error occurred.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      });
  };

  const handleCheckboxClick = (id) => {
    const index = todos.findIndex(todo => todo._id === id);
    const updatedTodo = { ...todos[index], completed: !todos[index].completed };
    axios.put(`https://todo-list-git-master-deepavishali.vercel.app/todos/${id}`, updatedTodo)
      .then(response => {
        const updatedTodos = [...todos];
        updatedTodos[index] = response.data;
        setTodos(updatedTodos);
        toast({
          title: 'Todo updated.',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      })
      .catch(error => {
        console.log(error);
        toast({
          title: 'An error occurred.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      });
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://todo-list-git-master-deepavishali.vercel.app/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
        toast({
          title: 'Todo deleted.',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      })
      .catch(error => {
        console.log(error);
        toast({
          title: 'An error occurred.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      });
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Todo List</Heading>
      <form onSubmit={handleNewTodoSubmit}>
        <Input
          type="text"
          placeholder="Enter a new todo..."
          value={newTodo}
          onChange={handleNewTodo}
          mr={2}
        />
        <Button type="submit" colorScheme="teal">
          Add Todo
        </Button>
      </form>
      {todos.map((todo) => (
        <Box key={todo._id} display="flex" alignItems="center">
          <Checkbox
            mr={2}
            isChecked={todo.completed}
            onChange={() => handleCheckboxClick(todo._id)}
          >
            {todo.text}
          </Checkbox>
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteClick(todo._id)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;





