'use client'

import { MultiStep, Text, Button, TextArea } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { ProfileBox, FormAnnotation } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { StyledHeading, StyledText } from '../styles'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession({
    required: true,
  })

  console.log(session)

  async function handleUpdateProfile(data: UpdateProfileData) {
    console.log('data', data)
  }

  return (
    <main className="max-w-[572px] mx-auto mt-20 mb-4">
      <div className="px-6">
        <StyledHeading as="strong">Welcome to Ignite Call!</StyledHeading>
        <StyledText>
          We need some information to create your profile! Oh, you can edit
          those info later
        </StyledText>

        <MultiStep size={4} currentStep={1} />
      </div>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Profile picture</Text>
        </label>

        <label>
          <Text size="sm">About you</Text>
          <TextArea placeholder="Your name" {...register('bio')} />
          <FormAnnotation size="sm">
            Tell us a bit about yourself. this will be displayed on your
            personal page
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finish
          <ArrowRight />
        </Button>
      </ProfileBox>
    </main>
  )
}
