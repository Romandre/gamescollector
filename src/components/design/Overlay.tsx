"use client";
import { useEffect } from "react";

// Styles
import { css } from "../../../styled-system/css";

export function Overlay({
  isOpen,
  setIsOpen,
  className,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  className?: string;
}) {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.documentElement.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.marginRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.marginRight = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`overlay ${css({ display: isOpen ? "block" : "none" })} ${className}`}
      onClick={() => setIsOpen(false)}
    ></div>
  );
}
