import { Box, Grid, Typography } from '@mui/material'
import RecordsCard from '../../../components/RecordsCard'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import useAuth from '../../../hooks/useAuth'
import { getPersonalRecords } from '../../../redux/slices/personalRecordSlice'
import { getLiftableWeightsByExercise } from '../../../redux/slices/liftableWeightSlice'
import { LineChart } from '@mui/x-charts'
import MetricsCardList from '../../../components/MetricsCardList'
import { useEffect } from 'react'


const Metrics = () => {
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const personalRecords = useAppSelector(state => state.persistedReducer.personalRecords.slice(0, 3));
  const liftableWeights = useAppSelector(state => state.persistedReducer.liftableWeights.slice(0, 3));
  

  const fetchPRs = async () => {
  try {
    await dispatch(getPersonalRecords({ username, accessToken: token })).unwrap();
  } catch (err) {
    console.error(err)
  }
  }

  const fetchLiftedWeights = async () => {
  try {
    await dispatch(getLiftableWeightsByExercise({ username, accessToken: token })).unwrap();
  } catch (err) {
    console.error(err)
  }
  }

  useEffect(() => {
    fetchPRs();
    fetchLiftedWeights();
  }, [])

  return (
    <Box component={"main"} sx={{ padding: "24px", marginBottom: "100px" }}>
      <Typography variant="h4">Dashboard
        
      </Typography>
      {/* <MetricsCardList
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
        } /> */}
      
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
      </Box >
  )
}

export default Metrics