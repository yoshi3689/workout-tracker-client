import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAuth from '../../../hooks/useAuth';
import { getPersonalRecords } from '../../../redux/slices/personalRecordSlice';
import { Box, Button, Grid, Typography } from '@mui/material';
import MetricsCardList from '../../../components/MetricsCardList';
import RecordsCard from '../../../components/RecordsCard';

const MetricsPersonalRecord = () => {
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const personalRecords = useAppSelector(state => state.persistedReducer.personalRecords);

  const fetchPRs = async () => {
  try {
    const res1 = await dispatch(getPersonalRecords({ username, accessToken: token })).unwrap();
    console.log(res1);
  } catch (err) {
    console.error(err)
  }
  }

  useEffect(() => {
    if (personalRecords.length < 1) {
      fetchPRs();
    }
  }, [])
  return (
    <Box component={"main"} sx={{ padding: "24px", marginBottom: "100px" }}>
      <Typography variant="h4">Dashboard</Typography>
      <MetricsCardList
        listTitle="Personal Records"
        linkToDetails={`/dashboard/${username}/metrics/personal-records`}
        linkToDetailsText="All Personal Records"
        children={
          personalRecords.length > 1 && personalRecords.map((pr) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pr.documentId}>
                <RecordsCard
                  title={pr.exerciseName}
                  adornment='lbs'
                  count={pr.maxWeight}
                  prDate={pr.createdAt}
                  isProgress={true}
                  actionLink={`dashboard/${username}/metrics/${pr.exerciseName.replaceAll(" ", "-")}`}
                />
              </Grid>)
          })
        } />
      
      
      </Box >
  )
}

export default MetricsPersonalRecord