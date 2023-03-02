import { Container, VStack, Text, Textarea, Button } from '@chakra-ui/react';

export function TodoDetail() {
  return (
    <Container maxW="container.xl">
      <VStack>
        <Text fontSize="6xl">テキスト</Text>
        <Textarea />
        <Button colorScheme="teal">保存</Button>
      </VStack>
    </Container>
  );
}
