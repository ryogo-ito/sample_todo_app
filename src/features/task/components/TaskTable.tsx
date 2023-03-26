import {
  Button,
  Container,
  HStack,
  Input,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useTaskTable } from '../hooks/useTaskTable';
import { TodoTableItem } from './TodoTableItem';

export function TaskTable() {
  const {
    state: { input, todos },
    handlers: { handleInputTodoChange },
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
          <Button colorScheme="teal" isDisabled={!input}>
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
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo) => (
                <TodoTableItem todo={todo} key={todo.ID} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Container>
  );
}
