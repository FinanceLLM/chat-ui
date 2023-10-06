import { ReactNode } from "react";

import { InputContextProvider } from "./input-context";

const GlobalStore = ({ children }: { children: ReactNode }) => (
  <InputContextProvider>{children}</InputContextProvider>
);

export { GlobalStore };
