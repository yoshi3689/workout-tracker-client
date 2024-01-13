import { FunctionComponent, PropsWithChildren } from 'react'

import NavBar from "../Nav/NavBar";
import { Box, Container, Link, Toolbar, Typography } from "@mui/material";
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
      <Box component={"header"} >
        {!isMobile && <>
          <NavBar />
          <Toolbar component="div" sx={{ mb: 3 }} />
        </>}
      </Box>
      <Container sx={{ paddingBlock: 3, paddingInline: 2 }}>
        {children}
      </Container>
      <Box component={"footer"} sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }}>
        <Copyright sx={{ mt: 2, mb: isMobile ? 0 : 2 }} />
        {isMobile && <NavBar />}
      </Box>
    </>
  )
}

export default PageBase