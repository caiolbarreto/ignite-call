import { styled, Button, TextInput, Box, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const StyledForm = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

const StyledTextFormAnnotation = styled(Text, {
  color: '$gray400',
})

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
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
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
        <Button size="sm" type="submit">
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
