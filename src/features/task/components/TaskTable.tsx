import { ChangeEvent, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

// import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TaskBase } from '../types';
// import { callGetTodoList } from '../api/getTodoList';
import { callCreateTodo } from '../api/createTodo';
import { callDeleteTodoList } from '../api/deleteTodoList';
import { db } from '../../../firebase';

export function TaskTable() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<TaskBase[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // const { todos, error } = await callGetTodoList();
      // if (error) {
      //   return;
      // }

      getDocs(collection(db, 'todos')).then((snapShot) => {
        setTodos(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            complete: doc.data().complete,
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
          })),
        );
      });
    })();
  }, []);

  const handleInputTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateTodoButtonClick = async () => {
    const { todos: createdTodos, error } = await callCreateTodo(input);
    if (error != null) {
      return;
    }

    setTodos(createdTodos);
  };

  const handleDeleteTodoButtonClick = async (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { todos, error } = await callDeleteTodoList(id);

    if (error != null) {
      return;
    }

    setTodos(todos);
  };

  const handleCompleteTodoCheckChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setTodos(
      todos.map((currentTodo) => {
        if (currentTodo.id === id) {
          currentTodo.complete = e.target.checked;
        }

        return currentTodo;
      }),
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
            placeholder="new todo?"
            onChange={handleInputTodoChange}
          />
          <Button
            colorScheme="teal"
            onClick={handleCreateTodoButtonClick}
            isDisabled={!input}
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
                <TaskItem
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
}

interface TaskProps {
  todo: TaskBase;
  onTodoCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => void;
  onTodoDeleteButtonClick: (id: string) => void;
}
function TaskItem({
  todo: { id, title, complete, createdAt, updatedAt },
  onTodoCheckboxChange,
  onTodoDeleteButtonClick,
}: TaskProps) {
  return (
    <Tr>
      <Td>
        <Checkbox
          size="lg"
          onChange={(e) => {
            onTodoCheckboxChange(e, id);
          }}
          isChecked={complete}
        />
      </Td>
      <Td>{title}</Td>
      <Td>
        {format(createdAt, 'MM月dd日 HH:mm:ss', {
          locale: ja,
        })}
      </Td>
      <Td>
        {format(updatedAt, 'MM月dd日 HH:mm:ss', {
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
            onClick={() => {
              onTodoDeleteButtonClick(id);
            }}
            isDisabled={!complete}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
}
