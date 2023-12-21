import { Text, Image, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Logo = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <Flex alignItems="center" cursor="pointer" onClick={handleClick}>
      <Image src="/icon.png" alt="fractal.art" w="20px" h="20px" mr="8px" />
      <Text h="min-content" fontSize="16px" fontWeight="700" color="#000">
        Fractal
        <Text as="span" fontWeight="300">
          Art
        </Text>
      </Text>
    </Flex>
  )
}
