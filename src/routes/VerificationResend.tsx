import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../components/UserForm';
import { PATHNAMES } from '../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';
import { Typography } from '@mui/material';

const VerificationResend: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const goToSignin = () => {
    navigate(PATHNAMES.SIGNIN);
  }

  // const goToSendEmail = () => {
  //   navigate(PATHNAMES.SIGNUP);
  // }

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
  const resendEmail = () => {
    request.post('api/user/resend-email', { email })
      .then((res: AxiosResponse)  => {
        if (res.data) setIsSent(true);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
  }
  
  return (
    <>
      {isSent ? (
        <>
          <UserForm
          formTitle={"Verification Email sent!"}
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
        </>
      ) : (
          <UserForm
        formTitle={"Send Verification"}
        textFieldProps={textFieldProps}
        handleSubmit={resendEmail}
        buttonText={"send"}
        bottomLinkProps={linkProps}
        error={error}
      />
      )
    }
    </>
  );
}

export default VerificationResend