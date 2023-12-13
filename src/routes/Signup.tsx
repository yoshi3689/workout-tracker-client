import React, { useState } from 'react'

import UserForm, { ILinkProp, ITextFieldProp } from "../components/UserForm";
import { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios/axios';
import { PATHNAMES } from '../utils/pathnames';
import { Box, Typography } from '@mui/material';

const Signup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);


  const goToSignin = () => {
    navigate(PATHNAMES.SIGNIN);
  }

  const goToSendPassword = () => {
    navigate(PATHNAMES.SIGNUP);
  }

  const linkProps: ILinkProp[] = [
    {
      linkText: "Already have account?",
      clickHandler: goToSignin,
    },
    {
      linkText: "Forgot Passowrd?",
      clickHandler: goToSendPassword,
    }
  ];

  const textFieldProps: ITextFieldProp[] = [
  {
    name: "username",
    changeHandler: setUsername,
    fieldState: username,
    customFieldLabel: "Username"
  },
  {
    name: "email",
    changeHandler: setEmail,
    fieldState: email,
    customFieldLabel: "Email Address"
  },
  {
    name: "password",
    changeHandler: setPassword,
    fieldState: password,
    customFieldLabel: "Password"
  },
  ]

  const signUp = () => { 
    request.post("api/user/signup", { username, password, email })
      .then(res => {
        if (res.data) setIsSignedUp(true);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
  }


  return (
    <>
      {isSignedUp ? (
        <Box>
          <Typography>
            Verification email was sent to {email}.
            In order to sign in, you need to verify your email. 
          </Typography>
        </Box>
      ) : (
      <UserForm
        formTitle={"Create Account"}
        textFieldProps={textFieldProps}
        handleSubmit={signUp}
        buttonText={"Sign Up"}
        bottomLinkProps={linkProps}
      />
      )
    }
    {error && (<Typography>{error}</Typography>)}
    </>
  );
}

export default Signup