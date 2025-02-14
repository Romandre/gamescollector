import { Dispatch, SetStateAction } from "react";

// Styles
import { css } from "../../../styled-system/css";

export function Overlay({
  isOpen,
  setIsOpen,
  className,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
  return (
    <div
      className={`overlay ${css({ display: isOpen ? "block" : "none" })} ${className}`}
      onClick={() => setIsOpen(false)}
    ></div>
  );
}
