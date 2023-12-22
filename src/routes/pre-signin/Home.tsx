import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../utils/pathnames'
import { isMobile } from 'react-device-detect'

const Home = () => {
  // console.log(process.env.REACT_APP_ROOT_URL)
  return (
    // <Box
    //       sx={{
    //         background: `url(${process.env.PUBLIC_URL}/landing_bg.jpg)`,
    //         pt: 8,
    //         pb: 6,
    //       }}
    //       >
    //       <Container maxWidth="sm">
    //         <Typography
    //           component="h1"
    //           variant="h3"
    //           align="center"
    //           color="text.primary"
    //           gutterBottom
    //         >
    //           Sweat Snap
    //         </Typography>
    //         <Typography variant="h6" align="center" color="text.secondary" paragraph>
    //           Are you tired of beating yourself up internally for dissatisfied results at the gym?
    //         </Typography>
    //         <Typography variant="h6" align="center" color="text.secondary" paragraph>
    //           This could happen due to unawareness of your past records. Let's log that sweaty gym effort and enjoy the process with us.
    //         </Typography>
    //         <Stack
    //           sx={{ pt: 4 }}
    //           direction="row"
    //           spacing={3}
    //           justifyContent="center"
    //         >
    //           <Button component={Link} to={PATHNAMES.SIGNIN} variant="contained">sign in</Button>
    //           <Button component={Link} to={PATHNAMES.SIGNUP} variant="outlined">sweat with us</Button>
    //         </Stack>
    //       </Container>
    //     </Box>

    <Paper
      sx={{
        position: 'fixed',
        // backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        right: 0,
        left: 0,
        height: "100vh",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundImage: `url(${process.env.PUBLIC_URL}/landing_bg.jpg)`,
        p: { xs: 2, sm: 4 ,md: 6 },
        paddingBlock: { xs: 4, md: 8 },
      }}
    >
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={`${process.env.PUBLIC_URL}/landing_bg.jpg`} alt={"some image"} />} */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          // backgroundColor: 'rgba(0,0,0,.25)',
        }}
      />
      <Grid container>
        <Grid item md={6} lg={4}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 2, sm: 4 ,md: 6 },
              paddingBlock: { xs: 4, md: 8 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="text.primary"
              gutterBottom
            >
              Sweat Snap
            </Typography>
            <Typography variant="h6"  color="text.secondary" paragraph>
              Are you tired of beating yourself up internally for dissatisfied results at the gym?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              This could happen due to unawareness of your past records. Let's log that sweaty gym effort and enjoy the process with us.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction={ isMobile ? "column" : "row" }
              spacing={3}
            >
              <Button component={Link} to={PATHNAMES.SIGNIN} variant="contained">sign in</Button>
              <Button component={Link} to={PATHNAMES.SIGNUP} variant="outlined">sign up</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>

  )
}

export default Home