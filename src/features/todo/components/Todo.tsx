import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  HStack,
  Input,
  List,
  ListItem,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { TodoType } from "../types";
import { callGetTodoList } from "../api/getTodoList";
import { callCreateTodo } from "../api/createTodo";

export const Todo = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  useEffect(() => {
    (async () => {
      const { todos, error } = await callGetTodoList();
      if (error) {
        return;
      }

      setTodoList(todos);
    })();
  }, []);

  const handleInputTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateTodoButtonClick = async () => {
    const { todos, error } = await callCreateTodo(input);
    if (error) {
      return;
    }

    setTodoList(todos);
  };

  const handleDeleteTodoButtonClick = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodoCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.complete = e.target.checked;
        }
        return todo;
      })
    );
  };

  return (
    <Container maxW="container.xl">
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
        <HStack>
          <Input
            value={input}
            variant="filled"
            size="lg"
            placeholder={"new todo?"}
            onChange={handleInputTodoChange}
          />
          <Button
            colorScheme="teal"
            onClick={handleCreateTodoButtonClick}
            isDisabled={Boolean(input === "")}
          >
            Create
          </Button>
        </HStack>
        <List spacing={3}>
          {todoList.map((todo) => (
            <HStack key={todo.id}>
              <Checkbox
                size="lg"
                isChecked={todo.complete}
                onChange={(e) => handleCompleteTodoCheckChange(e, todo.id)}
              />
              <ListItem>{todo.title}</ListItem>
              <ButtonGroup variant="outline" spacing="3">
                <Button colorScheme="teal">Edit</Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteTodoButtonClick(todo.id)}
                  isDisabled={!todo.complete}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </HStack>
          ))}
        </List>
      </VStack>
    </Container>
  );
};