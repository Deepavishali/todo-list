import { useState } from "react";
import {
  Box,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
} from "@chakra-ui/react";

const Posttodo = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, isCompleted }),
      });

      const data = await response.json();
      addTodo(data);
      setTask("");
      setIsCompleted(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box mb={8}>
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="task" isRequired>
            <FormLabel>Task</FormLabel>
            <Input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </FormControl>
          <FormControl id="isCompleted" mt={4}>
            <Checkbox
              isChecked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            >
              Completed
            </Checkbox>
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Add Task
          </Button>
        </form>
      </Center>
    </Box>
  );
};

export default Posttodo;
