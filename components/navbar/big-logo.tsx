import { Text, Image, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const BigLogo = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <Flex alignItems="center" cursor="pointer" onClick={handleClick}>
      <Image src="/icon.png" alt="fractal.art" w="40px" h="40px" mr="12px" />
      <Text h="min-content" fontSize="28px" fontWeight="700" color="#000">
        Fractal
        <Text as="span" fontWeight="300">
          Art
        </Text>
      </Text>
    </Flex>
  )
}
