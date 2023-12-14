'use client'

import { Avatar } from '@ignite-ui/react'
import { StyledHeading, StyledText } from './styles'
import { useSession } from 'next-auth/react'
import { ScheduleForm } from './schedule-form'
import { NextSeo } from 'next-seo'

export default function Schedule() {
  const session = useSession()

  return (
    <>
      <NextSeo
        title={`Schedule with ${session.data?.user.name} | Ignite Call`}
      />

      <div className="max-w-[852px] px-4 mx-auto mt-20 mb-4">
        <div className="flex flex-col items-center">
          <Avatar src={session.data?.user.avatar_url} />
          <StyledHeading>{session.data?.user.name}</StyledHeading>
          <StyledText>{session.data?.user.bio}</StyledText>
        </div>

        <ScheduleForm />
      </div>
    </>
  )
}
