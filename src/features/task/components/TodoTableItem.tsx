import { ButtonGroup, Checkbox, IconButton, Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoTableItem({
  todo: { id, name, completed },
  onComplete,
  onDelete,
}: Props) {
  return (
    <Tr>
      <Td>
        <Checkbox
          size="lg"
          isChecked={completed}
          onChange={() => onComplete(id)}
        />
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
            onClick={() => onDelete(id)}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
}
