import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { StyledForm, StyledTextFormAnnotation } from './styles'
import { useRouter } from 'next/navigation'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'At least 3 characters long' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Only letters and hyphens' })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`register/?username=${username}`)
  }

  return (
    <>
      <StyledForm as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="your-user"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Schedule
          <ArrowRight />
        </Button>
      </StyledForm>

      <div className="mt-2">
        <StyledTextFormAnnotation size="sm">
          {errors.username ? errors.username.message : 'Input the username'}
        </StyledTextFormAnnotation>
      </div>
    </>
  )
}
