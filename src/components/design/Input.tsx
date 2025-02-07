"use client";

import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Input({
  value,
  label,
  name,
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
            top: "52%",
            left: 3,
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
        className={className}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => onKeyUp && onKeyUp(e)}
        onClick={onClick}
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
