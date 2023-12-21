import { Box, Square, Text, Flex } from '@chakra-ui/react'
import React, { ChangeEvent, useRef } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { FormikProps } from 'formik'

export interface IUploadProps {
  form: FormikProps<any>
  file: File | null
  setFile: (file: File | null) => void
  icon: React.ReactNode
  supportFormat: string
}

const Upload = (props: IUploadProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e?.target?.files) {
        return
      }
      props.setFile(e?.target?.files?.[0])
      props?.form?.setFieldValue('json', e?.target?.files?.[0])
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenfile = () => {
    try {
      if (hiddenFileInput.current) {
        hiddenFileInput.current.click()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box w="100%">
      <Flex
        bg="rgba(0, 0, 0, 0.03)"
        border={
          !Boolean(props?.form?.errors?.json)
            ? '1px dashed rgba(0, 0, 0, 0.10);'
            : '2px dashed rgba(229, 62, 62, 1);'
        }
        borderRadius="4px"
        h="56px"
        p="8px"
        gap="20px"
        w="420px"
        cursor="pointer"
        onClick={() => handleOpenfile()}
      >
        {!props?.form?.values?.json ? (
          <>
            <Flex alignItems="center">
              <Square size="40px" bg="rgba(0, 0, 0, 0.05)">
                {props?.icon}
              </Square>
            </Flex>
            <Flex flexDir="column" justifyContent="center">
              <Text
                as="span"
                fontSize="16px"
                lineHeight="normal"
                fontWeight="500"
                color="#242EA5"
              >
                Choose file&nbsp;
                <Text as="span" fontSize="16px" lineHeight="normal" fontWeight="500">
                  to upload
                </Text>
              </Text>
              <Text
                as="div"
                fontSize="16px"
                lineHeight="normal"
                fontWeight="300"
                color="rgba(0, 0, 0, 0.70)"
              >
                Supported format : {props?.supportFormat}
              </Text>
            </Flex>
          </>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              pl="10px"
            >
              <Flex flexDir="column">
                <Box>
                  <Text
                    as="span"
                    fontSize="16px"
                    lineHeight="normal"
                    fontWeight="500"
                    color="#000000"
                  >
                    Your file upload is complete
                  </Text>
                  <Text
                    as="div"
                    fontSize="14px"
                    lineHeight="normal"
                    fontWeight="300"
                    color="rgba(0, 0, 0, 0.70)"
                  >
                    {props?.form?.values?.json.name}
                  </Text>
                </Box>
              </Flex>
              <Box pr="10px">
                <MdDeleteOutline size="24px" color="#000000B2" />
              </Box>
            </Box>
          </>
        )}
      </Flex>
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => handleFileChange(e)}
        ref={hiddenFileInput}
      />
    </Box>
  )
}

export default Upload
