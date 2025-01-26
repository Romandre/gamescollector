"use client";
import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button
        className={`${css({ w: "full", h: "50px" })} ${className} `}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
