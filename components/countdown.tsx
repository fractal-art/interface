import { Box, Flex, Text } from '@chakra-ui/react'

export interface CountdownProps {
  unit: string
  value: number
}
const Countdown = (props: CountdownProps) => {
  return (
    <Flex
      borderRadius="4px"
      py="8px"
      px="16px"
      border="1px solid rgba(255, 255, 255, 0.14)"
      bg="rgba(255, 255, 255, 0.10)"
      backdropFilter="blur(10px)"
      w="100%"
      minW="86px"
      h="64px"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      userSelect="none"
    >
      <Text
        as="div"
        align="center"
        fontSize="24px"
        color="#fff"
        fontWeight="600"
        lineHeight="normal"
      >
        {props?.value}
      </Text>
      <Text
        as="div"
        align="center"
        fontSize="14px"
        color="rgba(255, 255, 255, 0.50)"
        fontWeight="500"
        lineHeight="normal"
      >
        {props?.unit}
      </Text>
    </Flex>
  )
}

export default Countdown
