import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from '@chakra-ui/react'

import dayjs from 'dayjs'
import { useState } from 'react'

import Countdown from '../../components/countdown'
import LiveButton from '../../components/live-button'
import RoundButton from '../../components/round-button'
import RoundCard from '../../components/round-card'

const Collections = () => {
  const [amount, setAmount] = useState(1)

  const totalItems = 1000
  const minted = 666

  const handleAmount = (type: 'add' | 'sub') => {
    if (type === 'add') {
      setAmount(amount + 1)
    } else {
      if (amount === 1) return
      setAmount(amount - 1)
    }
  }

  return (
    <>
      <Box
        w="100%"
        h="180px"
        bgImage="https://plus.unsplash.com/premium_photo-1680677525156-9be8c358da33?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        bgPosition="center"
      >
        <Box>
          <Container maxW="container.xl" py={['44px', '80px']}>
            <Flex
              gap="84px"
              w="100%"
              h="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Flex flexDir="column" w="100%">
                <Box
                  w="160px"
                  h="160px"
                  bg="#fff"
                  borderRadius="16px"
                  border="2px solid rgba(0, 0, 0, 0.10)"
                  p="16px"
                  mb="24px"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width="128px"
                    height="128px"
                    border="1px solid #000"
                    borderRadius="4px"
                    objectFit="cover"
                  />
                </Box>
                <Text
                  as="div"
                  fontSize="32px"
                  lineHeight="normal"
                  fontWeight="500"
                  mb="8px"
                >
                  Exclusive Equipment Card Pack
                </Text>
                <Text
                  as="div"
                  fontSize="14px"
                  lineHeight="normal"
                  fontWeight="500"
                  color="rgba(0, 0, 0, 0.70)"
                >
                  by{' '}
                  <Text as="span" color="#000">
                    @eartspliter
                  </Text>
                </Text>
                <Divider mt="52px" />
                <Box mt="52px">
                  <Text
                    color="rgba(0, 0, 0, 0.70)"
                    fontSize="20px"
                    fontWeight="500"
                    lineHeight="normal"
                  >
                    Minting Schedule
                  </Text>
                </Box>
                <Grid userSelect="none">
                  <RoundCard
                    round={1}
                    title="Whitelist"
                    status="Ended"
                    totalItems={500}
                    date={dayjs()}
                  />
                  <RoundCard
                    round={2}
                    title="Pre-sale"
                    status="Active"
                    totalItems={1000}
                    date={dayjs()}
                  />
                  <RoundCard
                    round={3}
                    title="Extra Airdrop"
                    status="Upcoming"
                    totalItems={10000}
                    date={dayjs()}
                  />
                </Grid>
              </Flex>
              <Flex
                w="100%"
                justifyContent="flex-end"
                outline="4px solid rgba(0, 0, 0, 0.20)"
                borderRadius="16px"
              >
                <Box
                  w="100%"
                  h="691px"
                  borderRadius="16px"
                  bgImage="https://images.unsplash.com/photo-1702501725302-aff7c7c8c965?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  bgPosition="center"
                  position="relative"
                >
                  <Box position="absolute" right="24px" top="24px" zIndex={1}>
                    <LiveButton />
                  </Box>
                  <Container
                    position="absolute"
                    left="0px"
                    top="285px"
                    px="24px"
                    zIndex={1}
                  >
                    <Flex alignItems="center" gap="8px" mb="8px">
                      <RoundButton round={1} totalRound={3} />
                      <Box w="2px" h="2px" bg="#D9D9D9"></Box>
                      <Text color="rgba(255, 255, 255, 0.80)">
                        {totalItems} Items
                      </Text>
                    </Flex>
                    <Text
                      as="div"
                      fontSize="32px"
                      fontWeight="500"
                      color="#fff"
                      mb="8px"
                      lineHeight="normal"
                    >
                      Exclusive Equipment Card Pack
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="500"
                      color="rgba(255, 255, 255, 0.70)"
                      mr="7px"
                    >
                      by
                    </Text>
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="500"
                      color="#fff"
                      cursor="pointer"
                    >
                      @eartspliter
                    </Text>
                    <Divider bg="rgba(255, 255, 255, 0.24)" my="12px" w="100%" />
                    <Text
                      as="div"
                      fontSize="14px"
                      fontWeight="500"
                      color="rgba(255, 255, 255, 0.80)"
                    >
                      Sale ends in
                    </Text>
                    <Container p="0" mt="8px">
                      <Flex justifyContent="space-between" gap="8px">
                        <Countdown value={1} unit="Days" />
                        <Countdown value={23} unit="Hrs" />
                        <Countdown value={56} unit="Mins" />
                        <Countdown value={59} unit="Secs" />
                      </Flex>
                    </Container>
                  </Container>
                  <Container
                    position="absolute"
                    p="0"
                    bg="rgba(255, 255, 255, 0.10)"
                    backdropFilter="blur(10px)"
                    w="100%"
                    h="158px"
                    bottom="0"
                    borderBottomRadius="16px"
                    borderTop="1px solid rgba(255, 255, 255, 0.24)"
                    px="24px"
                    zIndex={1}
                  >
                    <Flex
                      flexDir="column"
                      justifyContent="center"
                      h="100%"
                      w="100%"
                      gap="24px"
                    >
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
                            {minted} / {totalItems} Items
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
                            w={`${(minted / totalItems) * 100}%`}
                            bg="primary"
                            borderRadius="2px"
                          />
                        </Flex>
                      </Flex>
                      <Flex w="100%" justifyContent="space-between" gap="16px">
                        <Flex>
                          <Box
                            borderRadius="4px"
                            backdropBlur="10px"
                            border="1px solid rgba(255, 255, 255, 0.14)"
                            bg="rgba(255, 255, 255, 0.10)"
                            minW="142px"
                            w="100%"
                          >
                            <Flex
                              justifyContent="space-around"
                              alignItems="center"
                              h="100%"
                              w="100%"
                            >
                              <Flex
                                borderRadius="4px"
                                bg="rgba(255, 255, 255, 0.10)"
                                w="24px"
                                h="24px"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                                onClick={() => handleAmount('sub')}
                              >
                                <Text
                                  fontSize="14px"
                                  lineHeight="normal"
                                  color="#fff"
                                  userSelect="none"
                                >
                                  -
                                </Text>
                              </Flex>
                              <Flex>
                                <Text
                                  fontSize="24px"
                                  lineHeight="normal"
                                  fontWeight="600"
                                  color="#fff"
                                  userSelect="none"
                                >
                                  {amount}
                                </Text>
                              </Flex>
                              <Flex
                                borderRadius="4px"
                                bg="rgba(255, 255, 255, 0.10)"
                                w="24px"
                                h="24px"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                                onClick={() => handleAmount('add')}
                              >
                                <Text
                                  fontSize="14px"
                                  lineHeight="normal"
                                  color="#fff"
                                  userSelect="none"
                                >
                                  +
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                        <Button variant="primary" h="54px" w="100%">
                          <Flex
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text as="span" fontSize="16px" fontWeight="500">
                              Mint now
                            </Text>
                            <Box
                              bg="rgba(0, 0, 0, 0.10)"
                              borderRadius="4px"
                              backdropBlur="10px"
                              p="4px 8px"
                            >
                              <Text
                                fontSize="12px"
                                fontWeight="600"
                                lineHeight="normal"
                              >
                                0.05 INJ
                              </Text>
                            </Box>
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
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Collections
