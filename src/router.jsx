// import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import App from "./pages/App/index";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/auth", element: <Auth /> },
]);

export default router;
