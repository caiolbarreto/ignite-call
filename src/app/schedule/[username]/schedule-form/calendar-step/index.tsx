import { Calendar } from '@/components/Calendar'
import { Container, TimePickerHeader } from './styles'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const buttonStyles = twMerge(
  'border-none bg-gray600 py-3 cursor-pointer text-gray100 rounded-md text-sm leading-3',
  'disabled:bg-none disabled:cursor-default disabled:opacity-[0.4] enabled:hover:bg-gray500 focus:shadow-md',
)

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { username } = useParams()

  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const dayAndMonth = selectedDate && dayjs(selectedDate).format('MMMM[ ]DD')

  const selectedDateWithoutTime =
    selectedDate && dayjs(selectedDate).format('YYYY-MM-DD')

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })
      return response.data
    },
  })

  return (
    <Container isTimePickerOpen={isTimePickerOpen}>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      {isTimePickerOpen && (
        <div className="border-l border-l-gray600 px-6 pt-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]">
          <TimePickerHeader>
            {weekDay} <span>{dayAndMonth}</span>
          </TimePickerHeader>

          <div className="mt-3 grid grid-cols-2 gap-2 full lg:grid-cols-1 ">
            {availability?.possibleTimes.map((hour) => {
              return (
                <button
                  key={hour}
                  className={buttonStyles}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </button>
              )
            })}
          </div>
        </div>
      )}
    </Container>
  )
}
