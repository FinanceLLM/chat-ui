import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { GlobalStore } from "./store";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalStore>
    <RouterProvider router={router} />
  </GlobalStore>
);
