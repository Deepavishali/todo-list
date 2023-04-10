import { ChakraProvider } from "@chakra-ui/react";
import TodoList from "./TodoList.js";

const initialTodos = [
  { _id: "1", text: "Learn React", completed: false },
  { _id: "2", text: "Build a Todo app", completed: false },
  { _id: "3", text: "Deploy the app", completed: false }
];

function App() {
  return (
    <ChakraProvider>
      <TodoList initialTodos={initialTodos} />
    </ChakraProvider>
  );
}

export default App;



