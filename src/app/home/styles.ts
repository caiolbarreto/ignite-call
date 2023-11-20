import { styled, Heading, Text } from '@ignite-ui/react'

export const StyledHeading = styled(Heading, {
  '@media(max-width: 600px)': {
    fontSize: '$6xl',
  },
})

export const StyledText = styled(Text, {
  maskType: '$2',
  color: '$gray200',
})
