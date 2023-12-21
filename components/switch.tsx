import { Divider, Flex, Text } from '@chakra-ui/react'

export interface SwitchProps {
  title: string
  active: string
  onChange: (active: string) => void
}

const Switch = (props: SwitchProps) => {
  return (
    <Flex
      flexDir="column"
      pt="16px"
      px="16px"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onClick={() => props.onChange(props.title)}
    >
      <Text
        fontSize="24px"
        fontWeight="500"
        lineHeight="normal"
        opacity={props.title === props.active ? '1' : '0.5'}
        mb="16px"
      >
        {props.title}
      </Text>
      <Divider
        border={`3px solid ${props.title === props.active ? '#FFCF42' : '#fff'}`}
        w="110%"
      />
    </Flex>
  )
}

export default Switch
