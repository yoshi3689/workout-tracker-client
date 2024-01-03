import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/post-signin/History";
import Signin from "./routes/pre-signin/Signin";
import Home from "./routes/pre-signin/Home";
import Signup from "./routes/pre-signin/Signup";
import EmailVerify from "./routes/pre-signin/EmailVerify";
import PasswordSend from "./routes/pre-signin/PasswordSend";
import VerificationResend from "./routes/pre-signin/VerificationResend";
import CreateOrEdit from "./routes/post-signin/RoutineCreateEditLog";

import { PATHNAMES } from "./utils/pathnames";

import SigninPersist from "./middleware/SigninPersist"

import PageBase from "./pageBase/PageBase";
import UserEdit from "./routes/post-signin/UserEdit";

const router = createBrowserRouter([
  {
    path: PATHNAMES.HOME,
    element: <PageBase><Home /></PageBase>,
  },
  {
    path: PATHNAMES.SIGNIN,
    element:<PageBase><Signin /></PageBase>,
  },
  {
    path: PATHNAMES.SIGNUP,
    element: <PageBase><Signup/></PageBase>,
  },
  {
    path: PATHNAMES.EMAIL_VERIFY,
    element: <PageBase><EmailVerify/></PageBase>,
  },
  {
    path: PATHNAMES.PASSWORD_RESET,
    element: <PageBase><PasswordSend /></PageBase>,
  },
  {
    path: PATHNAMES.EMAIL_RESEND,
    element: <PageBase><VerificationResend/></PageBase>,
  },
  {
    path: PATHNAMES.HOME,
    element: <SigninPersist />,
    children: [
      {
        path: PATHNAMES.USER_HOME,
        element: <PageBase><Root /></PageBase>,
      },
      {
        path: PATHNAMES.USER_EDIT_ADD_LOG,
        element: <PageBase><CreateOrEdit /></PageBase>,
      },
      {
        path: PATHNAMES.USER_ACCOUNT_EDIT,
        element: <PageBase><UserEdit /></PageBase>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
