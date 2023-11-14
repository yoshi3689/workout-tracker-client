import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = createBrowserRouter([
  {
    path: "/dashboard/:username",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
