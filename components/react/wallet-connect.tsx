import React, { MouseEventHandler, ReactNode } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { WalletStatus } from '@cosmos-kit/core'

import { ConnectWalletType } from '../types'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export const ConnectWalletButton = ({
  buttonText,
  isLoading,
  isDisabled,
  onClickConnectBtn,
}: ConnectWalletType) => {
  return (
    <Button
      variant={buttonText?.toLowerCase() === 'connect' ? 'primary' : 'default'}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClickConnectBtn}
      px="6px"
    >
      {buttonText && buttonText?.length < 10 ? buttonText : <FaUserCircle />}
    </Button>
  )
}

export const Disconnected = ({
  buttonText,
  onClick,
}: {
  buttonText: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />
}

export const Connected = ({
  buttonText,
  onClick,
}: {
  buttonText: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  const router = useRouter()

  const onClickProfile = () => {
    router.push('/profile')
  }

  return (
    <Menu>
      <MenuButton as={Button}>{<FaUserCircle />}</MenuButton>
      <MenuList
        borderRadius="20px"
        border="1px solid rgba(0, 0, 0, 0.30);"
        boxShadow="0px 4px 29.1px 0px rgba(36, 46, 165, 0.32)"
        py="14px"
        px="6px"
      >
        <MenuItem disabled mb="5px">
          <Button variant="profile" onClick={onClickProfile}>
            <Box mr="10px">
              <FaUserCircle />
            </Box>
            {buttonText}
          </Button>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Button w="100%" justifyContent="flex-start">
            <Box mr="10px">
              <FaSignOutAlt />
            </Box>
            Disconnect
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  )
  // return <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />
}

export const Connecting = () => {
  return <ConnectWalletButton isLoading={true} />
}

export const Rejected = ({
  buttonText,
  wordOfWarning,
  onClick,
}: {
  buttonText: string
  wordOfWarning?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  const bg = useColorModeValue('orange.200', 'orange.300')

  return (
    <Stack>
      <ConnectWalletButton
        buttonText={buttonText}
        isDisabled={false}
        onClickConnectBtn={onClick}
      />
      {wordOfWarning && (
        <Stack
          isInline={true}
          borderRadius="md"
          bg={bg}
          color="blackAlpha.900"
          p={4}
          spacing={1}
        >
          <Icon as={FiAlertTriangle} mt={1} />
          <Text>
            <Text fontWeight="semibold" as="span">
              Warning:&ensp;
            </Text>
            {wordOfWarning}
          </Text>
        </Stack>
      )}
    </Stack>
  )
}

export const Error = ({
  buttonText,
  wordOfWarning,
  onClick,
}: {
  buttonText: string
  wordOfWarning?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  const bg = useColorModeValue('orange.200', 'orange.300')

  return (
    <Stack>
      <ConnectWalletButton
        buttonText={buttonText}
        isDisabled={false}
        onClickConnectBtn={onClick}
      />
      {wordOfWarning && (
        <Stack
          isInline={true}
          borderRadius="md"
          bg={bg}
          color="blackAlpha.900"
          p={4}
          spacing={1}
        >
          <Icon as={FiAlertTriangle} mt={1} />
          <Text>
            <Text fontWeight="semibold" as="span">
              Warning:&ensp;
            </Text>
            {wordOfWarning}
          </Text>
        </Stack>
      )}
    </Stack>
  )
}

export const NotExist = ({
  buttonText,
  onClick,
}: {
  buttonText: string
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <ConnectWalletButton
      buttonText={buttonText}
      isDisabled={false}
      onClickConnectBtn={onClick}
    />
  )
}

export const WalletConnectComponent = ({
  walletStatus,
  disconnect,
  connecting,
  connected,
  rejected,
  error,
  notExist,
}: {
  walletStatus: WalletStatus
  disconnect: ReactNode
  connecting: ReactNode
  connected: ReactNode
  rejected: ReactNode
  error: ReactNode
  notExist: ReactNode
}) => {
  switch (walletStatus) {
    case WalletStatus.Disconnected:
      return <>{disconnect}</>
    case WalletStatus.Connecting:
      return <>{connecting}</>
    case WalletStatus.Connected:
      return <>{connected}</>
    case WalletStatus.Rejected:
      return <>{rejected}</>
    case WalletStatus.Error:
      return <>{error}</>
    case WalletStatus.NotExist:
      return <>{notExist}</>
    default:
      return <>{disconnect}</>
  }
}
