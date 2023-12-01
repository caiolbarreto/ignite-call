'use client'

import { Button, Checkbox, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { StyledHeading, StyledText } from '../styles'
import { IntervalBox, IntervalInput } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() {}

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

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <div className="border border-gray600 rounded-lg mb-4">
          {fields.map((field, index) => {
            return (
              <div
                className="flex items-center justify-between py-3 px-4 border-t border-gray600"
                key={field.id}
              >
                <div className="flex items-center gap-3">
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </div>
                <IntervalInput className="flex items-center gap-2">
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInput>
              </div>
            )
          })}
        </div>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </IntervalBox>
    </main>
  )
}
