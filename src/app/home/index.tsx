'use client'

import { Heading, Text } from '@ignite-ui/react'

import appPreview from '@/assets/app-preview.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex items-center h-screen gap-20 ml-auto max-w-[calc(100vw-(100vw-1160px)/2)]">
      <div className="max-w-[480px] px-10">
        <Heading size="4xl" className="font-bold">
          Uncomplicated Scheduling
        </Heading>
        <Text size="xl" className="mt-2 text-gray200">
          Connect your calendar and allow people to book appointments in their
          spare time.
        </Text>
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
