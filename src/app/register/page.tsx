'use client'

import { MultiStep, Text, TextInput, Button } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { StyledHeading, StyledText, StyledForm, FormError } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'At least 3 characters long' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Only letters and hyphens' })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'At least 3 characters long' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const router = useRouter()

  useEffect(() => {
    setValue('username', String(username))
  }, [username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        alert(err.response.data.message)
      }
    }
  }

  return (
    <>
      <NextSeo title="Create an account | Ignite Call" />

      <main className="max-w-[572px] mx-auto mt-20 mb-4">
        <div className="px-6">
          <StyledHeading as="strong">Welcome to Ignite Call!</StyledHeading>
          <StyledText>
            We need some information to create your profile! Oh, you can edit
            those info later
          </StyledText>

          <MultiStep size={4} currentStep={1} />
        </div>

        <StyledForm as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">User name</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="your-user"
              {...register('username')}
            />

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Full name</Text>
            <TextInput placeholder="Your name" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Next step
            <ArrowRight />
          </Button>
        </StyledForm>
      </main>
    </>
  )
}
