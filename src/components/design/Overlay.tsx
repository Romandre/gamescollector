"use client";
import { useEffect } from "react";

// Styles
import { css } from "../../../styled-system/css";

export function Overlay({
  isOpen,
  overflowControl = true,
  setIsOpen,
  className,
}: {
  isOpen: boolean;
  overflowControl?: boolean;
  setIsOpen: (val: boolean) => void;
  className?: string;
}) {
  useEffect(() => {
    if (overflowControl) {
      if (isOpen) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        document.documentElement.style.marginRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.marginRight = "";
      }
    }

    return () => {
      if (overflowControl) {
        document.body.style.overflow = "";
        document.documentElement.style.marginRight = "";
      }
    };
  }, [isOpen, overflowControl]);

  return (
    <div
      className={`overlay ${css({ display: isOpen ? "block" : "none" })} ${className}`}
      onClick={() => setIsOpen(false)}
    ></div>
  );
}
