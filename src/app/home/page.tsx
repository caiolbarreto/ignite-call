'use client'

import appPreview from '@/assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { StyledHeading, StyledText } from './styles'

export default function Home() {
  return (
    <div className="flex items-center h-screen gap-20 ml-auto max-w-[calc(100vw-(100vw-1160px)/2)]">
      <div className="max-w-[480px] px-10">
        <StyledHeading size="4xl" as="h1" className="font-bold">
          Uncomplicated Scheduling
        </StyledHeading>
        <StyledText size="xl" className="mt-2 text-gray200">
          Connect your calendar and allow people to book appointments in their
          spare time.
        </StyledText>
        <ClaimUsernameForm />
      </div>
      <div className="hidden pr-8 overflow-hidden lg:block">
        <Image
          src={appPreview}
          height={400}
          quality={100}
          priority
          alt="Calendar symbolizing the application in operation"
        />
      </div>
    </div>
  )
}
