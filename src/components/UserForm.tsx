import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from '../redux/hooks';
import { IUser, loginOrRegister } from '../redux/slices/userSlice';

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
        Your Website
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

  const isLogin = location.pathname === "/login"
  // const [isLogin, setIsLogin] = useState(location.pathname === "login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = isLogin
      ? await axios.post("api/login", { username, password })
      : await axios.post("api/register", { username, password, email });
    const accessToken: string = res.data.accessToken
    dispatch(loginOrRegister({username, accessToken, isLoggedIn: true}));
    navigate(`/dashboard/${username}`);
  }

  const handleFormSwitch = (e:any) => {
    e.preventDefault();
    navigate(isLogin ? "/register" : "/login");
  }

  return (
    <div>
      {/* <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="username"
            id="username"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            id="password"
          />
          {!isLogin && (
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
              id="email"
            />
          )}
          <button
            style={{ width: "60px", margin: "auto" }}
            type="submit"
            onClick={handleSubmit}
          >
            {isLogin ? "login" : "Register"}
          </button>

          <button style={{ margin: "auto" }} onClick={handleFormSwitch}>
            {isLogin ? "Don't have account?" : "Already have account"}
          </button>
        </div>
      </div> */}

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
              {isLogin ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
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
              {!isLogin && (
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
                {isLogin ? "Sign in" : "Sign up"}
              </Button>
              <Grid container>
                {isLogin && (
                  <Grid item xs>
                    <Link variant="body2">Forgot password?</Link>
                  </Grid>
                )}
                <Grid item>
                  <Link variant="body2" onClick={handleFormSwitch}>
                    {isLogin ? "Don't have account?" : "Already have account"}
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