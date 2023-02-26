import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  HStack,
  IconButton,
  Input,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { TodoType } from "../types";
import { callCreateTodo } from "../api/createTodo";
import { callDeleteTodoList } from "../api/deleteTodoList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const TodoTable = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    (async () => {
      // const { todos, error } = await callGetTodoList();
      // if (error) {
      //   return;
      // }

      getDocs(collection(db, "todos")).then((snapShot) => {
        setTodos(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            complete: doc.data().complete,
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
          }))
        );
      });
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

    setTodos(todos);
  };

  const handleDeleteTodoButtonClick = async (id: string) => {
    const { todos, error } = await callDeleteTodoList(id);

    if (error) {
      return;
    }

    setTodos(todos);
  };

  const handleCompleteTodoCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setTodos(
      todos.map((todo) => {
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
            isDisabled={!Boolean(input)}
          >
            Create
          </Button>
        </HStack>

        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Todo list created by you</TableCaption>
            <Thead>
              <Tr>
                <Th>完了</Th>
                <Th>todo</Th>
                <Th>作成日</Th>
                <Th>最終更新日</Th>
                <Th>詳細</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onTodoCheckboxChange={handleCompleteTodoCheckChange}
                  onTodoDeleteButtonClick={handleDeleteTodoButtonClick}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Container>
  );
};

interface TodoProps {
  todo: TodoType;
  onTodoCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onTodoDeleteButtonClick: (id: string) => void;
}

const TodoItem = ({
  todo: { id, title, complete, createdAt, updatedAt },
  onTodoCheckboxChange,
  onTodoDeleteButtonClick,
}: TodoProps) => {
  return (
    <Tr>
      <Td>
        <Checkbox
          size="lg"
          onChange={(e) => onTodoCheckboxChange(e, id)}
          isChecked={complete}
        />
      </Td>
      <Td>{title}</Td>
      <Td>
        {format(createdAt, "MM月dd日 HH:mm:ss", {
          locale: ja,
        })}
      </Td>
      <Td>
        {format(updatedAt, "MM月dd日 HH:mm:ss", {
          locale: ja,
        })}
      </Td>
      <Td>
        <ButtonGroup variant="outline" spacing="3">
          <IconButton
            aria-label="edit"
            colorScheme="teal"
            icon={<EditIcon />}
          />
          <IconButton
            aria-label="delete"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() => onTodoDeleteButtonClick(id)}
            isDisabled={!complete}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
