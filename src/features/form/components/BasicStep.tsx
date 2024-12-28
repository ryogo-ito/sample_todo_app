import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const formMenu = [
  { label: 'First name', placeholder: 'First name' },
  { label: 'Last name', placeholder: 'Last name' },
];

export function BasicStep() {
  return (
    <FormControl>
      {formMenu.map((formItem, idx) => (
        <Box padding={2}>
          <FormLabel key={idx}>{formItem.label}</FormLabel>
          <Input placeholder={formItem.placeholder} />
        </Box>
      ))}
    </FormControl>
  );
}
