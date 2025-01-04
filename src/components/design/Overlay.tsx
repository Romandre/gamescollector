import { Dispatch, SetStateAction } from "react";

// Styles
import { css } from "../../../styled-system/css";

export function Overlay({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`overlay ${css({ display: isOpen ? "block" : "none" })}`}
      onClick={() => setIsOpen(false)}
    ></div>
  );
}
