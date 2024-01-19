import { Box, Grid, Link, Typography } from '@mui/material'
import RecordsCard from '../../../components/Metrics/RecordsCard'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import useAuth from '../../../hooks/useAuth'
import { getPersonalRecords } from '../../../redux/slices/personalRecordSlice'
import { getLiftableWeightsByExercise } from '../../../redux/slices/liftableWeightSlice'
import { LineChart } from '@mui/x-charts'
import MetricsCardList from '../../../components/Metrics/MetricsCardList'
import { useEffect } from 'react'
import { PATHNAMES, defineUserPath } from '../../../utils/pathnames'
import { useNavigate } from 'react-router-dom'

// displays accumulated exercise data in different graphs
// (for now just lifted weight over time)
const Metrics = () => {
  const dispatch = useAppDispatch();
  const { username, token } = useAuth();
  const liftableWeights = useAppSelector(state => state.persistedReducer.liftableWeights.slice(0, 3));
  const navigate = useNavigate();

  const fetchLiftedWeights = async () => {
  try {
    await dispatch(getLiftableWeightsByExercise({ username, accessToken: token })).unwrap();
  } catch (err) {
    console.error(err)
  }
  }

  useEffect(() => {
    fetchLiftedWeights();
  }, [])

  return (
    <Box >
      <Typography variant="h5">Stats</Typography>
      {liftableWeights.length > 1 ? 
      <MetricsCardList
        listTitle='Lifted Weight'
        linkToDetails={`/dashboard/${username}/metrics/liftable-weights`}
        linkToDetailsText='All lifted weights by exercise'
        children={
          liftableWeights.map((lw, i) => {
          return (
            <Grid sx={{ mb: 4 }} item xs={12} sm={6} md={6} lg={4} key={lw.exerciseName}>
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
        })
      }
        /> : (
            <Typography variant='h6'>
                Please log your workout 
                <Link
                  onClick={() => navigate(defineUserPath(username, PATHNAMES.USER_EDIT_ADD_LOG))}
                  sx={{ cursor: "pointer" }}
                  > here</Link>
            </Typography>    
        )

      }
      </Box >
  )
}

export default Metrics