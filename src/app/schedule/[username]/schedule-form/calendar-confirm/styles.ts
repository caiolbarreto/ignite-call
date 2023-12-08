import { styled, Box, Text } from '@ignite-ui/react'

export const ConfirmForm = styled(Box, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const HeaderText = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  svg: {
    color: '$gray200',
    width: '$5',
    height: '$5',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
