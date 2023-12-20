import React, { useState } from 'react'

import UserForm, { ILinkProp, ITextFieldProp } from "../../components/UserForm";
import { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';
import { PATHNAMES, REQUEST_U_R_PREFIX } from '../../utils/pathnames';
import { Box, Typography } from '@mui/material';
import BeforeSignin from '../../pageBase/PageBase';

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
    navigate(PATHNAMES.PASSWORD_SEND);
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
    request.post(REQUEST_U_R_PREFIX+ PATHNAMES.SIGNUP, { username, password, email })
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
        <UserForm
          formTitle={"You are signed up!"}
          handleSubmit={goToSignin}
          buttonText={"Sign In"}
          children={
            <>
              <Typography>
                Verification email was sent to {email}.
              </Typography>
              <Typography>
                Please verify your email before signing in. 
              </Typography>
            </>}
          error={error}
        />
      ) : (
      <UserForm
        formTitle={"Create Account"}
        textFieldProps={textFieldProps}
        handleSubmit={signUp}
        buttonText={"Sign Up"}
            bottomLinkProps={linkProps}
            error={error}
      />
      )
    }
    {error && (<Typography>{error}</Typography>)}
    </>
  );
}

export default Signup