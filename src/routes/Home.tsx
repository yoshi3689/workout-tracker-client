import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box
          sx={{
            background: `url(${process.env.PUBLIC_URL}/landing_bg.jpg)`,
            pt: 8,
            pb: 6,
          }}
          >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Sweat Snap
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Are you tired of beating yourself up internally for dissatisfied results at the gym?
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              This could happen due to unawareness of your past records. Let's log that sweaty gym effort and enjoy the process with us.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={3}
              justifyContent="center"
            >
              <Button component={Link} to={"/signin"} variant="contained">sign in</Button>
              <Button component={Link} to={"/signup"} variant="outlined">sweat with us</Button>
            </Stack>
          </Container>
        </Box>
  )
}

export default Home