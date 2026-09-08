import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/login-page";

import RegisterPage from "../features/token/pages/register-page";
import ControlPanelPage from "../features/token/pages/control-panel-page";
import TokenDisplayPage from "../features/token/pages/token-display-page";

import ProtectedRoute from "./protected-route";

export const router = createBrowserRouter([
  // ------------------------------------------
  // Public Routes
  // ------------------------------------------

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <TokenDisplayPage />,
  },

  // ------------------------------------------
  // Protected Routes
  // ------------------------------------------

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },

      {
        path: "/control",
        element: <ControlPanelPage />,
      },
    ],
  },
]);