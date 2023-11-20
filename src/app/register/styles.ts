import { styled, Heading, Box, Text } from '@ignite-ui/react'

export const StyledHeading = styled(Heading, {
  lineHeight: '$base',
})

export const StyledText = styled(Text, {
  color: '$gray200',
  marginBottom: '$6',
})

export const StyledForm = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
