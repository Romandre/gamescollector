"use client";

import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Input({
  value,
  label,
  name,
  type,
  onChange,
  onKeyUp,
  onClick,
  className,
  placeholder,
  required = false,
  children,
}: {
  value: string;
  label?: string;
  name?: string;
  type?: string;
  onChange: (value: string) => void;
  onKeyUp?: (e: React.KeyboardEvent<Element>) => void;
  onClick?: () => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={css({ position: "relative", w: "full", h: "full" })}>
      {children && (
        <div
          className={css({
            position: "absolute",
            display: "flex",
            top: "51%",
            h: "full",
            w: "40px",
            justifyContent: "center",
            alignItems: "center",
            transform: "translateY(-50%)",
            fontSize: 20,
            color: "#AAAAAA",
          })}
        >
          {children}
        </div>
      )}
      <input
        value={value}
        name={name}
        type={type}
        className={`search ${className}`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => onKeyUp && onKeyUp(e)}
        onClick={onClick}
        autoComplete={name === "password" || name === "email" ? "on" : "off"}
        required={required}
      ></input>
      {!!label && (
        <span
          className={`filters ${css({
            position: "absolute",
            top: "-10px",
            left: 0,
            px: 1,
            fontSize: 14,
            textTransform: "capitalize",
            borderRadius: "0 0 6px 0",
            opacity: 0.8,
          })}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
