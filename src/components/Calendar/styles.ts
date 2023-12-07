import { Text, styled } from '@ignite-ui/react'

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    lineHeight: '0.75rem',
    content: '.',
    display: 'block',
    color: '$gray800',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})
