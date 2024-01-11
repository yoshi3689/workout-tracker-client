import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAuth from '../../../hooks/useAuth';
import { IPersonalRecord, getPersonalRecords } from '../../../redux/slices/personalRecordSlice';
import { Box, Button, Grid, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import MetricsCardList from '../../../components/Metrics/MetricsCardList';
import RecordsCard from '../../../components/Metrics/RecordsCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MetricsPersonalRecord = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPage(value);
  };
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const personalRecords = useAppSelector(state => {
    if (state.persistedReducer.personalRecords.length > 1) {
      return state.persistedReducer.personalRecords.reduce<IPersonalRecord[][]>((acc, curr, i) => {
        console.log(curr)
      const index = Math.floor(i / 6);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(curr);
      return acc;
    }, []);
    } else {
      return [state.persistedReducer.personalRecords]
    }
  });

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
        <Stack spacing={2}>
      <Pagination
        count={personalRecords.length}
        onChange={handleChange}  
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
      <MetricsCardList
        listTitle="Personal Records"
        pagination={
          <Stack spacing={2}>
            <Pagination
              count={personalRecords.length}
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
          personalRecords.length > 1 && personalRecords[page - 1].map((pr) => {
            if (personalRecords[page - 1].length === 0) {
              return <Typography>No Items to Show</Typography>
            } else {
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
            }
          })
        } />
      
      
      </Box >
  )
}

export default MetricsPersonalRecord