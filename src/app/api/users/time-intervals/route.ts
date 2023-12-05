import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import z from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ status: 401 })
  }

  const { intervals } = timeIntervalsBodySchema.parse(await req.json())

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => {
      return {
        week_day: interval.weekDay,
        time_start_in_minutes: interval.startTimeInMinutes,
        time_end_in_minutes: interval.endTimeInMinutes,
        user_id: session.user.id,
      }
    }),
  })

  return NextResponse.json({ status: 201 })
}
