import { Box, Flex, Text } from '@chakra-ui/react'

import dayjs, { Dayjs } from 'dayjs'

export interface RoundCardProps {
  round: number
  status?: string
  title: string
  totalItems: number
  date: Dayjs
}

const RoundCard = (props: RoundCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Ended':
        return 'rgba(0, 0, 0, 0.50)'
      case 'Active':
        return '#00AC6F'
      case 'Upcoming':
        return 'black'
      default:
        return 'black'
    }
  }

  return (
    <Flex
      w="100%"
      borderRadius="4px"
      border="1px solid rgba(0, 0, 0, 0.10)"
      justifyContent="space-between"
      alignItems="center"
      p="16px"
      mt="16px"
      bg={props?.status === 'Active' ? 'primary' : 'white'}
    >
      <Flex flexDir="column">
        <Flex mb="8px" w="100%" gap="8px">
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="10px"
            bg={props.status === 'Active' ? 'white' : 'rgba(0, 0, 0, 0.07)'}
            borderRadius="51px"
            px="8px"
            py="4px"
            h="22px"
          >
            <Text as="span" fontSize="14px" lineHeight="normal" fontWeight="500">
              Round {props.round}
            </Text>
            <Box w="2px" h="2px" bg="#000" p="2px" borderRadius="100%" />
            <Text
              as="span"
              fontSize="14px"
              lineHeight="normal"
              fontWeight="500"
              color={getStatusColor(props?.status)}
            >
              {props.status}
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" gap="8px">
            <Box w="2px" h="2px" bg="#000" p="2px" borderRadius="100%" />
            <Text as="span" fontSize="14px" lineHeight="normal">
              {dayjs(props.date).format('MMM DD, YYYY at hh:mma')}
            </Text>
          </Flex>
        </Flex>
        <Box fontSize="20px" fontWeight="500" lineHeight="normal" ml="10px">
          {props.title}
        </Box>
      </Flex>
      <Flex flexDir="column" alignItems="flex-end">
        <Text fontSize="24px" fontWeight="600" lineHeight="normal" mb="8px">
          {props.totalItems}
        </Text>
        <Box
          fontSize="14px"
          fontWeight="500"
          lineHeight="normal"
          color="rgba(0, 0, 0, 0.50)"
        >
          Items
        </Box>
      </Flex>
    </Flex>
  )
}

export default RoundCard
