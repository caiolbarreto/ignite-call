import { CaretLeft, CaretRight } from 'phosphor-react'
import { CalendarBody, CalendarTitle } from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays(true)

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: false }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

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
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <button
                        disabled={disabled}
                        className="w-full aspect-square bg-gray600 text-center cursor-pointer rounded text-gray100 enabled:hover:bg-gray500 focus:shadow-md disabled:bg-none disabled:cursor-default disabled:opacity-[0.4]"
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </div>
  )
}
