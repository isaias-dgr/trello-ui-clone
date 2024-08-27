import React, { createContext, useContext, ReactNode } from "react";

interface MyContextProps {
  basename: string;
}

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const contextValue = { basename: "your-basename-value" };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
