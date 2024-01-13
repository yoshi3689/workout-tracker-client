import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/post-signin/Home";
import Signin from "./routes/pre-signin/Signin";
import Home from "./routes/pre-signin/Home";
import Signup from "./routes/pre-signin/Signup";
import EmailVerify from "./routes/pre-signin/EmailVerify";
import PasswordSend from "./routes/pre-signin/PasswordSend";
import VerificationResend from "./routes/pre-signin/VerificationResend";
import LogCreateEdit from "./routes/post-signin/LogCreateEdit";

import { PATHNAMES } from "./utils/pathnames";

import SigninPersist from "./middleware/SigninPersist"

import PageBase from "./components/pageBase/PageBase";
import UserEdit from "./routes/post-signin/UserEdit";
import Metrics from "./routes/post-signin/metrics/Metrics";
import MetricsPersonalRecord from "./routes/post-signin/metrics/MetricsPersonalRecord";
import MetricsLiftedWeight from "./routes/post-signin/metrics/MetricsLiftedWeight";
import PasswordReset from "./routes/pre-signin/ResetPassword";

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
    path: PATHNAMES.PASSWORD_RESET_BEFORE_LINK_CLICKED,
    element: <PageBase><PasswordSend /></PageBase>,
  },
  {
    path: PATHNAMES.PASSWORD_RESET_AFTER_LINK_CLICKED,
    element: <PageBase><PasswordReset /></PageBase>,
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
        path: PATHNAMES.USER_METRICS,
        element: <PageBase><Metrics /></PageBase>,
      },
      {
        path: PATHNAMES.USER_METRICS_PR,
        element: <PageBase><MetricsPersonalRecord /></PageBase>,
      },
      {
        path: PATHNAMES.USER_METRICS_LW,
        element: <PageBase><MetricsLiftedWeight /></PageBase>,
      },
      {
        path: PATHNAMES.USER_EDIT_ADD_LOG,
        element: <PageBase><LogCreateEdit /></PageBase>,
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
