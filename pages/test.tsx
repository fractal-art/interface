import { Button } from '@chakra-ui/react'
import { useNft } from '../hooks/useNft'
import { createCollectionMock, nftMock, nftsMock } from '../mock/nft'
import { useCandyMachine } from '../hooks/useCandyMachine'
import { useChainWallet } from '@cosmos-kit/react'
import { chainName } from '../config'
import { useEffect, useState } from 'react'
import { Whitelist } from '../interfaces/whitelist'
import { Seed } from '../interfaces/seed'
import { BigNumberInBase } from '@injectivelabs/utils'

const TestPge = () => {
  const { address } = useChainWallet(chainName, 'keplr-extension', false)
  const { createCollection, mintNFTs } = useNft()
  const {
    info,
    createCandyMachine,
    checkEligible,
    updateWhitelists,
    queryWhitelist,
    closeCandyMachine,
    openCandyMachine,
    mint,
    extractSeed,
    setSeed,
    setPublicRound,
  } = useCandyMachine()

  const [candyAddress, setCandyAddress] = useState('')

  const [collectionAddr, setCollectionAddr] = useState('')

  const [detail, setDetail] = useState<any>(null)
  const queryChecjEligiuble = async () => {
    if (!address) {
      return
    }

    const detail = await info(candyAddress)
    setDetail(detail)
    const data = await checkEligible(candyAddress)
    console.log({ data })

    queryWhitelist(candyAddress, address, 1)

    // addr: 'inj17ssxcvd0eunju0c8ue0np8vrml4gcn6wsa4rwy'
    // count: 1
    // round: 1
  }

  useEffect(() => {
    if (address) {
      queryChecjEligiuble()
    }
  }, [address])

  const handleCreateCollection = async () => {
    const collectionAddress = await createCollection(createCollectionMock)
    console.log({ collectionAddress })

    setCollectionAddr(collectionAddress)
  }

  const handleCreateCandy = async () => {
    const candyAddr = await createCandyMachine({
      amount: new BigNumberInBase(1).toWei().toFixed(),
      totalSupply: 1,
      collectionAddress: collectionAddr,
      enableWhitelist: true,
    })

    console.log({ candyAddr })
    setCandyAddress(candyAddr)
  }

  const handleMintNFT = async () => {
    await mintNFTs({
      collection: collectionAddr,
      owner: candyAddress,
      nfts: nftsMock,
    })
  }

  const handClickSeed = async () => {
    const seeds: Seed[] = extractSeed(nftsMock)

    await setSeed(candyAddress, seeds)
  }

  const handleUploadWL = async () => {
    if (!candyAddress || !address) {
      return
    }
    const whitelists: Whitelist[] = [
      {
        address: address,
        round: 1,
        limit: 5,
      },
    ]
    updateWhitelists({ whitelists, candyAddr: candyAddress })
  }

  const clickPublicRound = async () => {
    await setPublicRound(candyAddress, true)
  }

  return (
    <div>
      <Button onClick={() => handleCreateCollection()}>Create Collection</Button>
      <Button onClick={() => handleCreateCandy()}>Create Candy</Button>
      <Button onClick={() => handleMintNFT()}>Mint NFT</Button>
      <Button onClick={() => handClickSeed()}>Seed</Button>
      <Button onClick={() => handleUploadWL()}>Upload Whitelist</Button>
      <Button onClick={() => openCandyMachine(candyAddress)}>
        Open Candy Machine
      </Button>
      <Button onClick={() => closeCandyMachine(candyAddress)}>
        Close Candy Machine
      </Button>
      <Button onClick={clickPublicRound}>set Public Round</Button>
      <Button onClick={() => mint(candyAddress, detail?.mint_asset)}>Mint</Button>
    </div>
  )
}

export default TestPge
