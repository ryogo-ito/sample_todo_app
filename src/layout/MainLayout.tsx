import React, { useRef } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

function AppDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        aria-label="drawer_open"
      >
        <ArrowRightIcon />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function Header() {
  return (
    <Box px={4} mb={7} bgColor="gray.100">
      <Flex as="header" py="4" alignItems="center">
        <AppDrawer />
      </Flex>
    </Box>
  );
}

interface Props {
  children: React.ReactNode;
}
export function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
