import { CaretLeft, CaretRight } from 'phosphor-react'
import { CalendarBody, CalendarTitle } from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays(true)

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <div className="flex gap-2 text-gray200">
          <button
            className="cursor-pointer leading-none rounded-xl hover:text-gray100 focus:shadow-md"
            onClick={handlePreviousMonth}
            title="Previous month"
          >
            <CaretLeft className="w-5 h-5" />
          </button>
          <button
            className="cursor-pointer leading-none rounded-xl hover:text-gray100 focus:shadow-md"
            onClick={handleNextMonth}
            title="Next month"
          >
            <CaretRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay, index) => {
              return <th key={index}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="w-full aspect-square bg-gray600 text-center cursor-pointer rounded text-gray100 enabled:hover:bg-gray500 focus:shadow-md disabled:bg-none disabled:cursor-default disabled:opacity-[0.4]">
                1
              </button>
            </td>
            <td className="box-border">
              <button className="w-full aspect-square bg-gray600 text-center cursor-pointer rounded text-gray100 enabled:hover:bg-gray500 focus:shadow-md disabled:bg-none disabled:cursor-default disabled:opacity-[0.4]">
                2
              </button>
            </td>
            <td className="box-border">
              <button className="w-full aspect-square bg-gray600 text-center cursor-pointer rounded text-gray100 enabled:hover:bg-gray500 focus:shadow-md disabled:bg-none disabled:cursor-default disabled:opacity-[0.4]">
                3
              </button>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </div>
  )
}
