import { AppBar, Box, Container, Grid, IconButton, Modal, Toolbar, styled } from '@mui/material'
import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../redux/hooks';



const WithAppBar = () => {
  const [open, setOpen] = useState(false);
    const {isLoggedIn, username} = useAppSelector(state => {
    return state.persistedReducer.user;  
  });
  return (
    <AppBar component={"nav"} position="fixed" color="primary" sx={!isMobile ? { top: 'auto', bottom: 0 } : { top: 0, bottom: 'auto'}}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>

          
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        {isLoggedIn &&
          <IconButton color="inherit">
            {username}
          </IconButton>
        }
        </Toolbar>
      </AppBar>
  )
}

export default WithAppBar