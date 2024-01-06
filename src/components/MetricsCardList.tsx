import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { Link } from 'react-router-dom'
import EastIcon from '@mui/icons-material/East';

const MetricsCardList: React.FC<{ linkToDetails: string, listTitle: string, linkToDetailsText:string, children: React.ReactNode }> = ({ linkToDetails, listTitle, linkToDetailsText, children }) => {
  return (
    <Grid container component={Paper} rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}  sx={{ mb: -4.5 }}>
        <Typography variant="h5">{listTitle}</Typography>
        <Link to={linkToDetails}><Button size='small' variant="text">{linkToDetailsText}<EastIcon /></Button></Link>  
      </Grid>
      {children}
    </Grid>
  )
}

export default MetricsCardList