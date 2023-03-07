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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TaskBase } from '../types';
import { useTaskTable } from '../hooks/useTaskTable';

export function TaskTable() {
  const {
    state: { input, tasks },
    handlers: {
      handleDeleteTodoButtonClick,
      handleCreateTodoButtonClick,
      handleCompleteTodoCheckChange,
      handleInputTodoChange,
    },
  } = useTaskTable();

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
              {tasks.map((todo) => (
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
