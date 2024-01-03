import { Grid, Typography } from '@mui/material'
import React from 'react'
import RecordsCard from '../../components/RecordsCard'

const Metrics = () => {
  return (
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecordsCard title="Workout Streak" adornment='days' count={100} percentage={59.3} extra="35,000" isProgress={false} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecordsCard title="Total Weight Lifted" adornment='lbs' count={442236} percentage={59.3} extra="35,000" isProgress={true} />
      </Grid>
      
      
      </Grid>
  )
}

export default Metrics