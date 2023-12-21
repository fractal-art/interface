import dynamic from 'next/dynamic'

import {
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Link,
  Box,
  Grid,
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const LaunchpadCard = dynamic(import('../components/launchpad-card'), { ssr: false })
const CollectionCard = dynamic(import('../components/collection-card'), {
  ssr: false,
})
const LivedropGroup = dynamic(import('../components/livedrop-group'), { ssr: false })

import { store } from '../utils/stroe'

export default function Home() {
  return (
    <>
      <Box bg="linear-gradient(180deg, rgba(255, 207, 66, 0.99) 0%, rgba(255, 207, 66, 0.00) 100%);">
        <Container maxW="container.xl" py={['44px', '50px']}>
          <Flex direction="column">
            <Flex
              direction={['column', 'row']}
              alignItems={[null, 'flex-end']}
              justifyContent="space-between"
              gap="24px"
            >
              <Flex direction="column" gap="8px">
                <Text fontSize="36px" fontWeight="500">
                  Explore NFT Drops Now
                </Text>
                <Text fontSize="20px" fontWeight="400">
                  Explore NFT Drops Now
                </Text>
              </Flex>
              <Flex
                direction="row"
                p="8px"
                bg="rgba(255, 255, 255, 0.03)"
                rounded="2px"
              >
                <Button
                  bg="#fff"
                  color="#000"
                  fontSize="12px"
                  fontWeight="500"
                  p="8px 16px"
                  h="32px"
                  minW="201px"
                >
                  <NextLink href="/create">
                    <Link color="#000">
                      <Flex alignItems="center">
                        <Text fontWeight="500" mr="8px">
                          Apply for launchpad now
                        </Text>
                        <ArrowForwardIcon />
                      </Flex>
                    </Link>
                  </NextLink>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
        <Divider
          orientation="horizontal"
          borderBottom="2px"
          borderColor="rgba(0, 0, 0, 0.05)"
        />
        <Container maxW="container.xl" py={['24px', '24px']}>
          <Flex direction="column">
            <Flex
              direction={['column', 'row']}
              alignItems={[null, 'flex-end']}
              justifyContent="space-between"
              gap="24px"
            >
              <Flex direction="column" gap="8px">
                <Text fontSize="24px" fontWeight="500">
                  Whitelist round
                </Text>
              </Flex>
              <Flex
                direction="row"
                p="8px"
                bg="rgba(255, 255, 255, 0.03)"
                rounded="2px"
              >
                <NextLink href="/launchpads">
                  <Link color="#000">
                    <Flex alignItems="center">
                      <Text fontWeight="500" mr="8px">
                        See more
                      </Text>
                      <ArrowForwardIcon />
                    </Flex>
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Container>
        <LivedropGroup />
      </Box>
      <Box bg="#fff">
        <Container maxW="container.xl" py={['24px', '24px']}>
          <Flex direction="column" mb="28px">
            <Flex
              direction={['column', 'row']}
              alignItems={[null, 'flex-end']}
              justifyContent="space-between"
              gap="24px"
            >
              <Flex direction="column" gap="8px">
                <Text fontSize="24px" fontWeight="500">
                  Public round
                </Text>
              </Flex>
              <Flex
                direction="row"
                p="8px"
                bg="rgba(255, 255, 255, 0.03)"
                rounded="2px"
              >
                <NextLink href="/launchpads">
                  <Link color="#000">
                    <Flex alignItems="center">
                      <Text fontWeight="500" mr="8px">
                        Discover more
                      </Text>
                      <ArrowForwardIcon />
                    </Flex>
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap="16px"
          >
            {store
              .get()
              ?.filter((item: any) => {
                const currRound = item.rounds.find(
                  (r: any) => !r.enableWhitelist && r.isOpen
                )
                return Boolean(currRound) && !item?.ended
              })
              .map((item: any, idx: number) => {
                const currRound = item.rounds.find((r: any) => r.isOpen)

                return (
                  <LaunchpadCard
                    key={idx}
                    round={currRound}
                    imageUrl={item?.cover}
                    totalItems={item?.totalSupply}
                    totalRound={item?.rounds.length}
                    collectionAddress={item.collectionAddress}
                    candyAddress={item.candyAddress}
                    name={item.name}
                    owner={item.owner}
                    mint={item.mint}
                    amount={item.amonut}
                  />
                )
              })}
          </Grid>
        </Container>
        <Container maxW="container.xl" py={['24px', '24px']} mb="24px">
          <Flex direction="column" mb="28px">
            <Flex
              direction={['column', 'row']}
              alignItems={[null, 'flex-end']}
              justifyContent="space-between"
              gap="24px"
            >
              <Flex direction="column" gap="8px">
                <Text fontSize="24px" fontWeight="500">
                  Ended
                </Text>
              </Flex>
              <NextLink href="/launchpads">
                <Link color="#000">
                  <Flex alignItems="center">
                    <Text fontWeight="500" mr="8px">
                      Discover more
                    </Text>
                    <ArrowForwardIcon />
                  </Flex>
                </Link>
              </NextLink>
            </Flex>
          </Flex>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
            gap="16px"
          >
            {store
              .get()
              ?.filter((item: any) => {
                return item?.ended
              })
              .map((item: any, idx: any) => {
                return (
                  <CollectionCard
                    key={idx}
                    imageUrl={item.cover}
                    name={item.name}
                    owner={item.owner}
                  />
                )
              })}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
