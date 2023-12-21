import dynamic from 'next/dynamic'
import { Flex } from '@chakra-ui/react'

const Switch = dynamic(import('./switch'), { ssr: false })

enum Menu {
  All = 'All',
  Live = 'Live & Upcoming',
  Past = 'Past',
}

export interface SwitchGroupProps {
  title: string[]
  active: string
  onChange: (active: Menu) => void
}

const SwitchGroup = (props: SwitchGroupProps) => {
  return (
    <Flex gap="32px" pt="16px" alignItems="center">
      {props?.title.map((title, index) => (
        <Switch
          key={index}
          title={title}
          active={props?.active}
          onChange={(value: Menu | string) => props?.onChange(value as Menu)}
        />
      ))}
    </Flex>
  )
}

export default SwitchGroup
