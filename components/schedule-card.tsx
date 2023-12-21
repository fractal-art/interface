import { CheckIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { MdAccountBalanceWallet, MdCloudUpload } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import { useField, ErrorMessage, useFormik, Field, FormikProps } from 'formik'

const UploadWallet = dynamic(import('./upload-wallet'), { ssr: false })

export interface IScheduleCard {
  roundName: string
  maxItem: number | null
  startDate: Date | null
  endDate: Date | null
  walletSheet?: any[]
  maxMintPerWallet?: number
}

export interface ScheduleCardProps {
  round: number
  form: FormikProps<any>
}

const MyDatePicker = ({ name = '' }) => {
  const [field, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers
  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
      showTimeSelect
      dateFormat="dd/MM/yyyy hh:mm aa"
      placeholderText="Pick your starts date"
    />
  )
}

const ScheduleCard = (props: ScheduleCardProps) => {
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [wl, setWL] = useState([])

  const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <Flex
      border="1px solid rgba(0, 0, 0, 0.10)"
      borderRadius="4px"
      flexDir="column"
      w="100%"
      maxW="488px"
    >
      <Flex gap="16px" alignItems="center" w="100%" p="16px" pb="0">
        <Flex
          borderRadius="2px"
          bg="primary"
          w="62px"
          h="62px"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          p="12px"
        >
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            {props?.round}
            {nth(props?.round)}
          </Text>
          <Text color="rgba(0, 0, 0, 0.50)" fontSize="12px" lineHeight="normal">
            Round
          </Text>
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text mb="4px" fontSize="12px" lineHeight="normal" fontWeight="400">
            <label htmlFor={`scheduleInfo.${props.round - 1}.roundName`}>
              Round name
            </label>
          </Text>
          <Field
            as={Input}
            color="#000000"
            bg="#0000000D"
            border="0"
            borderRadius="4px"
            fontSize="12px"
            w="100%"
            h="35px"
            p="8px 12px"
            placeholder="Enter round name"
            type="text"
            name={`scheduleInfo.${props.round - 1}.roundName`}
          />
          <ErrorMessage
            name={`scheduleInfo.${props.round - 1}.roundName`}
            render={() => (
              <Box color="red" fontSize="12px">
                Round Name is required.
              </Box>
            )}
          />
        </Flex>
      </Flex>
      <Flex gap="8px" w="100%" flexDir="column" mt="16px" px="16px">
        <Text fontSize="12px" lineHeight="normal" fontWeight="400" userSelect="none">
          <label htmlFor={`scheduleInfo.${props.round - 1}.maxItem`}>
            Max item for this round
          </label>
        </Text>
        <Field
          as={Input}
          color="#000000"
          bg="#0000000D"
          border="0"
          borderRadius="4px"
          placeholder="Enter an item amount"
          fontSize="12px"
          type="number"
          w="100%"
          h="35px"
          p="8px 12px"
          name={`scheduleInfo.${props.round - 1}.maxItem`}
        />
        <ErrorMessage
          name={`scheduleInfo.${props.round - 1}.maxItem`}
          render={() => (
            <Box color="red" fontSize="12px">
              Max item for this round is required.
            </Box>
          )}
        />
      </Flex>
      <Flex alignItems="center">
        <Flex gap="8px" w="100%" flexDir="column" mt="16px" px="16px">
          <Text
            fontSize="12px"
            lineHeight="normal"
            fontWeight="400"
            userSelect="none"
          >
            <label htmlFor={`scheduleInfo.${props.round - 1}.startDate`}>
              Starts date
            </label>
          </Text>
          <MyDatePicker name={`scheduleInfo.${props.round - 1}.startDate`} />
        </Flex>
        <Box mt="36px">~</Box>
        <Flex gap="8px" w="100%" flexDir="column" mt="16px" px="16px">
          <Text
            fontSize="12px"
            lineHeight="normal"
            fontWeight="400"
            userSelect="none"
          >
            <label htmlFor={`scheduleInfo.${props.round - 1}.endDate`}>
              Ends date
            </label>
          </Text>
          <MyDatePicker name={`scheduleInfo.${props.round - 1}.endDate`} />
        </Flex>
      </Flex>
      <Divider
        w="568px"
        border="1px solid rgba(0, 0, 0, 0.10)"
        mt="16px"
        px="16px"
      />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="16px"
        cursor="pointer"
        onClick={() => setIsWhitelisted(!isWhitelisted)}
      >
        <Flex gap="4px">
          <MdAccountBalanceWallet color="#242EA5" fontSize="19px" />
          <Text
            as="span"
            fontSize="16px"
            fontWeight="400"
            lineHeight="normal"
            userSelect="none"
          >
            Whitelisted Wallet Address
          </Text>
        </Flex>
        <Box flexDir="column">
          <Flex
            w="16px"
            h="16px"
            borderRadius="55px"
            border="1px solid #242EA5"
            justifyContent="center"
            alignItems="center"
            bg={isWhitelisted ? '#242EA5' : '#fff'}
          >
            {isWhitelisted && <CheckIcon fontSize="8px" color="#fff" />}
          </Flex>
        </Box>
      </Flex>
      {isWhitelisted && (
        <Flex
          justifyContent="flex-start"
          w="100%"
          flexDir="column"
          gap="8px"
          p="16px"
          pt="0"
        >
          <Flex flexDir="column" userSelect="none">
            <Flex justifyContent="space-between">
              <Text fontSize="12px" fontWeight="400" mb="8px">
                <label htmlFor={`scheduleInfo.${props.round - 1}.walletSheet`}>
                  Upload wallet sheet
                </label>
              </Text>
              <Flex>
                <Text as="span" fontSize="12px" fontWeight="400" mr="4px">
                  {wl?.length ?? '--'}
                </Text>
                <Text as="span" fontSize="12px" fontWeight="400" opacity="0.56">
                  whitelisted wallets
                </Text>
              </Flex>
            </Flex>
            <Field
              as={UploadWallet}
              icon={<MdCloudUpload />}
              supportFormat="CSV"
              setFile={setWL}
              form={props.form}
              round={props.round}
              name={`scheduleInfo.${props.round - 1}.walletSheet`}
            />
          </Flex>
        </Flex>
      )}
      {isWhitelisted && (
        <Flex
          justifyContent="flex-start"
          w="100%"
          flexDir="column"
          gap="8px"
          p="16px"
          pt="0"
          userSelect="none"
        >
          <Flex flexDir="column">
            <Text fontSize="12px" fontWeight="400" mb="8px">
              <label htmlFor={`scheduleInfo.${props.round - 1}.maxMintPerWallet`}>
                Max mint per wallet
              </label>
            </Text>
            <Box position="relative">
              <Field
                as={Input}
                color="#000000"
                bg="#0000000D"
                border="0"
                borderRadius="0px"
                borderTopRadius="4px"
                placeholder="Enter an item amount"
                fontSize="12px"
                type="number"
                w="100%"
                h="35px"
                p="8px 12px"
                name={`scheduleInfo.${props.round - 1}.maxMintPerWallet`}
              />
              <Text
                fontSize="12px"
                fontWeight="400"
                color="rgba(0, 0, 0, 0.50)"
                position="absolute"
                top="10%"
                right="12px"
                userSelect="none"
              >
                Item per wallet
              </Text>
              <Flex
                w="100%"
                h="35px"
                bg="primary"
                borderBottomRadius="4px"
                p="8px 12px"
                alignItems="center"
              >
                <Text fontSize="12px" fontWeight="400" lineHeight="normal">
                  {wl?.length ?? 0}
                  <Text
                    as="span"
                    color="rgba(0, 0, 0, 0.50)"
                    fontSize="10px"
                    fontWeight="400"
                    lineHeight="normal"
                  >
                    {' '}
                    items will be generated for whitelisted wallets
                  </Text>
                </Text>
              </Flex>
              <Text
                color="rgba(0, 0, 0, 0.50)"
                fontSize="12px"
                fontWeight="400"
                lineHeight="normal"
                mt="8px"
              >
                The total number of whitelisted items must not exceed the maximum
                number of items.
              </Text>
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default ScheduleCard
