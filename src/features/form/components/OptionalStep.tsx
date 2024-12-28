import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

export function OptionalStep() {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input placeholder="Email" />

      <RadioGroup defaultValue="male" padding={4}>
        <HStack spacing="24px">
          <Radio value="male">男性</Radio>
          <Radio value="female">女性</Radio>
          <Radio value="other">その他</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  );
}
