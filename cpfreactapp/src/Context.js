import React, { createContext, useState } from "react";

export const Context = createContext();

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(null);

  return (
    <Context.Provider value={{ userContext, setUserContext }}>
      {children}
    </Context.Provider>
  );
};
