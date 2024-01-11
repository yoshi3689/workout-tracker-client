import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../../components/UserActionForm/UserForm';
import { PATHNAMES, REQUEST_U_R_PREFIX } from '../../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';
import { Typography } from '@mui/material';

const PasswordSend: React.FC = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSent, setIsSent] = useState(false);

  const goToSignin = () => {
    navigate(PATHNAMES.SIGNIN);
  }

  const textFieldProps: ITextFieldProp[] = [
  {
    name: "email",
    changeHandler: setEmail,
    fieldState: email,
    customFieldLabel: "Email Address"
  },
  ]

  const linkProps: ILinkProp[] = [
    {
      linkText: "Sign In",
      clickHandler: goToSignin,
    }
  ];

  // send code to the BE and see if the email is decoded 
  // from the last segment of the request URL
  const sendPassword = () => {
    request.post(REQUEST_U_R_PREFIX+PATHNAMES.PASSWORD_RESET)
      .then((res: AxiosResponse)  => {
        if (res.data) {
          setIsSent(true);
          setSuccess("The password is sent. Please check your email inbox.");
        }
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
  }
  
  return (
    <>
      {isSent && (
        <UserForm
          formTitle={"Password Sent!"}
          handleSubmit={goToSignin}
          buttonText={"Sign In"}
          success={success}
        />
      )}
      <UserForm
        formTitle={"Send Password"}
        textFieldProps={textFieldProps}
        handleSubmit={sendPassword}
        buttonText={"Send"}
        bottomLinkProps={linkProps}
        error={error}
      />
    </>
  );
}

export default PasswordSend