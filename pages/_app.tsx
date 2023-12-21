import 'swiper/css'
import '../styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/date-picker.css'
import '@interchain-ui/react/styles'

import { assets, chains } from 'chain-registry'

import { ChakraProvider } from '@chakra-ui/react'
import { SignerOptions } from '@cosmos-kit/core'
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation'
import { wallets as keplrWallets } from '@cosmos-kit/keplr'
import { wallets as leapWallets } from '@cosmos-kit/leap'
import { ChainProvider } from '@cosmos-kit/react'

import Layout from '../components/layout'
import { defaultTheme } from '../config'

import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {}

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'CosmosKit Template',
              description: 'CosmosKit dapp template',
              url: 'https://docs.cosmoskit.com/',
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ChainProvider>
    </ChakraProvider>
  )
}

export default CreateCosmosApp
