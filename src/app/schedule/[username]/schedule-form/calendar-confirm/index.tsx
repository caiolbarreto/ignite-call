import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, HeaderText } from './styles'
import { Button, Text, TextInput } from '@ignite-ui/react'

export function ConfirmStep() {
  return (
    <ConfirmForm as="form">
      <div className="flex items-center gap-4 pb-6 mb-2 border-b border-b-gray600">
        <HeaderText>
          <CalendarBlank />
          december 22 2023
        </HeaderText>
        <HeaderText>
          <Clock />
          18:00h
        </HeaderText>
      </div>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" />
      </label>

      <label>
        <Text size="sm">Email address</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>

      <label>
        <Text size="sm">Notes</Text>
        <TextInput />
      </label>

      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </ConfirmForm>
  )
}
