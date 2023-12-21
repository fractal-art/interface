import dynamic from 'next/dynamic'

import { Button, Container, Divider, Flex, Text, Box, Grid } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useMemo, useState } from 'react'
import { collectionListMock } from '../mock/collection'
import { store } from '../utils/stroe'

const LaunchpadCard = dynamic(import('../components/launchpad-card'), { ssr: false })
const SwitchGroup = dynamic(import('../components/switch-group'), { ssr: false })

enum Menu {
  All = 'All',
  Live = 'Live & Upcoming',
  Past = 'Past',
}

export default function Launchpad() {
  const titleList = [Menu.All, Menu.Live, Menu.Past]
  const [active, setActive] = useState(titleList[0])

  const collectionList = useMemo(
    () =>
      store.get().filter((item: any) => {
        if (active === Menu.All) {
          return true
        }
        if (active === Menu.Live) {
          return !item.ended
        }
        if (active === Menu.Past) {
          return item.ended
        }
      }),
    [active]
  )

  const onChange = (active: Menu) => {
    setActive(active)
  }

  return (
    <>
      <Box bg="primary">
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
                  <Text mr="10px">Apply for launchpad now</Text>
                  <ArrowForwardIcon />
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
      </Box>
      <Box bg="#fff">
        <Container maxW="container.xl" py={['24px', '24px']} mt="27px">
          <SwitchGroup title={titleList} active={active} onChange={onChange} />
          <Divider mb="28px" />
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap="16px"
          >
            {collectionList?.map((item: any, idx: number) => {
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
                  endded={item?.ended}
                  amount={item.amonut}
                />
              )
            })}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
