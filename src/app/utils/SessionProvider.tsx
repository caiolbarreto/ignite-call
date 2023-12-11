'use client'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{props.children}</SessionProvider>{' '}
    </QueryClientProvider>
  )
}

export default Providers
