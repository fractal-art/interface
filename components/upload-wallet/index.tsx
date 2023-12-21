import { Box, Square, Text, Flex } from '@chakra-ui/react'
import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { FormikProps } from 'formik'
import * as Papa from 'papaparse'

export interface IUploadProps {
  form: FormikProps<any>
  file: File | null
  setFile: Dispatch<SetStateAction<any[]>>
  icon: React.ReactNode
  supportFormat: string
  round: number
  name: string
}

const UploadWallet = (props: IUploadProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e?.target?.files) {
        return
      }

      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log(results.data, props.name)
          props?.form?.setFieldValue(props.name, results.data)
          props.setFile(results.data)
        },
      })
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
        border="1px dashed rgba(0, 0, 0, 0.10)"
        borderRadius="4px"
        h="56px"
        p="8px"
        gap="20px"
        cursor="pointer"
        onClick={() => handleOpenfile()}
      >
        {props?.file ||
        props?.form?.values?.scheduleInfo[props.round - 1]?.walletSheet ? (
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
                </Box>
              </Flex>
              <Box pr="10px">
                <MdDeleteOutline size="24px" color="#000000B2" />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Flex alignItems="center">
              <Square size="40px" bg="rgba(0, 0, 0, 0.05)">
                {props?.icon}
              </Square>
            </Flex>
            <Flex flexDir="column" justifyContent="center">
              <Text
                as="span"
                fontSize="12px"
                lineHeight="normal"
                fontWeight="500"
                color="#242EA5"
              >
                Choose file&nbsp;
                <Text
                  as="span"
                  fontSize="12px"
                  lineHeight="normal"
                  fontWeight="500"
                  color="#000"
                >
                  to upload&nbsp;
                </Text>
                <Text
                  as="span"
                  fontSize="12px"
                  lineHeight="normal"
                  fontWeight="300"
                  color="rgba(0, 0, 0, 0.70)"
                >
                  Supported format : {props?.supportFormat}
                </Text>
              </Text>
            </Flex>
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

export default UploadWallet
