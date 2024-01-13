import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../../components/UserActionForm/UserForm';
import { PATHNAMES, REQUEST_U_R_PREFIX } from '../../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';


const PasswordReset: React.FC = () => {
  
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSent, setIsSent] = useState(false);
  const pathname = useLocation().pathname

  const goToSignin = () => {
    navigate(PATHNAMES.SIGNIN);
  }

  const textFieldProps: ITextFieldProp[] = [
  {
    name: "New Pasword",
    changeHandler: setNewPassword,
    fieldState: newPassword,
    customFieldLabel: "New Password"
    },
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
    }
  ];

  // send code to the BE and see if the newPassword is decoded 
  // from the last segment of the request URL
  const resetPassword = () => {
    request.post(REQUEST_U_R_PREFIX+PATHNAMES.PASSWORD_RESET_AFTER_LINK_CLICKED, { newPassword, code, userInfoEncoded: pathname.split("/")[2] })
      .then((res: AxiosResponse)  => {
        if (res.data) {
          setIsSent(true);
          setSuccess("The password is reset! Please go to signin page");
        }
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
  }
  
  return (
    <>
      {isSent ? (
        <UserForm
          formTitle={"Password Sent!"}
          handleSubmit={goToSignin}
          buttonText={"Sign In"}
          success={success}
        />
      ) : (
          <UserForm
        formTitle={"Reset Password"}
        textFieldProps={textFieldProps}
        handleSubmit={resetPassword}
        buttonText={"Send"}
        bottomLinkProps={linkProps}
        error={error}
      />
      )
    }
      
    </>
  );
}

export default PasswordReset