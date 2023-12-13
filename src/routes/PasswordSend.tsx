import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../components/UserForm';
import { PATHNAMES } from '../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';

const PasswordSend: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
      linkText: "Sign in",
      clickHandler: goToSignin,
    }
  ];

  // send code to the BE and see if the email is decoded 
  // from the last segment of the request URL
  const sendPassword = async() => {
    request.post(`api/user/send-password/${location.pathname.split("/")[2]}/`, { code })
      .then((res: AxiosResponse)  => {
        if (res.data.isVerfied) navigate("/signin")
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
  }
  
  return (
    <>
      <UserForm
        formTitle={"Verify Email"}
        textFieldProps={textFieldProps}
        handleSubmit={sendPassword}
        buttonText={"Verify"}
        bottomLinkProps={linkProps}
      />
      {error}
    </>
  );
}

export default PasswordSend