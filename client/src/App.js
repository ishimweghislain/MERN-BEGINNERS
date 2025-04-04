import AddUser from './adduser/AddUser';
import './App.css';
import User from './getuser/User';
import UpdateUser from './updateuser/UpdateUser';
import AdminLogin from './AdminLogin';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AdminLogin />,
    },
    {
      path: "/getuser",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;