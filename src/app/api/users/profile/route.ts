import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/utils/auth-options'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ status: 401 })
  }

  const { bio } = updateProfileBodySchema.parse(await req.json())

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({ status: 204 })
}
