import { styled, Box, Text } from '@ignite-ui/react'

export const StyledForm = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const StyledTextFormAnnotation = styled(Text, {
  color: '$gray400',
})
