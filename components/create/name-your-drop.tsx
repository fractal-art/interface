import { FormikProps } from 'formik'
import {
  Text,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Container,
  Box,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'

export interface INameYourDrop {
  name: string
  description: string
  price: string
}

export interface INameYourDropProps {
  form: FormikProps<any>
}

export default function NameYourDrop(props: INameYourDropProps) {
  return (
    <Box>
      <Grid w="420px" mx="auto" templateRows="repeat(2, 1fr)">
        <GridItem h="62px">
          <Text fontSize="16px" fontWeight={400} color="#000000" mb="8px">
            Project name
          </Text>
          <FormControl isRequired isInvalid={Boolean(props?.form?.errors?.name)}>
            <Input
              color="#000000"
              bg="#0000000D"
              border="0px"
              borderRadius="4px"
              placeholder="Enter project name"
              fontSize="16px"
              id="name"
              name="name"
              type="text"
              onChange={props?.form?.handleChange}
              value={props?.form?.values?.name}
            />
            {Boolean(props?.form?.errors?.name) && (
              <FormErrorMessage>Project Name is required.</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
        <GridItem h="102px">
          <Text fontSize="16px" fontWeight={400} color="#000000" mb="8px">
            Description
          </Text>
          <FormControl
            isRequired
            isInvalid={Boolean(props?.form?.errors?.description)}
          >
            <Textarea
              color="#000000"
              bg="#0000000D"
              border="0px"
              borderRadius="4px"
              placeholder="Enter a description"
              fontSize="16px"
              id="description"
              name="description"
              onChange={props?.form?.handleChange}
              value={props?.form?.values?.description}
            />
            {Boolean(props?.form?.errors?.description) && (
              <FormErrorMessage>Description is required.</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>

        <GridItem h="102px" mt={10}>
          <Text fontSize="16px" fontWeight={400} color="#000000" mb="8px">
            Price
          </Text>
          <FormControl isRequired isInvalid={Boolean(props?.form?.errors?.price)}>
            <InputGroup>
              <Input
                color="#000000"
                bg="#0000000D"
                border="0px"
                borderRadius="4px"
                placeholder="Enter a price"
                fontSize="16px"
                id="price"
                name="price"
                min={1}
                type="number"
                onChange={props?.form?.handleChange}
                value={props?.form?.values?.price}
              />
              <InputRightAddon borderRadius={0} color={'black'}   bg="#0000000D">
                INJ
              </InputRightAddon>
            </InputGroup>

            {Boolean(props?.form?.errors?.price) && (
              <FormErrorMessage>Price is required.</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  )
}
