import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export interface StepProps {
  verticleLine?: boolean
  icon: React.ReactNode
  title: string
  step: number
  activeStep: number
}

const Step = (props: StepProps) => {
  const stepStatus = useMemo(() => {
    if (props?.activeStep === props?.step) {
      return 'In progress'
    } else if (props?.activeStep > props?.step) {
      return 'Complete'
    }

    return ''
  }, [props?.activeStep, props?.step])

  const statusColor = stepStatus === 'Complete' ? '#00AC6F' : '#242EA5'

  return (
    <Flex gap="24px" position="relative" mb="31px">
      <Flex>
        <Flex
          w="32px"
          h="32px"
          border="1px solid rgba(36, 46, 165, 0.50)"
          borderRadius="55px"
          alignItems="center"
          justifyContent="center"
          color="#242EA5"
          bg={
            stepStatus === 'Complete'
              ? '#242EA5'
              : stepStatus === 'In progress'
                ? 'linear-gradient(0deg, rgba(36, 46, 165, 0.23) 0%, rgba(36, 46, 165, 0.23) 100%), #FFF'
                : '#fff'
          }
        >
          {stepStatus === 'Complete' ? <CheckIcon color="#fff" /> : props?.icon}
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Text
          fontSize="12px"
          lineHeight="normal"
          fontWeight="500"
          color="rgba(0, 0, 0, 0.40)"
          mb="2px"
        >
          STEP {props?.step}
        </Text>
        <Text fontSize="16px" lineHeight="normal" fontWeight="500" mb="2px">
          {props?.title}
        </Text>
        <Text
          fontSize="12px"
          lineHeight="normal"
          fontWeight="500"
          color={statusColor}
        >
          {stepStatus} &nbsp;
        </Text>
      </Flex>
      {props?.verticleLine && (
        <Flex position="absolute" top="32px" left="16px">
          <Box
            h="51px"
            w="1px"
            bg={stepStatus === 'Complete' ? '#242EA5' : "rgba(36, 46, 165, 0.21)"}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default Step
