/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface ParamsProps {
  params: {
    username: string
  }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  const { searchParams } = new URL(req.url)
  const { username } = params
  const year = searchParams.get('year')
  const month = searchParams.get('month')

  if (!year || !month) {
    return NextResponse.json({ message: 'Year or month not specified.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return NextResponse.json({ message: 'User does not exist' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  return NextResponse.json({ blockedWeekDays })
}
