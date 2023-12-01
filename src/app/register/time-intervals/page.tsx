'use client'

import { Button, Checkbox, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { StyledHeading, StyledText } from '../styles'
import { IntervalBox, IntervalInput } from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <main className="max-w-[572px] mx-auto mt-20 mb-4">
      <div className="px-6">
        <StyledHeading as="strong">Connect your agenda!</StyledHeading>
        <StyledText>
          Connect your calendar to automatically check busy times and new events
          as they are scheduled.
        </StyledText>

        <MultiStep size={4} currentStep={3} />
      </div>

      <IntervalBox as="form">
        <div className="border border-gray600 rounded-lg mb-4">
          <div className="flex items-center justify-between py-3 px-4 border-t border-gray600">
            <div className="flex items-center gap-3">
              <Checkbox />
              <Text>Monday</Text>
            </div>
            <IntervalInput className="flex items-center gap-2">
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </IntervalInput>
          </div>

          <div className="flex items-center justify-between py-3 px-4 border-t border-gray600">
            <div className="flex items-center gap-3">
              <Checkbox />
              <Text>Tuesday</Text>
            </div>
            <IntervalInput className="flex items-center gap-2">
              <TextInput size="sm" type="time" step={60} />
              <TextInput size="sm" type="time" step={60} />
            </IntervalInput>
          </div>
        </div>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </IntervalBox>
    </main>
  )
}
