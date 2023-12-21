import { Box, Flex, Text } from '@chakra-ui/react'

export interface RoundButtonProps {
  round: number
  totalRound: number
}

const RoundButton = (props: RoundButtonProps) => {
  return (
    <Box>
      <Flex
        fontSize="14px"
        fontWeight="500"
        alignItems="center"
        gap="10px"
        bg="#fff"
        borderRadius="51px"
        px="8px"
        py="4px"
        w="100%"
        h="25px"
      >
        <Text as="span">
          Round {props?.round} / {props?.totalRound}
        </Text>
      </Flex>
    </Box>
  )
}

export default RoundButton
