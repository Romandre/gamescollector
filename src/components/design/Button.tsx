"use client";
import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Button({
  type = "button",
  className,
  onClick,
  children,
  disabled,
}: {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <>
      <button
        className={`${css({ w: "full", h: "50px" })} ${className}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
