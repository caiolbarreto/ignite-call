'use client'

import { MultiStep, Text, Button, TextArea, Avatar } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { ProfileBox, FormAnnotation } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { StyledHeading, StyledText } from '../styles'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()
  const session = useSession()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
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
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
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
