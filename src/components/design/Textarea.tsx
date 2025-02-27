"use client";

import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Textarea({
  value,
  label,
  name,
  onChange,
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
  className?: string;
  placeholder?: string;
  required?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={css({ position: "relative", w: "full" })}>
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
      <textarea
        value={value}
        name={name}
        className={`search ${className}`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      ></textarea>
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
