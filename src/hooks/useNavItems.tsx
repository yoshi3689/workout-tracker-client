import React, { MouseEventHandler, ReactElement } from 'react'
import { PATHNAMES, defineUserPath } from '../utils/pathnames';
import { useNavigate } from 'react-router-dom';

import ViewListIcon from '@mui/icons-material/ViewList';
import LogoutIcon from '@mui/icons-material/Logout';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LoginIcon from '@mui/icons-material/Login';

import { logout } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { getErrorMessage } from '../utils/getErrorMessage';

interface INavItem {
  appRoute: string;
  icon: ReactElement<any, any>;
  name: string;
  clickHandler: MouseEventHandler;
}

export const useNavItems = (isLoggedIn: boolean, username: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOut = async() => {
    try {
      const a = await dispatch(logout(username)).unwrap();
      console.log(a)
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  }

  const signinPath = PATHNAMES.SIGNIN

  const appRoutes =
    [
      isLoggedIn ? PATHNAMES.USER_HOME : signinPath,
      isLoggedIn ? PATHNAMES.USER_METRICS : signinPath,
      isLoggedIn ? PATHNAMES.USER_EDIT_ADD_LOG : signinPath,
      isLoggedIn ? PATHNAMES.HOME : signinPath,
    ]
  
  const generateNavItems = (): INavItem[] => {
    const navItems = [
      {
        appRoute: appRoutes[0], icon: <ViewListIcon />, 
        name: "View",
        clickHandler: () => {navigate(isLoggedIn ? defineUserPath(username, appRoutes[0]) : appRoutes[0])}
      },
      {
        appRoute: isLoggedIn ? PATHNAMES.USER_METRICS : PATHNAMES.SIGNIN,
        icon: <EqualizerIcon />, name: "Stats",
        clickHandler: () => {navigate(isLoggedIn ?  defineUserPath(username, appRoutes[1]) : appRoutes[1])}
      },
      {
        appRoute: isLoggedIn ? PATHNAMES.USER_EDIT_ADD_LOG : PATHNAMES.SIGNIN,
        icon: <EditCalendarIcon />, name: "Record",
        clickHandler: () => {navigate(isLoggedIn ?  defineUserPath(username, appRoutes[2]) : appRoutes[2])}
      },
      {
        appRoute: isLoggedIn ? PATHNAMES.HOME : PATHNAMES.SIGNIN,
        icon: isLoggedIn ? <LogoutIcon /> : <LoginIcon />,
        name: isLoggedIn ? "Logout" : "Login",
        clickHandler: () => {
          signOut();
          navigate(isLoggedIn ? defineUserPath(username, appRoutes[3]) : appRoutes[3])
        }
      }
    ]
    return navItems;
  }
  return {generateNavItems}
}