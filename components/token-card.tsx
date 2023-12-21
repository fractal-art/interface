import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import numeral from 'numeral'
import { useMemo } from 'react'

import { Button, Flex, Progress, Text } from '@chakra-ui/react'

dayjs.extend(relativeTime)

interface TokenCardProps {
  image: string
  name: string
  info: string
  fundedSymbol: string
  fundedAmount: number
  fundedValue: number
  fundedMaxAmount: number
  startDate: number
  endDate: number
}

const TokenCard = ({
  image,
  name,
  info,
  fundedSymbol,
  fundedAmount,
  fundedValue,
  fundedMaxAmount,
  startDate,
  endDate,
}: TokenCardProps) => {
  const progress = (fundedAmount / fundedMaxAmount) * 100

  const upcoming = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              / {numeral(fundedMaxAmount).format('0,0')} {fundedSymbol}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              Presale start in
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              {dayjs(dayjs.unix(startDate)).toNow(true)}
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="purple" value={progress} />
      </>
    )
  }, [fundedAmount, fundedMaxAmount, fundedSymbol, progress, startDate])

  const live = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              / {numeral(fundedMaxAmount).format('0,0')} {fundedSymbol}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="#FFF">
              ${numeral(fundedValue).format('0,0.00a')}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="purple" value={progress} />
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              {numeral(fundedAmount / fundedMaxAmount).format('0%')}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              funded
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="500" color="rgba(255, 255, 255, 0.80)">
              {dayjs(dayjs.unix(endDate)).toNow(true)}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              to go
            </Text>
          </Flex>
        </Flex>
      </>
    )
  }, [endDate, fundedAmount, fundedMaxAmount, fundedSymbol, fundedValue, progress])

  const success = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              Ended :
            </Text>
            <Text fontSize="14px" fontWeight="700" color="rgba(80, 255, 160, 0.80)">
              Success
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="green" value={progress} />
        <Button variant="primary" mt="8px">
          Claim
        </Button>
      </>
    )
  }, [fundedAmount, fundedSymbol, progress])

  const failed = useMemo(() => {
    return (
      <>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              Ended :
            </Text>
            <Text fontSize="14px" fontWeight="700" color="rgba(255, 141, 141, 0.80)">
              Failed
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Text fontSize="14px" fontWeight="700" color="primary">
              {numeral(fundedAmount).format('0,0')} {fundedSymbol}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(255, 255, 255, 0.61)">
              backed
            </Text>
          </Flex>
        </Flex>
        <Progress size="xs" colorScheme="red" value={progress} />
        <Button variant="primary" mt="8px">
          Refund
        </Button>
      </>
    )
  }, [fundedAmount, fundedSymbol, progress])

  const content = useMemo(() => {
    const now = dayjs().unix()
    const start = dayjs.unix(startDate).unix()
    const end = dayjs.unix(endDate).unix()

    if (now > end && progress !== 100) return failed
    if (progress === 100) return success
    if (now >= start && now <= end) return live
    return upcoming
  }, [endDate, failed, live, progress, startDate, success, upcoming])

  return (
    <Flex
      direction="column"
      p="24px"
      gap="32px"
      rounded="2px"
      bg="rgba(255, 255, 255, 0.03)"
      justifyContent="space-between"
    >
      <Flex direction="column" gap="16px">
        <Image src={image} alt={name} width={64} height={64} />
        <Flex direction="column">
          <Text fontSize="24px" fontWeight="500" color="#FFF">
            {name}
          </Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            color="rgba(255, 255, 255, 0.61)"
            noOfLines={2}
          >
            {info}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="8px">
        {content}
      </Flex>
    </Flex>
  )
}

export default TokenCard
