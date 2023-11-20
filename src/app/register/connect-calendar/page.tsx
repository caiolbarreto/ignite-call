'use client'

import { Button, MultiStep, Text } from '@ignite-ui/react'
import { StyledHeading, StyledText } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox } from './styles'

export default function Register() {
  return (
    <main className="max-w-[572px] mx-auto mt-20 mb-4">
      <div className="px-6">
        <StyledHeading as="strong">Connect your agenda!</StyledHeading>
        <StyledText>
          Connect your calendar to automatically check busy times and new events
          as they are scheduled.
        </StyledText>

        <MultiStep size={4} currentStep={2} />
      </div>

      <ConnectBox>
        <div className="flex items-center justify-between border border-gray600 py-4 px-6 rounded-2xl mb-2">
          <Text>Google calendar</Text>
          <Button variant="secondary">
            Connect
            <ArrowRight />
          </Button>
        </div>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </main>
  )
}
