import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '../../axios/axios';

import UserForm, { ILinkProp, ITextFieldProp } from '../../components/UserForm';
import { PATHNAMES, REQUEST_U_R_PREFIX } from '../../utils/pathnames';
import { AxiosError, AxiosResponse } from 'axios';
import { Alert, AlertTitle, Container, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { IUser, getUser, updateUser } from '../../redux/slices/userSlice';
import useAuth from '../../hooks/useAuth';

const UserEdit: React.FC = () => {
  const user: IUser = useAppSelector(state => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAuth().username;
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGetUser = async () => {
    try {
      const u = await dispatch(getUser(username)).unwrap();  
      if (u.email) setEmail(u.email);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!email) {
      handleGetUser()
    }
    console.log(email)
  }, []);

  

  const textFieldProps: ITextFieldProp[] = [
    // {
    //   name: "username",
    //   changeHandler: setUsername,
    //   fieldState: username,
    //   customFieldLabel: "Username"
    // },
    {
      name: "email",
      changeHandler: setEmail,
      fieldState: email,
      customFieldLabel: "Email Address"
    },
    {
      name: "Password",
      changeHandler: setPassword,
      fieldState: password,
      customFieldLabel: "Password"
    },
  ]

  // send code to the BE and see if the email is decoded 
  // from the last segment of the request URL
  const editUserInfo = async() => {
    const u = await dispatch(updateUser(username)).unwrap()
      .catch((error: AxiosError) => {
        setError(error.message);
        console.error(error);
      });
    if (u) {
      if (u.email) setEmail(u.email)
      setIsSuccess(true);
    }
  }

    const successPopup = (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      <strong>User info successfully updated!</strong>
    </Alert >
  )
  
  return (
    <Container sx={{ padding: "24px", marginBottom: "100px" }}>
      <Typography variant="h5">Edit Account Info</Typography>

      {isSuccess ? successPopup :(<UserForm
        textFieldProps={textFieldProps}
        handleSubmit={editUserInfo}
        formTitle={username}
        buttonText={"Save"}
        error={error}
      />)}
    </Container>
  );
}

export default UserEdit