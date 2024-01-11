import { FunctionComponent, PropsWithChildren } from 'react'

import NavBar from "../components/Nav/NavBar";
import { Box, Link, Toolbar, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

const Copyright = (props: any) => {
  return (
    <Typography
      position="sticky"
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sweat Snap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const PageBase: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box component={"header"} sx={{height: 0}} >
        <NavBar />
      </Box>
      <Toolbar />
      {children}
      <Box component={"footer"} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Copyright sx={{ mt: 2, mb: 2 }} />
      </Box>
    </>
  )
}

export default PageBase