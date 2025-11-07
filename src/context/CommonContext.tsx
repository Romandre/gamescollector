"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Hooks
import { usePathname } from "next/navigation";

interface CommonContextType {
  linkBeforeLogin: string;
  setLinkBeforeLogin: (value: SetStateAction<string>) => void;
  handlePrevousLinkOnSignin: () => void;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export function CommonProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [linkBeforeLogin, setLinkBeforeLogin] = useState("/");

  const handlePrevousLinkOnSignin = () => {
    if (!pathname.includes("sign")) setLinkBeforeLogin(pathname);
  };

  const contextValue = {
    linkBeforeLogin,
    setLinkBeforeLogin,
    handlePrevousLinkOnSignin,
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
