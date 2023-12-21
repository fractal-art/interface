import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, useRef } from 'react'
import { FiMenu } from 'react-icons/fi'

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { WalletStatus } from '@cosmos-kit/core'
import { useChain } from '@cosmos-kit/react'

import { chainName } from '../../config'
import { shortenAddress } from '../../utils/format'

import {
  Connected,
  Connecting,
  Disconnected,
  Error,
  NotExist,
  Rejected,
  WalletConnectComponent,
} from '../react'

import { Logo } from './logo'
import { SearchIcon } from '@chakra-ui/icons'

export const Navbar = () => {
  const { connect, openView, status, address } = useChain(chainName)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const router = useRouter()

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault()
    await connect()
  }

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault()
    openView()
  }

  const handleClickManage = () => {
    router.push('/manage')
  }

  const handleClickCreate = () => {
    router.push('/create')
  }

  return (
    <>
      <Box borderBottom="1px" borderColor="#000" bg="white" userSelect="none">
        <Container maxW="container.xl" py="12px">
          <Grid
            templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
            alignItems="center"
            justifyContent="space-between"
          >
            <GridItem>
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                gap="24px"
                fontSize="14px"
              >
                <Logo />
                <Flex gap="16px" fontWeight="500">
                  <NextLink href="/launchpads">
                    <Link color="#000">Launchpads</Link>
                  </NextLink>
                  <NextLink href="/launchpads">
                    <Link color="#000">Collections</Link>
                  </NextLink>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem display={['none', 'flex']} gap="24px" justifySelf="center">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="#000" opacity="0.5" />
                </InputLeftElement>
                <Input
                  bg="rgba(0, 0, 0, 0.05)"
                  borderRadius="62px"
                  type="tel"
                  placeholder="Search web3"
                  focusBorderColor="primary"
                  _placeholder={{ opacity: 0.5, color: 'inherit' }}
                />
              </InputGroup>
            </GridItem>
            <GridItem display="flex" gap="16px" justifySelf="flex-end">
              {status === WalletStatus.Connected && (
                <Button
                  variant="primary"
                  display={['none', 'block']}
                  onClick={handleClickCreate}
                >
                  Create
                </Button>
              )}
              <WalletConnectComponent
                walletStatus={status}
                disconnect={
                  <Disconnected buttonText="Connect" onClick={onClickConnect} />
                }
                connecting={<Connecting />}
                connected={
                  <Connected
                    buttonText={shortenAddress(address)}
                    onClick={onClickOpenView}
                  />
                }
                rejected={
                  <Rejected buttonText="Reconnect" onClick={onClickConnect} />
                }
                error={
                  <Error buttonText="Change Wallet" onClick={onClickOpenView} />
                }
                notExist={
                  <NotExist buttonText="Install Wallet" onClick={onClickOpenView} />
                }
              />
              <Button variant="primary" display={['block', 'none']} onClick={onOpen}>
                <FiMenu />
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent minW="full">
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="8px">
              {status === WalletStatus.Connected && (
                <Button variant="primary" w="full" onClick={handleClickManage}>
                  Manage
                </Button>
              )}
              <NextLink href="/">
                <Button w="full">Explore</Button>
              </NextLink>
              <NextLink href="/new">
                <Button w="full">Start new project</Button>
              </NextLink>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
