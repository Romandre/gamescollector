"use client";

import { ReactNode } from "react";
import { css } from "../../../styled-system/css";

export function Input({
  value,
  onChange,
  onKeyUp,
  onClick,
  className,
  placeholder,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  onKeyUp?: (e: React.KeyboardEvent<Element>) => void;
  onClick?: () => void;
  className?: string;
  placeholder?: string;
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
        className={className}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => onKeyUp && onKeyUp(e)}
        onClick={onClick}
      ></input>
    </div>
  );
}
