import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";

import LoginPersist from "./middleware/LoginPersist"

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
    ],
  },
]);

function App() {
  return (
    <>
      <header>
        <h1>Some top content</h1>
      </header>
      <nav></nav>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <footer>
        <h1>Some Bottom Content</h1>
      </footer>
    </>
  );
}

export default App;
