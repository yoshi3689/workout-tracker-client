import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { Link } from 'react-router-dom'
import EastIcon from '@mui/icons-material/East';

const MetricsCardList: React.FC<{ linkToDetails?: string, listTitle: string, linkToDetailsText?:string, children: React.ReactNode, pagination?: React.ReactNode }> = ({ linkToDetails, listTitle, linkToDetailsText, children, pagination }) => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}  sx={{ mb: -4.5 }}>
        <Typography variant="h5">{listTitle}</Typography>
        {(linkToDetails && linkToDetailsText) && <Link to={linkToDetails}><Button size='small' variant="text">{linkToDetailsText}<EastIcon /></Button></Link>}
        {pagination && pagination}
      </Grid>
      {children}
    </Grid>
  )
}

export default MetricsCardList