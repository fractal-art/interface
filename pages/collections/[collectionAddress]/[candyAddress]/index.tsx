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
import { useEffect, useMemo, useState } from 'react'

import Countdown from '../../../../components/countdown'
import LiveButton from '../../../../components/live-button'
import RoundButton from '../../../../components/round-button'
import RoundCard from '../../../../components/round-card'
import { useRouter } from 'next/router'
import { useNft } from '../../../../hooks/useNft'
import { useCandyMachine } from '../../../../hooks/useCandyMachine'
import { useChainWallet } from '@cosmos-kit/react'
import { chainName } from '../../../../config'
import { BigNumberInBase, BigNumberInWei } from '@injectivelabs/utils'
import { collectionListMock } from '../../../../mock/collection'
import { useCountDown } from '../../../../hooks/useCountDown'
import { toast } from 'react-toastify'
import { store } from '../../../../utils/stroe'

const CollectionDetail = () => {
  const { address } = useChainWallet(chainName, 'keplr-extension', false)
  const [amount, setAmount] = useState(1)
  const router = useRouter()

  const { mint, checkEligible, info } = useCandyMachine()
  const { queryContractInfo, queryMinter, queryNftInfo } = useNft()

  const [contractInfo, setContractInfo] = useState<any>({})
  const [nft, setNft] = useState<any>({})
  const [candyInfo, setCandyInfo] = useState<any>({})
  const [eligible, setEligible] = useState<any>(null)

  const collection = useMemo(
    () =>
      store
        .get()
        ?.find(
          (item: any) =>
            item.candyAddress === router.query?.candyAddress?.toString() &&
            item.collectionAddress === router.query?.collectionAddress?.toString()
        ),
    [router.query?.candyAddress, router.query?.collectionAddress]
  )

  const round = useMemo(() => {
    if (collection) {
      return collection?.rounds?.find((item: any) => {
        if (item?.isOpen) {
          return item
        }
      })
    }
  }, [collection])

  const { d, h, m, s } = useCountDown(round?.endDate!)

  const queryInfo = async () => {
    // const contractInfo = await queryContractInfo({
    //   collection: router.query?.collectionAddress?.toString()!,
    // })
    // const minter = await queryMinter({
    //   collection: router.query?.collectionAddress?.toString()!,
    // })
    // setContractInfo({ ...contractInfo, ...minter })
    // const nftPreShow = await queryNftInfo({
    //   collection: router.query?.collectionAddress?.toString()!,
    //   tokenId: '1',
    // })
    // setNft(nftPreShow)
  }

  const queryEligible = async () => {
    try {
      const { data, info } = await checkEligible(
        router.query?.candyAddress?.toString()!
      )

      setCandyInfo(info)
      setEligible(data)
    } catch (error) {
      console.error(error)
      toast(`Query chain failed, please refresh`, {
        type: 'error',
        position: 'bottom-right',
        theme: 'dark',
      })
    }
  }

  useEffect(() => {
    queryInfo()
  }, [router.query])

  useEffect(() => {
    if (address && router.query?.candyAddress) {
      queryEligible()
    }
  }, [address, router.query?.candyAddress])

  const handleAmount = (type: 'add' | 'sub') => {
    if (type === 'add') {
      setAmount(amount + 1)
    } else {
      if (amount === 1) return
      setAmount(amount - 1)
    }
  }

  const handleMint = async () => {
    try {
      await mint(router.query?.candyAddress?.toString()!, candyInfo?.mint_asset)
      toast('Mint Success', {
        type: 'success',
        position: 'bottom-right',
        theme: 'dark',
      })
    } catch (err) {
      toast(`Mint Fail, please try again`, {
        type: 'error',
        position: 'bottom-right',
        theme: 'dark',
      })
    }
  }

  return (
    <>
      <Box w="100%" h="180px" bgImage={collection?.cover} bgPosition="center">
        {/* <Box w="100%" h="180px" bgImage={nft?.extension?.image || collection?.cover} bgPosition="center"> */}
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
                    // src={nft?.extension?.image}
                    src={collection?.cover}
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
                  {collection?.name}
                  {/* {contractInfo?.name} */}
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
                    {collection?.owner}
                    {/* {contractInfo?.minter} */}
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
                  {collection?.rounds?.map((item: any, idx: number) => {
                    return (
                      <RoundCard
                        key={idx}
                        round={item.round}
                        title={`${item.name}`}
                        status={
                          item?.isOpen
                            ? 'Active'
                            : dayjs(item.endDate).isAfter(dayjs())
                              ? 'Upcoming'
                              : 'Ended'
                        }
                        totalItems={item.totalSupply}
                        date={dayjs(item.endDate)}
                      />
                    )
                  })}
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
                  // bgImage={nft?.extension?.image}
                  bgImage={collection?.cover}
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
                        {round?.totalSupply} Items
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
                      {contractInfo?.name}
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
                      {collection?.owner}
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
                        <Countdown value={d} unit="Days" />
                        <Countdown value={h} unit="Hrs" />
                        <Countdown value={m} unit="Mins" />
                        <Countdown value={s} unit="Secs" />
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
                            {collection?.mint} / {round?.totalSupply} Items
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
                            w={`${(collection?.mint! / round?.totalSupply!) * 100}%`}
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
                        <Button
                          variant={
                            !candyInfo?.enable_whitelist
                              ? 'primary'
                              : Boolean(eligible)
                                ? 'primary'
                                : undefined
                          }
                          h="54px"
                          w="100%"
                          onClick={
                            !candyInfo?.enable_whitelist
                              ? handleMint
                              : Boolean(eligible)
                                ? handleMint
                                : undefined
                          }
                          disabled={
                            !candyInfo?.enable_whitelist ? false : !Boolean(eligible)
                          }
                          cursor={
                            !candyInfo?.enable_whitelist
                              ? 'pointer'
                              : Boolean(eligible)
                                ? 'pointer'
                                : 'not-allowed'
                          }
                        >
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
                                {candyInfo?.mint_asset?.amount &&
                                  new BigNumberInWei(candyInfo?.mint_asset?.amount)
                                    .toBase()
                                    .toFixed()}{' '}
                                INJ
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

export default CollectionDetail
