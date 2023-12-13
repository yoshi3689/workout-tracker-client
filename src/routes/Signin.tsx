import React, { useState } from 'react'

import UserForm, { ILinkProp, ITextFieldProp } from "../components/UserForm";
import { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios/axios';
import { signin } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { PATHNAMES, defineUserPath } from '../utils/pathnames';

const Signin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const signIn = () => {
    request.post("api/signin", { username, password })
      .then((res: AxiosResponse) => {
          dispatch(signin({ accessToken: res.data, isLoggedIn: true }));
        })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error.message);
      });
    navigate(defineUserPath(username, PATHNAMES.USER_HOME));
  }

  const goToSignup = () => {
    navigate(PATHNAMES.SIGNUP);
  }

  const goToSendPassword = () => {
    navigate(PATHNAMES.PASSWORD_SEND);
  }

  const linkProps: ILinkProp[] = [
    {
      linkText: "Don't have account?",
      clickHandler: goToSignup,
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
    name: "password",
    changeHandler: setPassword,
    fieldState: password,
    customFieldLabel: "Password"
  },
  ]
  
  return (
    <>
      {isForgotPassword
        ? <>
          <UserForm
          textFieldProps={textFieldProps}
          bottomLinkProps={linkProps}
          formTitle={"Sign In"}
          handleSubmit={signIn}
          buttonText={"Sign In"}
          />
      {error}
        </>
        :<>
          <UserForm
          textFieldProps={textFieldProps}
          bottomLinkProps={linkProps}
          formTitle={"Sign In"}
          handleSubmit={signIn}
          buttonText={"Sign In"}
          />
          {error}
        </>
      }
    </>
  );
}

export default Signin
