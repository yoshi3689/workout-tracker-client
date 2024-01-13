import React, { useState } from 'react'

import UserForm, { ILinkProp, ITextFieldProp } from "../../components/UserActionForm/UserForm";
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';
import { PATHNAMES, REQUEST_U_R_PREFIX } from '../../utils/pathnames';
import { Typography } from '@mui/material';
import { getErrorMessage } from '../../utils/getErrorMessage';

const Signup: React.FC = () => {
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
    navigate(PATHNAMES.PASSWORD_RESET_BEFORE_LINK_CLICKED);
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
        setError(getErrorMessage(error.response ? error.response.data : error.message));
        console.log(error)
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
    </>
  );
}

export default Signup