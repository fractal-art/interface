import { Grid, Box } from '@chakra-ui/react'
import RoundCard, { RoundCardProps } from '../round-card'
import dayjs from 'dayjs'

export interface ConfirmYouDropProps {
  scheduleInfo: any[]
  data: RoundCardProps[]
}

const ConfirmYouDrop = (props: ConfirmYouDropProps) => {
  return (
    <Box w="488px">
      <Grid userSelect="none">
        {props?.scheduleInfo.map((item, index) => (
          <RoundCard
            key={index}
            round={index + 1}
            title={item.roundName}
            status={item.status}
            totalItems={item.maxItem}
            date={dayjs(item.startDate)}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default ConfirmYouDrop
