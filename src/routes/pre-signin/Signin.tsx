import React, { useState } from 'react'

import UserForm, { ILinkProp, ITextFieldProp } from "../../components/UserForm";
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';
import { signin } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { PATHNAMES, REQUEST_A_R_PREFIX, defineUserPath } from '../../utils/pathnames';
import { getErrorMessage } from '../../utils/getErrorMessage';


const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    request.post(REQUEST_A_R_PREFIX+PATHNAMES.SIGNIN, { username, password })
      .then((res: AxiosResponse) => {
        dispatch(signin({ accessToken: res.data.accessToken, isLoggedIn: true }));
        navigate(defineUserPath(username, PATHNAMES.USER_HOME));
        })
      .catch((error: AxiosError) => {
        if (error) setError(getErrorMessage(error));
      });
  }

  const goToSignup = () => {
    navigate(PATHNAMES.SIGNUP);
  }

  const goToSendPassword = () => {
    navigate(PATHNAMES.PASSWORD_RESET);
  }

  const goToSendVerification = () => {
    navigate(PATHNAMES.EMAIL_RESEND);
  }

  const linkProps: ILinkProp[] = [
    {
      linkText: "Don't have account?",
      clickHandler: goToSignup,
    },
    {
      linkText: "Forgot Passowrd?",
      clickHandler: goToSendPassword,
    },
    {
      linkText: "Didn't receive email?",
      clickHandler: goToSendVerification,
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
    name: "password",
    changeHandler: setPassword,
    fieldState: password,
    customFieldLabel: "Password"
  },
  ]
  
  return (
    <UserForm
      textFieldProps={textFieldProps}
      bottomLinkProps={linkProps}
      formTitle={"Sign In"}
      handleSubmit={signIn}
      buttonText={"Sign In"}
      error={error}

      
    />
  );
}

export default Signin
