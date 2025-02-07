"use client";
import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Button({
  type = "button",
  className,
  onClick,
  children,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button
        className={`${css({ w: "full", h: "50px" })} ${className} `}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
}
