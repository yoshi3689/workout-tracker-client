import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAuth from '../../../hooks/useAuth';
import { Box, Button, Grid, Typography } from '@mui/material';
import MetricsCardList from '../../../components/MetricsCardList';
import RecordsCard from '../../../components/RecordsCard';
import { LineChart } from '@mui/x-charts';
import { getLiftableWeightsByExercise } from '../../../redux/slices/liftableWeightSlice';

const MetricsLiftedWeight = () => {
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const liftableWeights = useAppSelector(state => state.persistedReducer.liftableWeights);

  const fetchLiftableWeights = async () => {
  try {
    const res1 = await dispatch(getLiftableWeightsByExercise({ username, accessToken: token })).unwrap();
    console.log(res1);
  } catch (err) {
    console.error(err)
  }
  }

  useEffect(() => {
    if (liftableWeights.length < 1) {
      fetchLiftableWeights();
    }
  }, []);

  return (
    <Box component={"main"} sx={{ padding: "24px", marginBottom: "100px" }}>
      <Typography variant="h4">Lifted Weights</Typography>
    <MetricsCardList
        listTitle='Lifted Weight'
        linkToDetails={`/dashboard/${username}/metrics/liftable-weights`}
        linkToDetailsText='All lifted weights by exercise'
        children={
          liftableWeights.length > 1 && liftableWeights.map((lw, i) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={lw.exerciseName}>
              <LineChart
                xAxis={[{
                  data: lw.dates,
                  valueFormatter: (v) => new Date(v).toLocaleDateString(),
                  scaleType: "band",
                }]}
                series={[{
                  data: lw.liftableWeights,
                  type: "line",
                  label: `${lw.exerciseName} (lbs)`
                }]}
                height={300}
              ></LineChart>
            </Grid>
        )
        })}
      />
      </Box>
  )
}

export default MetricsLiftedWeight