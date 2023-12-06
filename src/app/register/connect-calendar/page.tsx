'use client'

import { Button, MultiStep, Text } from '@ignite-ui/react'
import { StyledHeading, StyledText } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConnectCalendar() {
  const params = useSearchParams()
  const session = useSession()

  const hasAuthError = !!params.get('search')
  const router = useRouter()
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

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
        <div className="flex items-center justify-between border border-gray600 py-4 px-6 rounded-2xl mb-4">
          <Text>Google calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleConnectCalendar}>
              Connect
              <ArrowRight />
            </Button>
          )}
        </div>

        {hasAuthError && (
          <AuthError size="sm">
            Error connecting to Google, verify if you have enabled the access
            permissions to Google Calendar
          </AuthError>
        )}

        <Button
          type="submit"
          disabled={!isSignedIn}
          onClick={handleNavigateToNextStep}
        >
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </main>
  )
}
