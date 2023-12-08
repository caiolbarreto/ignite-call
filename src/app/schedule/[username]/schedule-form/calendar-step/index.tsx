import { Calendar } from '@/components/Calendar'
import { Container, TimePickerHeader } from './styles'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import dayjs from 'dayjs'

const buttonStyles = twMerge(
  'border-none bg-gray600 py-3 cursor-pointer text-gray100 rounded-md text-sm leading-3',
  'disabled:bg-none disabled:cursor-default disabled:opacity-[0.4] enabled:hover:bg-gray500 focus:shadow-md',
)

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const dayAndMonth = selectedDate && dayjs(selectedDate).format('MMMM[ ]DD')

  return (
    <Container isTimePickerOpen={isTimePickerOpen}>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      {isTimePickerOpen && (
        <div className="border-l border-l-gray600 px-6 pt-6 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]">
          <TimePickerHeader>
            {weekDay} <span>{dayAndMonth}</span>
          </TimePickerHeader>

          <div className="mt-3 grid grid-cols-2 gap-2 full lg:grid-cols-1 ">
            <button className={buttonStyles}>08:00h</button>
            <button className={buttonStyles}>09:00h</button>
            <button className={buttonStyles}>10:00h</button>
            <button className={buttonStyles}>11:00h</button>
            <button className={buttonStyles}>12:00h</button>
            <button className={buttonStyles}>13:00h</button>
            <button className={buttonStyles}>14:00h</button>
            <button className={buttonStyles}>15:00h</button>
            <button className={buttonStyles}>16:00h</button>
            <button className={buttonStyles}>07:00h</button>
            <button className={`${buttonStyles} mb-6`}>18:00h</button>
          </div>
        </div>
      )}
    </Container>
  )
}
