import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userContext, setContext] = useState();

  return (
    <Context.Provider value={{ userContext, setContext }}>
      {children}
    </Context.Provider>
  );
};
