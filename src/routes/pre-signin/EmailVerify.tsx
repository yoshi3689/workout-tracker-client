import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../../components/UserActionForm/UserForm';
import { PATHNAMES, REQUEST_U_R_PREFIX, defineUserPath } from '../../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const goToSignin = () => {
    navigate(PATHNAMES.SIGNIN);
  }

  const goToSendEmail = () => {
    navigate(PATHNAMES.EMAIL_RESEND);
  }

  const textFieldProps: ITextFieldProp[] = [
  {
    name: "username",
    changeHandler: setCode,
    fieldState: code,
    customFieldLabel: "Verification Code"
  },
  ]

  const linkProps: ILinkProp[] = [
    {
      linkText: "Sign In",
      clickHandler: goToSignin,
    },
    {
      linkText: "Did Not Get Email?",
      clickHandler: goToSendEmail,
    }
  ];

  // send code to the BE and see if the email is decoded 
  // from the last segment of the request URL
  const verifyEmail = () => {
    request.post(`${REQUEST_U_R_PREFIX}${defineUserPath(location.pathname.split("/")[2],PATHNAMES.EMAIL_VERIFY)}`, { code })
      .then((res: AxiosResponse)  => {
        if (res.data) {
          setSuccess("Email Verified. Please go to signin page to log in :)");
          // navigate(PATHNAMES.SIGNIN)
        }
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
        handleSubmit={verifyEmail}
        buttonText={"Verify"}
        bottomLinkProps={linkProps}
        success={success}
        error={error}
      />
      
    </>
  );
}

export default VerifyEmail