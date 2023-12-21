import { useChainWallet } from '@cosmos-kit/react'
import { chainName, codeIds } from '../config'
import { MsgExecuteContract, MsgInstantiateContract } from '@injectivelabs/sdk-ts'
import { MsgBroadcaster, WalletStrategy } from '@injectivelabs/wallet-ts'
import { ChainId } from '@injectivelabs/ts-types'
import { Network } from '@injectivelabs/networks'
import { nftMock } from '../mock/nft'

export const useNft = () => {
  const { address, getCosmWasmClient } = useChainWallet(
    chainName,
    'keplr-extension',
    false
  )

  const createCollection = async ({
    name,
    symbol,
  }: {
    name: string
    symbol: string
  }): Promise<any> => {
    if (!address) {
      //
      return
    }

    const msg = MsgInstantiateContract.fromJSON({
      sender: address,
      admin: address,
      codeId: codeIds.cw721Launchpad,
      label: name || 'fractal cw721-metadata',
      msg: {
        name,
        symbol,
        minter: address,
      },
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address || '',
    })
    console.log('[+] : create candy collection', result)
    const type = 'instantiate'
    const event = result.events?.find((ev) => ev.type === type)
    const attr = event?.attributes.find((attr: any) => {
      return (attr.key = '_contract_address')
    })

    const collectionAddr = attr?.value

    return collectionAddr
  }

  const mintNFTs = async ({
    collection,
    owner,
    nfts,
  }: {
    collection: string
    owner: string
    nfts: any[]
  }) => {
    if (!address) {
      //
      return
    }

    const msgs = nfts?.map((nft) => {
      return MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: collection,
        msg: {
          mint: {
            token_id: nft.tokenId,
            owner: owner,
            token_uri: '',
            extension: {
              image: nft.imageUri,
              description: nft?.description,
              name: nft?.name,
              attributes: nft?.attributes,
            },
          },
        },
      })
    })

    const walletStrategy = new WalletStrategy({
      chainId: ChainId.Testnet,
    })
    const msgBroadcastClient = new MsgBroadcaster({
      walletStrategy,
      network: Network.TestnetK8s,
    })

    const result = await msgBroadcastClient.broadcast({
      msgs,
      injectiveAddress: address || '',
    })

    console.log('[+] : mint NFT', result)
  }

  // `owner_of`, `approval`, `approvals`, `all_operators`, `num_tokens`, `contract_info`, `nft_info`, `all_nft_info`, `tokens`, `all_tokens`, `minter

  const queryMinter = async ({ collection }: { collection: string }) => {
    if (!address) {
      //
      return
    }
    // nft_info`, `all_nft_info`
    const client = await getCosmWasmClient()

    const response = await client.queryContractSmart(collection, {
      minter: {},
    })

    console.log('[+]  getInfo', response)

    return response
  }

  const queryContractInfo = async ({ collection }: { collection: string }) => {
    if (!address) {
      //
      return
    }
    // nft_info`, `all_nft_info`
    const client = await getCosmWasmClient()

    const response = await client.queryContractSmart(collection, {
      contract_info: {},
    })

    console.log('[+]  getInfo', response)

    return response
  }

  const queryNftInfo = async ({
    collection,
    tokenId,
  }: {
    collection: string
    tokenId: string
  }) => {
    if (!address) {
      //
      return
    }
    // nft_info`, `all_nft_info`
    const client = await getCosmWasmClient()

    const response = await client.queryContractSmart(collection, {
      nft_info: {
        token_id: tokenId,
      },
    })

    console.log('[+]  queryNftInfo', response)

    return response
  }

  return { createCollection, mintNFTs, queryContractInfo, queryMinter, queryNftInfo }
}
