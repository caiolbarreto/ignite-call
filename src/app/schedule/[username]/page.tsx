'use client'

import { Avatar } from '@ignite-ui/react'
import { StyledHeading, StyledText } from './styles'
import { useSession } from 'next-auth/react'

export default function Schedule() {
  const session = useSession()

  return (
    <div className="max-w-[852px] px-4 mx-auto mt-20 mb-4">
      <div className="flex flex-col items-center">
        <Avatar src={session.data?.user.avatar_url} />
        <StyledHeading>{session.data?.user.name}</StyledHeading>
        <StyledText>{session.data?.user.bio}</StyledText>
      </div>
    </div>
  )
}
