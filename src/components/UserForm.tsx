import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'

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

// TODO remove, this demo shouldn't need to reset the theme.
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
    <Grid container>
      {bottomLinkProps.map(l => (
          <Grid item>
            {/* <Link variant="body2" onClick={handleFormSwitch}>
            {isSignin ? "Don't have account?" : "Already have account"}
            </Link> */}
          
            <Link variant="body2" component={"a"} onClick={l.clickHandler}>
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
      {textFieldProps.map(tf => (
        <TextField
          margin="normal"
          required
          fullWidth
          id={tf.name}
          label={tf.customFieldLabel ? tf.customFieldLabel : tf.name}
          name={tf.name}
          autoComplete={tf.name}
          autoFocus
          onChange={(e) => tf.changeHandler(e.target.value)}
        />
      ))
      }
    </>
  )
}

const UserForm: React.FC<{
  bottomLinkProps?: ILinkProp[],
  formTitle: string,
  handleSubmit: MouseEventHandler,
  textFieldProps: ITextFieldProp[],
  buttonText: string
}> = ({
  bottomLinkProps, formTitle, handleSubmit, textFieldProps, buttonText
}) => {

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
              {TextFields(textFieldProps)}
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