import { Box, Container, Text } from '@chakra-ui/react'

export interface CollectionCardProps {
  imageUrl: string
  name: string
  owner: string
}

const CollectionCard = (props: CollectionCardProps) => {
  return (
    <Box
      w="100%"
      h="362px"
      borderRadius="16px"
      bgImage={props?.imageUrl}
      bgPosition="center"
      position="relative"
    >
      <Container position="absolute" left="0px" top="256px" px="24px" zIndex={1}>
        <Text
          as="div"
          fontSize="24px"
          fontWeight="500"
          color="#fff"
          mb="8px"
          lineHeight="normal"
        >
          {props.name}
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
          {props.owner}
        </Text>
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

export default CollectionCard
