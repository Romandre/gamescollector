"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { type Session } from "@supabase/supabase-js";

type AuthContextType = {
  userSession: Session | null;
  userId: string;
  linkBeforeLogin: string;
  setLinkBeforeLogin: (value: SetStateAction<string>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = supabaseClient();
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [linkBeforeLogin, setLinkBeforeLogin] = useState("/");
  const userId = userSession?.user?.id || "";

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserSession(session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUserSession(session);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe(); // Cleanup the listener
    };
  }, [supabase]);

  const contextValue = {
    userSession,
    userId,
    linkBeforeLogin,
    setLinkBeforeLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useTheme must be used within a AuthProvider");
  }
  return context;
}
