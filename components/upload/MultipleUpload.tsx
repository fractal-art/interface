import { Box, Square, Text, Flex } from '@chakra-ui/react'
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { FormikProps } from 'formik'

export interface IUploadProps {
  form: FormikProps<any>
  files: FileList | null
  setFiles: Dispatch<SetStateAction<FileList | null>>
  icon: React.ReactNode
  supportFormat: string
}

export const MultipleUpload = (props: IUploadProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e?.target?.files) {
        return
      }

      const jsonList: any = []

      Array.from(e.target.files).forEach((file) => {
        // Define a new file reader
        let reader = new FileReader()

        // Function to execute after loading the file
        reader.onload = () => {
          const data = JSON.parse(reader.result as string)
          jsonList.push(data)
        }

        // Read the file as a text
        reader.readAsText(file)
      })

      props.setFiles(e?.target?.files)
      props?.form?.setFieldValue('json', jsonList)
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
        {props?.files?.length != 0 || props?.form?.values?.json.length != 0 ? (
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
        )}
      </Flex>
      <input
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={(e) => handleFileChange(e)}
        ref={hiddenFileInput}
      />
    </Box>
  )
}
