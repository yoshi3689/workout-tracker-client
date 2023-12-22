import React, { Dispatch, MouseEventHandler, PropsWithChildren, ReactElement, SetStateAction, useState } from 'react'

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, AlertTitle } from '@mui/material';

const defaultTheme = createTheme();

export interface ILinkProp {
  linkText: string;
  clickHandler?: MouseEventHandler;
}

export interface ITextFieldProp {
  name: string;
  customFieldLabel?: string;
  fieldState: string;
  changeHandler: Dispatch<SetStateAction<string>>;
}

const BottomLinks = (bottomLinkProps: ILinkProp[]) => {
  return (
    <Grid justifyContent="space-around" container>
      {bottomLinkProps.map(l => (
        <Grid item key={l.linkText}>
          <Link variant="body2" component={"button"} onClick={l.clickHandler}>
            {l.linkText}
          </Link>
        </Grid>
      )) }
    </Grid> 
  )
}

const TextFields = (textFieldProps: ITextFieldProp[]) => {
  return (
    <>
      {textFieldProps.map((tf, i) => (
        <TextField
          key={tf.name}
          margin="normal"
          required
          fullWidth
          id={tf.name}
          label={tf.customFieldLabel ? tf.customFieldLabel : tf.name}
          name={tf.name}
          value={tf.fieldState ? tf.fieldState : ''}
          autoComplete={tf.name}
          autoFocus={i===0}
          onChange={(e) => tf.changeHandler(e.target.value)}
        />
      ))
      }
    </>
  )
}

const UserForm: React.FC<PropsWithChildren<{
  bottomLinkProps?: ILinkProp[],
  formTitle?: string,
  handleSubmit: MouseEventHandler,
  textFieldProps?: ITextFieldProp[],
  buttonText: string,
  children?: ReactElement<any, any>,
  error?: string
}>> = ({
  bottomLinkProps, formTitle, handleSubmit, textFieldProps, buttonText, children, error
}) => {

  const errorPopup = (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{error}</strong>
    </Alert >
  )

  const successPopup = (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      <strong>{error}</strong>
    </Alert >
  )

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {formTitle}
            </Typography>
            
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              {children && children}
              {error && errorPopup}
              {textFieldProps && TextFields(textFieldProps)}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                {buttonText}
              </Button>
              {bottomLinkProps && BottomLinks(bottomLinkProps)}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default UserForm;