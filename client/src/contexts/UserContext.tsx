import React, { createContext, useState } from "react";

export const UserContext = createContext({} as any);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
