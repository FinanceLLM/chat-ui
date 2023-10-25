import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Chat } from "./pages/chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
