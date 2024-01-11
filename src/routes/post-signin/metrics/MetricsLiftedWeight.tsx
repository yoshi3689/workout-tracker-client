import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAuth from '../../../hooks/useAuth';
import { Box, Grid, Typography } from '@mui/material';
import MetricsCardList from '../../../components/Metrics/MetricsCardList';
import { LineChart } from '@mui/x-charts';
import { IExerciseLiftableWeight, getLiftableWeightsByExercise, selectPaginatedLiftableWeights } from '../../../redux/slices/liftableWeightSlice';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const MetricsLiftedWeight = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPage(value);
  };
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const liftableWeights = useAppSelector(state => selectPaginatedLiftableWeights(state));

  console.log(liftableWeights)
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
      <MetricsCardList
        listTitle='Lifted Weight'
        pagination={
          <Stack spacing={2}>
            <Pagination
              count={liftableWeights.length}
              onChange={handleChange}  
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>}
        children={
          liftableWeights.length > 1 && liftableWeights[page - 1].map((lw, i) => {
            if (liftableWeights[page - 1].length === 0) {
              return <Typography>No Items to show</Typography>
            } else {
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
          }
        })}
      />
      </Box>
  )
}

export default MetricsLiftedWeight