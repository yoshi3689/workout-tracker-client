import React, { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from '../redux/hooks';
import { signin } from '../redux/slices/userSlice';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from '../axios/axios';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sweat Snap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const UserForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignin = location.pathname === "/signin"
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isSignedUp, setIsSignedUp] = useState(false)

  const dispatch = useAppDispatch();

  const signIn = () => {
    request.post("api/signin", { username, password })
      .then((res: AxiosResponse) => {
          dispatch(signin({ accessToken: res.data, isLoggedIn: true }));
        })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error.message);
      });
    navigate(`/dashboard/${username}`);
  }

const signUp = () => {
   request.post("api/user/signup", { username, password, email })
    .then((res: AxiosResponse) => {
      return res.data;
    })
     .then((res) => {
      if (res) setIsSignedUp(true)
    })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error.message);
      });
  }

  const handleSubmit = async () => {
    isSignin ? signIn() : signUp();
    
  }

  const handleFormSwitch = (e:any) => {
    e.preventDefault();
    navigate(isSignin ? "/signup" : "/signin");
  }

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignin ? "Sign in" : "Sign up"}
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
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              {!isSignin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignin ? "Sign in" : "Sign up"}
              </Button>
              <Grid container>
                {isSignin && (
                  <Grid item xs>
                    <Link variant="body2">Forgot password?</Link>
                  </Grid>
                )}
                <Grid item>
                  <Link variant="body2" onClick={handleFormSwitch}>
                    {isSignin ? "Don't have account?" : "Already have account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default UserForm;