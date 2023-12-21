import {
  Flex,
  Text,
  FormControl,
  FormErrorMessage,
  Container,
  Box,
} from '@chakra-ui/react'
import { MdCloudUpload } from 'react-icons/md'
import { FormikProps } from 'formik'

import Upload from '../upload'
import { useState } from 'react'
import { MultipleUpload } from '../upload/MultipleUpload'
import { useChainWallet } from '@cosmos-kit/react'
import { chainName } from '../../config'

export interface IUploadYourDrops {
  json: any[]
}

export interface UploadYourDropsProps {
  form: FormikProps<any>
  name: string
}

export default function UploadYourDrops(props: UploadYourDropsProps) {
  const { address } = useChainWallet(chainName, 'keplr-extension', false)
  const [files, setFiles] = useState<any>([])

  return (
    <Box w="450px" height={'100%'} position="relative">
      <Flex justifyContent="flex-start" w="100%" flexDir="column" gap="8px">
        <Flex flexDir="column">
          <Text fontSize="16px" fontWeight="400" mb="8px">
            Upload your drops
          </Text>
          <FormControl isRequired isInvalid={Boolean(props?.form?.errors?.json)}>
            <MultipleUpload
              icon={<MdCloudUpload />}
              supportFormat="JSON"
              files={files}
              setFiles={setFiles}
              form={props?.form}
            />
            {Boolean(props?.form?.errors?.json) && (
              <FormErrorMessage>JSON file is required.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
      </Flex>
      {Boolean(files?.length || props?.form?.values?.json.length) && (
        <Flex flexDir="column" position="absolute" bottom={50} left={0} w="100%">
          <Text fontSize="16px" lineHeight="normal" fontWeight="400" mb="8px">
            Summary
          </Text>
          <Flex
            flexDir="column"
            border="1px solid rgba(0, 0, 0, 0.10)"
            p="16px"
            borderRadius="4px"
          >
            <Text fontSize="16px" lineHeight="normal" fontWeight="500" mb="2px">
              {props?.name}
            </Text>
            <Text
              as="span"
              color="rgba(0, 0, 0, 0.70)"
              fontSize="10px"
              lineHeight="normal"
              fontWeight="300"
            >
              by{' '}
              <Text as="span" fontWeight="600">
                {address}
              </Text>
            </Text>
            <Text
              fontSize="16px"
              lineHeight="normal"
              fontWeight="500"
              color="#242EA5"
            >
              {files?.length || props?.form?.values?.json.length} Items
            </Text>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}
