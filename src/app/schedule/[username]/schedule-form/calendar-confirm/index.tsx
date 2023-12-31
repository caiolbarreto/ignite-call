import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormError, HeaderText } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'At least 3 characters long' }),
  email: z.string().email({ message: 'Type a valid email' }),
  notes: z.string().nullable(),
})

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })

  const { username } = useParams()

  async function handleConfirmScheduling(data: ConfirmFormSchema) {
    const { name, email, notes } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      notes,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('MMMM[ ]DD[ ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <div className="flex items-center gap-4 pb-6 mb-2 border-b border-b-gray600">
        <HeaderText>
          <CalendarBlank />
          {describedDate}
        </HeaderText>
        <HeaderText>
          <Clock />
          {describedTime}
        </HeaderText>
      </div>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Email address</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Notes</Text>
        <TextArea {...register('notes')} />
        {errors.notes && (
          <FormError size="sm">{errors.notes.message}</FormError>
        )}
      </label>

      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </div>
    </ConfirmForm>
  )
}
