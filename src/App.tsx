import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import CreateOrEdit from "./routes/CreateOrEdit";

import LoginPersist from "./middleware/LoginPersist"
import NavBar from "./components/NavBar";
import { Toolbar } from "@mui/material";
import { isMobile } from "react-device-detect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <LoginPersist />,
    children: [
      {
        path: "/dashboard/:username",
        element: <Root />,
      },
      {
        path: "/dashboard/:username/log",
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
