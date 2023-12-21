import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaRocket } from 'react-icons/fa'
import { MdAddPhotoAlternate, MdAssignment, MdDateRange } from 'react-icons/md'
import NameYourDrop, { INameYourDrop } from '../components/create/name-your-drop'
import ConfirmYouDrop from '../components/create/confirm-you-drop'
import SetupSchedule, { ISetupSchedule } from '../components/create/set-up-schedule'
import UploadYourDrops, {
  IUploadYourDrops,
} from '../components/create/upload-your-drops'
import { BigLogo } from '../components/navbar/big-logo'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { RoundCardProps } from '../components/round-card'
import Step from '../components/step'
import { useNft } from '../hooks/useNft'
import { useCandyMachine } from '../hooks/useCandyMachine'
import { BigNumberInBase } from '@injectivelabs/utils'
import { useChainWallet } from '@cosmos-kit/react'
import { Seed } from '../interfaces/seed'
import { chainName } from '../config'
import { Whitelist } from '../interfaces/whitelist'
import { toast } from 'react-toastify'
import { store } from '../utils/stroe'
const CreatePage = () => {
  const router = useRouter()

  const { address } = useChainWallet(chainName, 'keplr-extension', false)

  const steps = [
    { label: 'Project detail', icon: <MdAssignment /> },
    { label: 'Upload your drops', icon: <MdDateRange /> },
    { label: 'Set up schedule', icon: <MdAddPhotoAlternate /> },
    { label: 'Launch a Drop', icon: <FaRocket /> },
  ]

  const titleSteps = [
    {
      title: 'Put your drops detail',
      description: 'Provide details for your project',
    },
    {
      title: 'Upload your drops',
      description:
        'Kindly upload your JSON file containing image metadata and image URLs.',
    },
    {
      title: 'Set up schedule',
      description:
        'Set up and configure your desired round with preferences and requirements.',
    },
    {
      title: 'Confirm you drop',
      description: 'Make a large collection of NFTs that your community can mint.',
    },
  ]

  const mapWSteps = [
    {
      width: '420px',
    },
    {
      width: '420px',
    },
    {
      width: '100%',
    },
    {
      width: '100%',
    },
  ]

  const NameYourDropSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
  })

  const UploadYourDropsSchema = Yup.object().shape({
    json: Yup.mixed().required('Required'),
  })

  const SetUpScheduleSchema = Yup.object({
    scheduleInfo: Yup.array().of(
      Yup.object().shape({
        roundName: Yup.string().required('Required'),
        maxItem: Yup.number().required('Required'),
        startDate: Yup.date().required(),
        endDate: Yup.date().required(),
      })
    ),
  })

  const NameYourDropForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      price: '',
    },
    validationSchema: NameYourDropSchema,
    onSubmit: (values: INameYourDrop) => {
      console.log('NameYourDropForm', values)
    },
  })

  const UploadYourDropsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      json: [],
    },
    validationSchema: UploadYourDropsSchema,
    onSubmit: (values: IUploadYourDrops) => {
      console.log('UploadYourDropsForm', values)
    },
  })

  const SetUpScheduleForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      scheduleInfo: [
        {
          roundName: '',
          maxItem: null,
          startDate: null,
          endDate: null,
          walletSheet: undefined,
          maxMintPerWallet: undefined,
        },
      ],
    },
    // validationSchema: SetUpScheduleSchema,
    onSubmit: (values: ISetupSchedule) => {
      console.log('SetUpScheduleForm', values)
    },
  })

  const confirmYouDropData: RoundCardProps[] = [
    {
      round: 1,
      title: 'Drop 1 : Private',
      status: 'Live',
      totalItems: 5,
      date: dayjs(),
    },
    {
      round: 2,
      title: 'Drop 2: Public',
      status: 'Live',
      totalItems: 5,
      date: dayjs(),
    },
  ]

  const componentSteps = [
    {
      component: <NameYourDrop form={NameYourDropForm} />,
    },
    {
      component: (
        <UploadYourDrops
          form={UploadYourDropsForm}
          name={NameYourDropForm?.values?.name}
        />
      ),
    },
    {
      component: (
        <SetupSchedule
          form={SetUpScheduleForm}
          totalItem={UploadYourDropsForm?.values?.json?.length}
        />
      ),
    },
    {
      component: (
        <ConfirmYouDrop
          data={confirmYouDropData}
          scheduleInfo={SetUpScheduleForm.values?.scheduleInfo}
        />
      ),
    },
  ]

  const [activeStep, setActiveStep] = useState(0)
  const { createCollection, mintNFTs } = useNft()

  const {
    createCandyMachine,
    updateWhitelists,
    openCandyMachine,
    extractSeed,
    setSeed,
  } = useCandyMachine()

  const handleClickConfirm = async () => {
    const collectionAddress = await createCollection({
      name: NameYourDropForm?.values?.name,
      symbol: NameYourDropForm?.values?.name,
    })

    toast('Deploy collection success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })
    const totalSupply = UploadYourDropsForm?.values?.json
      ? UploadYourDropsForm?.values?.json?.length
      : 0

    const candyAddress = await createCandyMachine({
      amount: new BigNumberInBase(NameYourDropForm.values?.price).toWei().toFixed(),
      totalSupply: totalSupply,
      collectionAddress: collectionAddress,
      enableWhitelist: true,
    })

    toast('Deploy candy machine success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })

    const nfts: any[] = UploadYourDropsForm?.values?.json?.map((nft: any, idx) => {
      return {
        tokenId: idx?.toString(),
        name: nft?.name,
        metadata: {},
        owner: address,
        imageUri: nft.image,
        description: nft.description,
        attributes: nft.attributes,
      }
    })
    await mintNFTs({
      collection: collectionAddress,
      owner: candyAddress,
      nfts: nfts,
    })

    toast('Mint NFTs success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })

    const seeds: Seed[] = extractSeed(nfts)

    await setSeed(candyAddress, seeds)

    toast('Set seed success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })

    const whitelists: Whitelist[] =
      SetUpScheduleForm?.values?.scheduleInfo?.[0]?.walletSheet ??
      ([] as Whitelist[])

    await updateWhitelists({ candyAddr: candyAddress, whitelists })

    toast('Upload whitelists success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })

    await openCandyMachine(candyAddress)

    toast('Open candy machine success', {
      type: 'success',
      position: 'bottom-right',
      theme: 'dark',
    })

    console.log({ collectionAddress, candyAddress, nfts })

    const newData = {
      collectionAddress,
      candyAddress,
      name: NameYourDropForm?.values?.name,
      cover:
        'https://i.ibb.co/g3jyXYm/DALL-E-2023-12-20-22-38-24-A-profile-picture-combining-elements-of-cryptocurrency-NFT-and-meme-cultu.png',
      owner: address,
      mint: 0,
      totalSupply: 5,
      amonut: 1,
      rounds: SetUpScheduleForm.values?.scheduleInfo.map((s: any, idx) => {
        return {
          round: idx + 1,
          name: s.roundName,
          enableWhitelist: s.walletSheet?.length > 0,
          isOpen: true,
          whlieList: s.walletSheet,
          startDate: dayjs(s.startDate).valueOf(),
          endDate: dayjs(s.endDate).valueOf(),
          totalSupply: 5,
        }
      }),
    }

    store.set(newData)
    router.push(`/collections/${collectionAddress}/${candyAddress}`)
  }

  const handleNextStep = async () => {
    if (activeStep === steps?.length - 1) {
      handleClickConfirm()
      return
    }
    switch (activeStep) {
      case 0:
        const validateNameYourDropForm = await NameYourDropForm.validateForm()
        if (Object.keys(validateNameYourDropForm).length > 0) {
          return
        }
        NameYourDropForm.handleSubmit()
        break
      case 1:
        const validateUploadYourDropsForm = await UploadYourDropsForm.validateForm()
        if (Object.keys(validateUploadYourDropsForm).length > 0) {
          return
        }
        UploadYourDropsForm.handleSubmit()
        break
      case 2:
        const validateSetUpScheduleForm = await SetUpScheduleForm.validateForm()
        if (Object.keys(validateSetUpScheduleForm).length > 0) {
          return
        }
        SetUpScheduleForm.handleSubmit()
        break
      case 3:
        break
    }
    setActiveStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    if (activeStep === 0) {
      return router.push('/')
    }
    setActiveStep((prev) => prev - 1)
  }

  return (
    <Box>
      <Container maxW="container.xl" py={['44px', '50px']}>
        <Flex w="100%" gap="48px" h="calc(100vh - 170px)" position="relative">
          <Flex w="100%">
            <Box
              bg="rgba(0, 0, 0, 0.03)"
              borderRadius="12px"
              w="100%"
              h="100%"
              p="64px"
              userSelect="none"
            >
              <Text fontSize="24px" lineHeight="normal" fontWeight="500" mb="8px">
                Launch a Drop
              </Text>
              <Text fontSize="16px" lineHeight="normal" fontWeight="500" mb="48px">
                Make a large collection of NFTs that your community can mint.
              </Text>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  verticleLine={index !== steps?.length - 1}
                  icon={step.icon}
                  title={step.label}
                  step={index + 1}
                  activeStep={activeStep + 1}
                />
              ))}
              <Box>
                <BigLogo />
              </Box>
            </Box>
          </Flex>
          <Flex flexDir="column" w="100%" position="relative">
            <Flex h="30px">
              <Flex
                alignItems="center"
                gap="8px"
                cursor="pointer"
                onClick={handlePrevStep}
              >
                <ArrowBackIcon />
                <Text
                  fontSize="16px"
                  lineHeight="normal"
                  fontWeight="500"
                  userSelect="none"
                >
                  Back
                </Text>
              </Flex>
            </Flex>
            <Box
              w="100%"
              h="100%"
              px="48px"
              overflowY={activeStep === 2 ? 'scroll' : 'hidden'}
            >
              <Container maxW={mapWSteps[activeStep].width} p="0" h="100%">
                <Flex flexDir="column" alignItems="center" h="100%">
                  <Text
                    fontSize="24px"
                    lineHeight="normal"
                    fontWeight="500"
                    mb="8px"
                  >
                    {titleSteps[activeStep]?.title}
                  </Text>
                  <Text
                    fontSize="16px"
                    lineHeight="normal"
                    fontWeight="400"
                    align="center"
                  >
                    {titleSteps[activeStep]?.description}
                  </Text>
                  <Flex
                    pt="32px"
                    w="100%"
                    h="100%"
                    alignItems="center"
                    display={'flex'}
                    flexDirection="column"
                  >
                    {componentSteps[activeStep]?.component}
                  </Flex>
                </Flex>
              </Container>
            </Box>
            <Box position="absolute" bottom="0" w="100%" zIndex={1}>
              <Flex w="100%" justifyContent="center" onClick={handleNextStep}>
                <Button
                  variant="primary"
                  h="35px"
                  w={mapWSteps[activeStep].width === '100%' ? '276px' : '420px'}
                >
                  <Flex w="100%" justifyContent="space-between" alignItems="center">
                    <Text
                      fontSize="16px"
                      lineHeight="normal"
                      fontWeight="500"
                      userSelect="none"
                    >
                      {activeStep < 3 ? 'Continue' : 'Confirm'}
                    </Text>
                    {activeStep < 3 ? <ArrowForwardIcon /> : <CheckIcon />}
                  </Flex>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default CreatePage
