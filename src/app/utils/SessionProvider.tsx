'use client'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { DefaultSeo } from 'next-seo'

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.url.ie/',
          siteName: 'Ignite Call',
        }}
      />
      <SessionProvider>{props.children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
