import { PropsWithChildren } from 'react'

import { Navbar } from './navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
