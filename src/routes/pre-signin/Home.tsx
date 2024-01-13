import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../utils/pathnames'
import { isMobile } from 'react-device-detect'

const Home = () => {

  return (
    <Box
      sx={{
        
        color: '#fff',
        height: "100vh",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
      <Grid spacing={4} container sx={{
          p: { xs: 2, sm: 4, md: 6 },
          paddingBlock: { xs: 10, sm: 8,md: 8 },}}>
        <Grid item sm={6} md={6}>
          <Box
            sx={{
              position: 'relative',
              paddingBlock: { sm: 2,md: 4, lg: 6 },
            }}
          >
            <Typography
              component="h1"
              sx={{typography: {xs: "h3", sm:"h3", lg:"h2"}}}
              color="text.primary"
              gutterBottom
            >
              Track your sweaty effort
            </Typography>
            <Typography sx={{typography: {xs: "subtitle1", sm:"body1", lg:"subtitle1"}, pt:2}}  color="text.secondary" paragraph>
              Are you tired of beating yourself up internally for dissatisfied results at the gym?
            </Typography>
            <Typography sx={{typography: {xs: "subtitle1", sm:"body1", lg:"subtitle1"}}} color="text.secondary" paragraph>
              This could happen due to unawareness of your past records. Let's log that sweaty gym effort and enjoy the process with us.
            </Typography>
            <Stack
              sx={{ pt: 2 }}
              direction={ isMobile ? "column" : "row" }
              spacing={3}
            >
              <Button component={Link} to={PATHNAMES.SIGNIN} variant="contained">sign in</Button>
              <Button component={Link} to={PATHNAMES.SIGNUP} variant="outlined">sign up</Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item sm={6} md={6}
          sx={{
            display: { xs: "none", sm: "block" }
        }} >
          {/* <img  src={`${process.env.PUBLIC_URL}/Fitz - Stretching.png`} alt={"some image"} /> */}
          <img style={{maxWidth: "100%", maxHeight: "450px"}} src={`${process.env.PUBLIC_URL}/undraw_working_out_re_nhkg.svg`} alt={"some image"}  />
          
        </Grid>
      </Grid>
    </Box>

  )
}

export default Home