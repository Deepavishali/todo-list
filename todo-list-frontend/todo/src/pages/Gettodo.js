import { useState, useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import Posttodo from "./Posttodo.mjs";

const Gettodo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = async (todoId, newValue) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: newValue,
          id: todoId
        }),
      });
      const data = await response.json();
      const updatedTodos = todos.map((todo) =>
        todo._id === data._id ? data : todo
      );
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <Posttodo addTodo={addTodo} />
      <Box>
        <Center>
          <Heading as="h1" size="xl" mb={8}>
            Todos
          </Heading>
        </Center>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Completed</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo) => (
              <Tr key={todo._id}>
                <Td>{todo.task}</Td>
                <Td>
                  <Checkbox
                    isChecked={todo.completed}
                    onChange={(e) => toggleCompleted(todo._id, e.target.checked)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan="2">
                {todos.length > 0 ? (
                  <Center>
                    <Heading as="h4" size="md" mt={8}>
                      You have {todos.length} todos
                    </Heading>
                  </Center>
                ) : (
                  <Center>
                    <Heading as="h4" size="md" mt={8}>
                      You have no todos
                    </Heading>
                  </Center>
                )}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default Gettodo;
