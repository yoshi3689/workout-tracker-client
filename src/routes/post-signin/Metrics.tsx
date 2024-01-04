import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RecordsCard from '../../components/RecordsCard'
import { getPRs } from '../../redux/slices/routineSlice'
import { useAppDispatch } from '../../redux/hooks'
import useAuth from '../../hooks/useAuth'
import { IExercise } from '../../redux/slices/exerciseSlice'

const Metrics = () => {
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();

  const fetchPRs = async () => {
  try {
    const res = await dispatch(getPRs({ username, accessToken: token })).unwrap();
    console.log(res);
  } catch (err) {
    console.error(err)
  }
}
  return (
    <Box component={"main"} sx={{ padding: "24px", marginBottom: "100px" }}>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: -4.5 }}>
        <Typography variant="h6">Personal Records</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecordsCard title="Workout Streak" adornment='days' count={100} percentage={59.3} extra="35,000" isProgress={false} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecordsCard title="Total Weight Lifted" adornment='lbs' count={442236} percentage={59.3} extra="35,000" isProgress={true} />
      </Grid>
      
      <Button onClick={fetchPRs}>
        Get PRs
      </Button>
      </Grid>
      </Box>
  )
}

export default Metrics