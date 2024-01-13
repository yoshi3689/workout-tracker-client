import { AppBar, BottomNavigation, BottomNavigationAction, Box, IconButton, Paper, Toolbar } from '@mui/material'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../../redux/hooks';

import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import useAuth from '../../hooks/useAuth';
import { useNavItems } from '../../hooks/useNavItems';

const NavBar = () => {
  // const isMobile = true
  const { username } = useAuth();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { generateNavItems } = useNavItems(isLoggedIn, username);
  const [value, setValue] = useState(0);
  
  return (
    <Paper component={"nav"} elevation={3}>
      {!isMobile ? (
        <AppBar >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            {generateNavItems().map(ni => 
              <IconButton color="inherit" sx={{ color: "white" }} onClick={ni.clickHandler} key={ni.appRoute+ni.name}>
                {ni.icon}
              </IconButton>
              )
            }
          </Toolbar>
        </AppBar>
      ) : (
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels>
          {generateNavItems().map(ni => 
            <BottomNavigationAction icon={ni.icon} label={ni.name} onClick={ni.clickHandler} key={ni.appRoute+ni.name} />  
              )}
        </BottomNavigation>
      )}
    </Paper>
  )
}

export default NavBar