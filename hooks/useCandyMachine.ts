import { useChainWallet } from '@cosmos-kit/react'
import { chainName, codeIds } from '../config'
import { MsgExecuteContract, MsgInstantiateContract } from '@injectivelabs/sdk-ts'
import { MsgBroadcaster, WalletStrategy } from '@injectivelabs/wallet-ts'
import { ChainId } from '@injectivelabs/ts-types'
import { Network } from '@injectivelabs/networks'
import { Whitelist } from '../interfaces/whitelist'
import { Seed } from '../interfaces/seed'

export const useCandyMachine = () => {
  const { address, getCosmWasmClient } = useChainWallet(
    chainName,
    'keplr-extension',
    false
  )

  const createCandyMachine = async ({
    name,
    amount,
    collectionAddress,
    totalSupply,
    enableWhitelist,
  }: {
    name?: string
    amount: string
    totalSupply: number
    collectionAddress?: string
    enableWhitelist?: boolean
  }) => {
    if (!address) {
      return
    }

    const msg = MsgInstantiateContract.fromJSON({
      sender: address,
      admin: address,
      codeId: codeIds.candyMachin,
      label: name || 'fractal candy-machine',
      msg: {
        token_addr: collectionAddress,
        creator: address,
        mint_asset: {
          info: {
            native_token: {
              denom: 'inj',
            },
          },
          amount: amount,
        },
        protocol_fee: '0',
        enable_whitelist: enableWhitelist,
        collector: address,
        total_supply: totalSupply.toString(),
        total_token_count: totalSupply.toString(),
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

    console.log('[+] : create candy machine', result)

    const type = 'instantiate'
    const event = result.events?.find((ev) => ev.type === type)
    const attr = event?.attributes.find((attr: any) => {
      return (attr.key = '_contract_address')
    })

    const candyAddr = attr?.value

    return candyAddr
  }
  const updateWhitelists = async ({
    whitelists,
    candyAddr,
  }: {
    whitelists: Whitelist[]
    candyAddr: string
  }) => {
    if (!address) {
      return
    }

    const msgs = whitelists.map((wl) => {
      return MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: candyAddr,
        msg: {
          update_whitelist: {
            register_addr: wl.address,
            count: Number(wl.limit),
            round: Number(wl.round),
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
      msgs: msgs,
      injectiveAddress: address || '',
    })

    console.log('[+] update whitelists', result)
  }

  const extractSeed = (nfts: any[]) => {
    const prefixCount: Record<string, number> = {}
    nfts.forEach((inst) => {
      let prefix = inst.tokenId[0]
      if (!prefixCount[prefix]) {
        prefixCount[prefix] = 1
      } else {
        prefixCount[prefix] += 1
      }
    })
    const seeds: Seed[] = []
    for (const [key, value] of Object.entries(prefixCount)) {
      seeds.push({
        prefix: key,
        count: value,
      })
    }
    return seeds
  }

  const setSeed = async (candyAddr: string, seeds: Seed[]): Promise<any> => {
    if (!address) {
      return
    }

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddr,
      msg: {
        set_random_seed: {
          seeds,
        },
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
    console.log('[+] set seed', result)

    return result.txHash
  }

  const closeCandyMachine = async (candyAddr: string): Promise<any> => {
    if (!address) {
      return
    }

    const config = await info(candyAddr)

    const enable_whitelist = config.enable_whitelist
    const round = config.round

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddr,
      msg: {
        set_config: {
          is_open: false,
          enable_whitelist,
          round,
        },
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
    console.log('[+] close candy machine', result)
  }

  const openCandyMachine = async (candyAddr: string): Promise<any> => {
    if (!address) {
      return
    }

    const config = await info(candyAddr)

    const enable_whitelist = config.enable_whitelist
    const round = config.round

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddr,
      msg: {
        set_config: {
          is_open: true,
          enable_whitelist,
          round,
        },
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
    console.log('[+] open candy machine', result)
  }

  const setRound = async (candyAddress: string, round: number): Promise<any> => {
    if (!address) {
      return
    }

    const config = await info(candyAddress)
    const is_open = config.is_open
    const enable_whitelist = config.enable_whitelist

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddress,
      msg: {
        set_config: {
          is_open,
          enable_whitelist,
          round: Number(round),
        },
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
    console.log('[+] set round', result)

    return result.txHash
  }

  const setPublicRound = async (
    candyAddress: string,
    isPublicRound: boolean
  ): Promise<any> => {
    if (!address) {
      return
    }

    const config = await info(candyAddress)
    const is_open = config.is_open
    const round = config.round

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddress,
      msg: {
        set_config: {
          is_open,
          enable_whitelist: !isPublicRound,
          round,
        },
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
    console.log('[+] set public round', result)

    return result.txHash
  }

  const info = async (candyAddress: string) => {
    const client = await getCosmWasmClient()
    const config = await client.queryContractSmart(candyAddress, {
      config: {},
    })
    console.log('[+] query config', config)

    return config
  }

  const queryWhitelist = async (
    candyAddress: string,
    address: string,
    round: number
  ): Promise<any> => {
    const client = await getCosmWasmClient()

    const response = await client.queryContractSmart(candyAddress, {
      whitelist_address: {
        addr: address,
        round: Number(round),
      },
    })

    console.log('[+] query whitelist', response)

    return response
  }

  const checkEligible = async (candyAddress: string): Promise<any> => {
    const client = await getCosmWasmClient()
    const config = await info(candyAddress)

    if (config.enable_whitelist) {
      const response = await client.queryContractSmart(candyAddress, {
        whitelist_single: {
          addr: address,
        },
      })

      console.log('[+] query whitelist_single', response)

      return { data: response, info: config }
    } else {
      return {
        data: {
          addr: address,
          round: config.round,
          count: config.total_token_count,
        },
        info: config,
      }
    }
  }

  const mint = async (candyAddress: string, mint_asset: any): Promise<any> => {
    if (!address) {
      return
    }

    const config = await info(candyAddress)
    const is_open = config.is_open

    console.log({ is_open })

    if (!is_open) {
      return
    }

    const msg = MsgExecuteContract.fromJSON({
      sender: address,
      contractAddress: candyAddress,
      msg: {
        mint: {},
      },

      funds: [
        {
          denom: mint_asset.info.native_token.denom,
          amount: mint_asset.amount,
        },
      ],
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
    console.log('[+] mint', result)

    return result.txHash
  }

  return {
    createCandyMachine,
    checkEligible,
    updateWhitelists,
    info,
    queryWhitelist,
    closeCandyMachine,
    openCandyMachine,
    setRound,
    setPublicRound,
    mint,
    setSeed,
    extractSeed,
  }
}
