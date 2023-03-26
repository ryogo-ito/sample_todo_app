import { ButtonGroup, Checkbox, IconButton, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Todo } from '../types';

interface Props {
  todo: Todo;
}

export function TodoTableItem({ todo: { name, completed } }: Props) {
  return (
    <Tr>
      <Td>
        <Checkbox size="lg" isChecked={completed} />
      </Td>
      <Td>{name}</Td>
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
            isDisabled={!completed}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
}
