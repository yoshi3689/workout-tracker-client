import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/UserHome";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import EmailVerify from "./routes/EmailVerify";
import PasswordSend from "./routes/PasswordSend";
import VerificationResend from "./routes/VerificationResend";
import CreateOrEdit from "./routes/UserCreateEditLog";

import { PATHNAMES } from "./utils/pathnames";

import SigninPersist from "./middleware/SigninPersist"

import PageBase from "./pageBase/PageBase";

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
    path: PATHNAMES.PASSWORD_SEND,
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
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
