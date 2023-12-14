/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

interface ParamsProps {
  params: {
    username: string
  }
}

const createSchedulingBody = z.object({
  name: z.string(),
  email: z.string().email(),
  notes: z.string(),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest, { params }: ParamsProps) {
  const { username } = params

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 })
  }

  const { name, email, notes, date } = createSchedulingBody.parse(
    await req.json(),
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json(
      { message: 'Date is in the past.' },
      { status: 400 },
    )
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return NextResponse.json(
      { message: 'There is another scheduling at the same time.' },
      { status: 400 },
    )
  }

  await prisma.scheduling.create({
    data: {
      name,
      email,
      notes,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return NextResponse.json({ status: 201 })
}
