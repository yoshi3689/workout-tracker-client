import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/UserHome";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import CreateOrEdit from "./routes/UserCreateEditLog";

import { PATHNAMES } from "./utils/pathnames";

import SigninPersist from "./middleware/SigninPersist"
import NavBar from "./components/NavBar";
import { Toolbar } from "@mui/material";
import { isMobile } from "react-device-detect";
import EmailVerify from "./routes/EmailVerify";


const router = createBrowserRouter([
  {
    path: PATHNAMES.HOME,
    element: <Home />,
  },
  {
    path: PATHNAMES.SIGNIN,
    element: <Signin />,
  },
  {
    path: PATHNAMES.SIGNUP,
    element: <Signup />,
  },
  {
    path: PATHNAMES.EMAIL_VERIFY,
    element: <EmailVerify/>,
  },
  {
    path: PATHNAMES.HOME,
    element: <SigninPersist />,
    children: [
      {
        path: PATHNAMES.USER_HOME,
        element: <Root />,
      },
      {
        path: PATHNAMES.USER_EDIT_ADD_LOG,
        element: <CreateOrEdit />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <header>
        {!isMobile &&
          <>
            <NavBar />
            <Toolbar />
          </>
        }
      </header>
      <RouterProvider router={router} />
      <footer>
        {isMobile &&
          <>
            <Toolbar />
            <NavBar />
          </>
        }
        
        
      </footer>
    </>
  );
}

export default App;
