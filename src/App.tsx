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

import BeforeSignin from "./pageBase/PageBase";

const router = createBrowserRouter([
  {
    path: PATHNAMES.HOME,
    element: <BeforeSignin><Home /></BeforeSignin>,
  },
  {
    path: PATHNAMES.SIGNIN,
    element: <Signin />,
  },
  {
    path: PATHNAMES.SIGNUP,
    element: <BeforeSignin><Signup/></BeforeSignin>,
  },
  {
    path: PATHNAMES.EMAIL_VERIFY,
    element: <EmailVerify/>,
  },
  {
    path: PATHNAMES.PASSWORD_SEND,
    element: <PasswordSend />,
  },
  {
    path: PATHNAMES.EMAIL_RESEND,
    element: <VerificationResend/>,
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
    <RouterProvider router={router} />
  );
}

export default App;
