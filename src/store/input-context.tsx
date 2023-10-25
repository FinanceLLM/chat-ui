import { createContext, useReducer, useContext } from "react";
import type { ReactNode, Dispatch } from "react";

type Action = { type: "SET_USER_INPUT"; payload: string };
type DispatchType = Dispatch<Action>;

// eslint-disable-next-line react-refresh/only-export-components
export const setInput = (input: string): Action => ({
  type: "SET_USER_INPUT",
  payload: input,
});

const reducer = (_: string, action: Action) => {
  return action.payload;
};

const InputContext = createContext<string>("");
const InputDispatchContext = createContext<DispatchType | undefined>(undefined);

export const InputContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, "");

  return (
    <InputContext.Provider value={state}>
      <InputDispatchContext.Provider value={dispatch}>
        {children}
      </InputDispatchContext.Provider>
    </InputContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInputContext = (): [string, DispatchType] => {
  const state = useContext(InputContext);
  const dispatch = useContext(InputDispatchContext);

  if (!dispatch) {
    throw new Error("Cannot find InputContext");
  }

  return [state, dispatch];
};
