import { Avatar, Box, Button, Container, CssBaseline, FormControl, FormControlLabel, Grid, Input, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios/axios';
import { Label } from '@mui/icons-material';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // send code to the BE and see if the email is decoded 
  // from the last segment of the request URL

  // request URL is DOMAIN/api/user/verify-email/:userInfoEncoded
  const verify = () => {
    const res = request.post(`api/user/verify-email/${location.pathname.split("/")[2]}/`, { code })
    console.log(res)
    // if (res.isVerfied) navigate("/signin")
  }
  const [code, setCode] = useState("");
  return (
    <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Verify Email
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >

              <TextField
                margin="normal"
                required
                fullWidth
                name="code"
                label="Enter verification code"
                type="code"
                id="code"
                value={code}
                autoComplete="current-code"
                onChange={(e) => setCode(e.target.value)}
              />
              
              <Button
                fullWidth
                variant="contained"
                onClick={verify}
                sx={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
            </Box>
          </Box>
    </Container>
    // <Container>
    //   <Box>
    //     <Typography variant='h4'>Verify your email</Typography>
    //     <Container maxWidth="sm">
        
    //   <FormControl>
    //     <InputLabel>Code</InputLabel>
    //     <Input value={code} onChange={(e) => setCode(e.target.value)} />
    //   </FormControl>
    //       <Button onClick={verify}>Verify</Button>
    //       </Container>
    //   </Box>
      
    // </Container>
  );
}

export default VerifyEmail