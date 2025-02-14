"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CommonContextType {
  linkBeforeLogin: string;
  setLinkBeforeLogin: (value: SetStateAction<string>) => void;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export function CommonProvider({ children }: { children: ReactNode }) {
  const [linkBeforeLogin, setLinkBeforeLogin] = useState("/");

  const contextValue = {
    linkBeforeLogin,
    setLinkBeforeLogin,
  };

  return (
    <CommonContext.Provider value={contextValue}>
      {children}
    </CommonContext.Provider>
  );
}

export function useCommonContext() {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCommonContext must be used within a CommonProvider");
  }
  return context;
}
