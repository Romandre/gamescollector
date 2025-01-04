"use client";
import { ReactNode } from "react";
import { useThemeContext } from "@/context";

export default function Button({ children }: { children: ReactNode }) {
  const { toggleTheme } = useThemeContext();

  return (
    <>
      <button onClick={toggleTheme}>{children}</button>
    </>
  );
}
