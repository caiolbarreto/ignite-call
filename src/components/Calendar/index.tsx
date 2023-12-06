import { CaretLeft, CaretRight } from 'phosphor-react'
import { CalendarTitle } from './styles'
import { getWeekDays } from '@/utils/get-week-days'

export function Calendar() {
  const shortWeekDays = getWeekDays(true)

  return (
    <div>
      <div>
        <CalendarTitle>
          December <span>2023</span>
        </CalendarTitle>

        <div>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </div>
      </div>

      <table>
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
              <button>1</button>
            </td>
            <td>
              <button>2</button>
            </td>
            <td>
              <button>3</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
