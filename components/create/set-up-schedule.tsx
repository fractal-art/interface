import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import ScheduleCard, { IScheduleCard } from '../schedule-card'
import { FormikProps, FieldArray, FormikProvider } from 'formik'

export interface ISetupSchedule {
  scheduleInfo: IScheduleCard[]
}

export interface SetupScheduleProps {
  form: FormikProps<any>
  totalItem: number
}

const SetupSchedule = (props: SetupScheduleProps) => {
  const [rounds, setRounds] = useState(1)

  return (
    <Flex flexDir="column" position="relative">
      <Flex justifyContent="space-between" w="100%" mb="12px">
        <Text
          as="div"
          fontSize="20px"
          fontWeight="400"
          lineHeight="normal"
          color="rgba(0, 0, 0, 0.50)"
        >
          Minting Schedule
        </Text>
        <Text as="span" fontSize="20px" fontWeight="400" lineHeight="normal">
          {props?.totalItem}{' '}
          <Text
            as="span"
            fontSize="20px"
            fontWeight="400"
            lineHeight="normal"
            color="rgba(0, 0, 0, 0.50)"
          >
            Items available
          </Text>
        </Text>
      </Flex>
      <FormikProvider value={props.form}>
        <form onSubmit={props.form.handleSubmit}>
          <FieldArray
            name="scheduleInfo"
            render={({ push }) => (
              <div>
                <Flex
                  flexDir="column"
                  overflowY="auto"
                  w="100%"
                  h="800px"
                  gap="12px"
                  position="relative"
                  pb="60px"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '24px',
                    },
                  }}
                >
                  {props.form.values.scheduleInfo.length > 0 &&
                    props.form.values.scheduleInfo.map((_: any, index: any) => (
                      <ScheduleCard
                        key={index}
                        round={index + 1}
                        form={props.form}
                      />
                    ))}
                  <Button
                    h="32px"
                    p="8px 16px"
                    onClick={() => {
                      setRounds(rounds + 1)
                      push({} as IScheduleCard)
                    }}
                  >
                    <Flex gap="10px" alignItems="center">
                      <MdPlaylistAdd />
                      <Text fontSize="12px" fontWeight="500" lineHeight="normal">
                        Add more round
                      </Text>
                    </Flex>
                  </Button>
                </Flex>
              </div>
            )}
          />
        </form>
      </FormikProvider>
      <Box
        bottom="0"
        position="absolute"
        w="100%"
        h="90px"
        bg="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);"
      />
    </Flex>
  )
}

export default SetupSchedule
