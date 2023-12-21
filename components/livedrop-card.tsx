import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import Countdown from './countdown'

import LiveButton from './live-button'
import RoundButton from './round-button'
import { useRouter } from 'next/router'
import { useCountDown } from '../hooks/useCountDown'

export interface LivedropCardProps {
  totalItems: number
  round: any
  totalRound: number
  mint: number
  imageUrl: string
  amount: number
  collectionAddress: string
  candyAddress: string
  owner: string
  name: string
}

const LivedropCard = (props: any) => {
  const { push } = useRouter()
  const { d, h, m, s } = useCountDown(props?.round?.endDate)

  return (
    <Box
      w="1034px"
      h="562px"
      borderRadius="16px"
      outline="4px solid rgba(0, 0, 0, 0.20);"
      bgImage={props?.imageUrl}
      bgPosition="center"
      position="relative"
      my="4px"
    >
      <Box position="absolute" right="24px" top="24px" zIndex={1}>
        <LiveButton />
      </Box>
      <Container
        position="absolute"
        left="0px"
        top="320px"
        px="24px"
        zIndex={1}
        minW="100%"
      >
        <Flex justifyContent="space-between" alignItems="flex-end" w="100%">
          <Box>
            <Flex alignItems="center" gap="8px" mb="8px">
              <RoundButton
                round={props?.round?.round}
                totalRound={props?.totalRound}
              />
              <Box w="2px" h="2px" bg="#D9D9D9"></Box>
              <Text color="rgba(255, 255, 255, 0.80)">
                {props?.round?.totalSupply} Items
              </Text>
            </Flex>
            <Text
              as="div"
              fontSize="32px"
              fontWeight="500"
              color="#fff"
              mb="8px"
              lineHeight="normal"
              align="left"
            >
              {props.name}
            </Text>
            <Text
              as="div"
              fontSize="14px"
              fontWeight="500"
              color="rgba(255, 255, 255, 0.70)"
              mr="7px"
              lineHeight="normal"
              align="left"
            >
              by &nbsp;
              <Text
                as="span"
                fontSize="14px"
                fontWeight="500"
                color="#fff"
                cursor="pointer"
                lineHeight="normal"
              >
                {props.owner}
              </Text>
            </Text>
          </Box>
          <Flex flexDir="column">
            <Text
              align="end"
              as="div"
              fontSize="14px"
              fontWeight="500"
              color="rgba(255, 255, 255, 0.80)"
              lineHeight="normal"
            >
              Sale ends in
            </Text>
            <Container p="0" mt="8px">
              <Flex justifyContent="space-between" gap="8px">
                <Countdown value={d} unit="Days" />
                <Countdown value={h} unit="Hrs" />
                <Countdown value={m} unit="Mins" />
                <Countdown value={s} unit="Secs" />
              </Flex>
            </Container>
          </Flex>
        </Flex>
      </Container>
      <Container
        position="absolute"
        p="0"
        bg="rgba(255, 255, 255, 0.10)"
        backdropFilter="blur(10px)"
        minW="100%"
        h="80px"
        bottom="0"
        borderBottomRadius="16px"
        borderTop="1px solid rgba(255, 255, 255, 0.24)"
        px="24px"
        zIndex={1}
      >
        <Flex alignItems="center" h="100%" w="100%" gap="24px">
          <Flex alignItems="flex-start" flexDir="column" w="100%">
            <Flex justifyContent="space-between" w="100%">
              <Text
                as="div"
                fontSize="14px"
                fontWeight="500"
                color="rgba(255, 255, 255, 0.50)"
                mr="8px"
                lineHeight="normal"
              >
                Total mint
              </Text>
              <Text
                as="div"
                fontSize="14px"
                fontWeight="500"
                color="rgba(255, 255, 255, 0.50)"
                lineHeight="normal"
              >
                {props?.mint} / {props?.round?.totalSupply} Items
              </Text>
            </Flex>
            <Flex
              justifyContent="flex-start"
              mt="8px"
              w="100%"
              bg="rgba(255, 255, 255, 0.10)"
            >
              <Box
                h="8px"
                w={`${(props?.mint / props?.round?.totalSupply) * 100}%`}
                bg="primary"
                borderRadius="2px"
              />
            </Flex>
          </Flex>
          <Flex minH="100%" justifyContent="flex-end" alignItems="center">
            <Button
              h="32px"
              onClick={() =>
                push(`/collections/${props.collectionAddress}/${props.candyAddress}`)
              }
            >
              <Flex alignItems="center">
                <Text as="div" mr="10px">
                  Mint now {props?.amount.toFixed(2)} INJ
                </Text>
                <ArrowForwardIcon />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Container>
      <Box
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.84) 100%);"
        position="absolute"
        w="100%"
        height="100%"
        top="0"
        left="0"
        borderBottomRadius="16px"
      />
    </Box>
  )
}

export default LivedropCard
