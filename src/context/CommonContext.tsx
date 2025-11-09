"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Hooks
import { usePathname } from "next/navigation";

interface CommonContextType {
  linkBeforeLogin: string;
  setLinkBeforeLogin: (value: SetStateAction<string>) => void;
  handlePrevousLinkOnSignin: (link?: string) => void;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export function CommonProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [linkBeforeLogin, setLinkBeforeLogin] = useState("/");

  const handlePrevousLinkOnSignin = (link?: string) => {
    if (link) setLinkBeforeLogin(link);
    else if (!pathname.includes("sign")) setLinkBeforeLogin(pathname);
  };

  useEffect(() => {
    if (pathname.includes("collection")) {
      setLinkBeforeLogin("/collection");
    }
  }, [pathname]);

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
