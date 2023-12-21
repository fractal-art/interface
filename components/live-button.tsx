import { Box, Flex, Text } from '@chakra-ui/react'

const LiveButton = () => {
  return (
    <Box px="12px" py="8px">
      <Flex
        color="#FF5050"
        fontSize="20px"
        fontWeight="500"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        bg="#fff"
        borderRadius="51px"
        w="87px"
        h="40px"
        animation="live-pulse 2s infinite"
      >
        <Box bg="#FF5050" rounded="200%" w="12px" h="12px"></Box>
        <Text>LIVE</Text>
      </Flex>
    </Box>
  )
}

export default LiveButton
